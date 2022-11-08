function realizaAnalise(codigo){
    if(codigo){
        
        if(codigo.indexOf('"') != -1 || codigo.indexOf("'") != -1){
            let str = codigo.replaceAll('"' , 'xXxXx').replaceAll("'" , 'xXxXx')
            
            let qtdXparaCorrigir = str.split('xXxXx').length            

        }

        let arrArg = codigo.replaceAll('(' , ' ( ').replaceAll(')' , ' ) ').split(' ')

        let resultado = []

        for(var i = 0 ; i < arrArg.length ; i++){
            let palavraReservada = false

            if(arrArg[i] == 'if' || arrArg[i] == 'while' || arrArg[i] == 'else' || arrArg[i] == 'do' || arrArg[i] == 'break' || arrArg[i] == 'case' || arrArg[i] == 'auto' || arrArg[i] == 'char' || arrArg[i] == 'const' || arrArg[i] == 'continue' || arrArg[i] == 'default' || arrArg[i] == 'double' || arrArg[i] == 'enum' || arrArg[i] == 'extern' || arrArg[i] == 'float' || arrArg[i] == 'for' || arrArg[i] == 'goto' || arrArg[i] == 'long' || arrArg[i] == 'register' || arrArg[i] == 'return' || arrArg[i] == 'short' || arrArg[i] == 'signed' || arrArg[i] == 'sizeof' || arrArg[i] == 'static' || arrArg[i] == 'struct' || arrArg[i] == 'switch' || arrArg[i] == 'typedef' || arrArg[i] == 'union' || arrArg[i] == 'unsigned' || arrArg[i] == 'void' || arrArg[i] == 'volatile'){
                resultado.push({    
                    token: arrArg[i],
                    lexema: arrArg[i],
                    desc: 'Palavra reservada'
                })
                palavraReservada = true
            }
            if(arrArg[i] == '+' || arrArg[i] == '-' || arrArg[i] == '*' || arrArg[i] == '/' || arrArg[i] == '%' || arrArg[i] == '++' || arrArg[i] == '(' || arrArg[i] == ')' || arrArg[i] == '>' || arrArg[i] == '<'  || arrArg[i] == '+=' || arrArg[i] == '-=' || arrArg[i] == '*=' || arrArg[i] == '/=' || arrArg[i] == '%=' || arrArg[i] == '>>=' || arrArg[i] == '<<=' || arrArg[i] == '&=' || arrArg[i] == '^=' || arrArg[i] == '|='){
                resultado.push({    
                    token: arrArg[i],
                    lexema: arrArg[i],
                    desc: 'Operadores'
                })
            }

            if(isNaN(parseFloat(arrArg[i])) && !palavraReservada){
                resultado.push([    
                    arrArg[i],
                    'String',
                    'String'
                ])
            }else{
                resultado.push([    
                   arrArg[i],
                   'num',
                   'Numeral'
                ])
            }

        }

        console.log(resultado)


       $('#tabelaDoPai').DataTable({
            data: resultado,
            scrollCollapse: true,
            paging: false,
            searching: false,
            info: false,
            columns: [
                {
                    orderable: false,
                    title: 'Token'
                },{
                    orderable: false,
                    title: 'Lexema'
                },{
                    orderable: false,
                    title: 'Descrição'
                }
                
            ],
            "language": {
                "lengthMenu": "Display _MENU_ records per page",
                "zeroRecords": "Sem registros !",
                "info": "Showing page _PAGE_ of _PAGES_",
                "infoEmpty": "Sem registros !",
                "infoFiltered": "(filtered from _MAX_ total records)"
            }
        });


       // resultado = resultado.join(' | ')

       // $("#resultadoAnalise")[0].innerText = resultado
    }
}