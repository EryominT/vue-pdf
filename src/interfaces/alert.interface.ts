export interface MessageAlertInterface {
    id: number,
    text: string,
    critical: boolean,
    timeout?: number,
}
