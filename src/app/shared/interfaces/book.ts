export interface BookDataSource {
  bookName: string;
  author: string;
  description: string;
  price: number;
}

export interface BookDetails {
  id: number;
  bookName: string;
  author: string;
  description: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetBookResponse {
  results: BookDetails[];
  totalCount: number;
  message: string
}

export interface GetBookRequest {
  pageIndex: number,
  perPage: number,
  sortField: string,
  sortOrder: string
}

export interface GetBookByIdResponse {
  book: BookDetails;
  message: string
}

