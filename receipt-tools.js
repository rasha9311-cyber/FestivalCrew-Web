(function(global){
'use strict';
const ROUND = value => Math.round((Number(value)||0)*100)/100;
const MONEY = /(-?\d{1,5}[,.]\d{2})(?!\d)/g;
const TOTAL = /\b(?:gesamt(?:betrag)?|endsumme|endbetrag|summe|total|zu\s+zahlen)\b/i;
const SKIP = /^(?:zwischensumme|summe|gesamt|total|endbetrag|betrag\s*eur|zu\s*zahlen|kreditkarte|ec-?karte|kartenzahlung|bar\s+gegeben|rueckgeld|rückgeld|steuer|mwst|ust|ust\.|ust-id|netto|brutto|steuerbetrag|kassierer|bon-?nr|rechnung|beleg|zahlung|visa|mastercard|vielen\s+dank|datum|uhrzeit|filiale|tel\.|telefon|adresse|rabatt|coupon|gutschein|storno|rückgabe|rueckgabe|retoure)\b/i;
function amount(value){return ROUND(Number(String(value??'').replace(/\s/g,'').replace(',','.')))}
function normalize(value){
return String(value??'').toLocaleLowerCase('de-DE').normalize('NFD').replace(/[\u0300-\u036f]/g,'')
.replace(/ß/g,'ss').replace(/[^a-z0-9]+/g,' ').replace(/\b(?:stk|stueck|flasche|packung|dose|eur|kg|liter|l|ml)\b/g,'').replace(/\s+/g,' ').trim();
}
function editDistance(a,b){
let prev=Array.from({length:b.length+1},(_,i)=>i);
for(let i=0;i<a.length;i++){let row=[i+1];for(let j=0;j<b.length;j++)row.push(Math.min(row[j]+1,prev[j+1]+1,prev[j]+(a[i]===b[j]?0:1)));prev=row;}
return prev[b.length];
}
function similarity(a,b){
let x=normalize(a),y=normalize(b);if(!x||!y)return 0;if(x===y)return 1;
if(x.length>=4&&y.length>=4&&(x.includes(y)||y.includes(x)))return .86;
const xs=x.split(' ').filter(t=>t.length>=3),ys=y.split(' ').filter(t=>t.length>=3);
let common=xs.filter(t=>ys.some(u=>u===t||(t.length>4&&u.length>4&&(u.includes(t)||t.includes(u))))).length;
const token=common/Math.max(xs.length,ys.length,1);
const dist=1-editDistance(x,y)/Math.max(x.length,y.length);
return Math.max(token*.88,dist*.78);
}
function bestMatch(title,shopping){
let results=(shopping||[]).map(item=>({id:item.id,score:similarity(title,item.title)})).sort((a,b)=>b.score-a.score);
return results[0]?.score>=.72?results[0].id:null;
}
function dateFromLines(lines){
const text=lines.join(' '),m=text.match(/\b(\d{2})[./-](\d{2})[./-](\d{2}|\d{4})\b/);
if(!m)return '';
let y=Number(m[3]);if(y<100)y+=y>75?1900:2000;
let d=Number(m[1]),mon=Number(m[2]);
return mon>0&&mon<=12&&d>0&&d<=31?String(y)+'-'+String(mon).padStart(2,'0')+'-'+String(d).padStart(2,'0'):'';
}
function receiptTotal(lines){
let found=[];
for(let i=0;i<lines.length;i++){
 const l=lines[i];
 if(!TOTAL.test(l)||/zwischen|steuer|rabatt/i.test(l))continue;
 const tokens=[...l.matchAll(MONEY)];
 const look=tokens.length?tokens:[...(lines[i+1]||'').matchAll(MONEY)];
 if(look.length){const v=amount(look[look.length-1][1]);if(v>=0)found.push(v);}
}
return found.length?found[found.length-1]:null;
}
function parse(text){
const lines=String(text||'').split(/\r?\n/).map(s=>s.replace(/[\t ]+/g,' ').trim()).filter(Boolean);
const total=receiptTotal(lines),date=dateFromLines(lines);
const store=lines.slice(0,5).find(x=>x.length>2&&x.length<46&&!/\d{2}[.,]\d{2}/.test(x)&&!/\b(?:www|http|kassenbon|beleg|rechnung|datum|uhrzeit)\b/i.test(x))||'';
let items=[];
for(let i=0;i<lines.length;i++){
 const line=lines[i];
 if(/\\b\\d{2}[./-]\\d{2}[./-]\\d{2,4}\\b/.test(line)||SKIP.test(line)||TOTAL.test(line)||/^[-=*_\s]+$/.test(line)||/\b(?:mwst|ust\.?)\s*\d+\s*%/i.test(line))continue;
 const amounts=[...line.matchAll(MONEY)].filter(m=>!/[a-z]/i.test(line[m.index+m[0].length]||''));
 if(!amounts.length)continue;
 const last=amounts[amounts.length-1],price=amount(last[1]);
 if(price<=0||price>9999)continue;
 let title=line.slice(0,last.index).replace(/(?:\s+\d{1,5}[,.]\d{2})+\s*$/g,'').trim();
 if(!title)continue;
 title=title.replace(/^\d{8,14}\s+/,'').replace(/\s+[a-d]\s*$/i,'').trim();
 let qty=1,qtyPrefix=title.match(/^(\d{1,3})\s*(?:x|×)\s*(.+)$/i);
 if(qtyPrefix){qty=Math.max(1,Math.min(999,Number(qtyPrefix[1])));title=qtyPrefix[2].trim();}
 else {let q=title.match(/^(\d{1,2})\s+([^\d].{2,})$/);if(q){qty=Number(q[1]);title=q[2].trim();}}
 title=title.replace(/^[-*]+/,'').replace(/\s{2,}/g,' ').trim();
 if(title.length<2||/^\d+$/.test(title)||/^[\d.,\s]+$/.test(title)||/\b(?:summe|gesamt|kartenzahlung|barzahlung|wechselgeld|transaktion|rechnung)\b/i.test(title))continue;
 let unitPrice=qty>1?ROUND(price/qty):price;
 if(amounts.length>=2&&qty>1){let candidate=amount(amounts[amounts.length-2][1]);if(Math.abs(candidate*qty-price)<.06)unitPrice=candidate;}
 items.push({title:title.slice(0,100),qty,unitPrice,selected:true,matchId:''});
}
return {items:items.slice(0,100),total,store:store.slice(0,120),date,rawLines:lines.length};
}
global.FestivalReceipt={parse,bestMatch,similarity,normalize};
})(window);