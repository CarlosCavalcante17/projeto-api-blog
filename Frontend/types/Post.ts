export interface Post {
    id: number;
    titulo: string;
    conteudo: string;
    imagem?: string;
    autorId?: number;
    criadoEm?: string;
}