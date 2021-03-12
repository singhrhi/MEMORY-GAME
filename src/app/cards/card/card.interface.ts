export interface ICard{
    uid: string,
    image: string,
    cardId: number;
    cardState: 'default' | 'flipped' | 'matched'
}