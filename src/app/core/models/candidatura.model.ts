export interface Candidatura {
    id?: number;
    vagaId: number;
    candidatoId: number;
    dataCandidatura?: Date;

}

export interface CandidaturaResponse {
  candidatura: Candidatura;
  mensagem: string;
}