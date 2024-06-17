import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../componentes/container/container.component';
import { Contato } from '../../componentes/contato/contato';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css',
  imports: [
    CommonModule,
    ContainerComponent,
    RouterLink,
    SeparadorComponent,
    CabecalhoComponent,
  ],
})
export class PerfilContatoComponent implements OnInit {
  contato: Contato = {
    id: 0,
    nome: '',
    telefone: '',
    email: '',
    aniversario: '',
    redes: '',
    avatar: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private contatoService: ContatoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.contatoService
      .obterContatoPorID(parseInt(id!))
      .subscribe((contato) => {
        this.contato = contato;
      });
  }

  excluir() {
    this.contatoService.excluirContatoPorID(this.contato.id!).subscribe(() => {
      this.router.navigateByUrl('/lista-contatos');
    });
  }
}
