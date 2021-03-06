const LinkedList = require("../controllers/LinkedList");
const Nodo = require("../models/Nodo");
const Error = require("../models/Error");
const Token = require("../models/Token");
const Translater = require('../controllers/Translater')

let lista = new LinkedList();
lista.append
class SyntacticAnalyzer {


    constructor(tokens, errors) {
        //Listas de tokens y errores 
        this.tokens = tokens;
        this.errorList = errors;
        this.sError = false;
        this.FError = false;
        //Contador para la lista de preanalisis
        this.counter = 0;
        //Lista para la gramatica de los for 
        this.looplist = new LinkedList();
        //Lista para los ids
        this.idsDeclaration = new LinkedList();
        //Lista Para la Impresion
        this.impressionList = new LinkedList();
        //Contador para los tabs 
        this.tabs = 0;
        //variables Auxiliares 
        this.type = "";
        this.nameF = "";
        this.auxParams = "";
        this.declarationValue = "";
        this.callF = "";
        this.ifElseCondition = "";
        this.idFor = "";
        this.auxPrint = "";
        this.auxDecorInc = "";
        this.idError = this.errorList.toArray().length;
        //Banderas para la gramatica
        this.flagFunction = false;
        this.flagMethod = false;
        //Traductor donde convierte de java a python 
        this.traductor = new Translater();
        //Preanalisis para el sintactico 
        this.preanalisis = tokens.toArray()[this.counter];
        //Token Final (EOF)
        this.tokens.append(new Token(this.tokens.toArray().length + 1, "$", "TK_EOF", 0, 0));
        //Inicia la gramatica para el ast xd 
        this.nodo1 = new Nodo("START");
        //Inicia Parea
        this.Start(this.nodo1);
        //Finaliza Parea
        this.Parea("TK_EOF");
        //el arbol toma los valores del nodo1 
        this.ast = this.nodo1;
        //eliminamos el token EOF para volver a la normalidad nuestra ista de tokens 
        this.tokens.delete(this.counter);
        console.log('Analisis Sintactico y Traduccion terminados.....');
    }

    AddFuntionOrMethod(Node) {
        if (this.flagFunction) {
            Node.setValue("SentencesListFunction")
            this.SentencesListFunction(Node);
        } else if (this.flagMethod) {
            Node.setValue("SentencesListMethod")
            this.SentencesListMethod(Node);
        }
        if (this.looplist.toArray().length > 0) {
            Node.setValue("SentencesListLoop")
            this.SentencesListLoop(Node);
        }
    }

    addThings() {
        if (this.preanalisis.getType === "TK_AND") {
            this.declarationValue += " and ";
            this.impressionList.append("and");
            this.ifElseCondition += " and ";
        } else if (this.preanalisis.getType === "TK_OR") {
            this.declarationValue += " or ";
            this.impressionList.append(" or ");
            this.ifElseCondition += " or ";
        } else if (this.preanalisis.getType === "TK_XOR") {
            this.declarationValue += "xor";
            this.impressionList.append("xor");
            this.ifElseCondition += "xor";
        } else if (this.preanalisis.getType === "TK_NOT") {
            this.declarationValue += " not ";
            this.impressionList.append(" not ");
            this.ifElseCondition += " not ";
        } else if (this.preanalisis.getType === "TK_CADENA") {
            let cadena = this.preanalisis.getLexema.replace(/\\/, "");
            this.declarationValue += cadena;
            this.impressionList.append(cadena);
            this.ifElseCondition += cadena;
        } else if (this.preanalisis.getType === "TK_PARENTESISA") {
            this.declarationValue += this.preanalisis.getLexema;
            this.impressionList.append(this.preanalisis.getLexema);
            this.ifElseCondition += this.preanalisis.getLexema;
        } else {
            this.declarationValue += this.preanalisis.getLexema;
            this.impressionList.append(" " + this.preanalisis.getLexema);
            this.ifElseCondition += " " + this.preanalisis.getLexema;
        }

    }

    Start(Node) {
        this.errorList.deleteAll();
        this.looplist.deleteAll();
        this.tabs = 0;
        this.PassComments();
        let node1 = new Nodo("Program")
        this.Program(node1);
        Node.addChilds(node1);
    }
    Program(Node) {
        if (this.preanalisis.getType === "TK_PUBLIC") {
            this.PassComments();
            let tk = this.preanalisis.getLexema;

            let node1 = new Nodo("ListCOrI")


            this.Parea("TK_PUBLIC");
            this.ClassOrNoOrInterfaz(node1);

            let node2 = new Nodo("Program");
            this.Program(node2);

            Node.addChilds(new Nodo(tk));
            Node.addChilds(node1);
            Node.addChilds(node2);
        } else {
            //Epsilon
        }
    }

    ClassOrNoOrInterfaz(Node) {
        if (this.preanalisis.getType === "TK_CLASS") {
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_CLASS");

            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_ID");

            let tk3 = this.preanalisis.getLexema;
            this.Parea("TK_LLAVEA");

            this.traductor.ClassOrInterfaz(tk2, this.tabs)

            let node1 = new Nodo("contentClass");
            this.contentClass(node1);

            let tk4 = this.preanalisis.getLexema
            this.Parea("TK_LLAVEC")



            Node.addChilds(new Nodo(tk1));
            Node.addChilds(new Nodo(tk2));
            Node.addChilds(new Nodo(tk3));
            Node.addChilds(node1);
            Node.addChilds(new Nodo(tk4));
        } else if (this.preanalisis.getType === "TK_INTERFACE") {
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_INTERFACE");

            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_ID");

            let tk3 = this.preanalisis.getLexema;
            this.Parea("TK_LLAVEA");
            this.traductor.ClassOrInterfaz(tk2, this.tabs);
            let node1 = new Nodo("contentInterfaz");
            this.contentInterfaz(node1);

            let tk4 = this.preanalisis.getLexema;
            this.Parea("TK_LLAVEC");
            this.tabs--;


            Node.addChilds(new Nodo(tk1));
            Node.addChilds(new Nodo(tk2));
            Node.addChilds(new Nodo(tk3));
            Node.addChilds(node1)
            Node.addChilds(new Nodo(tk4));
        } else {
            this.Parea("Class Or Interface");
        }
    }

    contentClass(Node) {

        if (this.preanalisis.getType === "TK_PUBLIC") {
            this.tabs++;
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_PUBLIC");

            let node1 = new Nodo("Content");
            this.Content(node1);

            let node2 = new Nodo("contentClass");
            this.contentClass(node2);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
            Node.addChilds(node2);
        } else if (this.preanalisis.getType === "TK_INT" || this.preanalisis.getType === "TK_DOUBLE" || this.preanalisis.getType === "TK_STRING" ||
            this.preanalisis.getType === "TK_CHAR" || this.preanalisis.getType === "TK_BOOLEAN") {
            this.tabs++;
            this.type = this.preanalisis.getLexema;
            let node1 = new Nodo("Type");
            this.Type(node1);

            this.idsDeclaration.deleteAll();
            this.idsDeclaration.append(this.preanalisis.getLexema);
            this.nameF = this.preanalisis.getLexema;
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_ID");

            let node2 = new Nodo("FunctionOrNot");
            this.FunctionOrNot(node2);
            this.tabs--;
            let node3 = new Nodo("contentClass");
            this.contentClass(node3);

            Node.addChilds(node1);
            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node2);
            Node.addChilds(node3);
        } else {
            //Epsilon
        }
    }


    Content(Node) {
        if (this.preanalisis.getType === "TK_INT" || this.preanalisis.getType === "TK_DOUBLE" || this.preanalisis.getType === "TK_STRING" ||
            this.preanalisis.getType === "TK_CHAR" || this.preanalisis.getType === "TK_BOOLEAN") {
            this.type = this.preanalisis.getLexema;
            let node1 = new Nodo("Type");
            this.Type(node1);

            this.idsDeclaration.deleteAll();
            this.idsDeclaration.append(this.preanalisis.getLexema);
            this.nameF = this.preanalisis.getLexema;
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_ID");

            let node2 = new Nodo("FunctionOrNot");
            this.FunctionOrNot(node2);
            this.tabs--;
            Node.addChilds(node1);
            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node2);

        } else if (this.preanalisis.getType === "TK_STATIC") {
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_STATIC");

            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_VOID");

            let node1 = new Nodo("MainOrNot");
            this.MainOrNot(node1);

            this.tabs--;

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(new Nodo(tk2));
            Node.addChilds(node1);
        } else if (this.preanalisis.getType === "TK_VOID") {
            let tk1 = this.preanalisis.getLexema;
            this.Parea('TK_VOID');
            let node1 = new Nodo('MainOrNot');
            this.MainOrNot(node1);
            this.tabs--;
            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else {
            //Epsilon 
        }

    }

    FunctionOrNot(Node) {
        if (this.preanalisis.getType === "TK_PARENTESISA") {
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISA");
            this.auxParams = "";

            let node1 = new Nodo("Params");
            this.Params(node1);

            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISC");

            let tk3 = this.preanalisis.getLexema;
            this.Parea("TK_LLAVEA");

            this.traductor.MFunc(this.nameF, this.auxParams, this.tabs);


            this.flagFunction = true;
            let node2 = new Nodo("SentenceList");
            this.SentenceList(node2);

            let node3 = new Nodo("SentencesListFunction");
            this.SentencesListFunction(node3);

            this.flagFunction = false;

            this.tabs--;
            let tk4 = this.preanalisis.getLexema;
            this.Parea("TK_LLAVEC");

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
            Node.addChilds(new Nodo(tk2));
            Node.addChilds(new Nodo(tk3));
            Node.addChilds(node2);
            Node.addChilds(node3);
            Node.addChilds(new Nodo(tk4));
        } else {
            let node1 = new Nodo("IdList");
            this.IdList(node1);

            let node2 = new Nodo("OptAssignment");
            this.OptAssignment(node2);

            for (const variable of this.idsDeclaration.toArray()) {
                let auxVar = "var " + variable
                this.traductor.DeclarationOrAssigVariable(auxVar, this.declarationValue, this.tabs, "TK_IGUAL");
            }

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_PUNTOCOMA");

            Node.addChilds(node1);
            Node.addChilds(node2);
            Node.addChilds(new Nodo(tk1));
        }
    }

    MainOrNot(Node) {
        if (this.preanalisis.getType === "TK_MAIN") {
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_MAIN");

            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISA");

            let node1 = new Nodo("ARGS");
            this.ARGS(node1);

            let tk3 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISC");

            let tk4 = this.preanalisis.getLexema;
            this.Parea("TK_LLAVEA");

            this.traductor.BeginMain(this.tabs);


            let node2 = new Nodo("SentenceList");
            this.SentenceList(node2);
            let auxMain = this.tabs - 1
            this.traductor.endMain(auxMain);

            let tk5 = this.preanalisis.getLexema;
            this.Parea("TK_LLAVEC");
            this.tabs--;
            console.log(this.tabs);
            Node.addChilds(new Nodo(tk1));
            Node.addChilds(new Nodo(tk2));
            Node.addChilds(node1);
            Node.addChilds(new Nodo(tk3));
            Node.addChilds(new Nodo(tk4));
            Node.addChilds(node2);
            Node.addChilds(new Nodo(tk5));

        } else {
            let auxId = this.preanalisis.getLexema;
            this.Parea("TK_ID");

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISA");

            this.auxParams = "";
            let node1 = new Nodo("Params")
            this.Params(node1);

            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISC");

            let tk3 = this.preanalisis.getLexema;
            this.Parea("TK_LLAVEA");

            this.traductor.MFunc(auxId, this.auxParams, this.tabs);

            this.flagMethod = true;

            let node2 = new Nodo("SentenceList");
            this.SentenceList(node2);

            let node3 = new Nodo("SentencesListMethod");
            this.SentencesListMethod(node3);
            this.flagMethod = false;

            let tk4 = this.preanalisis.getLexema;
            this.Parea("TK_LLAVEC")
            this.tabs--;
            Node.addChilds(new Nodo(auxId));
            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
            Node.addChilds(new Nodo(tk2));
            Node.addChilds(new Nodo(tk3));
            Node.addChilds(node2);
            Node.addChilds(node3);
            Node.addChilds(new Nodo(tk4));
        }
    }

    SentencesListMethod(Node) {
        if (this.preanalisis.getType === "TK_RETURN") {
            let node1 = new Nodo("ReturnMethod");
            this.ReturnMethod(node1);

            this.tabs--;

            let node2 = new Nodo("SentenceList");
            this.SentenceList(node2);

            let node3 = new Nodo("SentencesListMethod");
            this.SentencesListMethod(node3);

            Node.addChilds(node1);
            Node.addChilds(node2);
            Node.addChilds(node3);
        } else {
            //Epsilon
        }
    }

    ReturnMethod(Node) {
        let tk1 = this.preanalisis.getLexema;
        this.Parea("TK_RETURN");

        this.traductor.Return("", this.tabs);

        let tk2 = this.preanalisis.getLexema;
        this.Parea("TK_PUNTOCOMA");

        Node.addChilds(new Nodo(tk1));
        Node.addChilds(new Nodo(tk2));
    }

    ARGS(Node) {
        if (this.preanalisis.getType === "TK_STRING") {
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_STRING");

            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_CORA");

            let tk3 = this.preanalisis.getLexema;
            this.Parea("TK_CORC");

            let tk4 = this.preanalisis.getLexema;
            this.Parea("TK_ID");

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(new Nodo(tk2));
            Node.addChilds(new Nodo(tk3));
            Node.addChilds(new Nodo(tk4));
        } else {
            //epsilon
        }
    }
    SentencesListFunction(Node) {
        if (this.preanalisis.getType === "TK_RETURN") {
            this.declarationValue = "";
            let node1 = new Nodo("ReturnFunction");
            this.ReturnFunction(node1);
            this.traductor.Return(this.declarationValue, this.tabs);
            this.tabs--;
            let node2 = new Nodo("SentenceList");
            this.SentenceList(node2);
            let node3 = new Nodo("SentencesListFunction");
            this.SentencesListFunction(node3);
            Node.addChilds(node1);
            Node.addChilds(node2);
            Node.addChilds(node3);
        } else {
            //Epsilon
        }
    }

    ReturnFunction(Node) {
        let tk1 = this.preanalisis.getLexema;
        this.Parea("TK_RETURN");

        let node1 = new Nodo("Expression");
        this.Expression(node1);

        let tk2 = this.preanalisis.getLexema;
        this.Parea("TK_PUNTOCOMA");

        Node.addChilds(new Nodo(tk1));
        Node.addChilds(node1);
        Node.addChilds(new Nodo(tk2));
    }

    SentencesListLoop(Node) {
        if (this.preanalisis.getType === "TK_CONTINUE") {
            this.traductor.Continue(this.tabs);

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_CONTINUE")

            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_PUNTOCOMA");

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(new Nodo(tk2));
        } else if (this.preanalisis.getType === "TK_BREAK") {
            this.traductor.Break(this.tabs);

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_BREAK");

            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_PUNTOCOMA");

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(new Nodo(tk2));
        } else {
            //Epsilon
        }
    }

    Type(Node) {
        if (this.preanalisis.getType === "TK_INT") {
            let tk = this.preanalisis.getLexema;
            this.declarationValue = "0";
            this.Parea("TK_INT");
            Node.addChilds(new Nodo(tk));
        } else if (this.preanalisis.getType === "TK_DOUBLE") {
            let tk = this.preanalisis.getLexema;
            this.declarationValue = "0.0";
            this.Parea("TK_DOUBLE");
            Node.addChilds(new Nodo(tk));
        } else if (this.preanalisis.getType === "TK_STRING") {
            let tk = this.preanalisis.getLexema;
            this.declarationValue = '""';
            this.Parea("TK_STRING");
            Node.addChilds(new Nodo(tk));
        } else if (this.preanalisis.getType === "TK_CHAR") {
            let tk = this.preanalisis.getLexema;
            this.declarationValue = "''";
            this.Parea("TK_CHAR");
            Node.addChilds(new Nodo(tk));
        } else if (this.preanalisis.getType === "TK_BOOLEAN") {
            let tk = this.preanalisis.getLexema;
            this.declarationValue = "false";
            this.Parea("TK_BOOLEAN");
            Node.addChilds(new Nodo(tk));
        } else {
            this.Parea("Type_Of_Variable");
        }
    }

    Params(Node) {
        if (this.preanalisis.getType === "TK_INT" || this.preanalisis.getType === "TK_DOUBLE" || this.preanalisis.getType === "TK_STRING" ||
            this.preanalisis.getType === "TK_CHAR" || this.preanalisis.getType === "TK_BOOLEAN") {
            let node1 = new Nodo("ParamsDeclaration")
            this.ParamsDeclaration(node1);
            Node.addChilds(node1);
        } else {
            //Epsilon
        }
    }
    ParamsDeclaration(Node) {
        let node1 = new Nodo("Type");
        this.Type(node1);

        this.auxParams += this.preanalisis.getLexema;
        let tk1 = this.preanalisis.getLexema;
        this.Parea("TK_ID");

        let node2 = new Nodo("ParamsList");
        this.ParamsList(node2);

        Node.addChilds(node1);
        Node.addChilds(new Nodo(tk1));
        Node.addChilds(node2);
    }

    ParamsList(Node) {
        if (this.preanalisis.getType === "TK_COMA") {
            this.auxParams += ", ";
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_COMA");

            let node1 = new Nodo("ParamsDeclaration");
            this.ParamsDeclaration(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);

        } else {
            //Epsilon
        }
    }

    SentenceList(Node) {
        this.tabs++;
        if (this.preanalisis.getType === "TK_INT" || this.preanalisis.getType === "TK_DOUBLE" || this.preanalisis.getType === "TK_STRING" ||
            this.preanalisis.getType === "TK_CHAR" || this.preanalisis.getType === "TK_BOOLEAN") {
            let node1 = new Nodo("DeclarationSentence");
            this.DeclarationSentence(node1);

            this.tabs--;

            let node2 = new Nodo("SentenceList");
            this.SentenceList(node2);

            Node.addChilds(node1);
            Node.addChilds(node2);
        } else if (this.preanalisis.getType === "TK_ID") {
            let node1 = new Nodo("AsignmentOrCallSentence");
            this.AsignmentOrCallSentence(node1);

            this.tabs--;

            let node2 = new Nodo("SentenceList");
            this.SentenceList(node2);

            Node.addChilds(node1);
            Node.addChilds(node2);
        } else if (this.preanalisis.getType === "TK_SYSTEM") {
            let node1 = new Nodo("PrintSentence");
            this.PrintSentence(node1);

            this.tabs--;

            let node2 = new Nodo("SentenceList");
            this.SentenceList(node2);

            Node.addChilds(node1);
            Node.addChilds(node2);
        } else if (this.preanalisis.getType === "TK_IF") {
            let node1 = new Nodo("IfElseSentence");
            this.IfElseSentence(node1);

            this.tabs--;

            let node2 = new Nodo("SentenceList");
            this.SentenceList(node2);

            Node.addChilds(node1);
            Node.addChilds(node2);
        } else if (this.preanalisis.getType === "TK_FOR") {
            let node1 = new Nodo("ForSentence");
            this.ForSentence(node1);

            this.tabs--;

            let node2 = new Nodo("SentenceList");
            this.SentenceList(node2);

            Node.addChilds(node1);
            Node.addChilds(node2);
        } else if (this.preanalisis.getType === "TK_WHILE") {
            let node1 = new Nodo("WhileSentence");
            this.WhileSentence(node1);

            this.tabs--;

            let node2 = new Nodo("SentenceList");
            this.SentenceList(node2);

            Node.addChilds(node1);
            Node.addChilds(node2);
        } else if (this.preanalisis.getType === "TK_DO") {
            let node1 = new Nodo("DoWhileSentence");
            this.DoWhileSentence(node1);

            this.tabs--;

            let node2 = new Nodo("SentenceList");
            this.SentenceList(node2);

            Node.addChilds(node1);
            Node.addChilds(node2);
        } else {
            //Epsilon
        }
    }

    DeclarationSentence(Node) {
        this.declarationValue = "";
        this.idsDeclaration.deleteAll();

        this.type = this.preanalisis.getLexema;
        let node1 = new Nodo("Type");
        this.Type(node1);

        let node2 = new Nodo("VariablesDeclaration");
        this.VariablesDeclaration(node2);

        Node.addChilds(node1);
        Node.addChilds(node2);
    }

    VariablesDeclaration(Node) {
        this.idsDeclaration.append(this.preanalisis.getLexema);
        let tk1 = this.preanalisis.getLexema;
        this.Parea("TK_ID");

        let node1 = new Nodo("IdList");
        this.IdList(node1);

        let node2 = new Nodo("OptAssignment");
        this.OptAssignment(node2);

        for (const variable of this.idsDeclaration.toArray()) {
            let auxVariable = "var " + variable;
            this.traductor.DeclarationOrAssigVariable(auxVariable, this.declarationValue, this.tabs, "TK_IGUAL");
        }

        let tk2 = this.preanalisis.getLexema;
        this.Parea("TK_PUNTOCOMA");

        Node.addChilds(new Nodo(tk1));
        Node.addChilds(node1);
        Node.addChilds(node2);
        Node.addChilds(new Nodo(tk2));
    }

    IdList(Node) {
        if (this.preanalisis.getType === "TK_COMA") {
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_COMA");
            this.idsDeclaration.append(this.preanalisis.getLexema);

            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_ID");

            let node1 = new Nodo("IdList");
            this.IdList(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(new Nodo(tk2));
            Node.addChilds(node1);
        } else {
            //Epsilon
        }
    }

    OptAssignment(Node) {
        if (this.preanalisis.getType === "TK_IGUAL") {
            this.declarationValue = "";
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_IGUAL");

            let node1 = new Nodo("Expression");
            this.Expression(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else {
            //Epsilon
        }
    }

    AsignmentOrCallSentence(Node) {
        this.callF = this.preanalisis.getLexema;
        this.declarationValue = "";
        this.idsDeclaration.deleteAll();
        this.idsDeclaration.append(this.preanalisis.getLexema);

        let tk1 = this.preanalisis.getLexema;
        this.Parea("TK_ID");

        let node1 = new Nodo("OptAOrCall");
        this.OptAOrCall(node1);

        let tk2 = this.preanalisis.getLexema;
        this.Parea("TK_PUNTOCOMA");

        Node.addChilds(new Nodo(tk1));
        Node.addChilds(node1);
        Node.addChilds(new Nodo(tk2));

    }

    OptAOrCall(Node) {
        if (this.preanalisis.getType === "TK_IGUAL") {
            let tk1 = this.preanalisis.getLexema;
            let TypeDeclartion = this.preanalisis.getType;
            this.Parea("TK_IGUAL");

            let node1 = new Nodo("Expression");
            this.Expression(node1);

            this.traductor.DeclarationOrAssigVariable(this.idsDeclaration.toArray()[0], this.declarationValue, this.tabs, TypeDeclartion);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else if (this.preanalisis.getType === "TK_DESCONCATENAR") {
            let tk1 = this.preanalisis.getLexema;
            let TypeDeclartion = this.preanalisis.getType;
            this.Parea("TK_DESCONCATENAR");

            let node1 = new Nodo("Expression");
            this.Expression(node1);

            this.traductor.DeclarationOrAssigVariable(this.idsDeclaration.toArray()[0], this.declarationValue, this.tabs, TypeDeclartion);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else if (this.preanalisis.getType === "TK_CONCATENAR") {
            let tk1 = this.preanalisis.getLexema;
            let TypeDeclartion = this.preanalisis.getType;
            this.Parea("TK_CONCATENAR");

            let node1 = new Nodo("Expression");
            this.Expression(node1);

            this.traductor.DeclarationOrAssigVariable(this.idsDeclaration.toArray()[0], this.declarationValue, this.tabs, TypeDeclartion);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else if (this.preanalisis.getType === "TK_DECREMENTO") {
            let tk1 = this.preanalisis.getLexema;
            let TypeDeclartion = this.preanalisis.getType;
            this.Parea("TK_DECREMENTO");


            this.traductor.DeclarationOrAssigVariable(this.idsDeclaration.toArray()[0], this.declarationValue, this.tabs, TypeDeclartion);

            Node.addChilds(new Nodo(tk1));
        } else if (this.preanalisis.getType === "TK_INCREMENTO") {
            let tk1 = this.preanalisis.getLexema;
            let TypeDeclartion = this.preanalisis.getType;
            this.Parea("TK_INCREMENTO");

            this.traductor.DeclarationOrAssigVariable(this.idsDeclaration.toArray()[0], this.declarationValue, this.tabs, TypeDeclartion);

            Node.addChilds(new Nodo(tk1));
        } else if (this.preanalisis.getType === "TK_PARENTESISA") {
            this.callF += this.preanalisis.getLexema;
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISA");

            let node1 = new Nodo("ParameterListCall");
            this.ParameterListCall(node1);

            this.callF += this.declarationValue;
            this.callF += this.preanalisis.getLexema;

            this.traductor.UtilitationFuntion(this.callF, this.tabs);

            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISC");

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
            Node.addChilds(new Nodo(tk2));
        }
    }

    PrintSentence(Node) {
        let tk1 = this.preanalisis.getLexema;
        this.Parea("TK_SYSTEM");

        let tk2 = this.preanalisis.getLexema;
        this.Parea("TK_PUNTO");

        let tk3 = this.preanalisis.getLexema;
        this.Parea("TK_OUT");

        let tk4 = this.preanalisis.getLexema;
        this.Parea("TK_PUNTO");

        let tk5 = "";
        let tk6 = "";
        let node1 = new Nodo("");

        if (this.preanalisis.getType === "TK_PRINTLN") {
            tk5 = this.preanalisis.getLexema;
            this.auxPrint = this.preanalisis.getType;
            this.Parea("TK_PRINTLN");

            tk6 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISA");

            node1 = new Nodo("Impresion");
            this.Impresion(node1);
        } else if (this.preanalisis.getType === "TK_PRINT") {
            tk5 = this.preanalisis.getLexema;
            this.auxPrint = this.preanalisis.getType;
            this.Parea("TK_PRINT");

            tk6 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISA");

            node1 = new Nodo("Impresion");
            this.Impresion(node1);
        }


        let tk7 = this.preanalisis.getLexema;
        this.Parea("TK_PARENTESISC");

        let tk8 = this.preanalisis.getLexema;
        this.Parea("TK_PUNTOCOMA");

        Node.addChilds(new Nodo(tk1));
        Node.addChilds(new Nodo(tk2));
        Node.addChilds(new Nodo(tk3));
        Node.addChilds(new Nodo(tk4));
        Node.addChilds(new Nodo(tk5));
        Node.addChilds(new Nodo(tk6));
        Node.addChilds(node1);
        Node.addChilds(new Nodo(tk7));
        Node.addChilds(new Nodo(tk8));
    }

    Impresion(Node) {
        this.impressionList.deleteAll();
        if (this.preanalisis.getType === "TK_CADENA" || this.preanalisis.getType === "TK_DECIMAL" || this.preanalisis.getType === "TK_NUMEROS" ||
            this.preanalisis.getType === "TK_ID" || this.preanalisis.getType === "TK_FALSE" || this.preanalisis.getType === "TK_TRUE" ||
            this.preanalisis.getType === "TK_PARENTESISA" || this.preanalisis.getType === "TK_NOT") {
            let node1 = new Nodo("Expression");
            this.Expression(node1);

            this.traductor.printWithContent(this.impressionList, this.tabs, this.auxPrint);

            Node.addChilds(node1);
        } else {
            this.traductor.printWithoutContent(this.tabs, this.auxPrint);
        }
    }

    IfElseSentence(Node) {
        this.ifElseCondition = "if ";

        let tk1 = this.preanalisis.getLexema;
        this.Parea("TK_IF");

        let tk2 = this.preanalisis.getLexema;
        this.Parea("TK_PARENTESISA");

        let node1 = new Nodo("Expression");
        this.Expression(node1);

        this.traductor.IF(this.ifElseCondition, this.tabs);

        let tk3 = this.preanalisis.getLexema;
        this.Parea("TK_PARENTESISC");

        let tk4 = this.preanalisis.getLexema;
        this.Parea("TK_LLAVEA");

        let node2 = new Nodo("SentenceList")
        this.SentenceList(node2);

        let node3 = new Nodo("");
        this.AddFuntionOrMethod(node3);

        this.tabs--;

        let tk5 = this.preanalisis.getLexema;
        this.Parea("TK_LLAVEC");

        let node4 = new Nodo("OptElse");
        this.OptElse(node4);

        Node.addChilds(new Nodo(tk1));
        Node.addChilds(new Nodo(tk2));
        Node.addChilds(node1);
        Node.addChilds(new Nodo(tk3));
        Node.addChilds(new Nodo(tk4));
        Node.addChilds(node2);
        Node.addChilds(node3);
        Node.addChilds(new Nodo(tk5));
        Node.addChilds(node4);
    }

    OptElse(Node) {
        if (this.preanalisis.getType === "TK_ELSE") {
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_ELSE");

            let node1 = new Nodo("ElseIfOpt");
            this.ElseIfOpt(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else {
            //Epsilon
        }
    }

    ElseIfOpt(Node) {
        if (this.preanalisis.getType === "TK_LLAVEA") {
            this.ifElseCondition = "else";
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_LLAVEA");

            this.traductor.IF(this.ifElseCondition, this.tabs);

            let node1 = new Nodo("SentenceList");
            this.SentenceList(node1);

            let node2 = new Nodo("");
            this.AddFuntionOrMethod(node2);

            this.tabs--;

            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_LLAVEC");

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
            Node.addChilds(node2);
            Node.addChilds(new Nodo(tk2));
        } else if (this.preanalisis.getType === "TK_IF") {
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_IF");

            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISA");

            this.ifElseCondition = "elif ";

            let node1 = new Nodo("Expression");
            this.Expression(node1);

            let tk3 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISC");

            let tk4 = this.preanalisis.getLexema;
            this.Parea("TK_LLAVEA");

            this.traductor.IF(this.ifElseCondition, this.tabs);

            let node2 = new Nodo("SentenceList");
            this.SentenceList(node2);

            let node3 = new Nodo("");
            this.AddFuntionOrMethod(node3);

            this.tabs--;

            let tk5 = this.preanalisis.getLexema;
            this.Parea("TK_LLAVEC");

            let node4 = new Nodo("OptElse");
            this.OptElse(node4);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(new Nodo(tk2));
            Node.addChilds(node1);
            Node.addChilds(new Nodo(tk3));
            Node.addChilds(new Nodo(tk4));
            Node.addChilds(node2);
            Node.addChilds(node3);
            Node.addChilds(new Nodo(tk5));
            Node.addChilds(node4);
        } else {
            //Error
        }
    }

    ForSentence(Node) {
        let tk1 = this.preanalisis.getLexema;
        this.Parea("TK_FOR");

        let tk2 = this.preanalisis.getLexema;
        this.Parea("TK_PARENTESISA");

        this.idFor = "";

        let node1 = new Nodo("OptType");
        this.OptType(node1);

        this.declarationValue = "";

        let node2 = new Nodo("AssignmentFor");
        this.AssignmentFor(node2);

        let beginWith = this.declarationValue;

        this.declarationValue = "";

        let node3 = new Nodo("Expression");
        this.Expression(node3);

        let flagFor = false;
        let endWith = "";
        for (const char of this.declarationValue) {
            if (flagFor && char != "=") {
                endWith += char;
            }
            if (char === ">" || char === "<" || char === "=") {
                flagFor = true;
            }
        }

        let tk3 = this.preanalisis.getLexema;
        this.Parea("TK_PUNTOCOMA");

        this.declarationValue = "";

        let node4 = new Nodo("Expression");
        this.Expression(node4);

        let node5 = new Nodo("OptIncDec");
        this.OptIncDec(node5);

        let tk4 = this.preanalisis.getLexema;
        this.Parea("TK_PARENTESISC");

        let tk5 = this.preanalisis.getLexema;
        this.Parea("TK_LLAVEA");

        if (this.declarationValue.includes('--')) {
            this.traductor.SFor(this.idFor, beginWith, endWith, this.tabs);
        } else {
            this.traductor.SFor(this.idFor, beginWith, endWith, this.tabs);
        }

        this.looplist.append(1);

        let node6 = new Nodo("SentenceList");
        this.SentenceList(node6)

        let node7 = new Nodo("");
        this.AddFuntionOrMethod(node7);

        let node8 = new Nodo("SentencesListLoop");
        this.SentencesListLoop(node8);

        this.looplist.delete(this.looplist.count);

        this.tabs--;

        let tk6 = this.preanalisis.getLexema;
        this.Parea("TK_LLAVEC");

        Node.addChilds(new Nodo(tk1));
        Node.addChilds(new Nodo(tk2));
        Node.addChilds(node1);
        Node.addChilds(node2);
        Node.addChilds(node3);
        Node.addChilds(new Nodo(tk3));
        Node.addChilds(node4);
        Node.addChilds(node5);
        Node.addChilds(new Nodo(tk4));
        Node.addChilds(new Nodo(tk5));
        Node.addChilds(node6);
        Node.addChilds(node7);
        Node.addChilds(node8);
        Node.addChilds(new Nodo(tk6));
    }

    OptType(Node) {
        if (this.preanalisis.getType === "TK_INT" || this.preanalisis.getType === "TK_DOUBLE" || this.preanalisis.getType === "TK_STRING" ||
            this.preanalisis.getType === "TK_CHAR" || this.preanalisis.getType === "TK_BOOLEAN") {
            let node1 = new Nodo("Type");
            this.Type(node1);
            Node.addChilds(node1);
        } else {
            //Epsilon
        }
    }



    contentInterfaz(Node) {
        this.tabs++;
        if (this.preanalisis.getType === "TK_PUBLIC") {
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_PUBLIC");
            let node1 = new Nodo("FuntionI");
            this.FuntionI(node1)
            let node2 = new Nodo("contentInterfaz");
            this.contentInterfaz(node2);
            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
            Node.addChilds(node2);
        } else {
            //Epsilon
        }
    }

    AssignmentFor(Node) {
        this.idFor = this.preanalisis.getLexema;

        let tk1 = this.preanalisis.getLexema;
        this.Parea("TK_ID");

        let tk2 = this.preanalisis.getLexema;
        this.Parea("TK_IGUAL");

        let node1 = new Nodo("Expression");
        this.Expression(node1);

        let tk3 = this.preanalisis.getLexema;
        this.Parea("TK_PUNTOCOMA");

        Node.addChilds(new Nodo(tk1));
        Node.addChilds(new Nodo(tk2));
        Node.addChilds(node1);
        Node.addChilds(new Nodo(tk3));
    }

    OptIncDec(Node) {
        if (this.preanalisis.getType === "TK_INCREMENTO") {
            this.declarationValue += this.preanalisis.getLexema;
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_INCREMENTO");
            Node.addChilds(new Nodo(tk1));
        } else if (this.preanalisis.getType === "TK_DECREMENTO") {
            this.declarationValue += this.preanalisis.getLexema;
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_DECREMENTO");
            Node.addChilds(new Nodo(tk1));
        } else {
            //Epsilon
        }
    }

    WhileSentence(Node) {
        this.declarationValue = "";
        let tk1 = this.preanalisis.getLexema;
        this.Parea("TK_WHILE");

        let tk2 = this.preanalisis.getLexema;
        this.Parea("TK_PARENTESISA");

        let node1 = new Nodo("Expression");
        this.Expression(node1);

        this.traductor.SWhile(this.declarationValue, this.tabs);

        let tk3 = this.preanalisis.getLexema;
        this.Parea("TK_PARENTESISC");

        let tk4 = this.preanalisis.getLexema;
        this.Parea("TK_LLAVEA");

        this.looplist.append(1);

        let node2 = new Nodo("SentenceList")
        this.SentenceList(node2);

        let node3 = new Nodo("");
        this.AddFuntionOrMethod(node3);

        let node4 = new Nodo("SentencesListLoop");
        this.SentencesListLoop(node4);

        this.looplist.delete(this.looplist.count);

        this.tabs--;

        let tk5 = this.preanalisis.getLexema;
        this.Parea("TK_LLAVEC");

        Node.addChilds(new Nodo(tk1));
        Node.addChilds(new Nodo(tk2));
        Node.addChilds(node1);
        Node.addChilds(new Nodo(tk3));
        Node.addChilds(new Nodo(tk4));
        Node.addChilds(node2);
        Node.addChilds(node3);
        Node.addChilds(node4);
        Node.addChilds(new Nodo(tk5));
    }

    DoWhileSentence(Node) {
        let tk1 = this.preanalisis.getLexema;
        this.Parea("TK_DO");

        let tk2 = this.preanalisis.getLexema;
        this.Parea("TK_LLAVEA");

        this.traductor.BeginDoWhile(this.tabs);

        this.looplist.append(1);

        let node1 = new Nodo("SentenceList");
        this.SentenceList(node1);

        let node2 = new Nodo("");
        this.AddFuntionOrMethod(node2);

        let node3 = new Nodo("");
        this.SentencesListLoop(node3);

        this.tabs--;

        this.looplist.delete(this.looplist.count);

        let tk3 = this.preanalisis.getLexema;
        this.Parea("TK_LLAVEC");

        let tk4 = this.preanalisis.getLexema;
        this.Parea("TK_WHILE");

        let tk5 = this.preanalisis.getLexema;
        this.Parea("TK_PARENTESISA");

        this.declarationValue = "";
        let node4 = new Nodo("Expression");
        this.Expression(node4);

        this.traductor.EOFDoWhile(this.declarationValue, this.tabs);

        let tk6 = this.preanalisis.getLexema;
        this.Parea("TK_PARENTESISC");

        let tk7 = this.preanalisis.getLexema;
        this.Parea("TK_PUNTOCOMA");

        Node.addChilds(new Nodo(tk1));
        Node.addChilds(new Nodo(tk2));
        Node.addChilds(node1);
        Node.addChilds(node2);
        Node.addChilds(node3);
        Node.addChilds(new Nodo(tk3));
        Node.addChilds(new Nodo(tk4));
        Node.addChilds(new Nodo(tk5));
        Node.addChilds(node4);
        Node.addChilds(new Nodo(tk6));
        Node.addChilds(new Nodo(tk7));
    }

    ParameterListCall(Node) {
        if (this.preanalisis.getType === "TK_CADENA" || this.preanalisis.getType === "TK_DECIMAL" || this.preanalisis.getType === "TK_NUMEROS" ||
            this.preanalisis.getType === "TK_ID" || this.preanalisis.getType === "TK_FALSE" || this.preanalisis.getType === "TK_TRUE" ||
            this.preanalisis.getType === "TK_PARENTESISA" || this.preanalisis.getType === "TK_NOT") {
            let node1 = new Nodo("Expression");
            this.Expression(node1);

            let node2 = new Nodo("PList");
            this.PList(node2);

            Node.addChilds(node1);
            Node.addChilds(node2);

        } else {
            //Epsilon
        }
    }

    PList(Node) {
        if (this.preanalisis.getType === "TK_COMA") {
            this.addThings();
            this.declarationValue += " ";

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_COMA");

            let node1 = new Nodo("Expression");
            this.Expression(node1);

            let node2 = new Nodo("PList");
            this.PList(node2);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
            Node.addChilds(node2);
        } else {
            //Epsilon
        }
    }

    Expression(Node) {
        let node1 = new Nodo("OptNot");
        this.OptNot(node1);

        let node2 = new Nodo("E");
        this.E(node2);

        let node3 = new Nodo("OptComparisonSymbol");
        this.OptComparisonSymbol(node3);

        let node4 = new Nodo("AndOrXorOpt");
        this.AndOrXorOpt(node4);

        Node.addChilds(node1);
        Node.addChilds(node2);
        Node.addChilds(node3);
        Node.addChilds(node4);
    }

    OptNot(Node) {
        if (this.preanalisis.getType === "TK_NOT") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_NOT");

            let node1 = new Nodo("OptNot");
            this.OptNot(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else if (this.preanalisis.getType === "TK_MENOS") {
            this.addThings();
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_MENOS");
            let node1 = new Nodo("OptNot");
            this.OptNot(node1);
            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else {
            //Epsilon
        }
    }

    AndOrXorOpt(Node) {
        if (this.preanalisis.getType === "TK_OR") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_OR");

            let node1 = new Nodo("Expression");
            this.Expression(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);

        } else if (this.preanalisis.getType === "TK_AND") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_AND");

            let node1 = new Nodo("Expression");
            this.Expression(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else if (this.preanalisis.getType === "TK_XOR") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_XOR");

            let node1 = new Nodo("Expression");
            this.Expression(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else {
            //Epsilon
        }
    }

    OptComparisonSymbol(Node) {
        if (this.preanalisis.getType === "TK_DISTINTO") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_DISTINTO");

            let node1 = new Nodo("E");
            this.E(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else if (this.preanalisis.getType === "TK_COMPARACION") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_COMPARACION");

            let node1 = new Nodo("E");
            this.E(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else if (this.preanalisis.getType === "TK_MENORIGUAL") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_MENORIGUAL");

            let node1 = new Nodo("E");
            this.E(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else if (this.preanalisis.getType === "TK_MAYORIGUAL") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_MAYORIGUAL");

            let node1 = new Nodo("E");
            this.E(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else if (this.preanalisis.getType === "TK_MAYOR") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_MAYOR");

            let node1 = new Nodo("E");
            this.E(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else if (this.preanalisis.getType === "TK_MENOR") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_MENOR");

            let node1 = new Nodo("E");
            this.E(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else {
            //Epsilon
        }
    }

    E(Node) {
        let node1 = new Nodo("T");
        this.T(node1);

        let node2 = new Nodo("EP");
        this.EP(node2);

        Node.addChilds(node1);
        Node.addChilds(node2);
    }

    EP(Node) {
        if (this.preanalisis.getType === "TK_MAS") {
            this.addThings();
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_MAS");

            let node1 = new Nodo('T');
            this.T(node1);

            let node2 = new Nodo("EP");
            this.EP(node2);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
            Node.addChilds(node2);
        } else if (this.preanalisis.getType === "TK_MENOS") {
            this.addThings();
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_MENOS");

            let node1 = new Nodo('T');
            this.T(node1);

            let node2 = new Nodo("EP");
            this.EP(node2);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
            Node.addChilds(node2);
        } else {
            //Epsilon
        }
    }

    T(Node) {
        let node1 = new Nodo("F");
        this.F(node1);

        let node2 = new Nodo("TP");
        this.TP(node2);

        Node.addChilds(node1);
        Node.addChilds(node2);
    }

    TP(Node) {
        if (this.preanalisis.getType === "TK_DIVISION") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_DIVISION");

            let node1 = new Nodo('F');
            this.F(node1);

            let node2 = new Nodo("TP");
            this.TP(node2);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
            Node.addChilds(node2);
        } else if (this.preanalisis.getType === "TK_PRODUCT") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_PRODUCT");

            let node1 = new Nodo('F');
            this.F(node1);

            let node2 = new Nodo("TP");
            this.TP(node2);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
            Node.addChilds(node2);
        } else if (this.preanalisis.getType === "TK_PORCENTAJE") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_PORCENTAJE");

            let node1 = new Nodo('F');
            this.F(node1);

            let node2 = new Nodo("TP");
            this.TP(node2);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
            Node.addChilds(node2);
        } else {
            //Epsilon
        }
    }

    F(Node) {
        let node1 = new Nodo("OptNot");
        this.OptNot(node1);

        let node2 = new Nodo("FF");
        this.FF(node2);

        Node.addChilds(node1);
        Node.addChilds(node2);
    }

    FF(Node) {
        if (this.preanalisis.getType === "TK_NUMEROS") {
            this.addThings();
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_NUMEROS");
            Node.addChilds(new Nodo(tk1));
        } else if (this.preanalisis.getType === "TK_DECIMAL") {
            this.addThings();
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_DECIMAL");
            Node.addChilds(new Nodo(tk1));
        } else if (this.preanalisis.getType === "TK_CADENA") {
            this.addThings();

            let tk1 = "\\" + this.preanalisis.getLexema;
            //console.log(tk1);
            this.Parea("TK_CADENA");
            Node.addChilds(new Nodo(tk1));
        } else if (this.preanalisis.getType === "TK_CARACTER") {
            this.addThings();
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_CARACTER");
            Node.addChilds(new Nodo(tk1));
        } else if (this.preanalisis.getType === "TK_ID") {
            this.addThings();
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_ID");

            let node1 = new Nodo("OptUseFunction");
            this.OptUseFunction(node1);

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else if (this.preanalisis.getType === "TK_DECREMENTO") {
            let tk1 = this.preanalisis.getLexema;
            this.auxDecorInc = this.preanalisis.getType;
            this.Parea("TK_DECREMENTO");
            let node1 = new Nodo("OptIncOrDecReturn");
            this.OptIncOrDecReturn(node1);
            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else if (this.preanalisis.getType === "TK_INCREMENTO") {
            let tk1 = this.preanalisis.getLexema;
            this.auxDecorInc = this.preanalisis.getType;
            this.Parea("TK_INCREMENTO");
            let node1 = new Nodo("OptIncOrDecReturn");
            this.OptIncOrDecReturn(node1);
            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
        } else if (this.preanalisis.getType === "TK_TRUE") {
            this.addThings();
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_TRUE");
            Node.addChilds(new Nodo(tk1));
        } else if (this.preanalisis.getType === "TK_FALSE") {
            this.addThings();
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_FALSE");
            Node.addChilds(new Nodo(tk1));
        } else if (this.preanalisis.getType === "TK_PARENTESISA") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISA");

            let node1 = new Nodo("Expression");
            this.Expression(node1);

            this.addThings();

            let tk2 = this.preanalisis.getLexema;
            this.Parea('TK_PARENTESISC');

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
            Node.addChilds(new Nodo(tk2));
        } else {
            this.Parea("VALORES");
        }
    }
    OptIncOrDecReturn(Node) {
        if (this.preanalisis.getType === "TK_ID") {
            this.addThings();
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_ID");
            if (this.auxDecorInc === "TK_INCREMENTO") {
                this.declarationValue += " += 1";
            } else if (this.auxDecorInc === "TK_DECREMENTO") {
                this.declarationValue += " -= 1";
            }
            Node.addChilds(new Nodo(tk1));
        } else {
            this.Parea("ID");
        }
    }
    OptUseFunction(Node) {
        if (this.preanalisis.getType === "TK_PARENTESISA") {
            this.addThings();

            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISA");

            let node1 = new Nodo("ParameterListCall");
            this.ParameterListCall(node1);

            this.addThings();

            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISC");

            Node.addChilds(new Nodo(tk1));
            Node.addChilds(node1);
            Node.addChilds(new Nodo(tk2));
        } else if (this.preanalisis.getType === "TK_DECREMENTO") {
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_DECREMENTO");
            this.declarationValue += " += 1";
            Node.addChilds(new Nodo(tk1));
        } else if (this.preanalisis.getType === "TK_INCREMENTO") {
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_INCREMENTO");
            this.declarationValue += " += 1";
            Node.addChilds(new Nodo(tk1));
        } else {
            //Epsilon
        }
    }

    FuntionI(Node) {
        if (this.preanalisis.getType === "TK_INT" || this.preanalisis.getType === "TK_DOUBLE" || this.preanalisis.getType === "TK_STRING" ||
            this.preanalisis.getType === "TK_CHAR" || this.preanalisis.getType === "TK_BOOLEAN") {
            this.type = this.preanalisis.getLexema;
            this.auxParams = "";
            let node1 = new Nodo("Type");
            this.Type(node1);
            // this.idsDeclaration.append(this.preanalisis.getLexema);
            this.nameF = this.preanalisis.getLexema;
            let tk1 = this.preanalisis.getLexema;
            this.Parea("TK_ID");
            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISA");
            let node2 = new Nodo("Params");
            this.Params(node2);
            let tk3 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISC");
            let tk4 = this.preanalisis.getLexema;
            this.Parea("TK_PUNTOCOMA");
            this.traductor.IFunc(this.nameF, this.auxParams, this.tabs);
            this.tabs--;
            Node.addChilds(node1);
            Node.addChilds(new Nodo(tk1));
            Node.addChilds(new Nodo(tk2));
            Node.addChilds(node2);
            Node.addChilds(new Nodo(tk3));
            Node.addChilds(new Nodo(tk4));
        } else if (this.preanalisis.getType === "TK_VOID") {
            let tk1 = this.preanalisis.getLexema;
            this.auxParams = "";
            this.Parea("TK_VOID");
            //this.idsDeclaration.append(this.preanalisis.getLexema);
            this.nameF = this.preanalisis.getLexema;
            let tk2 = this.preanalisis.getLexema;
            this.Parea("TK_ID");
            let tk3 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISA");
            let node1 = new Nodo("Params");
            this.Params(node1);
            let tk4 = this.preanalisis.getLexema;
            this.Parea("TK_PARENTESISC");
            let tk5 = this.preanalisis.getLexema;
            this.Parea("TK_PUNTOCOMA");
            this.traductor.IFunc(this.nameF, this.auxParams, this.tabs);
            this.tabs--;
            Node.addChilds(new Nodo(tk1));
            Node.addChilds(new Nodo(tk2));
            Node.addChilds(new Nodo(tk3));
            Node.addChilds(node1);
            Node.addChilds(new Nodo(tk4));
            Node.addChilds(new Nodo(tk5));
        }
    }


    PassComments() {
        while (this.preanalisis.getType === "TK_COMENTARIO_UNILINEA" || this.preanalisis.getType === "TK_COMENTARIO_MULTILINEA") {
            this.traductor.CommentUAndM(this.preanalisis.getLexema, this.preanalisis.getType, this.tabs);
            this.counter++;
            this.preanalisis = this.tokens.toArray()[this.counter];
        }
    }

    Parea(type) {
        this.PassComments();
        if (this.sError) {
            if (this.counter < this.tokens.toArray().lenght - 1) {
                this.counter++;
                this.preanalisis = this.tokens.toArray()[this.counter];
                if (this.preanalisis.getType === "TK_PUNTOCOMA" || this.preanalisis.getType === "TK_PARENTESISA" ||
                    this.preanalisis.getType === "TK_PARENTESISC" || this.preanalisis.getType === "TK_LLAVEA" ||
                    this.preanalisis.getType === "TK_LLAVEA" || this.preanalisis.getType === "TK_LLAVEC") {

                    this.sError = false;
                }
            }
        } else {
            if (this.preanalisis.getType != type && this.preanalisis.getType != "TK_COMENTARIO_UNILINEA" && this.preanalisis.getType != "TK_COMENTARIO_MULTILINEA") {
                console.log("ERROR SINTACTICO");
                console.log("SE ESPERABA [" + type + "] EN LUGAR DE: [" + this.preanalisis.getType + "] EN LINEA " + this.preanalisis.getRow);
                this.errorList.append(new Error(++this.idError, "SINTACTICO", "Se esperaba [" + type + "] en lugar de: [" + this.preanalisis.getType + "]", this.preanalisis.getColumn, this.preanalisis.getRow))
                this.sError = true;
                this.FError = true;
            }

            if (this.preanalisis.getType != "TK_EOF") {
                if (this.preanalisis.getType != type) {
                    this.sError = true;
                    this.FError = true;
                }
                this.counter++;
                this.preanalisis = this.tokens.toArray()[this.counter];
                this.PassComments();
            }
        }

    }

    get getErrors() {
        return this.ListErrors
    }

}

module.exports = SyntacticAnalyzer;