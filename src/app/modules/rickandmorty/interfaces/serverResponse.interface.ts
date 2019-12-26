import { SingleSharacter } from './singleSharacter.interface';

export interface ServerResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev?: string;
  };
  results: Array<SingleSharacter>;
}