export interface comments {
    id: number;
    autorId: number;
    postId: number;
    texto: string;
    autor?: { nome: string; email?: string };
}