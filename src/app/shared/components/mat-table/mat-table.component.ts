import {
  AfterViewInit,
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  Output,
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
  ],
  templateUrl: './mat-table.component.html',
  styleUrl: './mat-table.component.scss',
})
export class MatTableComponent<T> implements AfterViewInit {
  readonly columns = input.required<IMatTableColumn<T>[]>();
  readonly displayedColumns = computed(() => this.columns().map((c) => c.key));
  readonly paginationParams = input.required<PaginationParams>();
  readonly paginator = viewChild<MatPaginator>(MatPaginator);
  readonly sort = viewChild<MatSort>(MatSort);

  readonly #dataSource = signal<T[]>([]);
  @Input({ required: true }) set dataSource(dataSource: T[]) {
    this.#dataSource.set(dataSource);
  }
  get dataSource(): MatTableDataSource<T> {
    return new MatTableDataSource<T>(this.#dataSource());
  }

  readonly emptyData = new MatTableDataSource<T>([{ empty: 'row' } as T]);

  @Output() pageChange = new EventEmitter<PageEvent>();

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
    console.log(sort);
  }

  isButtonDisabled(button: IRowButton<T>, element: T): boolean | undefined {
    return button.disabled?.(element);
  }

  onButtonClick(button: IRowButton<T>, element: T): void {
    if (this.isButtonDisabled(button, element)) return;
    button.clickEvent(element);
  }
}
