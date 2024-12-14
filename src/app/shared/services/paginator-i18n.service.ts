import { inject, Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable()
export class PaginatorI18N implements MatPaginatorIntl {
  readonly #translateService = inject(TranslateService);
  readonly changes = new Subject<void>();

  readonly firstPageLabel = this.#translateService.instant(
    'PAGINATOR.firstPageLabel'
  );
  readonly itemsPerPageLabel = this.#translateService.instant(
    'PAGINATOR.firstPageLabel'
  );
  readonly lastPageLabel = this.#translateService.instant(
    'PAGINATOR.lastPageLabel'
  );
  readonly nextPageLabel = this.#translateService.instant(
    'PAGINATOR.nextPageLabel'
  );
  readonly previousPageLabel = this.#translateService.instant(
    'PAGINATOR.previousPageLabel'
  );

  getRangeLabel(page: number, pageSize: number, length: number): string {
    const amountPages = Math.ceil(length / pageSize);
    return (
      this.#translateService.instant('PAGINATOR.page') +
      ` ${page + 1} ` +
      this.#translateService.instant('PAGINATOR.of') +
      ` ${length === 0 ? '1' : amountPages}`
    );
  }
}
