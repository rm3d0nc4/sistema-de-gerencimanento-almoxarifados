/* echo -e '\n'
    echo "=========================="
    echo "     TÍTULO DO SEU MENU   "
    echo "=========================="
    echo "       ============       "
    echo "          ======          "
    echo "            ==            "
    echo "__________________________"
    echo "[ 1 ] | Opção 1"
    echo "[ 2 ] | Opção 2"
    echo "[ 3 ] | Opção 3"
    echo "[ 4 ] | Opção 4"
    echo "[ 5 ] | Opção 5"
    echo "[ 6 ] | Opção 6"
    echo "[ 7 ] | Opção 7"
    echo "[ 0 ] | SAIR" */
    
import { markAsUntransferable } from "worker_threads";

export function menu() {
    let menu = 
    "========================================= " + "\n" +
    "SISTEMA DE GERENCIAMENTO DE ALMOXARIFADOS  " + "\n" +
    "========================================= " + "\n" +
    "       ===========================        " + "\n" +
    "          =====================           " + "\n" + 
    "              =============               " + "\n" + 
    "===== O que você deseja gerenciar? ===== " + "\n" +
    "        [ 1 ] | Almoxarifados        " + "\n" +
    "        [ 2 ] | Itens                " + "\n" +
    "        [ 3 ] | Lote                 " + "\n" +
    "        [ 4 ] | Sair                 " + "\n" 

    /* "[ 1 ] | Opção 1     [ 2 ] | Opção 2  " + "\n" +
    "[ 3 ] | Opção 3     [ 4 ] | Opção 4  " + "\n" +
    "[ 5 ] | Opção 5     [ 6 ] | Opção 6  " + "\n" +
    "[ 7 ] | Opção 7     [ 8 ] | Opção 8  " + "\n" +
    "[ 9 ] | Opção 9     [ 10 ] | Opção 10" + "\n" */
    let menuWareHouse = 
    "===== Gerenciamento de Almoxarifado =====" + "\n" +
    "[ 1 ] | Mostrar Todos     [ 2 ] | Inserir" + "\n" +
    "[ 3 ] | Consultar por Id  [ 4 ] | Deletar" + "\n" +
    "[ 5 ] | Update            [ 6 ] | Voltar " + "\n"
    
    let menuItens = 
    "===== Gerenciamento dos Itens =====" + "\n" +
    "[ 1 ] | Inserir           [ 2 ] | Consultar por Id" + "\n" +
    "[ 3 ] | Mostrar Todos     [ 4 ] | Update" + "\n" +
    "[ 5 ] | Deletar           [ 6 ] | Voltar"

    let menuWarehousesItens =
    "============= Gerenciamento de itens do warehouse ==============" + "\n" +
    "[ 1 ] | Mostrar todos os Itens [ 2 ] | Consultar lote por Id" + "\n" +
    "[ 3 ] | Inserir lote           [ 4 ] | Update lote" + "\n" +
    "[ 5 ] | Deletar lote           [ 6 ] | Voltar"

    console.log(menu);
    console.log(menuWareHouse);
    console.log(menuItens);
}

menu()