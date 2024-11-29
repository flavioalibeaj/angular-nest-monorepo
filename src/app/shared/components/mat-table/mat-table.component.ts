import {
  AfterViewInit,
  Component,
  computed,
  input,
  Input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { PaginationParams } from '../../model/pagination-params';
import { MatTooltip } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { IRowButton } from '../../model/i-row-button.interface';
import { IMatTableColumn } from '../../model/i-mat-table-column';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgTemplateOutlet } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-mat-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatTooltip,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatProgressBarModule,
    NgTemplateOutlet,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './mat-table.component.html',
  styleUrl: './mat-table.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('350ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class MatTableComponent<T> implements AfterViewInit {
  readonly columns = input.required<IMatTableColumn<T>[]>();
  readonly displayedColumns = computed(() => {
    const columns = this.columns().map((c) => c.key);
    if (this.isSelectable() && this.dataSource.data.length)
      columns.unshift('checkboxSelection');

    return columns;
  });
  readonly paginationParams = input.required<PaginationParams>();
  readonly loading = input<boolean>(false);
  readonly isSelectable = input<boolean>(false);
  readonly multiSelect = input<boolean>(true);
  readonly initiallySelectedValues = input<T[]>([]);
  readonly selectionModel = computed(() => {
    return this.isSelectable()
      ? new SelectionModel<T>(
          this.multiSelect(),
          this.initiallySelectedValues() ?? []
        )
      : undefined;
  });
  readonly isExpandable = input<boolean>(false);
  readonly expandableRowTemplate = input<string>();
  expandedElement?: T;

  readonly #dataSource = signal<T[]>([]);
  @Input({ required: true }) set dataSource(dataSource: T[]) {
    this.#dataSource.set(dataSource);
  }
  get dataSource(): MatTableDataSource<T> {
    return new MatTableDataSource<T>(this.#dataSource());
  }

  readonly showFilter = input<boolean>();
  readonly advancedFilter = input<boolean>(); // TODO add
  readonly filterOnFront = input<boolean>();
  readonly printAndExport = input<boolean>();
  readonly printAndExportTitle = input<string>();

  readonly paginator = viewChild<MatPaginator>(MatPaginator);
  readonly sort = viewChild<MatSort>(MatSort);

  readonly pageChange = output<PageEvent>();
  readonly sortChange = output<Sort>();
  readonly toggleChange = output<T[]>();
  readonly searchFilter = output<string>();

  readonly searchFilterCtrl = new FormControl<string>('');

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator() ?? null;
    this.dataSource.sort = this.sort() ?? null;
  }

  trackByFn = (index: number, item: T) => item;

  get pageSizeOptions(): number[] {
    const defaultOptions = [5, 10, 25, 50, 100];
    const dataLength: number = this.dataSource.data.length;

    if (!defaultOptions.includes(dataLength)) defaultOptions.push(dataLength);

    const options = defaultOptions.filter((o) => o <= dataLength);

    return options;
  }

  // TODO
  onPageChange(pageEvent: PageEvent) {
    this.pageChange.emit(pageEvent);
  }

  // TODO
  onSortChange(sort: Sort) {
    this.sortChange.emit(sort);
  }

  isButtonDisabled(button: IRowButton<T>, element: T): boolean | undefined {
    return button.disabled?.(element);
  }

  onButtonClick(button: IRowButton<T>, element: T): void {
    if (this.isButtonDisabled(button, element)) return;
    button.clickEvent(element);
  }

  isAllSelected() {
    const numSelected = this.selectionModel()?.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAll() {
    this.isAllSelected()
      ? this.selectionModel()?.clear()
      : this.dataSource.data.forEach((row) =>
          this.selectionModel()?.select(row)
        );

    this.toggleChange.emit(this.selectionModel()?.selected ?? []);
  }

  toggleRow(row: T) {
    this.selectionModel()?.toggle(row);

    this.toggleChange.emit(this.selectionModel()?.selected ?? []);
  }

  toggleRowExpansion(element: T, event?: Event) {
    event?.stopPropagation();
    this.expandedElement =
      this.expandedElement === element ? undefined : element;
  }

  filterData() {
    const searchValue = this.searchFilterCtrl.value?.toLowerCase() ?? '';
    this.searchFilter.emit(searchValue);
  }

  print() {
    // TODO fix css borders
    const printContent = this.#generateRows();
    this.#openWindowPopup(printContent);
  }

  #generateRows(): string {
    const filteredColumns = this.columns().filter((col) => !col.actions);

    const tableHeaders = filteredColumns
      .map((column) => `<th>${column.header}</th>`)
      .join('');

    let tableRows: string = '';

    this.dataSource.data.forEach((item: any) => {
      const row = `
      <tr>
        ${filteredColumns
          .map((column) => {
            const cellValue = column.cell
              ? column.cell(item)
              : item[column.key];
            return `<td>${cellValue ?? '--'}</td>`;
          })
          .join('')}
      </tr>
    `;
      tableRows += row;
    });

    const printContent = `
      <table>
        <thead>
          <tr>${tableHeaders}</tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
    `;

    return printContent;
  }

  #openWindowPopup(printContent: string) {
    const popUpWin = window.open('', 'top=0,left=0,height=100%');
    popUpWin?.document.write(`
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${this.printAndExportTitle()}</title>
          <style>
              body {
                font-family: arial;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
                  border-radius: 5px;
              }
              th, td {
                  border: 0.5px solid #b3b3b3;
                  padding: 8px;
                  text-align: center;
              }
              th {
                  background-color: #f2f2f2;
              }
          </style>
        </head>
        <body onload="window.print();setTimeout(window.close, 0);">
          <h1>${this.printAndExportTitle()}</h1>
          ${printContent}
        </body>
      </html>`);
    popUpWin?.document.close();
  }
}
