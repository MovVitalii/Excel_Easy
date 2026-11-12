/* ===== Mini silnik formuł ===== */
const fl=x=>[x].flat(Infinity),er=()=>{throw 0},nm=x=>fl(x).filter(v=>typeof v=='number');
const eq=(x,y)=>String(x).toLowerCase()==String(y).toLowerCase();
const mt=(v,c)=>{if(typeof c!='string')return eq(v,c);const m=c.match(/^(<>|<=|>=|=|<|>)?(.*)$/),o=m[1]||'=',q=m[2],n=q!==''&&!isNaN(q);
const x=n?(typeof v=='number'?v:NaN):String(v).toLowerCase(),z=n?+q:q.toLowerCase();
return o=='='?x==z:o=='<>'?x!=z:o=='<'?x<z:o=='>'?x>z:o=='<='?x<=z:x>=z};
const ok=(p,k)=>{for(let j=0;j<p.length;j+=2)if(!mt(fl(p[j])[k],p[j+1]))return false;return true};
const F={SUM:(...a)=>nm(a).reduce((x,y)=>x+y,0),AVERAGE:(...a)=>{const n=nm(a);return n.reduce((x,y)=>x+y,0)/n.length},
MIN:(...a)=>Math.min(...nm(a)),MAX:(...a)=>Math.max(...nm(a)),COUNT:(...a)=>nm(a).length,COUNTA:(...a)=>fl(a).filter(x=>x!=='').length,
MEDIAN:(...a)=>{const n=nm(a).sort((x,y)=>x-y),h=n.length>>1;return n.length%2?n[h]:(n[h-1]+n[h])/2},
ABS:Math.abs,INT:Math.floor,MOD:(a,b)=>((a%b)+b)%b,ROUND:(x,n=0)=>{const m=10**n;return Math.sign(x)*Math.round(Math.abs(x)*m)/m},
IF:(c,a,b=false)=>c?a:b,AND:(...a)=>fl(a).every(Boolean),OR:(...a)=>fl(a).some(Boolean),NOT:x=>!x,IFERROR:1,
SUMIFS:(s,...p)=>fl(s).reduce((t,v,k)=>t+(ok(p,k)&&typeof v=='number'?v:0),0),
COUNTIFS:(...p)=>fl(p[0]).filter((_,k)=>ok(p,k)).length,
LEFT:(s,n=1)=>String(s).slice(0,n),RIGHT:(s,n=1)=>String(s).slice(-n),MID:(s,a,n)=>String(s).slice(a-1,a-1+n),LEN:s=>String(s).length,
UPPER:s=>String(s).toUpperCase(),LOWER:s=>String(s).toLowerCase(),PROPER:s=>String(s).toLowerCase().replace(/(^|\s)\S/g,m=>m.toUpperCase()),
TRIM:s=>String(s).trim().replace(/\s+/g,' '),SUBSTITUTE:(s,a,b)=>String(s).split(a).join(b),FIND:(a,s)=>{const k=String(s).indexOf(a);return k<0?er():k+1},
CONCAT:(...a)=>fl(a).join(''),TEXTJOIN:(d,i,...a)=>fl(a).filter(x=>!(i&&x==='')).join(d),
VLOOKUP:(v,t,c)=>{const r=t.find(r=>eq(r[0],v));return r?r[c-1]:er()},
INDEX:(a,r,c)=>c===undefined?(a[0].length==1?a[r-1][0]:a[0][r-1]):a[r-1][c-1],
MATCH:(v,r)=>{const k=fl(r).findIndex(x=>eq(x,v));return k<0?er():k+1},
XLOOKUP:(v,l,r,nf)=>{const k=fl(l).findIndex(x=>eq(x,v));return k<0?(nf!==undefined?nf:er()):fl(r)[k]}};
F.SUMIF=(r,c,s)=>F.SUMIFS(s===undefined?r:s,r,c);F.COUNTIF=(r,c)=>F.COUNTIFS(r,c);
F.AVERAGEIF=(r,c,s)=>F.SUMIF(r,c,s)/F.COUNTIF(r,c);F.CONCATENATE=F.CONCAT;
const A=Array.isArray,mp=(x,y,f)=>A(x)?x.map((r,i)=>r.map((v,j)=>f(v,A(y)?y[i][j]:y))):y.map(r=>r.map(v=>f(x,v)));
const E0=Date.UTC(1899,11,30),ds=(y,m,d)=>Math.round((Date.UTC(y,m-1,d)-E0)/864e5),dd=s=>new Date(E0+s*864e5),wk=s=>{const w=dd(s).getUTCDay();return w>0&&w<6};
const so=a=>nm(a).sort((x,y)=>x-y),av=a=>a.reduce((x,y)=>x+y,0)/a.length,mm=n=>{const m=10**n;return m};
const pc=(a,k)=>{const n=so(a),p=(n.length-1)*k,f=Math.floor(p);return n[f]+(n[Math.min(f+1,n.length-1)]-n[f])*(p-f)};
const vr=(a,s)=>{const n=nm(a),m=av(n);return n.reduce((t,x)=>t+(x-m)**2,0)/(n.length-(s?1:0))};
const cv=(x,y,s)=>{x=nm(x);y=nm(y);const a=av(x),b=av(y);return x.reduce((t,v,k)=>t+(v-a)*(y[k]-b),0)/(x.length-(s?1:0))};
Object.assign(F,{ROUNDUP:(x,n=0)=>Math.sign(x)*Math.ceil(Math.abs(x)*mm(n)-1e-9)/mm(n),ROUNDDOWN:(x,n=0)=>Math.sign(x)*Math.floor(Math.abs(x)*mm(n)+1e-9)/mm(n),
COUNTBLANK:(...a)=>fl(a).filter(x=>x==='').length,
SUMPRODUCT:(...a)=>fl(a[0]).reduce((t,_,k)=>t+a.reduce((p,r)=>p*(+fl(r)[k]||0),1),0),
SUBTOTAL:(f,...a)=>F[{1:'AVERAGE',2:'COUNT',3:'COUNTA',4:'MAX',5:'MIN',9:'SUM'}[f%100]](...a),AGGREGATE:(f,o,...a)=>F.SUBTOTAL(f,...a),
MAXIFS:(s,...p)=>Math.max(...fl(s).filter((v,k)=>ok(p,k)&&typeof v=='number')),MINIFS:(s,...p)=>Math.min(...fl(s).filter((v,k)=>ok(p,k)&&typeof v=='number')),
IFS:(...a)=>{for(let k=0;k<a.length;k+=2)if(a[k])return a[k+1];er()},
SWITCH:(v,...a)=>{for(let k=0;k+1<a.length;k+=2)if(eq(v,a[k]))return a[k+1];return a.length%2?a[a.length-1]:er()},
CHOOSE:(n,...a)=>a[n-1],ROWS:a=>A(a)?a.length:1,COLUMNS:a=>A(a)?a[0].length:1,XMATCH:(v,r)=>F.MATCH(v,r),
SEARCH:(a,s)=>{const k=String(s).toLowerCase().indexOf(String(a).toLowerCase());return k<0?er():k+1},
VALUE:x=>x===''||isNaN(x)?er():+x,CLEAN:s=>String(s).replace(/[\x00-\x1f]/g,''),
TEXTBEFORE:(s,d)=>{const k=String(s).indexOf(d);return k<0?er():String(s).slice(0,k)},TEXTAFTER:(s,d)=>{const k=String(s).indexOf(d);return k<0?er():String(s).slice(k+d.length)},TEXTSPLIT:(s,d)=>[String(s).split(d)],
DATE:ds,YEAR:s=>dd(s).getUTCFullYear(),MONTH:s=>dd(s).getUTCMonth()+1,DAY:s=>dd(s).getUTCDate(),WEEKDAY:(s,t=1)=>{const w=dd(s).getUTCDay();return t==2?(w+6)%7+1:w+1},
EDATE:(s,n)=>{const d=dd(s);return ds(d.getUTCFullYear(),d.getUTCMonth()+1+n,d.getUTCDate())},EOMONTH:(s,n)=>{const d=dd(s);return ds(d.getUTCFullYear(),d.getUTCMonth()+2+n,0)},
DATEDIF:(a,b,u)=>{const x=dd(a),y=dd(b),m=(y.getUTCFullYear()-x.getUTCFullYear())*12+y.getUTCMonth()-x.getUTCMonth()-(y.getUTCDate()<x.getUTCDate()?1:0);return u=='D'?b-a:u=='M'?m:u=='Y'?Math.floor(m/12):er()},
NETWORKDAYS:(a,b)=>{let n=0;for(let s=a;s<=b;s++)if(wk(s))n++;return n},WORKDAY:(a,n)=>{let s=a;while(n>0){s++;if(wk(s))n--}return s},
'STDEV.S':(...a)=>Math.sqrt(vr(a,1)),'STDEV.P':(...a)=>Math.sqrt(vr(a,0)),'VAR.S':(...a)=>vr(a,1),'VAR.P':(...a)=>vr(a,0),
'PERCENTILE.INC':(a,k)=>pc(a,k),'QUARTILE.INC':(a,q)=>pc(a,q/4),
'MODE.SNGL':(...a)=>{const n=nm(a),c={};n.forEach(x=>c[x]=(c[x]||0)+1);return +Object.keys(c).sort((x,y)=>c[y]-c[x]||n.indexOf(+x)-n.indexOf(+y))[0]},
CORREL:(x,y)=>cv(x,y,1)/Math.sqrt(vr(x,1)*vr(y,1)),'COVARIANCE.S':(x,y)=>cv(x,y,1),SLOPE:(y,x)=>cv(x,y,1)/vr(x,1),
INTERCEPT:(y,x)=>av(nm(y))-F.SLOPE(y,x)*av(nm(x)),RSQ:(y,x)=>F.CORREL(x,y)**2,'FORECAST.LINEAR':(v,y,x)=>F.INTERCEPT(y,x)+F.SLOPE(y,x)*v,
LARGE:(a,k)=>so(a).reverse()[k-1],SMALL:(a,k)=>so(a)[k-1],RANK:(v,a,o=0)=>nm(a).filter(x=>o?x<v:x>v).length+1,
PMT:(r,n,p)=>-p*r/(1-(1+r)**-n),FV:(r,n,p)=>-p*((1+r)**n-1)/r,PV:(r,n,p)=>-p*(1-(1+r)**-n)/r,NPV:(r,...a)=>nm(a).reduce((t,c,k)=>t+c/(1+r)**(k+1),0),
FILTER:(a,c,e)=>{const r=a.filter((_,k)=>fl(c)[k]);return r.length?r:e!==undefined?[[e]]:er()},
SORT:(a,i=1,o=1)=>a.slice().sort((x,y)=>(x[i-1]>y[i-1]?1:x[i-1]<y[i-1]?-1:0)*o),
SORTBY:(a,k,o=1)=>a.map((r,i)=>[r,fl(k)[i]]).sort((x,y)=>(x[1]>y[1]?1:x[1]<y[1]?-1:0)*o).map(x=>x[0]),
UNIQUE:a=>{const s=new Set;return a.filter(x=>{const k=JSON.stringify(x);return s.has(k)?false:(s.add(k),true)})},
SEQUENCE:(r,c=1,s=1,t=1)=>Array.from({length:r},(_,i)=>Array.from({length:c},(_,j)=>s+(i*c+j)*t)),
TAKE:(a,n)=>n>=0?a.slice(0,n):a.slice(n),DROP:(a,n)=>n>=0?a.slice(n):a.slice(0,n),
VSTACK:(...a)=>a.flatMap(x=>A(x)?x:[[x]]),HSTACK:(...a)=>Array.from({length:Math.max(...a.map(x=>A(x)?x.length:1))},(_,i)=>a.flatMap(x=>A(x)?x[i]:[x])),
TOCOL:a=>fl(a).map(x=>[x]),TOROW:a=>[fl(a)],CHOOSECOLS:(a,...c)=>a.map(r=>c.map(k=>r[k-1])),CHOOSEROWS:(a,...c)=>c.map(k=>a[k-1])});
const colN=s=>[...s].reduce((a,c)=>a*26+c.charCodeAt(0)-64,0)-1;
function ref(s,g){s=s.replace(/\$/g,'');const [a,b]=s.split(':'),p=x=>{const m=x.match(/([A-Z]+)(\d+)/);return[+m[2]-1,colN(m[1])]};
const get=(r,c)=>{const v=(g[r]||[])[c];return v===undefined?'':v},[r1,c1]=p(a);if(!b)return get(r1,c1);
const [r2,c2]=p(b),o=[];for(let r=r1;r<=r2;r++){o.push([]);for(let c=c1;c<=c2;c++)o[o.length-1].push(get(r,c))}return o}
function ev(f,g){
f=f.trim().replace(/^=/,'').replace(/"[^"]*"|[^"]+/g,m=>m[0]=='"'?m:m.toUpperCase());
const t=f.match(/"[^"]*"|\$?[A-Z]{1,2}\$?\d+(?::\$?[A-Z]{1,2}\$?\d+)?|[A-Z_][A-Z0-9_.]*|\d+\.?\d*|<>|<=|>=|[-+*\/^&=<>(),]/g)||[];let i=0;const P=()=>t[i++];
const bin=(nx,ops,fn)=>()=>{let l=nx();while(ops.includes(t[i])){const o=P(),r=nx(),a=l;l=()=>{const x=a(),y=r();return A(x)||A(y)?mp(x,y,(p,q)=>fn(o,p,q)):fn(o,x,y)}}return l};
function call(n,a){if(!F[n])er();if(n=='IFERROR'){try{const v=a[0]();if(typeof v=='number'&&!isFinite(v))er();return v}catch(e){return a[1]()}}return F[n](...a.map(x=>x()))}
function prim(){const k=P();if(k===undefined)er();if(k=='('){const e=cmp();P();return e}
if(k[0]=='"'){const s=k.slice(1,-1);return()=>s}
if(/^\d/.test(k)){const n=+k;return()=>n}
if(k=='-'){const e=prim();return()=>-e()}
if(t[i]=='('){P();const a=[];if(t[i]!=')')for(;;){a.push(cmp());if(t[i]==',')P();else break}P();return()=>call(k,a)}
if(k=='TRUE'||k=='FALSE'){const b=k=='TRUE';return()=>b}
if(!/^\$?[A-Z]{1,2}\$?\d+/.test(k))er();return()=>ref(k,g)}
const pw=bin(prim,['^'],(o,x,y)=>(+x)**(+y)),mu=bin(pw,['*','/'],(o,x,y)=>o=='*'?x*y:(+y==0?er():x/y)),
ad=bin(mu,['+','-'],(o,x,y)=>o=='+'?+x+ +y:x-y),ct=bin(ad,['&'],(o,x,y)=>''+x+y),
cmp=bin(ct,['=','<>','<=','>=','<','>'],(o,x,y)=>{if(typeof x=='string')x=x.toLowerCase();if(typeof y=='string')y=y.toLowerCase();
return o=='='?x==y:o=='<>'?x!=y:o=='<'?x<y:o=='>'?x>y:o=='<='?x<=y:x>=y});
const r=cmp()();if(i<t.length)er();const v=Array.isArray(r)?r[0][0]:r;if(typeof v=='number'&&!isFinite(v))er();return v}
/* ===== Dane ===== */
const G={T:[["Jabłko","Owoce",3,10],["Gruszka","Owoce",4,5],["Marchew","Warzywa",2,8],["Cebula","Warzywa",1,20],["Śliwka","Owoce",5,7]],
X:[["  Jan   Nowak  ","jan.nowak@firma.pl"]]};
G.S=[[1,2],[2,4],[3,5],[4,4],[5,6]];G.D=[[ds(2026,1,15),ds(2026,3,20)]];G.Z=[[0.01,12,10000]];G.B=[["x",""],["","y"],["z",""]];
const L=[
["Podstawy","SUM","Dodaje liczby.",`SUM(C1:C5)`,"Zsumuj ilości (kolumna D).",`SUM(D1:D5)`,"T"],
["Podstawy","AVERAGE","Średnia: suma podzielona przez liczbę elementów.",`AVERAGE(C1:C5)`,"Oblicz średnią ilość (kolumna D).",`AVERAGE(D1:D5)`,"T"],
["Podstawy","MIN / MAX","MIN to najmniejsza liczba, MAX – największa.",`MAX(C1:C5)`,"Znajdź najmniejszą ilość.",`MIN(D1:D5)`,"T"],
["Podstawy","COUNT / COUNTA","COUNT liczy liczby, COUNTA – wszystkie niepuste komórki.",`COUNTA(A1:A5)`,"Policz liczby w kolumnie C (COUNT).",`COUNT(C1:C5)`,"T"],
["Podstawy","ROUND","Zaokrągla liczbę do wybranej liczby miejsc po przecinku.",`ROUND(10/3,2)`,"Zaokrąglij średnią cen z C1:C4 do liczby całkowitej.",`ROUND(AVERAGE(C1:C4),0)`,"T"],
["Warunki","SUMIF","Sumuje tylko to, co spełnia warunek.",`SUMIF(B1:B5,"Owoce",D1:D5)`,"Zsumuj ilości dla Warzyw.",`SUMIF(B1:B5,"Warzywa",D1:D5)`,"T"],
["Warunki","COUNTIF","Liczy komórki spełniające warunek.",`COUNTIF(B1:B5,"Owoce")`,"Ile produktów kosztuje więcej niż 2?",`COUNTIF(C1:C5,">2")`,"T"],
["Warunki","SUMIFS","Jak SUMIF, ale z wieloma warunkami naraz.",`SUMIFS(D1:D5,B1:B5,"Owoce",C1:C5,">3")`,"Zsumuj ilości Owoców tańszych niż 5.",`SUMIFS(D1:D5,B1:B5,"Owoce",C1:C5,"<5")`,"T"],
["Warunki","AVERAGEIF","Średnia tylko z tych komórek, które spełniają warunek.",`AVERAGEIF(B1:B5,"Owoce",C1:C5)`,"Średnia ilość dla Warzyw.",`AVERAGEIF(B1:B5,"Warzywa",D1:D5)`,"T"],
["Warunki","IF","Jeśli warunek prawdziwy – wynik pierwszy, inaczej – drugi.",`IF(D1>8,"dużo","mało")`,"Jeśli C2 jest większe niż 3, wpisz „drogie”, inaczej „tanie”.",`IF(C2>3,"drogie","tanie")`,"T"],
["Warunki","AND / OR","AND: wszystkie warunki muszą być prawdziwe. OR: wystarczy jeden.",`AND(C1>2,D1>5)`,"Sprawdź (OR): czy C3>3 albo D3>5?",`OR(C3>3,D3>5)`,"T"],
["Warunki","IFERROR","Zamienia błąd na wybraną wartość.",`IFERROR(C1/0,"brak")`,"Podziel C3 przez (D3-8). Przy błędzie wpisz „brak”.",`IFERROR(C3/(D3-8),"brak")`,"T"],
["Tekst","LEN","Liczy znaki w tekście (spacje też).",`LEN(B1)`,"Policz znaki w A1.",`LEN(A1)`,"X"],
["Tekst","TRIM / UPPER","TRIM usuwa zbędne spacje. UPPER robi wielkie litery.",`TRIM(A1)`,"Wyczyść A1 z nadmiaru spacji i zrób wielkie litery.",`UPPER(TRIM(A1))`,"X"],
["Tekst","LEFT / RIGHT / MID","LEFT: znaki z lewej. RIGHT: z prawej. MID: ze środka.",`LEFT(B1,3)`,"Wyciągnij „nowak” z B1 (MID: od 5. znaku, 5 znaków).",`MID(B1,5,5)`,"X"],
["Tekst","SUBSTITUTE","Zamienia jeden tekst na inny.",`SUBSTITUTE(B1,"firma","praca")`,"Zamień „jan” na „ewa” w B1.",`SUBSTITUTE(B1,"jan","ewa")`,"X"],
["Tekst","CONCAT / TEXTJOIN","Łączą teksty. TEXTJOIN dodaje separator.",`TEXTJOIN("-",TRUE,A1,B1)`,"Połącz A2 i B2 spacją (TEXTJOIN).",`TEXTJOIN(" ",TRUE,A2,B2)`,"T"],
["Wyszukiwanie","VLOOKUP","Szuka wartości w pierwszej kolumnie i zwraca dane z wybranej kolumny.",`VLOOKUP("Cebula",A1:D5,3,FALSE)`,"Znajdź ilość Gruszki.",`VLOOKUP("Gruszka",A1:D5,4,FALSE)`,"T"],
["Wyszukiwanie","INDEX + MATCH","MATCH znajduje pozycję, INDEX oddaje wartość z tej pozycji.",`INDEX(C1:C5,MATCH("Cebula",A1:A5,0))`,"Znajdź ilość Śliwki.",`INDEX(D1:D5,MATCH("Śliwka",A1:A5,0))`,"T"],
["Wyszukiwanie","XLOOKUP","Nowoczesny VLOOKUP: szukasz w jednej kolumnie, wynik bierzesz z innej.",`XLOOKUP("Marchew",A1:A5,C1:C5)`,"Podaj kategorię Gruszki; gdy brak – „brak”.",`XLOOKUP("Gruszka",A1:A5,B1:B5,"brak")`,"T"]];
const H={T:['Produkt','Kategoria','Cena (zł)','Ilość (szt.)'],X:['Imię i nazwisko','E-mail'],S:['x','y'],D:['Data początkowa','Data końcowa'],Z:['Stopa','Liczba okresów','Kwota kredytu'],B:['Kolumna 1','Kolumna 2']};
const W=(g,t,e,x,q,s,d)=>L.push([g,t,e,x,q,s,d]),Z=(g,t,e,q,o,a)=>L.push([g,t,e,null,q,o,a]);
W("Podstawy","MEDIAN","Mediana to środkowa wartość po posortowaniu.",`MEDIAN(D1:D5)`,"Znajdź medianę cen (kolumna C).",`MEDIAN(C1:C5)`,"T");
W("Podstawy","MOD / INT / ABS","MOD to reszta z dzielenia, INT odcina ułamek, ABS usuwa minus.",`MOD(10,3)`,"Reszta z dzielenia sumy ilości (D) przez 7.",`MOD(SUM(D1:D5),7)`,"T");
W("Podstawy","ROUNDUP / ROUNDDOWN","ROUNDUP zawsze zaokrągla w górę, ROUNDDOWN – w dół.",`ROUNDUP(2.31,1)`,"Zaokrąglij 8,76 w dół do liczby całkowitej.",`ROUNDDOWN(8.76,0)`,"T");
W("Podstawy","RANK","Podaje miejsce liczby na liście (1 = największa).",`RANK(D1,D1:D5)`,"Jakie miejsce zajmuje D2 wśród ilości?",`RANK(D2,D1:D5)`,"T");
W("Podstawy","LARGE / SMALL","LARGE(zakres;k) to k-ta największa liczba, SMALL – k-ta najmniejsza.",`LARGE(D1:D5,2)`,"Znajdź trzecią najmniejszą ilość.",`SMALL(D1:D5,3)`,"T");
W("Podstawy","COUNTBLANK","Liczy puste komórki.",`COUNTBLANK(A1:B3)`,"Policz puste komórki w A1:B3.",`COUNTBLANK(A1:B3)+0`,"B");
W("Podstawy","SUMPRODUCT","Mnoży zakresy wiersz po wierszu i sumuje wyniki.",`SUMPRODUCT(C1:C5,D1:D5)`,"Wartość (cena × ilość) tylko dla Warzyw.",`SUMPRODUCT((B1:B5="Warzywa")*C1:C5*D1:D5)`,"T");
W("Podstawy","SUBTOTAL / AGGREGATE","Podsumowują dane, pomijając wiersze ukryte filtrem. Pierwszy argument to kod działania: 9 = SUM, 1 = AVERAGE, 2 = COUNT, 4 = MAX, 5 = MIN.",`SUBTOTAL(9,D1:D5)`,"Średnia ilość przez SUBTOTAL (kod 1).",`SUBTOTAL(1,D1:D5)`,"T");
W("Warunki","MAXIFS / MINIFS","Największa / najmniejsza wartość spełniająca warunek.",`MAXIFS(D1:D5,B1:B5,"Owoce")`,"Najmniejsza ilość Warzyw (MINIFS).",`MINIFS(D1:D5,B1:B5,"Warzywa")`,"T");
W("Warunki","IFS","Sprawdza kolejne warunki bez zagnieżdżania IF.",`IFS(D1>15,"A",D1>5,"B",TRUE,"C")`,"Dla D4: powyżej 15 → „A”, powyżej 5 → „B”, inaczej „C”.",`IFS(D4>15,"A",D4>5,"B",TRUE,"C")`,"T");
W("Warunki","SWITCH","Patrzy na wartość i szuka jej na liście par „wartość → wynik”. Gdy znajdzie, podaje przypisany wynik. Ostatni argument bez pary to wynik na wypadek braku dopasowania.",`SWITCH(B1,"Owoce","O","Warzywa","W","?")`,"Dla B3: Owoce → 1, Warzywa → 2.",`SWITCH(B3,"Owoce",1,"Warzywa",2)`,"T");
W("Warunki","NOT","Odwraca wynik: prawda staje się fałszem.",`NOT(D1>8)`,"Odwróć warunek D2>5.",`NOT(D2>5)`,"T");
W("Tekst","FIND / SEARCH","Podają pozycję tekstu w tekście. SEARCH nie rozróżnia wielkości liter.",`FIND("@",B1)`,"Na której pozycji jest kropka w B1?",`FIND(".",B1)`,"X");
W("Tekst","LOWER / PROPER","LOWER – małe litery. PROPER – Każde Słowo Wielką Literą.",`PROPER("jan nowak")`,"Zamień A1 (bez zbędnych spacji) na małe litery.",`LOWER(TRIM(A1))`,"X");
W("Tekst","VALUE","Zamienia tekst wyglądający jak liczba na prawdziwą liczbę.",`VALUE("12")+1`,"Zamień tekst „45” na liczbę i dodaj C1.",`VALUE("45")+C1`,"T");
W("Tekst","TEXTBEFORE / TEXTAFTER","Biorą tekst przed / po wskazanym znaku.",`TEXTBEFORE(B1,"@")`,"Weź część B1 po znaku @.",`TEXTAFTER(B1,"@")`,"X");
W("Tekst","TEXTSPLIT","Rozbija tekst po separatorze na osobne komórki.",`TEXTJOIN("|",TRUE,TEXTSPLIT(B1,"."))`,"Rozbij B1 po „@” i połącz kawałki średnikiem.",`TEXTJOIN(";",TRUE,TEXTSPLIT(B1,"@"))`,"X");
W("Daty","DATE","Excel trzyma daty jako liczby (dni od 1900 r.). DATE składa datę z roku, miesiąca i dnia.",`DATE(2026,1,15)`,"Ile dni minęło od A1 do 25.12.2026?",`DATE(2026,12,25)-A1`,"D");
W("Daty","YEAR / MONTH / DAY","Wyciągają rok, miesiąc i dzień z daty.",`MONTH(A1)`,"Zbuduj tekst „rok-miesiąc” z B1, np. 2026-3.",`YEAR(B1)&"-"&MONTH(B1)`,"D");
W("Daty","WEEKDAY","Numer dnia tygodnia. Typ 2: poniedziałek = 1.",`WEEKDAY(A1,2)`,"Jaki numer dnia tygodnia ma B1 (typ 2)?",`WEEKDAY(B1,2)`,"D");
W("Daty","DATEDIF","Różnica dat w dniach (D), miesiącach (M) lub latach (Y).",`DATEDIF(A1,B1,"M")`,"Ile pełnych dni jest między A1 a B1?",`DATEDIF(A1,B1,"D")`,"D");
W("Daty","EDATE / EOMONTH","EDATE przesuwa datę o N miesięcy. EOMONTH daje koniec miesiąca.",`DAY(EOMONTH(A1,0))`,"Który dzień miesiąca jest końcem miesiąca B1?",`DAY(EOMONTH(B1,0))`,"D");
W("Daty","NETWORKDAYS / WORKDAY","NETWORKDAYS liczy dni robocze, WORKDAY przesuwa o N dni roboczych.",`NETWORKDAYS(A1,B1)`,"Jaki dzień miesiąca jest 10 dni roboczych po A1?",`DAY(WORKDAY(A1,10))`,"D");
W("Wyszukiwanie","XMATCH","Nowoczesny MATCH: podaje pozycję elementu na liście.",`XMATCH("Cebula",A1:A5)`,"Na której pozycji jest Śliwka?",`XMATCH("Śliwka",A1:A5)`,"T");
W("Wyszukiwanie","CHOOSE","Wybiera element z listy według numeru.",`CHOOSE(2,"a","b","c")`,"Wybierz 3. kolor: „czerwony”, „zielony”, „niebieski”.",`CHOOSE(3,"czerwony","zielony","niebieski")`,"T");
W("Wyszukiwanie","ROWS / COLUMNS","Liczą wiersze i kolumny zakresu.",`ROWS(A1:D5)`,"Ile kolumn ma zakres A1:D5?",`COLUMNS(A1:D5)`,"T");
W("Tablice dynamiczne","FILTER","Wybiera wiersze spełniające warunek. TEXTJOIN pokazuje wynik w jednej komórce.",`TEXTJOIN(",",TRUE,FILTER(A1:A5,B1:B5="Owoce"))`,"Wypisz produkty z ilością większą niż 7.",`TEXTJOIN(",",TRUE,FILTER(A1:A5,D1:D5>7))`,"T");
W("Tablice dynamiczne","SORT / SORTBY","SORT sortuje zakres, SORTBY – według innej kolumny.",`TEXTJOIN(",",TRUE,SORT(A1:A5))`,"Wypisz produkty od największej do najmniejszej ilości (SORTBY, -1).",`TEXTJOIN(",",TRUE,SORTBY(A1:A5,D1:D5,-1))`,"T");
W("Tablice dynamiczne","UNIQUE","Zwraca wartości bez powtórzeń.",`TEXTJOIN(",",TRUE,UNIQUE(B1:B5))`,"Ile jest unikalnych kategorii? (ROWS)",`ROWS(UNIQUE(B1:B5))`,"T");
W("Tablice dynamiczne","SEQUENCE","Generuje ciąg liczb.",`SUM(SEQUENCE(5))`,"Zsumuj liczby od 1 do 10.",`SUM(SEQUENCE(10))`,"T");
W("Tablice dynamiczne","TAKE / DROP","TAKE bierze N pierwszych (lub ostatnich, gdy minus) wierszy, DROP je odrzuca.",`TEXTJOIN(",",TRUE,TAKE(A1:A5,2))`,"Połącz ostatnie 2 produkty.",`TEXTJOIN(",",TRUE,TAKE(A1:A5,-2))`,"T");
W("Tablice dynamiczne","VSTACK / HSTACK","VSTACK skleja zakresy pionowo, HSTACK – poziomo.",`ROWS(VSTACK(A1:A5,A1:A2))`,"Ile kolumn ma HSTACK(A1:A5,C1:C5)?",`COLUMNS(HSTACK(A1:A5,C1:C5))`,"T");
W("Tablice dynamiczne","CHOOSECOLS / TOCOL","CHOOSECOLS wybiera kolumny, TOCOL układa dane w jedną kolumnę, TOROW – w jeden wiersz.",`SUM(CHOOSECOLS(C1:D5,2))`,"Zsumuj pierwszą kolumnę zakresu C1:D5 przez CHOOSECOLS.",`SUM(CHOOSECOLS(C1:D5,1))`,"T");
W("Statystyka","STDEV / VAR","Odchylenie standardowe i wariancja. S – próba, P – cała populacja.",`ROUND(STDEV.S(B1:B5),2)`,"Wariancja próby (VAR.S) kolumny B, 2 miejsca.",`ROUND(VAR.S(B1:B5),2)`,"S");
W("Statystyka","PERCENTILE / QUARTILE","Wartość poniżej której leży dany procent danych. QUARTILE: 1, 2, 3 = 25%, 50%, 75%.",`QUARTILE.INC(B1:B5,1)`,"90. percentyl kolumny B (0.9).",`PERCENTILE.INC(B1:B5,0.9)`,"S");
W("Statystyka","MODE.SNGL","Moda to najczęstsza wartość.",`MODE.SNGL(B1:B5)`,"Ile razy w B występuje moda?",`COUNTIF(B1:B5,MODE.SNGL(B1:B5))`,"S");
W("Statystyka","CORREL / COVARIANCE.S","Korelacja: siła zależności od −1 do 1. Kowariancja: kierunek zależności.",`ROUND(CORREL(A1:A5,B1:B5),2)`,"Kowariancja próby A i B, 2 miejsca.",`ROUND(COVARIANCE.S(A1:A5,B1:B5),2)`,"S");
W("Statystyka","SLOPE / INTERCEPT / RSQ","Prosta regresji y = SLOPE·x + INTERCEPT. RSQ mówi, jak dobrze prosta pasuje.",`SLOPE(B1:B5,A1:A5)`,"R-kwadrat (RSQ) dla y=B, x=A, 2 miejsca.",`ROUND(RSQ(B1:B5,A1:A5),2)`,"S");
W("Statystyka","FORECAST.LINEAR","Prognozuje wartość y dla nowego x na podstawie prostej regresji.",`FORECAST.LINEAR(6,B1:B5,A1:A5)`,"Prognoza y dla x = 10.",`FORECAST.LINEAR(10,B1:B5,A1:A5)`,"S");
W("Finanse","PMT","Miesięczna rata kredytu. Argumenty: stopa, liczba okresów, kwota.",`ROUND(PMT(0.02,10,5000),2)`,"Rata kredytu z A1 (stopa), B1 (okresy), C1 (kwota), 2 miejsca.",`ROUND(PMT(A1,B1,C1),2)`,"Z");
W("Finanse","FV / PV","FV: ile będzie warte za N okresów. PV: ile warte jest dziś.",`ROUND(FV(0.05,10,-100),2)`,"FV dla stopy A1, okresów B1 i wpłaty −100, 2 miejsca.",`ROUND(FV(A1,B1,-100),2)`,"Z");
W("Finanse","NPV","Wartość bieżąca przyszłych wpływów przy danej stopie.",`ROUND(NPV(0.1,100,100,100),2)`,"NPV dla stopy A1 i wpływów 100, 200, 300 (2 miejsca).",`ROUND(NPV(A1,100,200,300),2)`,"Z");
const Q=[["Tabela przestawna","Tabela przestawna (PivotTable) szybko podsumowuje dane według kategorii. Wstawianie → Tabela przestawna, potem przeciągasz pola.","Do czego służy tabela przestawna?",["Do podsumowania danych wg kategorii","Do ochrony pliku hasłem","Do rysowania kształtów"],0],
["Fragmentator (Slicer)","Fragmentator to klikane przyciski-filtry dla tabeli przestawnej.","Czym jest fragmentator?",["Funkcją tekstową","Klikanym filtrem do tabeli przestawnej","Skrótem do zapisu pliku"],1],
["F4 i adresy","F4 zmienia A1 na $A$1 – adres, który nie „ucieka” przy kopiowaniu.","Który klawisz zamienia A1 na $A$1?",["F2","F5","F4"],2],
["Ctrl+T","Ctrl+T zamienia zakres w tabelę: filtry, nazwy kolumn i autorozszerzanie.","Co robi Ctrl+T?",["Zamienia zakres w tabelę","Wstawia dzisiejszą datę","Zamyka plik"],0],
["Flash Fill","Ctrl+E (Flash Fill) uzupełnia kolumnę według wzoru z Twojego przykładu.","Co robi Ctrl+E?",["Usuwa duplikaty","Uzupełnia dane według wzoru z przykładu","Sortuje kolumnę"],1],
["Power Query: Merge","Merge łączy dwie tabele po wspólnej kolumnie (jak JOIN w SQL). Append dokleja wiersze (jak UNION).","Co robi Merge w Power Query?",["Dokleja wiersze pod spodem","Usuwa puste kolumny","Łączy tabele po wspólnej kolumnie"],2],
["Power Query: Unpivot","Unpivot zamienia kolumny na wiersze – dane stają się „długie” i łatwe do analizy.","Co robi Unpivot?",["Zamienia kolumny w wiersze","Zamienia wiersze w wykres","Szyfruje dane"],0],
["DAX: CALCULATE","CALCULATE liczy miarę w zmienionym kontekście filtrów – najważniejsza funkcja DAX.","Która funkcja DAX zmienia kontekst filtrów?",["LEN","CALCULATE","TODAY"],1]];
Q.forEach(q=>L.push(["Narzędzia",q[0],q[1],null,q[2],q[3],q[4]]));
const P="Przygotowanie danych",S2="Struktura i widok",AN="Analiza",WZ="Wizualizacja",PQ="Power Query",DX="DAX",AU="Automatyzacja",SK="Skróty",TE="Funkcje – teoria";
Z(P,"Import danych","Dane → Pobierz dane wczytuje CSV, TXT, strony WWW i bazy danych.","Gdzie zaimportujesz plik CSV?",["Widok → Siatka","Dane → Pobierz dane","Formuły → Nazwy"],1);
Z(P,"Tekst jako kolumny","Dane → Tekst jako kolumny dzieli tekst po separatorze, np. przecinku.","Co robi „Tekst jako kolumny”?",["Dzieli tekst na kolumny","Łączy kolumny","Zmienia czcionkę"],0);
Z(P,"Usuń duplikaty","Dane → Usuń duplikaty kasuje powtarzające się wiersze.","Jak szybko usunąć powtórzone wiersze?",["Plik → Drukuj","Wstawianie → Wykres","Dane → Usuń duplikaty"],2);
Z(P,"Znajdź i zamień","Ctrl+H. Gwiazdka * zastępuje dowolny ciąg znaków, ? – jeden znak.","Co oznacza * w Znajdź i zamień?",["Jeden znak","Dowolny ciąg znaków","Liczbę"],1);
Z(P,"Wklej specjalnie","Wklej specjalnie wkleja same wartości, formaty albo transponuje dane.","Jak wkleić sam wynik formuły?",["Wklej specjalnie → Wartości","Ctrl+Z","Wstaw → Tabela"],0);
Z(P,"Przejdź do – specjalnie","Ctrl+G → Specjalnie zaznacza np. puste komórki, formuły lub błędy.","Jak zaznaczyć wszystkie puste komórki?",["Ctrl+P","Ctrl+B","Ctrl+G → Specjalnie → Puste"],2);
Z(P,"Flash Fill i wypełnianie","Puste komórki możesz wypełnić wartością z góry: zaznacz je, wpisz =komórka powyżej i Ctrl+Enter.","Co zrobi Ctrl+Enter po wpisaniu formuły w zaznaczone komórki?",["Wypełni nią wszystkie zaznaczone","Zapisze plik","Zamknie arkusz"],0);
Z(S2,"Filtry i sortowanie","Ctrl+Shift+L włącza filtry. Sortować można wg wielu kolumn i koloru.","Skrót włączający filtry?",["Ctrl+Alt+F","Ctrl+Shift+L","Ctrl+F"],1);
Z(S2,"Zamrażanie okienek","Widok → Zablokuj okienka trzyma nagłówki widoczne przy przewijaniu.","Po co blokować okienka?",["Dla nagłówków zawsze na widoku","Dla hasła","Dla druku"],0);
Z(S2,"Grupowanie","Dane → Grupuj zwija wiersze i kolumny w sekcje.","Co robi Grupuj?",["Sortuje","Tłumaczy","Zwija wiersze i kolumny w sekcje"],2);
Z(S2,"Nazwane zakresy","Nazwa (np. Sprzedaz) zamiast C2:C99 czyni formułę czytelną. Menedżer nazw: Ctrl+F3.","Po co nazwane zakresy?",["Dla koloru","Dla czytelnych formuł","Dla druku"],1);
Z(S2,"Formatowanie warunkowe","Koloruje komórki według reguł: skale, paski, ikony, własne formuły.","Co zrobi formatowanie warunkowe?",["Zsumuje dane","Usunie wiersze","Pokoloruje komórki wg reguły"],2);
Z(S2,"Walidacja danych","Dane → Walidacja ogranicza wpisy, np. do listy rozwijanej.","Jak zrobić listę rozwijaną?",["Filtr","Walidacja danych → Lista","Scalanie"],1);
Z(S2,"Ochrona arkusza","Recenzja → Chroń arkusz blokuje edycję wybranych komórek.","Co robi Chroń arkusz?",["Blokuje edycję komórek","Ukrywa kolumny","Usuwa formuły"],0);
Z(AN,"Grupowanie dat w tabeli przestawnej","Prawy klik na dacie → Grupuj: lata, kwartały, miesiące.","Jak zrobić podsumowanie miesięczne z dat?",["Użyj COUNT","Usuń daty","Grupuj daty w tabeli przestawnej"],2);
Z(AN,"Pole obliczeniowe","W tabeli przestawnej dodaje własną formułę na polach.","Do czego Pole obliczeniowe?",["Do wykresów","Do własnej formuły w tabeli przestawnej","Do sortowania"],1);
Z(AN,"GETPIVOTDATA","Pobiera konkretną wartość z tabeli przestawnej.","Co robi GETPIVOTDATA?",["Pobiera wartość z tabeli przestawnej","Tworzy wykres","Importuje CSV"],0);
Z(AN,"Szukaj wyniku (Goal Seek)","Dane → Analiza warunkowa → Szukaj wyniku dobiera wartość wejściową do zadanego celu.","Co robi Goal Seek?",["Sortuje","Dobiera wartość wejściową do celu","Łączy tabele"],1);
Z(AN,"Solver","Szuka najlepszego rozwiązania przy ograniczeniach, np. największy zysk.","Do czego Solver?",["Do importu","Do formatowania","Do optymalizacji z ograniczeniami"],2);
Z(AN,"Analysis ToolPak","Dodatek ze statystyką opisową, regresją i histogramem.","Co daje Analysis ToolPak?",["Regresję i statystyki opisowe","Nowe czcionki","Szyfrowanie"],0);
Z(AN,"Tabele danych i scenariusze","Tabela danych liczy wynik dla wielu wartości wejściowych; Menedżer scenariuszy zapisuje warianty założeń.","Co zapisuje Menedżer scenariuszy?",["Wykresy","Warianty założeń","Makra"],1);
Z(WZ,"Wybór wykresu","Liniowy – trend w czasie; słupkowy – porównanie; punktowy – zależność dwóch liczb; kołowy – udziały.","Który wykres pokaże trend w czasie?",["Kołowy","Punktowy","Liniowy"],2);
Z(WZ,"Oś pomocnicza","Druga oś łączy serie o różnych skalach, np. sprzedaż i marżę %.","Po co oś pomocnicza?",["Dla koloru","Dla serii o innej skali","Dla tytułu"],1);
Z(WZ,"Sparklines","Mini-wykresy w komórce: Wstawianie → Wykresy przebiegu w czasie.","Czym są sparklines?",["Mini-wykresami w komórce","Rodzajem formuły","Filtrami"],0);
Z(WZ,"Dashboard","Dashboard to tabele przestawne + fragmentatory + wykresy na jednym arkuszu.","Z czego składa się dashboard?",["Z samych formuł","Z przestawnych, fragmentatorów i wykresów","Z kolorów"],1);
Z(PQ,"Append","Append dokleja wiersze jednej tabeli pod drugą (jak UNION).","Co robi Append?",["Łączy po kluczu","Usuwa kolumny","Dokleja wiersze"],2);
Z(PQ,"Group By","Grupuje wiersze i liczy sumy czy średnie – jak GROUP BY w SQL.","Odpowiednik GROUP BY w Power Query?",["Group By","Append","Unpivot"],0);
Z(PQ,"Czyszczenie danych","Zmiana typów, usuwanie wierszy, Fill Down – każdy krok się zapisuje i powtarza po odświeżeniu.","Co robi odświeżenie zapytania?",["Kasuje dane","Powtarza kroki na nowych danych","Nic"],1);
Z(PQ,"Język M","Każdy krok to formuła w języku M. Kolumny niestandardowe i warunkowe też piszesz w M.","W jakim języku działa Power Query?",["DAX","VBA","M"],2);
Z(DX,"Model danych","Power Pivot łączy tabele relacjami. Schemat gwiazdy: tabela faktów w środku, wymiary dookoła.","Co to schemat gwiazdy?",["Jedna tabela","Fakty w środku, wymiary dookoła","Wykres"],1);
Z(DX,"Miara a kolumna","Miara liczy się w kontekście wykresu, kolumna obliczeniowa – w każdym wierszu.","Która jest liczona w każdym wierszu?",["Kolumna obliczeniowa","Miara","Fragmentator"],0);
Z(DX,"SUMX / FILTER / ALL","SUMX liczy wyrażenie wiersz po wierszu, FILTER zawęża tabelę, ALL zdejmuje filtry.","Która funkcja zdejmuje filtry?",["SUMX","LEN","ALL"],2);
Z(DX,"RELATED / DIVIDE","RELATED pobiera dane z tabeli powiązanej. DIVIDE dzieli bez błędu #DZIEL/0.","Która funkcja dzieli bezpiecznie?",["RELATED","DIVIDE","ALL"],1);
Z(DX,"Czas w DAX","TOTALYTD, SAMEPERIODLASTYEAR i DATEADD porównują okresy w czasie.","Która porównuje do tego samego okresu rok temu?",["SAMEPERIODLASTYEAR","FILTER","DISTINCTCOUNT"],0);
Z(DX,"DISTINCTCOUNT","Liczy unikalne wartości w kolumnie.","Co zrobi DISTINCTCOUNT?",["Zsumuje","Posortuje","Policzy unikalne wartości"],2);
Z(AU,"Makro","Deweloper → Zarejestruj makro nagrywa Twoje kroki jako kod VBA.","Jak zacząć z makrami?",["Zarejestruj makro","Filtr","Walidacja"],0);
Z(AU,"Podstawy VBA","Dim – zmienne, For…Next – pętle, Range i Cells – komórki, On Error – błędy.","Co wskazuje Range(„A1”)?",["Cały arkusz","Komórkę A1","Makro"],1);
Z(AU,"Office Scripts","Odpowiednik makr w Excelu online. Piszesz je w TypeScript.","W czym piszesz Office Scripts?",["DAX","M","TypeScript"],2);
Z(AU,"Szablony i style","Szablon (.xltx) i style komórek dają jednolity wygląd.","Po co szablon?",["Dla jednolitego wyglądu plików","Dla hasła","Dla internetu"],0);
Z(SK,"Alt+= i Ctrl+Shift+strzałka","Alt+= robi autosumę. Ctrl+Shift+strzałka zaznacza do końca danych. Ctrl+; wstawia datę.","Co robi Alt+=?",["Filtr","Autosumę","Zapis"],1);
Z(SK,"Alt+N+V","Wstawia tabelę przestawną.","Skrót do tabeli przestawnej?",["Alt+F4","Ctrl+Q","Alt+N+V"],2);
Z(SK,"Ctrl+[","Przenosi do komórek, z których korzysta formuła.","Co robi Ctrl+[?",["Skacze do źródeł formuły","Kopiuje","Zamyka"],0);
Z(SK,"Szacuj formułę","Formuły → Szacuj formułę pokazuje obliczenia krok po kroku.","Jak zobaczyć formułę krok po kroku?",["Fragmentator","Szacuj formułę","Wklej specjalnie"],1);
Z(TE,"TODAY / NOW","TODAY – dzisiejsza data, NOW – data i godzina. Zmieniają się same.","Która funkcja zwraca też godzinę?",["TODAY","YEAR","NOW"],2);
Z(TE,"WEEKNUM / TEXT","WEEKNUM zwraca numer tygodnia w roku. TEXT zamienia liczbę lub datę na tekst w wybranym formacie.","Co zwraca WEEKNUM?",["Numer tygodnia","Dzień tygodnia","Miesiąc"],0);
Z(TE,"CLEAN","Usuwa niedrukowane znaki z tekstu (np. z importu).","Co robi CLEAN?",["Usuwa niedrukowane znaki","Zmienia wielkość liter","Dodaje spacje"],0);
Z(TE,"HLOOKUP / LOOKUP","HLOOKUP szuka poziomo, w pierwszym wierszu. LOOKUP to uproszczone wyszukiwanie.","Która szuka w pierwszym wierszu?",["VLOOKUP","MATCH","HLOOKUP"],2);
Z(TE,"OFFSET / INDIRECT","Tworzą dynamiczne odwołania, ale są lotne – przeliczają się ciągle i spowalniają plik.","Dlaczego uważać na OFFSET?",["Spowalniają plik","Nie działają","Są płatne"],0);
Z(TE,"ROW / COLUMN / ADDRESS","ROW i COLUMN dają numer wiersza i kolumny. ADDRESS buduje adres tekstem.","Co zwraca ROW(C5)?",["3","5","C"],1);
Z(TE,"LET / LAMBDA","LET nadaje nazwy zmiennym w formule. LAMBDA tworzy własną funkcję.","Co robi LET?",["Filtruje","Łączy teksty","Nadaje nazwy w formule"],2);
Z(TE,"MAP / REDUCE / SCAN","Działają na tablicach z LAMBDA. REDUCE zwija tablicę do jednej wartości; BYROW, BYCOL i MAKEARRAY też.","Która zwija tablicę do jednej wartości?",["MAP","REDUCE","SEQUENCE"],1);
Z(TE,"Spill (#)","A1# oznacza cały wynik rozlanej formuły z A1. RANDARRAY losuje liczby, WRAPROWS zawija wektor w wiersze.","Co oznacza A1#?",["Cały zakres rozlania","Błąd","Komentarz"],0);
Z(TE,"NORM.DIST / NORM.INV","NORM.DIST – prawdopodobieństwo w rozkładzie normalnym. NORM.INV – odwrotność.","Która zwraca wartość dla danego prawdopodobieństwa?",["NORM.DIST","SUM","NORM.INV"],2);
Z(TE,"T.TEST / CHISQ.TEST","Testy hipotez. T.TEST porównuje średnie, CHISQ.TEST – rozkłady kategorii. Wynik to p-value.","Co zwraca T.TEST?",["Średnią","p-value","Wykres"],1);
Z(TE,"CONFIDENCE.NORM","Zwraca margines błędu do przedziału ufności.","Co oblicza CONFIDENCE.NORM?",["Sumę","Datę","Margines błędu"],2);
Z(TE,"FREQUENCY","Zlicza, ile wartości wpada w przedziały (kosze) – podstawa histogramu.","Do czego FREQUENCY?",["Do zliczania w przedziałach","Do dat","Do tekstu"],0);
Z(TE,"LINEST / TREND / GROWTH","LINEST – pełna regresja, TREND – prognoza liniowa, GROWTH – wykładnicza.","Która prognozuje wykładniczo?",["TREND","GROWTH","LINEST"],1);
Z(TE,"IRR","Wewnętrzna stopa zwrotu: stopa, przy której NPV = 0.","Czym jest IRR?",["Ratą kredytu","Datą","Stopą, przy której NPV = 0"],2);
const ORD=["Podstawy","Warunki","Tekst","Daty","Wyszukiwanie","Tablice dynamiczne","Statystyka","Finanse",P,S2,AN,"Narzędzia",WZ,PQ,DX,AU,SK,TE];L.sort((a,b)=>ORD.indexOf(a[0])-ORD.indexOf(b[0]));
const EXTRA={
"NPV":[`Pieniądz dziś jest wart więcej niż ten sam pieniądz za rok (można go zainwestować). NPV „cofa” przyszłe wpływy do wartości z dzisiaj.`,`Wynik 248,69 zł: trzy wpływy po 100 zł (za 1, 2 i 3 lata) są dziś warte tylko tyle. Obliczenie: 100/1,1 + 100/1,21 + 100/1,331 ≈ 90,91 + 82,64 + 75,13. Jeśli inwestycja kosztuje mniej niż 248,69 zł, to się opłaca.`],
"PMT":[`Rata to stała kwota płacona co okres, aż spłacisz pożyczkę z odsetkami. Stopa musi być za ten sam okres co rata (przy ratach miesięcznych: stopa roczna ÷ 12).`,`Wynik −556,63: co okres wpłacasz 556,63 zł (minus znaczy „wydatek”). Po 10 okresach spłacisz 5000 zł pożyczki razem z odsetkami; łącznie oddasz ok. 5566 zł.`],
"FV / PV":[`FV mówi, ile uzbierasz, regularnie odkładając pieniądze z odsetkami. PV robi odwrotnie: ile dziś warte są przyszłe pieniądze.`,`Wynik 1257,79: odkładasz 100 zł na okres przez 10 okresów przy stopie 5%. Wpłacisz 1000 zł, a resztę (ok. 257,79 zł) dopiszą odsetki.`],
"STDEV / VAR":[`Wariancja i odchylenie standardowe mówią, jak bardzo dane „rozjeżdżają się” wokół średniej. Odchylenie to pierwiastek z wariancji, więc ma te same jednostki co dane.`,`Dane y: 2, 4, 5, 4, 6; średnia 4,2. Wynik 1,48 znaczy, że wartości zwykle odbiegają od średniej o ok. 1,48. Wariancja próby to 2,2 (suma kwadratów różnic 8,8 ÷ 4). Im mniejszy wynik, tym dane są bliżej siebie.`],
"PERCENTILE / QUARTILE":[`Percentyl 90% to wartość, poniżej której leży 90% danych. Kwartyle dzielą dane na cztery równe części.`,`Dane y po posortowaniu: 2, 4, 4, 5, 6. Wynik 4: co najmniej 25% danych jest nie większe niż 4. Kwartyl 2 to mediana (4), kwartyl 3 to 5.`],
"MODE.SNGL":[`Moda to „najpopularniejsza” liczba, czyli ta, która pojawia się najczęściej.`,`Wynik 4: w kolumnie B (2, 4, 5, 4, 6) liczba 4 występuje dwa razy, a pozostałe po razie.`],
"CORREL / COVARIANCE.S":[`Korelacja pokazuje, czy dwie kolumny „trzymają się razem”: +1, gdy rosną razem; −1, gdy jedna rośnie, a druga maleje; 0, gdy nie ma związku. Kowariancja to surowa wersja: jej znak mówi o kierunku, a wielkość zależy od jednostek.`,`Wynik 0,85 jest blisko 1, więc gdy x rośnie, y zwykle też rośnie – silna zależność dodatnia.`],
"SLOPE / INTERCEPT / RSQ":[`Regresja liniowa dopasowuje prostą do punktów. SLOPE to nachylenie (o ile rośnie y, gdy x wzrośnie o 1), INTERCEPT to y dla x = 0, RSQ to jakość dopasowania od 0 do 1.`,`Wynik 0,8: gdy x rośnie o 1, y rośnie średnio o 0,8. Cała prosta: y = 0,8·x + 1,8. RSQ ≈ 0,73 znaczy, że prosta tłumaczy ok. 73% zmienności y.`],
"FORECAST.LINEAR":[`Excel dopasowuje prostą do znanych par (x, y) i podaje, jakie y wypadnie dla nowego x. To prognoza, a nie pewność.`,`Wynik 6,6: prosta y = 0,8·x + 1,8 dla x = 6 daje 0,8·6 + 1,8 = 6,6.`],
"RANK":[`RANK ustawia liczbę w rankingu. Domyślnie 1 to największa wartość.`,`Wynik 2: ilości to 10, 5, 8, 20, 7. Większa od 10 jest tylko 20, więc 10 jest na drugim miejscu.`],
"LARGE / SMALL":[`k to numer miejsca w rankingu: 1 = pierwsze, 2 = drugie itd. LARGE liczy od największej, SMALL od najmniejszej.`,`Wynik 10: ilości od największej to 20, 10, 8, 7, 5. Drugie miejsce zajmuje 10.`],
"MEDIAN":[`Mediana to środek listy po posortowaniu. Jest odporna na skrajne wartości, w przeciwieństwie do średniej.`,`Wynik 8: ilości po posortowaniu to 5, 7, 8, 10, 20 – środkowa jest 8. Średnia wynosi 10, bo „ciągnie” ją wysoka wartość 20.`],
"SUBTOTAL / AGGREGATE":[``,`Wynik 50 to suma wszystkich ilości. Gdy ukryjesz część wierszy filtrem, SUBTOTAL policzy tylko widoczne, a zwykłe SUM nadal policzy wszystkie.`],
"SUMPRODUCT":[`Świetny do liczenia „cena × ilość”: mnoży odpowiadające sobie komórki i dodaje wyniki.`,`Wynik 121 to łączna wartość magazynu: 3·10 + 4·5 + 2·8 + 1·20 + 5·7 = 30 + 20 + 16 + 20 + 35.`],
"DATEDIF":[``,`Wynik 2: od 15 stycznia do 20 marca minęły 2 pełne miesiące (trzeci jeszcze się nie skończył). Z „D” dostaniesz dni, z „Y” lata.`],
"WEEKDAY":[``,`Wynik 4: 15 stycznia 2026 to czwartek, a przy typie 2 poniedziałek = 1, więc czwartek = 4.`],
"DATE":[``,`Wynik to numer dnia (licznik dni od 1900 r.), bo tak Excel trzyma daty. Po sformatowaniu komórki jako Data zobaczysz 15.01.2026.`],
"IFERROR":[``,`Dzielenie przez 0 daje błąd. IFERROR go łapie i zamiast błędu pokazuje „brak”. Wynik „brak” znaczy, że obliczenie się nie udało.`],
"Tabela przestawna":[`Tabela przestawna sama grupuje i liczy dane – bez formuł.`,`Dane: Jabłko, Owoce, 10; Gruszka, Owoce, 5; Marchew, Warzywa, 8. Przeciągasz „Kategoria” do Wierszy, a „Ilość” do Wartości:<br>Owoce → 15, Warzywa → 8, Suma całkowita → 23.`],
"Fragmentator (Slicer)":[``,`W tabeli przestawnej z kategoriami klikasz przycisk „Owoce” we fragmentatorze, a tabela pokazuje tylko Owoce (15).`],
"F4 i adresy":[`Znak $ „zamraża” część adresu: $A$1 – kolumnę i wiersz, A$1 – tylko wiersz, $A1 – tylko kolumnę.`,`W B1 wpisujesz <code>=A1*$D$1</code> i kopiujesz w dół: A1 zmienia się na A2, A3…, a $D$1 (np. stawka VAT) zostaje stałe.`],
"Ctrl+T":[``,`Po Ctrl+T zakres A1:C10 staje się tabelą. Formuła <code>=SUM(Tabela1[Ilość])</code> sama obejmie nowe wiersze, gdy dopiszesz dane na dole.`],
"Flash Fill":[``,`W kolumnie A: „Jan Nowak”, w B1 wpisujesz „Nowak”. W B2 zaczynasz pisać kolejne nazwisko i naciskasz Ctrl+E: Excel domyśla się wzoru i wypełnia resztę.`],
"Power Query: Merge":[``,`Tabela Zamówienia (Produkt, Ilość) i tabela Ceny (Produkt, Cena). Merge po kolumnie „Produkt” dodaje do zamówień kolumnę „Cena” – jak <code>LEFT JOIN</code> w SQL.`],
"Power Query: Unpivot":[``,`Przed: produkt w jednym wierszu z kolumnami Sty, Lut, Mar. Po Unpivot: każdy miesiąc w osobnym wierszu, np. „Jabłko | Sty | 100”. Taki układ łatwo wrzucić do tabeli przestawnej.`],
"DAX: CALCULATE":[``,`<code>Sprzedaż Owoce = CALCULATE(SUM(Sprzedaz[Kwota]), Produkty[Kategoria]="Owoce")</code> – suma tylko dla owoców, niezależnie od tego, co wybrano na wykresie.`],
"Model danych":[``,`Tabela faktów <b>Sprzedaż</b> (data, produkt, kwota) leży w środku, a dookoła tabele wymiarów: <b>Produkty</b>, <b>Daty</b>, <b>Klienci</b>. Relacje po kluczach pozwalają pokazać kwotę wg produktu i miesiąca na jednym wykresie.`],
"Miara a kolumna":[``,`Kolumna obliczeniowa: <code>Marża = [Cena] - [Koszt]</code> – liczy się w każdym wierszu.<br>Miara: <code>Suma sprzedaży = SUM(Sprzedaz[Kwota])</code> – liczy się dopiero w wykresie, dla wybranych filtrów.`],
"SUMX / FILTER / ALL":[``,`<code>Wartość = SUMX(Sprzedaz, Sprzedaz[Ilość] * Sprzedaz[Cena])</code> – mnoży w każdym wierszu i sumuje.<br><code>Razem = CALCULATE([Suma sprzedaży], ALL(Produkty))</code> – suma ze wszystkich produktów mimo filtra na jeden (przydatne do udziału %).`],
"RELATED / DIVIDE":[``,`<code>Kategoria = RELATED(Produkty[Kategoria])</code> – w tabeli Sprzedaż podaje kategorię z tabeli Produkty.<br><code>Marża % = DIVIDE([Zysk], [Sprzedaż])</code> – gdy sprzedaż = 0, zamiast błędu da puste pole.`],
"Czas w DAX":[``,`<code>Rok temu = CALCULATE([Suma sprzedaży], SAMEPERIODLASTYEAR(Daty[Data]))</code> – sprzedaż z tego samego okresu rok wcześniej. Np. 120 tys. teraz vs 100 tys. rok temu = +20%.`],
"DISTINCTCOUNT":[``,`<code>Liczba klientów = DISTINCTCOUNT(Sprzedaz[Klient])</code>: jeśli Anna kupiła 3 razy, a Jan 2 razy, wynik to 2 (każdy klient liczy się raz), a zwykłe COUNT dałoby 5.`],
"TODAY / NOW":[`Obie funkcje nie mają argumentów i przeliczają się same przy każdym otwarciu pliku.`,`<code>=TODAY()</code> → dzisiejsza data, np. 12.11.2026<br><code>=NOW()</code> → data i godzina, np. 12.11.2026 14:35<br><code>=TODAY()-A1</code> → ile dni minęło od daty w A1.`],
"WEEKNUM / TEXT":[``,`<code>=WEEKNUM(A1)</code> dla 15.01.2026 → 3 (trzeci tydzień roku).<br><code>=TEXT(A1,"yyyy-mm-dd")</code> → „2026-01-15” jako tekst. W polskim Excelu kody formatu bywają po polsku (rrrr zamiast yyyy).`],
"CLEAN":[``,`Jeśli A1 zawiera tekst z importu z ukrytym znakiem nowej linii, <code>=CLEAN(A1)</code> zwraca ten sam tekst bez niego. Często łączysz: <code>=TRIM(CLEAN(A1))</code>.`],
"HLOOKUP / LOOKUP":[`VLOOKUP szuka w pierwszej kolumnie w dół, a HLOOKUP w pierwszym wierszu w prawo.`,`W wierszu 1 miesiące (Sty, Lut, Mar), w wierszu 2 sprzedaż (100, 120, 90).<br><code>=HLOOKUP("Lut",A1:C2,2,FALSE)</code> → 120 (znajduje „Lut” w wierszu 1 i bierze wartość z wiersza 2).`],
"OFFSET / INDIRECT":[``,`<code>=OFFSET(A1,2,1)</code> → wartość z B3 (2 wiersze w dół i 1 kolumna w prawo od A1).<br><code>=INDIRECT("A"&amp;5)</code> → wartość z A5; adres składasz z tekstu.`],
"ROW / COLUMN / ADDRESS":[``,`<code>=ROW(B7)</code> → 7<br><code>=COLUMN(B7)</code> → 2 (B to druga kolumna)<br><code>=ADDRESS(7,2)</code> → „$B$7”.`],
"LET / LAMBDA":[``,`<code>=LET(x,A1*2,x+x)</code>: najpierw liczy x = A1·2, potem x+x. Dla A1 = 5: x = 10, wynik 20.<br><code>=LAMBDA(a,a*2)(5)</code> → 10 (własna funkcja „razy 2”).`],
"MAP / REDUCE / SCAN":[``,`Dla liczb 1, 2, 3 w A1:A3:<br><code>=REDUCE(0,A1:A3,LAMBDA(s,x,s+x))</code> → 6 (0+1+2+3).<br><code>=SCAN(0,A1:A3,LAMBDA(s,x,s+x))</code> → 1, 3, 6 (suma narastająca).<br><code>=MAP(A1:A3,LAMBDA(x,x*x))</code> → 1, 4, 9.`],
"Spill (#)":[``,`Jeśli w A1 wpiszesz <code>=SEQUENCE(5)</code>, wynik rozleje się na A1:A5. Formuła <code>=SUM(A1#)</code> zsumuje cały ten wynik (15) i dopasuje się, gdy zmienisz 5 na 10.`],
"NORM.DIST / NORM.INV":[``,`Wzrost: średnia 170 cm, odchylenie 10 cm.<br><code>=NORM.DIST(180,170,10,TRUE)</code> → ok. 0,84: 84% osób ma do 180 cm.<br><code>=NORM.INV(0.84,170,10)</code> → ok. 180 cm (odwrotnie: dla 84% szukamy wzrostu).`],
"T.TEST / CHISQ.TEST":[``,`Porównujesz oceny dwóch grup: <code>=T.TEST(A1:A10,B1:B10,2,2)</code> → np. 0,03. Jeśli p-value jest mniejsze niż 0,05, różnicę średnich zwykle uznaje się za istotną. Wynik 0,40 znaczyłby, że różnica może być przypadkowa.`],
"CONFIDENCE.NORM":[``,`<code>=CONFIDENCE.NORM(0.05,10,100)</code> → ok. 1,96. Jeśli średnia z próby to 50, prawdziwa średnia leży w przedziale 50 ± 1,96, czyli od 48,04 do 51,96 (z pewnością 95%).`],
"FREQUENCY":[``,`Wyniki: 3, 7, 12, 18. Kosze: 5, 10, 15. <code>=FREQUENCY(A1:A4,B1:B3)</code> → 1, 1, 1, 1: do 5 jest jedna wartość (3), do 10 jedna (7), do 15 jedna (12), powyżej 15 jedna (18).`],
"LINEST / TREND / GROWTH":[``,`Sprzedaż rośnie o ok. 10 szt. co miesiąc.<br><code>=TREND(B1:B6,A1:A6,7)</code> → prognoza liniowa na miesiąc 7 (dodaje ok. 10).<br><code>=GROWTH(B1:B6,A1:A6,7)</code> → prognoza wykładnicza (mnoży, np. +10% co miesiąc).<br><code>=LINEST(B1:B6,A1:A6)</code> → nachylenie i wyraz wolny prostej.`],
"IRR":[`NPV = 0 oznacza, że inwestycja zwraca dokładnie tyle, ile kosztuje przy danej stopie.`,`Wydajesz 1000 zł, potem dostajesz 600 zł i 600 zł: <code>=IRR({-1000,600,600})</code> → ok. 13%. Jeśli alternatywa daje mniej niż 13%, inwestycja jest opłacalna.`]
};
/* ===== Interfejs ===== */
const $=s=>document.querySelector(s);try{['xl','xlp','xln'].forEach(k=>{localStorage.removeItem(k);sessionStorage.removeItem(k)})}catch(e){}
let cur=0,done=[];try{done=JSON.parse(sessionStorage.getItem('xl')||'[]').filter(x=>typeof x=='string')}catch(e){}
let uname='';try{uname=sessionStorage.getItem('xln')||''}catch(e){}
let score=0;try{score=+sessionStorage.getItem('xlp')||0}catch(e){}
const save=()=>{try{sessionStorage.setItem('xl',JSON.stringify(done));sessionStorage.setItem('xlp',score)}catch(e){}};
const dn=()=>L.filter(l=>done.includes(l[1])).length;
const col=n=>String.fromCharCode(65+n),show=v=>v===true?'TRUE':v===false?'FALSE':v===''?'(pusto)':typeof v=='number'?String(Math.round(v*1e6)/1e6):String(v),esc=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function menu(){let h='',g='';L.forEach((l,i)=>{if(l[0]!=g){g=l[0];h+=`<h3>${g}</h3>`}h+=`<button class="${i==cur?'on ':''}${done.includes(L[i][1])?'ok':''}" onclick="go(${i})">${i+1}. ${l[1]}</button>`});
$('#menu').innerHTML=h;$('#pb').style.width=dn()/L.length*100+'%';$('#xp').textContent=`${dn()}/${L.length} lekcji`;$('#pts').textContent=score;who()}
function grid(d){const g=G[d];return `<table><tr><th></th>${g[0].map((_,c)=>`<th>${col(c)}${(H[d]||[])[c]?`<small>${H[d][c]}</small>`:''}</th>`).join('')}</tr>${g.map((r,i)=>`<tr><th>${i+1}</th>${r.map(v=>`<td>${d=='D'?dd(v).toISOString().slice(0,10):v}</td>`).join('')}</tr>`).join('')}</table><div class="cap">Pod literami kolumn podano, co zawiera każda kolumna. W formułach używasz liter i numerów wierszy.</div>`}
function go(i){cur=i;try{history.replaceState(null,'','#'+(i+1))}catch(e){}const l=L[i],quiz=l[3]===null,X=EXTRA[l[1]];let h=`<h2>${l[1]}</h2><div class="grp">${l[0]}</div><div class="box"><div class="lbl">Wyjaśnienie</div>${l[2]}${X&&X[0]?`<p class="more">${X[0]}</p>`:''}</div>`;
if(quiz){h+=(X&&X[1]?`<div class="box ex"><div class="lbl">Przykład</div>${X[1]}</div>`:'')+`<div class="box"><div class="lbl">Zadanie</div>${l[4]}${l[5].map((o,k)=>`<button class="opt" onclick="pick(${k})">${o}</button>`).join('')}<div class="msg" id="r"></div></div>`}
else{let ex='';try{ex=show(ev(l[3],G[l[6]]))}catch(e){}
h+=`<div class="box ex"><div class="lbl">Przykład</div><code>=${l[3]}</code> → <b>${ex}</b>${grid(l[6])}${X&&X[1]?`<div class="mean"><b>Co to znaczy:</b> ${X[1]}</div>`:''}</div>
<div class="box"><div class="lbl">Zadanie</div>${l[4]}<div class="fx" style="margin-top:8px"><b>fx</b><input id="f" autocomplete="off" spellcheck="false" onkeydown="if(event.key=='Enter')chk()"></div>
<div class="row"><button class="b p" onclick="chk()">Sprawdź</button><button class="b" onclick="hint()">Pokaż rozwiązanie</button></div><div class="msg" id="r"></div></div>`}
h+=`<div class="row"><button class="b" onclick="toc()">Spis treści</button>${i>0?`<button class="b" onclick="go(${i-1})">Wstecz</button>`:''}${i<L.length-1?`<button class="b p" onclick="go(${i+1})">Dalej</button>`:''}</div>`;
$('#m').innerHTML=h;menu();const f=$('#f');if(f)f.focus()}
function mark(ok){const t=L[cur][1];if(done.includes(t))return 0;score+=ok?1:-1;if(ok)done.push(t);save();menu();return ok?1:-1}
function win(){const p=mark(true);$('#r').className='msg y';return p}
function resetAll(){if(confirm('Zresetować cały postęp i punkty?')){done=[];score=0;save();go(0)}}
function chk(){const l=L[cur],g=G[l[6]],r=$('#r');if($('#f').value.trim()[0]!='='){r.className='msg n';r.textContent='Formuła musi zaczynać się od znaku =, np. =SUM(A1:A5).';return}let u;try{u=ev($('#f').value,g)}catch(e){r.className='msg n';r.textContent='Formuła zawiera błąd. Sprawdź nazwy funkcji, nawiasy i przecinki.'+(mark(false)?' −1 pkt':'');return}
const same=(a,b)=>typeof a=='number'&&typeof b=='number'?Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(a),Math.abs(b)):typeof a==typeof b&&eq(a,b);
const vars=g=>[1,2,3].map(k=>g.map((r,i)=>r.map((v,j)=>typeof v=='number'?v+k*3+((i*2+j*3+k)%5)+1:v)));
const fns=x=>x.toUpperCase().match(/[A-Z][A-Z0-9.]*(?=\()/g)||[];
const s=ev(l[5],g);let why='',val=$('#f').value;
if(!same(s,u))why='wynik';else{let inv=true;for(const v of vars(g)){let sv;try{sv=ev(l[5],v)}catch(e){continue}if(!same(sv,s))inv=false;let uv;try{uv=ev(val,v)}catch(e){why='ogólność';break}if(!same(sv,uv)){why='ogólność';break}}
if(!why&&inv){const uf=fns(val),miss=[...new Set(fns(l[5]))].filter(f=>!uf.includes(f));if(miss.length)why='funkcja:'+miss.join(', ')}}
if(!why){const p=win();r.textContent=`Dobrze! Wynik: ${show(u)}.`+(p?' +1 pkt':'')}
else{r.className='msg n';r.textContent=why=='wynik'?`Twój wynik: ${show(u)}. Spróbuj jeszcze raz.`:why=='ogólność'?`Wynik się zgadza (${show(u)}), ale formuła nie liczy tego, o co pytamy – działa tylko przypadkiem. Użyj odwołań do danych i właściwych funkcji.`:`Wynik się zgadza, ale użyj w formule: ${why.slice(8)}.`;if(mark(false))r.textContent+=' −1 pkt'}}
function hint(){const l=L[cur];let v='';try{v=show(ev(l[5],G[l[6]]))}catch(e){v='błąd'}$('#r').className='msg';$('#r').innerHTML=`Rozwiązanie: <code>=${esc(l[5])}</code><br>Wynik tej formuły: <b>${esc(v)}</b>`}
function pick(k){const l=L[cur],r=$('#r');if(k==l[6]){const p=win();r.textContent='Dobrze!'+(p?' +1 pkt':'')}else{r.className='msg n';r.textContent='Niestety nie. Spróbuj jeszcze raz.'+(mark(false)?' −1 pkt':'')}}
function toc(q=''){const n=dn(),qq=q.toLowerCase();let h=`<h2>Spis treści</h2><div class="grp">${n}/${L.length} lekcji ukończonych · Punkty: ${score}</div><div class="bar big"><i style="width:${n/L.length*100}%"></i></div>
<div class="fx" style="margin:12px 0"><b>Szukaj</b><input id="q" placeholder="np. VLOOKUP, tabela przestawna…" value="${q.replace(/"/g,'&quot;')}" oninput="toc(this.value)"></div>`;
const gs=[...new Set(L.map(l=>l[0]))];gs.forEach(g=>{const it=L.map((l,i)=>[l,i]).filter(([l])=>l[0]==g),d=it.filter(([l])=>done.includes(l[1])).length,sh=it.filter(([l])=>!qq||l[1].toLowerCase().includes(qq)||l[2].toLowerCase().includes(qq));
if(!sh.length)return;h+=`<div class="box"><div class="lbl">${g} <span class="cnt">${d}/${it.length}</span></div><div class="bar"><i style="width:${d/it.length*100}%"></i></div>`+
sh.map(([l,i])=>`<button class="tr${done.includes(l[1])?' ok':''}${i==cur?' on':''}" onclick="go(${i})"><span class="no">${i+1}</span><span class="tt">${l[1]}</span><span class="ty">${l[3]===null?'test':'formuła'}</span><span class="st">${done.includes(l[1])?'✓':''}</span></button>`).join('')+`</div>`});
if(!$('#q')||true){h+=`<div class="row"><button class="b" onclick="resetAll()">Resetuj postęp</button></div>`}
$('#m').innerHTML=h;menu();const f=$('#q');if(f){f.focus();f.setSelectionRange(q.length,q.length)}}
const MAIL_KEY='95fe3134-bfd9-47e6-9279-c4cf47c2e525';let sending=false;
function who(){$('#who').innerHTML=uname?`Użytkownik: <b>${esc(uname)}</b> · <a href="#" onclick="showLogin();return false">zmień</a>`:'';$('#ov').style.display=uname?'none':'flex'}
function showLogin(){$('#ov').style.display='flex';const i=$('#nm');i.value=uname;i.focus()}
function doLogin(){const v=$('#nm').value.trim().slice(0,60);if(!v){$('#lerr').textContent='Wpisz swoje imię.';return}uname=v;$('#lerr').textContent='';try{sessionStorage.setItem('xln',uname)}catch(e){}who()}
function copyRes(b){try{navigator.clipboard.writeText(`${uname} - ${dn()}/${L.length}`);b.textContent='Skopiowano'}catch(e){b.textContent='Skopiuj ręcznie z ekranu'}}
async function finish(){if(sending)return;if(!uname){showLogin();return}
const n=dn(),res=`${uname} - ${n}/${L.length}`;let st='',ok=false;sending=true;
if(MAIL_KEY.startsWith('WSTAW'))st='';
else{try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:MAIL_KEY,subject:res,from_name:uname,name:uname,message:`${res}\nPunkty: ${score}`})});const d=await r.json();ok=!!d.success;st=ok?'':'Błąd serwera ('+r.status+'): '+(d.message||'brak opisu')}catch(e){st='Błąd połączenia: '+e.message}}
sending=false;$('#m').innerHTML=`<h2>Test zakończony</h2><div class="box"><div class="lbl">Twój wynik</div><p style="font-size:22px;margin:6px 0"><b>${esc(res)}</b></p><div>Punkty: ${score}</div><div class="msg ${ok?'y':'n'}">${st}</div>${ok?'':'<div class="row"><button class="b" onclick="copyRes(this)">Skopiuj wynik</button></div>'}</div><div class="row"><button class="b p" onclick="go(cur)">Wróć do nauki</button></div>`}
addEventListener('hashchange',()=>{const k=+location.hash.slice(1);if(k>=1&&k<=L.length&&k-1!=cur)go(k-1)});
const h0=+location.hash.slice(1);go(h0>=1&&h0<=L.length?h0-1:(dn()<L.length?Math.max(0,[...L.keys()].find(i=>!done.includes(L[i][1]))):0));
