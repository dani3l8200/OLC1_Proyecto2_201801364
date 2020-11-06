%{
    const Nodo = require("../models/Nodo");
    const Error = require('../models/Error');
    const Token = require('../models/Token');
    const LinkedList = require("../controllers/LinkedList");
    let listTokens = new LinkedList();
    let idError = 1;
    let auxNodo = new Nodo("");
    let traduccion = ""
    let tabs = 0;
    let idToken = 1;
    let counterIF = 1;
    let auxName = "";
    let erroLine = 0;
    let errorColumn = 0;
    let errorList = [];
    module.exports.listTokens = listTokens;
%}
/*Analizador lexico*/
/* lexical grammar */
%lex
%options case-sensitive
comentarioMultilinea        (\/\*[\s\S]*?\*\/|\/\/.*)
identifier              (([a-zA-Z_])[a-zA-Z0-9_]*)
digit                   ([0-9]+)
decimal                 ({digit}("."{digit})?)
charType             ("'")
stringType             ("\"")
character               ({charType}((?:\\("n"|"t"|"r"|"\\"|"\""|"\'")|(?:(?!{charType}).))?){charType})
stringContent           ({stringType}((?:\\{stringType}|(?:(?!{stringType}).))*){stringType})

%%
\s+                     /* skip whitespace */
{comentarioMultilinea}    {listTokens.append(new Token(idToken,"commentMultilineaOrUnilinea",yytext,yylloc.first_line,yylloc.first_column)); idToken++; traduccion +=  yytext + "\n";}

"{"                     {listTokens.append(new Token(idToken,"SYM_LLAVEA",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '{';}
"}"                     {listTokens.append(new Token(idToken,"SYM_LLAVEC",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '}';}
"("                     {listTokens.append(new Token(idToken,"SYM_PARA",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '(';}
")"                     {listTokens.append(new Token(idToken,"SYM_PARC",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return ')';}
","                     {listTokens.append(new Token(idToken,"SYM_COMA",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return ',';}
"."                     {listTokens.append(new Token(idToken,"SYM_PUNTO",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '.';}
":"                     {listTokens.append(new Token(idToken,"SYM_DOSPUNTOS",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return ':';}
";"                     {listTokens.append(new Token(idToken,"SYM_PUNTOCOMA",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return ';';}
"["                     {listTokens.append(new Token(idToken,"SYM_CORCHA",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '[';}
"]"                     {listTokens.append(new Token(idToken,"SYM_CORCHC",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return ']';}

"boolean"               {listTokens.append(new Token(idToken,"BOOLEAN",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'boolean';}
"break"                 {listTokens.append(new Token(idToken,"BREAK",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'break';}
"char"                  {listTokens.append(new Token(idToken,"CHAR",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'char';}
"class"                 {listTokens.append(new Token(idToken,"CLASS",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'class';}
"continue"              {listTokens.append(new Token(idToken,"CONTINUE",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'continue';}
"do"                    {listTokens.append(new Token(idToken,"DO",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'do';}
"double"                {listTokens.append(new Token(idToken,"DOUBLE",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'double';}
"else"                  {listTokens.append(new Token(idToken,"ELSE",yytext,yylloc.first_line,yylloc.first_column)); idToken++;  return 'else';}
"false"                 {listTokens.append(new Token(idToken,"FALSE",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'false';}
"for"                   {listTokens.append(new Token(idToken,"FOR",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'for';}
"if"                    {listTokens.append(new Token(idToken,"IF",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'if';}
"int"                   {listTokens.append(new Token(idToken,"INT",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'int';}
"out"                   {listTokens.append(new Token(idToken,"OUT",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'out';}
"System.out.print"      {listTokens.append(new Token(idToken,"PRINT",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'print';}
"System.out.println"    {listTokens.append(new Token(idToken,"PRINTLN",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'println';}
"return"                {listTokens.append(new Token(idToken,"RETURN",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'return';}
"String"                {listTokens.append(new Token(idToken,"STRING",yytext,yylloc.first_line,yylloc.first_column)); idToken++;  return 'String';}
"System"                {listTokens.append(new Token(idToken,"SYSTEM",yytext,yylloc.first_line,yylloc.first_column)); idToken++;  return 'System';}
"true"                  {listTokens.append(new Token(idToken,"TRUE",yytext,yylloc.first_line,yylloc.first_column)); idToken++;  return 'true';}
"void"                  {listTokens.append(new Token(idToken,"VOID",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'void';}
"while"                 {listTokens.append(new Token(idToken,"WHILE",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'while';}
"public"                {listTokens.append(new Token(idToken,"PUBLIC",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'public';}
"interface"             {listTokens.append(new Token(idToken,"INTERFACE",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'interface';}
'main'                  {listTokens.append(new Token(idToken,"MAIN",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'main';}
'static'                {listTokens.append(new Token(idToken,"STATIC",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'static';}

"<="                    {listTokens.append(new Token(idToken,"OP_MENORIGUAL",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '<=';}
"+="                    {listTokens.append(new Token(idToken,"OP_CONCAT",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '+=';}
"-="                    {listTokens.append(new Token(idToken,"OP_DESCONCAT",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '-=';}
"<"                     {listTokens.append(new Token(idToken,"OP_MENOR",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '<';}
"=="                    {listTokens.append(new Token(idToken,"OP_COMPARACION",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '==';}
">="                    {listTokens.append(new Token(idToken,"OP_MAYORIGUAL",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '>=';}
">"                     {listTokens.append(new Token(idToken,"OP_MAYOR",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '>';}
"!="                    {listTokens.append(new Token(idToken,"OP_DISTINTO",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '!=';}
"||"                    {listTokens.append(new Token(idToken,"OP_OR",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '||';}
"&&"                    {listTokens.append(new Token(idToken,"OP_AND",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '&&';}
"!"                     {listTokens.append(new Token(idToken,"OP_NOT",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '!';}
"="                     {listTokens.append(new Token(idToken,"OP_IGUAL",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '=';}
"++"                    {listTokens.append(new Token(idToken,"INCREMENTO",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '++';}
"+"                     {listTokens.append(new Token(idToken,"MAS",yytext,yylloc.first_line,yylloc.first_column)); idToken++;  return '+';}
"--"                    {listTokens.append(new Token(idToken,"DECREMENTO",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '--';}
"-"                     {listTokens.append(new Token(idToken,"MENOS",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '-';}
"*"                     {listTokens.append(new Token(idToken,"PRODUCTO",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '*';}
"/"                     {listTokens.append(new Token(idToken,"DIVISION",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '/';}
"^"                     {listTokens.append(new Token(idToken,"OP_XOR",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '^';}
"%"                     {listTokens.append(new Token(idToken,"PORCENTAJE",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return '%';}
{identifier}            {listTokens.append(new Token(idToken,"ID",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'identifier';}
{decimal}               {listTokens.append(new Token(idToken,"DECIMAL",yytext,yylloc.first_line,yylloc.first_column)); idToken++; return 'decimal';}
{character}             { yytext = yytext.substr(1,yyleng-2); listTokens.append(new Token(idToken,"CONT_CHAR",yytext,yylloc.first_line,yylloc.first_column)); idToken++;  return 'character'; }
{stringContent}         { yytext = yytext.substr(1,yyleng-2); listTokens.append(new Token(idToken,"CONT_STRING",yytext,yylloc.first_line,yylloc.first_column)); idToken++;  return 'stringContent'; }
<<EOF>>                 return 'EOF';

.                       { errorList.push(new Error(idError, 'Lexical Error', yylloc.first_line, yylloc.first_column, 'Unknown pattern: ' + yytext)); console.error('Lexical Error: ' + yytext + ' in the line ' + yylloc.first_line + ' and column ' + yylloc.first_column); idError++; }
/lex

/* operator associations and precedence */
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/' '%'
%left '^'
%right '!'
%left UMINUS
%right '++' '--'

%start START
%% /* language grammar */

START : ListsClass 'EOF'  { if (errorList.length > 0) { let eL = []; eL = eL.concat(errorList); errorList = []; idError = 0; return [eL]}else {$$ = new Nodo('Start'); $$.addChildrens($1); $$.traduccion += $1.traduccion; traduccion += $$.traduccion; let auxTraduccion = traduccion; traduccion = ""; auxNodo = $$; $$ = new Nodo(""); idToken = 0;  return [auxNodo,auxTraduccion,listTokens];}   }    
      | 'EOF'
      | error  { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + "  " +' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + "  " +' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }                
      ;

ListsClass: ListsClass CLASSESORINTERFACE {$$ = new Nodo('ListsClass'); $$.addChildrens($1); $$.addChildrens($2); $$.traduccion += $1.traduccion  + $2.traduccion;}
          | CLASSESORINTERFACE { $$ = new Nodo('ListsClass'); $$.addChildrens($1); $$.traduccion +=  $1.traduccion;}
          ;

CLASSESORINTERFACE: 'public' 'class' 'identifier' '{' BODYC '}'  {$$ = new Nodo('CLASSESORINTERFACE'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2)); $$.addChildrens(new Nodo($3)); $$.addChildrens(new Nodo($4));
                                                                    $$.addChildrens($5); $$.addChildrens(new Nodo($6));
                                                                    $$.traduccion += $2 + " " + $3 + " " + $4 + "\n" + $$.insertTabsInText(1) + "constructor() {}\n\n"
                                                                     + $5.traduccion + "\n"+ $6 + "\n";}
        | 'public' 'interface' 'identifier' '{' BODYI '}' { $$ = new Nodo('CLASSESORINTERFACE'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2)); 
                                                            $$.addChildrens(new Nodo($3)); $$.addChildrens(new Nodo($4)); $$.addChildrens($5);
                                                            $$.addChildrens(new Nodo($6));}

        | 'public' 'class' 'identifier' '{' '}' {$$ = new Nodo('CLASSESORINTERFACE'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2)); 
                                                 $$.addChildrens(new Nodo($3)); $$.addChildrens(new Nodo($4)); $$.addChildrens(new Nodo($5)); 
                                                 $$.traduccion += $2 + " " + $3 + " " + $4 + "\n" + $$.insertTabsInText(1) + "constructor() {}\n\n" + " " + $5;}
        | 'public' 'interface' 'identifier' '{' '}' {$$ = new Nodo('CLASSESORINTERFACE'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2)); $$.addChildrens(new Nodo($3)); $$.addChildrens(new Nodo($4)); $$.addChildrens(new Nodo($5)); }
        | 'public' 'class' error '{' BODYC '}'         { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + "  " +' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + "  " +' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; } 
        | 'public' 'interface' error '{' BODYC '}'         { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + "  " +' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + "  " +' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; } 
        | error ERROR        { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + "  " +' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + "  " +' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; } 
        ; 

BODYI :  BODYI METHODI {$$ = new Nodo('BODYI'); $$.addChildrens($1); $$.addChildrens($2);}
      | METHODI {$$ = new Nodo('BODYI'); $$.addChildrens($1);}
      | error ERROR  { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + "  " +' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + "  " +' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; } 
;

METHODI : 'public' 'void'  'identifier'  '(' ')' ';' {$$ = new Nodo('METHODI'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2)); $$.addChildrens(new Nodo($3));
                                                      $$.addChildrens(new Nodo($4)); $$.addChildrens(new Nodo($5)); $$.addChildrens(new Nodo($6)); }

        | 'public' TYPE 'identifier' '(' ')' ';' {$$ = new Nodo('METHODI'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2); 
                                                  $$.addChildrens(new Nodo($3)); $$.addChildrens(new Nodo($4)); $$.addChildrens(new Nodo($5)); 
                                                  $$.addChildrens(new Nodo($6));}

        | 'public' TYPE 'identifier' '(' PARAMS ')' ';' {$$ = new Nodo('METHODI'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2); $$.addChildrens(new Nodo($3));
                                                        $$.addChildrens(new Nodo($4)); $$.addChildrens($5); $$.addChildrens(new Nodo($6));
                                                        $$.addChildrens(new Nodo($7));}
                                                         
        | 'public' 'void' 'identifier' '(' PARAMS ')' ';'  {$$ = new Nodo('METHODI'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2)); $$.addChildrens(new Nodo($3)); $$.addChildrens(new Nodo($4));
                                                            $$.addChildrens($5); $$.addChildrens(new Nodo($6)); $$.addChildrens(new Nodo($7));}

        | 'void' error   { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + "  " +' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + "  " +' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; } 
;

BODYC : BODYC METHODC {$$ = new Nodo('BODYC'); $$.addChildrens($1); $$.addChildrens($2); $$.traduccion += $1.traduccion +  $2.traduccion;}
      | BODYC DECLARATION {$$ = new Nodo('BODYC'); $$.addChildrens($1); $$.addChildrens($2);  $$.traduccion +=  $1.traduccion  + $2.traduccion;}
      | BODYC MAIN {$$ = new Nodo('BODYC'); $$.addChildrens($1); $$.addChildrens($2); $$.traduccion +=  $1.traduccion  + $2.traduccion;}
      | DECLARATION {$$ = new Nodo('BODYC'); $$.addChildrens($1); $$.traduccion += $1.traduccion; }
      | METHODC {$$ = new Nodo('BODYC'); $$.addChildrens($1); $$.traduccion += $1.traduccion; }
      | MAIN  {$$ = new Nodo('BODYC'); $$.addChildrens($1); $$.traduccion += $1.traduccion;}
      | error ERROR  { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + "  " +' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + "  " +' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; } 

;

MAIN : 'public' 'static' 'void' 'main'  '(' 'String' '[' ']' 'identifier' ')' BODY {$$ = new Nodo('MAIN'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2));
                                                                                    $$.addChildrens(new Nodo($3)); $$.addChildrens(new Nodo($4)); $$.addChildrens(new Nodo($5)); 
                                                                                    $$.addChildrens(new Nodo($6)); $$.addChildrens(new Nodo($7)); $$.addChildrens(new Nodo($8)); 
                                                                                    $$.addChildrens(new Nodo($9)); $$.addChildrens(new Nodo($10)); $$.addChildrens($11);
                                                                                    $$.traduccion += "function " + $4 + $5 + $6 + $7 + $8 + $9 + $10 + " " + $11.traduccion;}

     | 'public' 'static' 'void' 'main'  '('  ')' BODY {$$ = new Nodo('MAIN'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2)); 
                                                       $$.addChildrens(new Nodo($3)); $$.addChildrens(new Nodo($4)); $$.addChildrens(new Nodo($5));
                                                        $$.addChildrens(new Nodo($6)); $$.addChildrens($7); $$.traduccion += "function " +  $4 + $5 + $6+  " " + $7.traduccion;}

     | 'static' error  { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext)); console.error('Syntactic error: ' + yytext  + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
;

METHODC : 'public' 'void'  'identifier'  '(' ')' BODY {$$ = new Nodo('METHODC');$$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2)); $$.addChildrens(new Nodo($3));
                                                      $$.addChildrens(new Nodo($4)); $$.addChildrens(new Nodo($5)); $$.addChildrens($6); 
                                                      $$.traduccion +=  $$.insertTabsInText(1) + "function " + $3 + $4 + $5 + " " + $6.traduccion;}

        | 'public' TYPE 'identifier' '(' ')'  BODY {$$ = new Nodo('METHODC'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2); $$.addChildrens(new Nodo($3)); $$.addChildrens(new Nodo($4));
                                                    $$.addChildrens(new Nodo($5)); $$.addChildrens($6);
                                                    $$.traduccion += $$.insertTabsInText(1) + "function " + $3 + $4 + $5 + " " + $6.traduccion;}
        
        | 'public' 'void' 'identifier' '(' PARAMS ')' BODY  {$$ = new Nodo('METHODC'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2)); $$.addChildrens(new Nodo($3)); 
                                                             $$.addChildrens(new Nodo($4)); $$.addChildrens($5); $$.addChildrens(new Nodo($6)); $$.addChildrens($7); 
                                                             $$.traduccion +=  $$.insertTabsInText(1) + "function " + $3 + " " + $4 + " " + $5.traduccion + " " + $6 + " " + $7.traduccion;}

        | 'public' TYPE 'identifier' '(' PARAMS ')' BODY  {$$ = new Nodo('METHODC'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2); $$.addChildrens(new Nodo($3)); $$.addChildrens(new Nodo($4));
                                                           $$.addChildrens($5); $$.addChildrens(new Nodo($6)); $$.addChildrens($7); 
                                                           $$.traduccion += $$.insertTabsInText(1) + "function " + $3 + " " + $4 + " " + $5.traduccion + " " + $6 + " " + $7.traduccion; }

        | 'void' error   { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + "  " +' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + "  " +' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; } 
;

TYPE : 'int' {$$ = new Nodo('TYPE'); $$.addChildrens(new Nodo($1)); $$.traduccion += 'var ';}
     | 'double' {$$ = new Nodo('TYPE'); $$.addChildrens(new Nodo($1)); $$.traduccion += 'var ';}
     | 'boolean' {$$ = new Nodo('TYPE'); $$.addChildrens(new Nodo($1)); $$.traduccion += 'var ';}
     | 'char' {$$ = new Nodo('TYPE'); $$.addChildrens(new Nodo($1)); $$.traduccion += 'var ';}
     | 'String'  {$$ = new Nodo('TYPE'); $$.addChildrens(new Nodo($1)); $$.traduccion += 'var ';}
     ;
PARAMS : PARAMS ',' PARAM {$$ = new Nodo('PARAMS'); $$.addChildrens($1); $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                           $$.traduccion += $1.traduccion + $2  +  $3.traduccion;}

       | PARAM {$$ = new Nodo('PARAMS'); $$.addChildrens($1); $$.traduccion += $1.traduccion;}
;

PARAM : TYPE 'identifier' {$$ = new Nodo('PARAM'); $$.addChildrens($1); $$.addChildrens(new Nodo($2)); $$.traduccion += $2}
      | error  { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + "  " +' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + "  " +' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; } 
      ;

BODY : '{' '}' {$$ = new Nodo('BODY'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2));
                $$.traduccion += $1 + "\n\n"  + $2 + "\n";}

     | '{' SENTENCES '}' {$$ = new Nodo('BODY'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2); $$.addChildrens(new Nodo($3));
                         $$.traduccion += $1 + "\n\n" + $2.traduccion + $$.insertTabsInText(1) + $3 + "\n\n";}

     | error  { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + "  " +' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + "  " +' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; } 
    ;

SENTENCES :  SENTENCES SENTENCE {$$ = new Nodo('SENTENCES'); $$.addChildrens($1); $$.addChildrens($2);
                                 $$.traduccion += $1.traduccion  + $2.traduccion;}
          |  SENTENCE {$$ = new Nodo('SENTENCES'); $$.addChildrens($1);  $$.traduccion +=  $1.traduccion;}
;     

SENTENCE : DECLARATION {$$ = new Nodo('SENTENCE'); $$.addChildrens($1);
                        tabs += 2; 
                        $$.traduccion += $1.insertTabsInText(tabs) + $1.traduccion; tabs -= 2;}
         | ASSIGMENT {$$ = new Nodo('SENTENCE'); $$.addChildrens($1); tabs+=2; $$.traduccion += $1.insertTabsInText(tabs) + $1.traduccion; tabs -= 2;}
         | CALLMETHOD ';' {$$ = new Nodo('SENTENCE'); $$.addChildrens($1); $$.addChildrens(new Nodo($2)); tabs+=2; $$.traduccion += $1.insertTabsInText(tabs) + $1.traduccion + $2; tabs -= 2;}
         | PRINTS {$$ = new Nodo('SENTENCE'); $$.addChildrens($1);tabs+=2; $$.traduccion += $1.insertTabsInText(tabs) + $1.traduccion; tabs -= 2;}
         | IFS {$$ = new Nodo('SENTENCE'); $$.addChildrens($1); tabs+=2; $$.traduccion += $1.insertTabsInText(tabs) + $1.traduccion; tabs -= 2;}
         | FOR {$$ = new Nodo('SENTENCE'); $$.addChildrens($1); tabs+=2; $$.traduccion += $1.insertTabsInText(tabs) + $1.traduccion; tabs -= 2;}
         | WHILE {$$ = new Nodo('SENTENCE'); $$.addChildrens($1); tabs+=2; $$.traduccion += $1.insertTabsInText(tabs) +  $1.traduccion; tabs -= 2;}
         | DOWHILE  {$$ = new Nodo('SENTENCE'); $$.addChildrens($1); tabs+=2; $$.traduccion += $1.insertTabsInText(tabs) + $1.traduccion; tabs -= 2;}
         | RETURN  {$$ = new Nodo('SENTENCE'); $$.addChildrens($1); tabs+=2; $$.traduccion += $1.insertTabsInText(tabs) + $1.traduccion; tabs -= 2;}
         | BREAK   {$$ = new Nodo('SENTENCE'); $$.addChildrens($1); tabs+=2; $$.traduccion += $1.insertTabsInText(tabs) +  $1.traduccion; tabs -= 2;}
         | CONTINUE  {$$ = new Nodo('SENTENCE'); $$.addChildrens($1); tabs+=2; $$.traduccion += $1.insertTabsInText(tabs) + $1.traduccion; tabs -= 2;}
         | error { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + "  " +' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + "  " +' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; } 
;



DECLARATION : TYPE IDLIST ';' {$$ = new Nodo('DECLARATION'); $$.addChildrens($1); $$.addChildrens($2); $$.addChildrens(new Nodo($3));
                               $$.traduccion += $1.traduccion + $2.traduccion + $3 + "\n";}
           ;
IDLIST : IDLIST ',' ID {$$ = new Nodo('IDLIST'); $$.addChildrens($1); $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                        $$.traduccion += $1.traduccion + $2 + $3.traduccion;}
       | ID {$$ = new Nodo('IDLIST'); $$.addChildrens($1); $$.traduccion += $1.traduccion;}
;
ID : 'identifier' {$$ = new Nodo('ID'); $$.addChildrens(new Nodo($1)); $$.traduccion += $1;}

   | 'identifier' ASSIGMENTEXPRESSION {$$ = new Nodo('ID'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2);
                                       $$.traduccion += $1 + " " + $2.traduccion}
;

ASSIGMENT : 'identifier' ASSIGMENTEXPRESSION ';' {$$ = new Nodo('ASSIGMENT'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2);
                                                  $$.addChildrens(new Nodo($3));
                                                  $$.traduccion += $1 + " " + $2.traduccion + $3 + "\n";}

          | 'identifier' '++' ';' {$$ = new Nodo('ASSIGMENT'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2)); 
                                  $$.addChildrens(new Nodo($3));
                                  $$.traduccion += $1 + $2 + $3 + "\n";}

          | 'identifier' '--' ';' {$$ = new Nodo('ASSIGMENT'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2));
                                   $$.addChildrens(new Nodo($3));
                                   $$.traduccion += $1 + $2 + $3 + "\n";}
;

ASSIGMENTEXPRESSION : '=' EXPRESSION {$$ = new Nodo('ASSIGMENTEXPRESSION'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2);
                                      $$.traduccion += $1 + " "  + $2.traduccion;}

                    | '+=' EXPRESSION {$$ = new Nodo('ASSIGMENTEXPRESSION'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2);
                                       $$.traduccion += $1 + " " + $2.traduccion;}

                    | '-=' EXPRESSION {$$ = new Nodo('ASSIGMENTEXPRESSION'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2);
                                       $$.traduccion += $1 + " " + $2.traduccion;}
;

EXPRESSION : EXPRESSION '+' EXPRESSION  {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1);
                                         $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                         $$.traduccion += $1.traduccion + " " + $2 + " " + $3.traduccion;}

           | EXPRESSION '-' EXPRESSION {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1);
                                        $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                        $$.traduccion += $1.traduccion + " " + $2 + " " + $3.traduccion;}

           | EXPRESSION '*' EXPRESSION {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1); 
                                        $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                        $$.traduccion += $1.traduccion + " " + $2 + " " + $3.traduccion;}

           | EXPRESSION '/' EXPRESSION {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1);
                                        $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                        $$.traduccion += $1.traduccion + " " + $2 + " " + $3.traduccion;}

           | EXPRESSION '^' EXPRESSION {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1);
                                        $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                        $$.traduccion += $1.traduccion + " " + $2 + " " + $3.traduccion;}

           | EXPRESSION '%' EXPRESSION {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1);
                                        $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                        $$.traduccion += $1.traduccion + " " + $2 + " " + $3.traduccion;}

           | EXPRESSION '<' EXPRESSION {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1);
                                        $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                        $$.traduccion += $1.traduccion + " " + $2 + " " + $3.traduccion;}

           | EXPRESSION '>' EXPRESSION {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1);
                                        $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                        $$.traduccion += $1.traduccion + " " + $2 + " " + $3.traduccion;}

           | EXPRESSION '<=' EXPRESSION {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1);
                                         $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                         $$.traduccion += $1.traduccion + " " + $2 + " " + $3.traduccion;}

           | EXPRESSION '>=' EXPRESSION {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1);
                                         $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                         $$.traduccion += $1.traduccion + " " + $2 + " " + $3.traduccion;}

           | EXPRESSION '==' EXPRESSION {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1);
                                         $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                         $$.traduccion += $1.traduccion + " " + $2 + " " + $3.traduccion;}

           | EXPRESSION '!=' EXPRESSION {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1);
                                         $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                         $$.traduccion += $1.traduccion + " " + $2 + " " + $3.traduccion;}

           | EXPRESSION '||' EXPRESSION {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1);
                                         $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                         $$.traduccion += $1.traduccion + " " + $2 + " " + $3.traduccion;}

           | EXPRESSION '&&' EXPRESSION {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1);
                                         $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                         $$.traduccion += $1.traduccion + " " + $2 + " " + $3.traduccion;}

           | '(' EXPRESSION ')' {$$ = new Nodo('EXPRESSION'); $$.addChildrens(new Nodo($1));
                                 $$.addChildrens($2); $$.addChildrens(new Nodo($3));
                                 $$.traduccion += $1 + $2.traduccion + $3;}

           | '-' EXPRESSION %prec UMINUS {$$ = new Nodo('EXPRESSION'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2);
                                          $$.traduccion += $1 + $2.traduccion;}
           | '!' EXPRESSION {$$ = new Nodo('EXPRESSION'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2);
                             $$.traduccion += $1 + $2.traduccion; }

           | 'identifier'{$$ = new Nodo('EXPRESSION'); $$.addChildrens(new Nodo($1));
                          $$.traduccion += $1;}

           | '++' 'identifier' {$$ = new Nodo('EXPRESSION'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2));
                                $$.traduccion += $1 + $2;}
           | '--' 'identifier' {$$ = new Nodo('EXPRESSION'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2));
                                $$.traduccion += $1 + $2;}
           | 'identifier' '++' {$$ = new Nodo('EXPRESSION'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2));
                                $$.traduccion += $1 + $2;}

           | 'identifier' '--' {$$ = new Nodo('EXPRESSION'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2));
                                $$.traduccion += $1 + $2;}
           
           | 'stringContent' {$$ = new Nodo('EXPRESSION'); $$.addChildrens(new Nodo($1)); $$.traduccion +=  '"' + $1 + '"';}
           | 'character' {$$ = new Nodo('EXPRESSION'); $$.addChildrens(new Nodo($1)); $$.traduccion += "'" + $1 + "'";}
           | 'decimal' {$$ = new Nodo('EXPRESSION'); $$.addChildrens(new Nodo($1)); $$.traduccion += $1;}
           | 'true'  {$$ = new Nodo('EXPRESSION'); $$.addChildrens(new Nodo($1)); $$.traduccion += $1;}
           | 'false' {$$ = new Nodo('EXPRESSION'); $$.addChildrens(new Nodo($1)); $$.traduccion += $1;}
           | CALLMETHOD {$$ = new Nodo('EXPRESSION'); $$.addChildrens($1); $$.traduccion += $1.traduccion;}
;

CALLMETHOD : 'identifier' '(' ')'  {$$ = new Nodo('CALLMETHOD'); $$.addChildrens(new Nodo($1));
                                    $$.addChildrens(new Nodo($2)); $$.addChildrens(new Nodo($3));
                                    $$.traduccion += $1 + $2 + $3;}

          | 'identifier' '(' CALLPARAMS ')' {$$ = new Nodo('CALLMETHOD'); $$.addChildrens(new Nodo($1));
                                             $$.addChildrens(new Nodo($2)); $$.addChildrens($3); $$.addChildrens(new Nodo($4));
                                             $$.traduccion += $1 + $2 + $3.traduccion + $4;}
;

CALLPARAMS : CALLPARAMS ',' EXPRESSION {$$ = new Nodo('CALLPARAMS'); $$.addChildrens($1); 
                                        $$.addChildrens(new Nodo($2)); $$.addChildrens($3);
                                        $$.traduccion += $1.traduccion + $2 + $3.traduccion;}

          | EXPRESSION {$$ = new Nodo('CALLPARAMS'); $$.addChildrens($1); $$.traduccion += $1.traduccion;}
;

PRINTS : 'print' '(' ')' ';' {$$ = new Nodo('PRINTS'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2));
                              $$.addChildrens(new Nodo($3)); $$.addChildrens(new Nodo($4));
                              $$.traduccion += "console.log" + $2 + $3 + $4;}

       | 'println' '(' ')' ';' {$$ = new Nodo('PRINTS'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2));
                                $$.addChildrens(new Nodo($3)); $$.addChildrens(new Nodo($4));
                                $$.traduccion += "console.log" + $2 + $3 + $4;}

       | 'print' CONDITION ';' {$$ = new Nodo('PRINTS'); $$.addChildrens(new Nodo($1));
                                $$.addChildrens($2); $$.addChildrens(new Nodo($3));
                                $$.traduccion += "console.log" + $2.traduccion + $3;}

       | 'println' CONDITION ';' {$$ = new Nodo('PRINTS'); $$.addChildrens(new Nodo($1));
                                  $$.addChildrens($2); $$.addChildrens(new Nodo($3));
                                  $$.traduccion += "console.log" + $2.traduccion + $3;}
;

CONDITION : '(' EXPRESSION ')' {$$ = new Nodo('CONDITION'); $$.addChildrens(new Nodo($1));
                                $$.addChildrens($2); $$.addChildrens(new Nodo($3));
                                $$.traduccion += $1 + $2.traduccion + $3;}

        | error   { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + "  " +' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + "  " +' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; } 
;

IFS :  'if' CONDITION BODY  {$$ = new Nodo('IFS'); $$.addChildrens(new Nodo($1));
                            $$.addChildrens($2); $$.addChildrens($3);
                            counterIF++; auxName = $1; $$.traduccion += $1 + $2.traduccion + $3.traduccion;}
    |  'if' CONDITION BODY 'else' IFS  {$$ = new Nodo('IFS'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2);
                                        $$.addChildrens($3); $$.addChildrens(new Nodo($4)); $$.addChildrens($5);
                                        $$.traduccion += $1 + $2.traduccion + $3.traduccion + $4 + " " + $5.traduccion;}
    |  'if' CONDITION BODY 'else' BODY {$$ = new Nodo('IFS'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2); 
                                        $$.addChildrens($3); $$.addChildrens(new Nodo($4)); $$.addChildrens($5);
                                        $$.traduccion += $1 + $2.traduccion + $3.traduccion + $4 + " "+ $5.traduccion;}
;

FOR : 'for' '(' TYPE 'identifier' ASSIGMENTEXPRESSION ';' EXPRESSION ';' ITERATOR ')' BODY {$$ = new Nodo('FOR'); $$.addChildrens(new Nodo($1));
                                                                                            $$.addChildrens(new Nodo($2)); $$.addChildrens($3); 
                                                                                            $$.addChildrens(new Nodo($4)); $$.addChildrens($5); 
                                                                                            $$.addChildrens(new Nodo($6)); $$.addChildrens($7); 
                                                                                            $$.addChildrens(new Nodo($8)); $$.addChildrens($9); 
                                                                                            $$.addChildrens(new Nodo($10)); $$.addChildrens($11);
                                                                                            $$.traduccion += $1 + " " + $2 + $3.traduccion + " " + $4
                                                                                             + $5.traduccion + " " + $6 + $7.traduccion + $8 +  $9.traduccion +
                                                                                             $10 + " " + $11.traduccion; }

    | 'for' '(' 'identifier' ASSIGMENTEXPRESSION ';' EXPRESSION ';' ITERATOR ')' BODY {$$ = new Nodo('FOR'); $$.addChildrens(new Nodo($1)); $$.addChildrens(new Nodo($2)); 
                                                                                       $$.addChildrens(new Nodo($3)); $$.addChildrens($4); $$.addChildrens(new Nodo($5));
                                                                                       $$.addChildrens($6); $$.addChildrens(new Nodo($7)); $$.addChildrens($8);
                                                                                       $$.addChildrens(new Nodo($9)); $$.addChildrens($10);
                                                                                       $$.traduccion += $1 + " " + $2 + $3 + " " + $4.traduccion + $5 + " " + $6.traduccion +
                                                                                       $7 + " " + $8.traduccion + " " + $9 + " " + $10.traduccion; }

    | 'for'  { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + "  " +' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + "  " +' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; } 
;

ITERATOR : 'identifier' '++' {$$ = new Nodo('ITERATOR'); $$.addChildrens(new Nodo($1));
                              $$.addChildrens(new Nodo($2));
                              $$.traduccion += $1 + $2;}
         | 'identifier' '--' {$$ = new Nodo('ITERATOR'); $$.addChildrens(new Nodo($1));
                              $$.addChildrens(new Nodo($2));
                              $$.traduccion += $1 + $2;}
;

WHILE : 'while' CONDITION BODY {$$ = new Nodo('WHILE'); $$.addChildrens(new Nodo($1));
                                $$.addChildrens($2); $$.addChildrens($3);
                                $$.traduccion += $1 + " " + $2.traduccion + " " + $3.traduccion;}
;

DOWHILE : 'do' BODY 'while' CONDITION ';' {$$ = new Nodo('DOWHILE'); $$.addChildrens(new Nodo($1)); $$.addChildrens($2);
                                           $$.addChildrens(new Nodo($3)); $$.addChildrens($4); $$.addChildrens(new Nodo($5));
                                           $$.traduccion += $1 + " " + $2.traduccion + " " + $3 + " " + $4.traduccion + $5;}
;

RETURN : 'return' ';' {$$ = new Nodo('RETURN'); $$.addChildrens(new Nodo($1));
                       $$.addChildrens(new Nodo($2)); $$.traduccion += $1 + $2;}

       | 'return' EXPRESSION ';' {$$ = new Nodo('RETURN'); $$.addChildrens(new Nodo($1));
                                  $$.addChildrens($2); $$.addChildrens(new Nodo($3));
                                  $$.traduccion += $1 + " " + $2.traduccion + $3;}
;

BREAK : 'break' ';' {$$ = new Nodo('BREAK'); $$.addChildrens(new Nodo($1));
                     $$.addChildrens(new Nodo($2));
                     $$.traduccion += $1 + $2;}
;

CONTINUE : 'continue' ';' {$$ = new Nodo('CONTINUE'); $$.addChildrens(new Nodo($1));
                           $$.addChildrens(new Nodo($2)); $$.traduccion += $1 + $2;}
;
ERROR : '{'
      | '}' 
      | '('
      | ')' 
      | ':'
      | ';' 
      ; 