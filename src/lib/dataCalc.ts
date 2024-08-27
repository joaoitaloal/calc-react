let maxAwait = 10000000;

export function replaceOps(prop: string){
    prop = prop.replace(/xor|\⊕/gi, "⊻")
                .replace(/or|\+/gi, "∨")
                .replace(/and|\./gi, "∧")
                .replace(/not|\~/gi, "¬")
                .replace(/xnor|biimp|\=/gi, "⇔")
                .replace(/impinv|implicacaoinversa|\<=/gi, "←")
                .replace(/imp|implicacao|\=>/gi, "→")
                .replace(/tautologia|\T/gi, "⊤")
                .replace(/absurdo|\F/gi, "⊥")
                .replace(/ /gi, "");
    console.log(prop)
    return prop
}

export function initialSimbValue(x: number, y: number){
    let states = "f";
    let calcTruth = (y+1)%(2**(x+1));

    if(calcTruth != 0 && calcTruth <= (2**(x+1))/2){
        states = "v";
    }

    return states;
}

export function readProp(simbs: Array<string>, values: Array<string>, prop: string){
    //replace each symbol for its truth value, then pass it to the calc function
    simbs.forEach((simb) => {
        prop = prop.replace(new RegExp(simb, "g"), values[simbs.indexOf(simb)]).replace(/v|\⊤/g,"1").replace(/f|\⊥/g,"0");
    })

    prop = calcProp(prop)

    return prop;
}

export function calcProp(prop: string){
    let loop = 0;
    let error = false;
    //Loop until we get a truth or false, unless it takes to much then it gives up and returns ""
    while(prop != "1" && prop != "0" && !error){
        //Se o loop durar exageradamente muito, provavelmente ele não vai terminar então retorna um "erro"
        loop +=1;
        if(loop > maxAwait){
            window.alert("Tempo de espera excedido, provavelmente uma fórmula mal formada");
            error = true;
        }
        //Os próximos ifs basicamente checam em sequência e em ordem de precedência do operador cada caractére que representa algum operador e resolve eles
        if(prop.includes("(")){
            if(!prop.includes(")")){window.alert("feche os parênteses!"); error = true;}
            let iniparen = prop.indexOf("(")+1;
            let fimparen = prop.lastIndexOf(")")-1;
            
            //Entregar o conteudo do parentese para ser processado na própria função
            let newprop = prop.slice(iniparen,fimparen+1);
            newprop = calcProp(newprop);
            
            //Substituir o conteudo de prop pelo que foi processado dentro do parentese
            prop = prop.slice(0,iniparen-1)+newprop+prop.slice(fimparen+2,prop.length);
        }else if(prop.includes("¬")){
            let indexne = prop.indexOf("¬");
            let newprop1 = prop.slice(0,indexne);
            let newprop2 = prop.slice(indexne+2, prop.length);
            prop = newprop1+op.not(prop[indexne+1])+newprop2;
        }else if(prop.includes("∧")){
            //pegar os valores da esquerda e da direita da conjunção e mandar pra função conjuncao()
            let indexc = prop.indexOf("∧");
            let tempval = op.and(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a conjunção e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop.includes("∨")){
            //pegar os valores da esquerda e da direita da disjunção e mandar pra função disjuncao()
            let indexc = prop.indexOf("∨");
            let tempval = op.or(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a disjunção e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop.includes("⊻")){
            //pegar os valores da esquerda e da direita da disjunção e mandar pra função disjuncaoex()
            let indexc = prop.indexOf("⊻");
            let tempval = op.xor(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a disjunção e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop.includes("→")){
            //pegar os valores da esquerda e da direita da implicação e mandar pra função implicacao()
            let indexc = prop.indexOf("→");
            let tempval = op.imp(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a implicação e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop.includes("⇔")){
            //pegar os valores da esquerda e da direita da biimplicação e mandar pra função biimplicacao()
            let indexc = prop.indexOf("⇔");
            let tempval = op.biimp(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a biimplicacao e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop != "1" && prop != "0"){
            //Se todos os operadores forem calculados e o resultado não for v nem f retornar um erro para evitar que loope pra sempre
            window.alert("Não foi possível calcular, provavelmente uma fórmula mal formada");
            error = true;
        }
    }
    if(error) return "";
    return prop;
}

const op = {
    and(x: string, y: string){
        if(x == "1" && y =="1"){
            return "1";
        }
        return "0";
    },
    or(x: string, y: string){
        if(x == "1" || y =="1"){
            return "1";
        }
        return "0";
    },
    not(x: string){
        if(x == "1"){
            return "0";
        }
        return "1"
    },
    xor(x: string, y: string){
        return op.or(op.and(op.not(x),y),op.and(x,op.not(y)));
    },
    imp(x: string, y: string){
        if(x == "1" && y != "1") return "0";
        return "1";
    },
    biimp(x: string, y: string){
        if(x == y) return "1";
        return "0";
    }
}