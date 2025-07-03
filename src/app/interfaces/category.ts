export interface Category {
    id: number;
    nom: string;
    nom_parent: string | null;
    dateCreation: string;
    dateModification: string;
}
