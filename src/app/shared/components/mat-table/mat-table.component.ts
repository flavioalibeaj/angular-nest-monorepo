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
  ],
  templateUrl: './mat-table.component.html',
  styleUrl: './mat-table.component.scss',
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
  readonly paginator = viewChild<MatPaginator>(MatPaginator);
  readonly sort = viewChild<MatSort>(MatSort);

  readonly #dataSource = signal<T[]>([]);
  @Input({ required: true }) set dataSource(dataSource: T[]) {
    this.#dataSource.set(dataSource);
  }
  get dataSource(): MatTableDataSource<T> {
    return new MatTableDataSource<T>(this.#dataSource());
  }

  readonly selectionModel = computed(() => {
    return this.isSelectable()
      ? new SelectionModel<T>(
          this.multiSelect(),
          this.initiallySelectedValues() ?? []
        )
      : undefined;
  });

  pageChange = output<PageEvent>();
  sortChange = output<Sort>();
  toggleChange = output<T[]>();

  readonly emptyData = new MatTableDataSource<T>([{ empty: 'row' } as T]);

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
}
