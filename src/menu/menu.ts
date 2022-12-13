class Menu {
    principal(): string {
        let str: string = 
        "=========================================" + "\n" +
        "SISTEMA DE GERENCIAMENTO DE ALMOXARIFADOS" + "\n" +
        "=========================================" + "\n" +
        "===== O que você deseja gerenciar? ======" + "\n" +
        "[ 1 ] | Almoxarifados       [ 3 ] | Lote " + "\n" +
        "[ 2 ] | Itens               [ 0 ] | Sair"

        return str;
    }

    wareHouse(): string {
        let str: string = 
        "========== Gerenciamento de Almoxarifado =========" + "\n" +
        "[ 1 ] | Consultar Todos          [ 4 ] | Remover" + "\n" +
        "[ 2 ] | Inserir                  [ 5 ] | Atualizar" + "\n" +
        "[ 3 ] | Consultar                [ 6 ] | Voltar"        

        return str;
    }

    item(): string {
        let str: string = 
        "============ Gerenciamento dos Itens ============" + "\n" +
        "[ 1 ] | Consultar Todos         [ 4 ] | Remover   " + "\n" +
        "[ 2 ] | Adicinar                [ 5 ] | Atualizar" + "\n" +
        "[ 3 ] | Consultar               [ 6 ] | Voltar "
        return str;
    }

    wareItem(): string {
        let str: string = 
       "================ Gerenciamento de Lotes ================" + "\n" +
       "[ 1 ] | Consultar Todos             [ 4 ] | Remover     " + "\n" +
       "[ 2 ] | Consultar Por Propriedade   [ 5 ] | Atualizar   " + "\n" +
       "[ 3 ] | Inserir                     [ 6 ] | Voltar      " + "\n"
       return str;
    }
}

export default new Menu();