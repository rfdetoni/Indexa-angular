import { Injectable } from '@angular/core';
import { Contato } from '../componentes/contato/contato';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private readonly API = 'http://localhost:3000/contatos';

  constructor(private http: HttpClient) {}

  obterContatos() {
    return this.http.get<Contato[]>(this.API);
  }

  obterContatoPorID(id: number) {
    const url = `${this.API}/${id}`;
    return this.http.get<Contato>(url);
  }

  salvarContato(contato: Contato) {
    return this.http.post<Contato>(this.API, contato);
  }

  excluirContatoPorID(id: number) {
    const url = `${this.API}/${id}`;
    return this.http.delete<Contato>(url);
  }

  editarContatoPorID(contato: Contato) {
    const url = `${this.API}/${contato.id}`;
    return this.http.put<Contato>(url, contato);
  }

  editarOuSalvar(contato: Contato) {
    if (contato.id) {
      return this.editarContatoPorID(contato);
    } else {
      return this.salvarContato(contato);
    }
  }
}
