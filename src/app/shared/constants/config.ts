import { PageEvent } from "@angular/material/paginator";

export class Config {
  public static readonly pagination: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0
  };
}
