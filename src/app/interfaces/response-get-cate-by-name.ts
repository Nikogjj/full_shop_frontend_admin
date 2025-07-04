import { Category } from "./category";

export interface ResponseGetCateByName {
    message: string,
    categories: Category[]
}
