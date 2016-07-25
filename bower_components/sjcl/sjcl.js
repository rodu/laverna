"use strict";function q(t){throw t}function w(t,e,c){4!==e.length&&q(new sjcl.exception.invalid("invalid aes block size"));var s=t.b[c],n=e[0]^s[0],i=e[c?3:1]^s[1],r=e[2]^s[2];e=e[c?1:3]^s[3];var o,a,l,h,u=s.length/4-2,d=4,f=[0,0,0,0];o=t.l[c],t=o[0];var p=o[1],m=o[2],j=o[3],g=o[4];for(h=0;h<u;h++)o=t[n>>>24]^p[i>>16&255]^m[r>>8&255]^j[255&e]^s[d],a=t[i>>>24]^p[r>>16&255]^m[e>>8&255]^j[255&n]^s[d+1],l=t[r>>>24]^p[e>>16&255]^m[n>>8&255]^j[255&i]^s[d+2],e=t[e>>>24]^p[n>>16&255]^m[i>>8&255]^j[255&r]^s[d+3],d+=4,n=o,i=a,r=l;for(h=0;4>h;h++)f[c?3&-h:h]=g[n>>>24]<<24^g[i>>16&255]<<16^g[r>>8&255]<<8^g[255&e]^s[d++],o=n,n=i,i=r,r=e,e=o;return f}function x(t,e){var c,s,n,i=e.slice(0),r=t.s,o=t.b,a=r[0],l=r[1],h=r[2],u=r[3],d=r[4],f=r[5],p=r[6],m=r[7];for(c=0;64>c;c++)16>c?s=i[c]:(s=i[c+1&15],n=i[c+14&15],s=i[15&c]=(s>>>7^s>>>18^s>>>3^s<<25^s<<14)+(n>>>17^n>>>19^n>>>10^n<<15^n<<13)+i[15&c]+i[c+9&15]|0),s=s+m+(d>>>6^d>>>11^d>>>25^d<<26^d<<21^d<<7)+(p^d&(f^p))+o[c],m=p,p=f,f=d,d=u+s|0,u=h,h=l,l=a,a=s+(l&h^u&(l^h))+(l>>>2^l>>>13^l>>>22^l<<30^l<<19^l<<10)|0;r[0]=r[0]+a|0,r[1]=r[1]+l|0,r[2]=r[2]+h|0,r[3]=r[3]+u|0,r[4]=r[4]+d|0,r[5]=r[5]+f|0,r[6]=r[6]+p|0,r[7]=r[7]+m|0}function C(t,e){var c,s=sjcl.random.B[t],n=[];for(c in s)s.hasOwnProperty(c)&&n.push(s[c]);for(c=0;c<n.length;c++)n[c](e)}function E(t){"undefined"!=typeof window&&window.performance&&"function"==typeof window.performance.now?sjcl.random.addEntropy(window.performance.now(),t,"loadtime"):sjcl.random.addEntropy((new Date).valueOf(),t,"loadtime")}function A(t){t.b=B(t).concat(B(t)),t.C=new sjcl.cipher.aes(t.b)}function B(t){for(var e=0;4>e&&(t.f[e]=t.f[e]+1|0,!t.f[e]);e++);return t.C.encrypt(t.f)}function D(t,e){return function(){e.apply(t,arguments)}}var s=void 0,u=!1,sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(t){this.toString=function(){return"CORRUPT: "+this.message},this.message=t},invalid:function(t){this.toString=function(){return"INVALID: "+this.message},this.message=t},bug:function(t){this.toString=function(){return"BUG: "+this.message},this.message=t},notReady:function(t){this.toString=function(){return"NOT READY: "+this.message},this.message=t}}};"undefined"!=typeof module&&module.exports&&(module.exports=sjcl),"function"==typeof define&&define([],function(){return sjcl}),sjcl.cipher.aes=function(t){this.l[0][0][0]||this.G();var e,c,s,n,i=this.l[0][4],r=this.l[1];e=t.length;var o=1;for(4!==e&&6!==e&&8!==e&&q(new sjcl.exception.invalid("invalid aes key size")),this.b=[s=t.slice(0),n=[]],t=e;t<4*e+28;t++)c=s[t-1],(0===t%e||8===e&&4===t%e)&&(c=i[c>>>24]<<24^i[c>>16&255]<<16^i[c>>8&255]<<8^i[255&c],0===t%e&&(c=c<<8^c>>>24^o<<24,o=o<<1^283*(o>>7))),s[t]=s[t-e]^c;for(e=0;t;e++,t--)c=s[3&e?t:t-4],n[e]=4>=t||4>e?c:r[0][i[c>>>24]]^r[1][i[c>>16&255]]^r[2][i[c>>8&255]]^r[3][i[255&c]]},sjcl.cipher.aes.prototype={encrypt:function(t){return w(this,t,0)},decrypt:function(t){return w(this,t,1)},l:[[[],[],[],[],[]],[[],[],[],[],[]]],G:function(){var t,e,c,s,n,i,r,o=this.l[0],a=this.l[1],l=o[4],h=a[4],u=[],d=[];for(t=0;256>t;t++)d[(u[t]=t<<1^283*(t>>7))^t]=t;for(e=c=0;!l[e];e^=s||1,c=d[c]||1)for(i=c^c<<1^c<<2^c<<3^c<<4,i=i>>8^255&i^99,l[e]=i,h[i]=e,n=u[t=u[s=u[e]]],r=16843009*n^65537*t^257*s^16843008*e,n=257*u[i]^16843008*i,t=0;4>t;t++)o[t][e]=n=n<<24^n>>>8,a[t][i]=r=r<<24^r>>>8;for(t=0;5>t;t++)o[t]=o[t].slice(0),a[t]=a[t].slice(0)}},sjcl.bitArray={bitSlice:function(t,e,c){return t=sjcl.bitArray.R(t.slice(e/32),32-(31&e)).slice(1),c===s?t:sjcl.bitArray.clamp(t,c-e)},extract:function(t,e,c){var s=Math.floor(-e-c&31);return((e+c-1^e)&-32?t[e/32|0]<<32-s^t[e/32+1|0]>>>s:t[e/32|0]>>>s)&(1<<c)-1},concat:function(t,e){if(0===t.length||0===e.length)return t.concat(e);var c=t[t.length-1],s=sjcl.bitArray.getPartial(c);return 32===s?t.concat(e):sjcl.bitArray.R(e,s,0|c,t.slice(0,t.length-1))},bitLength:function(t){var e=t.length;return 0===e?0:32*(e-1)+sjcl.bitArray.getPartial(t[e-1])},clamp:function(t,e){if(32*t.length<e)return t;t=t.slice(0,Math.ceil(e/32));var c=t.length;return e&=31,0<c&&e&&(t[c-1]=sjcl.bitArray.partial(e,t[c-1]&2147483648>>e-1,1)),t},partial:function(t,e,c){return 32===t?e:(c?0|e:e<<32-t)+1099511627776*t},getPartial:function(t){return Math.round(t/1099511627776)||32},equal:function(t,e){if(sjcl.bitArray.bitLength(t)!==sjcl.bitArray.bitLength(e))return u;var c,s=0;for(c=0;c<t.length;c++)s|=t[c]^e[c];return 0===s},R:function(t,e,c,n){var i;for(i=0,n===s&&(n=[]);32<=e;e-=32)n.push(c),c=0;if(0===e)return n.concat(t);for(i=0;i<t.length;i++)n.push(c|t[i]>>>e),c=t[i]<<32-e;return i=t.length?t[t.length-1]:0,t=sjcl.bitArray.getPartial(i),n.push(sjcl.bitArray.partial(e+t&31,32<e+t?c:n.pop(),1)),n},g:function(t,e){return[t[0]^e[0],t[1]^e[1],t[2]^e[2],t[3]^e[3]]},byteswapM:function(t){var e,c;for(e=0;e<t.length;++e)c=t[e],t[e]=c>>>24|c>>>8&65280|(65280&c)<<8|c<<24;return t}},sjcl.codec.utf8String={fromBits:function(t){var e,c,s="",n=sjcl.bitArray.bitLength(t);for(e=0;e<n/8;e++)0===(3&e)&&(c=t[e/4]),s+=String.fromCharCode(c>>>24),c<<=8;return decodeURIComponent(escape(s))},toBits:function(t){t=unescape(encodeURIComponent(t));var e,c=[],s=0;for(e=0;e<t.length;e++)s=s<<8|t.charCodeAt(e),3===(3&e)&&(c.push(s),s=0);return 3&e&&c.push(sjcl.bitArray.partial(8*(3&e),s)),c}},sjcl.codec.hex={fromBits:function(t){var e,c="";for(e=0;e<t.length;e++)c+=((0|t[e])+0xf00000000000).toString(16).substr(4);return c.substr(0,sjcl.bitArray.bitLength(t)/4)},toBits:function(t){var e,c,s=[];for(t=t.replace(/\s|0x/g,""),c=t.length,t+="00000000",e=0;e<t.length;e+=8)s.push(0^parseInt(t.substr(e,8),16));return sjcl.bitArray.clamp(s,4*c)}},sjcl.codec.base32={p:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",O:"0123456789ABCDEFGHIJKLMNOPQRSTUV",BITS:32,BASE:5,REMAINING:27,fromBits:function(t,e,c){var s=sjcl.codec.base32.BASE,n=sjcl.codec.base32.REMAINING,i="",r=0,o=sjcl.codec.base32.p,a=0,l=sjcl.bitArray.bitLength(t);for(c&&(o=sjcl.codec.base32.O),c=0;i.length*s<l;)i+=o.charAt((a^t[c]>>>r)>>>n),r<s?(a=t[c]<<s-r,r+=n,c++):(a<<=s,r-=s);for(;7&i.length&&!e;)i+="=";return i},toBits:function(t,e){t=t.replace(/\s|=/g,"").toUpperCase();var c,s,n=sjcl.codec.base32.BITS,i=sjcl.codec.base32.BASE,r=sjcl.codec.base32.REMAINING,o=[],a=0,l=sjcl.codec.base32.p,h=0,u="base32";for(e&&(l=sjcl.codec.base32.O,u="base32hex"),c=0;c<t.length;c++){if(s=l.indexOf(t.charAt(c)),0>s){if(!e)try{return sjcl.codec.base32hex.toBits(t)}catch(d){}q(new sjcl.exception.invalid("this isn't "+u+"!"))}a>r?(a-=r,o.push(h^s>>>a),h=s<<n-a):(a+=i,h^=s<<n-a)}return 56&a&&o.push(sjcl.bitArray.partial(56&a,h,1)),o}},sjcl.codec.base32hex={fromBits:function(t,e){return sjcl.codec.base32.fromBits(t,e,1)},toBits:function(t){return sjcl.codec.base32.toBits(t,1)}},sjcl.codec.base64={p:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(t,e,c){var s="",n=0,i=sjcl.codec.base64.p,r=0,o=sjcl.bitArray.bitLength(t);for(c&&(i=i.substr(0,62)+"-_"),c=0;6*s.length<o;)s+=i.charAt((r^t[c]>>>n)>>>26),6>n?(r=t[c]<<6-n,n+=26,c++):(r<<=6,n-=6);for(;3&s.length&&!e;)s+="=";return s},toBits:function(t,e){t=t.replace(/\s|=/g,"");var c,s,n=[],i=0,r=sjcl.codec.base64.p,o=0;for(e&&(r=r.substr(0,62)+"-_"),c=0;c<t.length;c++)s=r.indexOf(t.charAt(c)),0>s&&q(new sjcl.exception.invalid("this isn't base64!")),26<i?(i-=26,n.push(o^s>>>i),o=s<<32-i):(i+=6,o^=s<<32-i);return 56&i&&n.push(sjcl.bitArray.partial(56&i,o,1)),n}},sjcl.codec.base64url={fromBits:function(t){return sjcl.codec.base64.fromBits(t,1,1)},toBits:function(t){return sjcl.codec.base64.toBits(t,1)}},sjcl.hash.sha256=function(t){this.b[0]||this.G(),t?(this.s=t.s.slice(0),this.o=t.o.slice(0),this.i=t.i):this.reset()},sjcl.hash.sha256.hash=function(t){return(new sjcl.hash.sha256).update(t).finalize()},sjcl.hash.sha256.prototype={blockSize:512,reset:function(){return this.s=this.P.slice(0),this.o=[],this.i=0,this},update:function(t){"string"==typeof t&&(t=sjcl.codec.utf8String.toBits(t));var e,c=this.o=sjcl.bitArray.concat(this.o,t);for(e=this.i,t=this.i=e+sjcl.bitArray.bitLength(t),e=512+e&-512;e<=t;e+=512)x(this,c.splice(0,16));return this},finalize:function(){var t,e=this.o,c=this.s,e=sjcl.bitArray.concat(e,[sjcl.bitArray.partial(1,1)]);for(t=e.length+2;15&t;t++)e.push(0);for(e.push(Math.floor(this.i/4294967296)),e.push(0|this.i);e.length;)x(this,e.splice(0,16));return this.reset(),c},P:[],b:[],G:function(){function t(t){return 4294967296*(t-Math.floor(t))|0}var e,c=0,s=2;t:for(;64>c;s++){for(e=2;e*e<=s;e++)if(0===s%e)continue t;8>c&&(this.P[c]=t(Math.pow(s,.5))),this.b[c]=t(Math.pow(s,1/3)),c++}}},sjcl.mode.ccm={name:"ccm",t:[],listenProgress:function(t){sjcl.mode.ccm.t.push(t)},unListenProgress:function(t){t=sjcl.mode.ccm.t.indexOf(t),-1<t&&sjcl.mode.ccm.t.splice(t,1)},X:function(t){var e,c=sjcl.mode.ccm.t.slice();for(e=0;e<c.length;e+=1)c[e](t)},encrypt:function(t,e,c,s,n){var i,r=e.slice(0),o=sjcl.bitArray,a=o.bitLength(c)/8,l=o.bitLength(r)/8;for(n=n||64,s=s||[],7>a&&q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")),i=2;4>i&&l>>>8*i;i++);return i<15-a&&(i=15-a),c=o.clamp(c,8*(15-i)),e=sjcl.mode.ccm.M(t,e,c,s,n,i),r=sjcl.mode.ccm.q(t,r,c,e,n,i),o.concat(r.data,r.tag)},decrypt:function(t,e,c,s,n){n=n||64,s=s||[];var i=sjcl.bitArray,r=i.bitLength(c)/8,o=i.bitLength(e),a=i.clamp(e,o-n),l=i.bitSlice(e,o-n),o=(o-n)/8;for(7>r&&q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")),e=2;4>e&&o>>>8*e;e++);return e<15-r&&(e=15-r),c=i.clamp(c,8*(15-e)),a=sjcl.mode.ccm.q(t,a,c,l,n,e),t=sjcl.mode.ccm.M(t,a.data,c,s,n,e),i.equal(a.tag,t)||q(new sjcl.exception.corrupt("ccm: tag doesn't match")),a.data},ea:function(t,e,c,s,n,i){var r=[],o=sjcl.bitArray,a=o.g;if(s=[o.partial(8,(e.length?64:0)|s-2<<2|i-1)],s=o.concat(s,c),s[3]|=n,s=t.encrypt(s),e.length)for(c=o.bitLength(e)/8,65279>=c?r=[o.partial(16,c)]:4294967295>=c&&(r=o.concat([o.partial(16,65534)],[c])),r=o.concat(r,e),e=0;e<r.length;e+=4)s=t.encrypt(a(s,r.slice(e,e+4).concat([0,0,0])));return s},M:function(t,e,c,s,n,i){var r=sjcl.bitArray,o=r.g;for(n/=8,(n%2||4>n||16<n)&&q(new sjcl.exception.invalid("ccm: invalid tag length")),(4294967295<s.length||4294967295<e.length)&&q(new sjcl.exception.bug("ccm: can't deal with 4GiB or more data")),c=sjcl.mode.ccm.ea(t,s,c,n,r.bitLength(e)/8,i),s=0;s<e.length;s+=4)c=t.encrypt(o(c,e.slice(s,s+4).concat([0,0,0])));return r.clamp(c,8*n)},q:function(t,e,c,s,n,i){var r,o=sjcl.bitArray;r=o.g;var a=e.length,l=o.bitLength(e),h=a/50,u=h;if(c=o.concat([o.partial(8,i-1)],c).concat([0,0,0]).slice(0,4),s=o.bitSlice(r(s,t.encrypt(c)),0,n),!a)return{tag:s,data:[]};for(r=0;r<a;r+=4)r>h&&(sjcl.mode.ccm.X(r/a),h+=u),c[3]++,n=t.encrypt(c),e[r]^=n[0],e[r+1]^=n[1],e[r+2]^=n[2],e[r+3]^=n[3];return{tag:s,data:o.clamp(e,l)}}},sjcl.mode.ocb2={name:"ocb2",encrypt:function(t,e,c,s,n,i){128!==sjcl.bitArray.bitLength(c)&&q(new sjcl.exception.invalid("ocb iv must be 128 bits"));var r,o=sjcl.mode.ocb2.J,a=sjcl.bitArray,l=a.g,h=[0,0,0,0];c=o(t.encrypt(c));var u,d=[];for(s=s||[],n=n||64,r=0;r+4<e.length;r+=4)u=e.slice(r,r+4),h=l(h,u),d=d.concat(l(c,t.encrypt(l(c,u)))),c=o(c);return u=e.slice(r),e=a.bitLength(u),r=t.encrypt(l(c,[0,0,0,e])),u=a.clamp(l(u.concat([0,0,0]),r),e),h=l(h,l(u.concat([0,0,0]),r)),h=t.encrypt(l(h,l(c,o(c)))),s.length&&(h=l(h,i?s:sjcl.mode.ocb2.pmac(t,s))),d.concat(a.concat(u,a.clamp(h,n)))},decrypt:function(t,e,c,s,n,i){128!==sjcl.bitArray.bitLength(c)&&q(new sjcl.exception.invalid("ocb iv must be 128 bits")),n=n||64;var r,o,a=sjcl.mode.ocb2.J,l=sjcl.bitArray,h=l.g,u=[0,0,0,0],d=a(t.encrypt(c)),f=sjcl.bitArray.bitLength(e)-n,p=[];for(s=s||[],c=0;c+4<f/32;c+=4)r=h(d,t.decrypt(h(d,e.slice(c,c+4)))),u=h(u,r),p=p.concat(r),d=a(d);return o=f-32*c,r=t.encrypt(h(d,[0,0,0,o])),r=h(r,l.clamp(e.slice(c),o).concat([0,0,0])),u=h(u,r),u=t.encrypt(h(u,h(d,a(d)))),s.length&&(u=h(u,i?s:sjcl.mode.ocb2.pmac(t,s))),l.equal(l.clamp(u,n),l.bitSlice(e,f))||q(new sjcl.exception.corrupt("ocb: tag doesn't match")),p.concat(l.clamp(r,o))},pmac:function(t,e){var c,s=sjcl.mode.ocb2.J,n=sjcl.bitArray,i=n.g,r=[0,0,0,0],o=t.encrypt([0,0,0,0]),o=i(o,s(s(o)));for(c=0;c+4<e.length;c+=4)o=s(o),r=i(r,t.encrypt(i(o,e.slice(c,c+4))));return c=e.slice(c),128>n.bitLength(c)&&(o=i(o,s(o)),c=n.concat(c,[-2147483648,0,0,0])),r=i(r,c),t.encrypt(i(s(i(o,s(o))),r))},J:function(t){return[t[0]<<1^t[1]>>>31,t[1]<<1^t[2]>>>31,t[2]<<1^t[3]>>>31,t[3]<<1^135*(t[0]>>>31)]}},sjcl.mode.gcm={name:"gcm",encrypt:function(t,e,c,s,n){var i=e.slice(0);return e=sjcl.bitArray,s=s||[],t=sjcl.mode.gcm.q(!0,t,i,s,c,n||128),e.concat(t.data,t.tag)},decrypt:function(t,e,c,s,n){var i=e.slice(0),r=sjcl.bitArray,o=r.bitLength(i);return n=n||128,s=s||[],n<=o?(e=r.bitSlice(i,o-n),i=r.bitSlice(i,0,o-n)):(e=i,i=[]),t=sjcl.mode.gcm.q(u,t,i,s,c,n),r.equal(t.tag,e)||q(new sjcl.exception.corrupt("gcm: tag doesn't match")),t.data},ba:function(t,e){var c,s,n,i,r,o=sjcl.bitArray.g;for(n=[0,0,0,0],i=e.slice(0),c=0;128>c;c++){for((s=0!==(t[Math.floor(c/32)]&1<<31-c%32))&&(n=o(n,i)),r=0!==(1&i[3]),s=3;0<s;s--)i[s]=i[s]>>>1|(1&i[s-1])<<31;i[0]>>>=1,r&&(i[0]^=-520093696)}return n},h:function(t,e,c){var s,n=c.length;for(e=e.slice(0),s=0;s<n;s+=4)e[0]^=4294967295&c[s],e[1]^=4294967295&c[s+1],e[2]^=4294967295&c[s+2],e[3]^=4294967295&c[s+3],e=sjcl.mode.gcm.ba(e,t);return e},q:function(t,e,c,s,n,i){var r,o,a,l,h,u,d,f,p=sjcl.bitArray;for(u=c.length,d=p.bitLength(c),f=p.bitLength(s),o=p.bitLength(n),r=e.encrypt([0,0,0,0]),96===o?(n=n.slice(0),n=p.concat(n,[1])):(n=sjcl.mode.gcm.h(r,[0,0,0,0],n),n=sjcl.mode.gcm.h(r,n,[0,0,Math.floor(o/4294967296),4294967295&o])),o=sjcl.mode.gcm.h(r,[0,0,0,0],s),h=n.slice(0),s=o.slice(0),t||(s=sjcl.mode.gcm.h(r,o,c)),l=0;l<u;l+=4)h[3]++,a=e.encrypt(h),c[l]^=a[0],c[l+1]^=a[1],c[l+2]^=a[2],c[l+3]^=a[3];return c=p.clamp(c,d),t&&(s=sjcl.mode.gcm.h(r,o,c)),t=[Math.floor(f/4294967296),4294967295&f,Math.floor(d/4294967296),4294967295&d],s=sjcl.mode.gcm.h(r,s,t),a=e.encrypt(n),s[0]^=a[0],s[1]^=a[1],s[2]^=a[2],s[3]^=a[3],{tag:p.bitSlice(s,0,i),data:c}}},sjcl.misc.hmac=function(t,e){this.N=e=e||sjcl.hash.sha256;var c,s=[[],[]],n=e.prototype.blockSize/32;for(this.n=[new e,new e],t.length>n&&(t=e.hash(t)),c=0;c<n;c++)s[0][c]=909522486^t[c],s[1][c]=1549556828^t[c];this.n[0].update(s[0]),this.n[1].update(s[1]),this.I=new e(this.n[0])},sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(t){return this.S&&q(new sjcl.exception.invalid("encrypt on already updated hmac called!")),this.update(t),this.digest(t)},sjcl.misc.hmac.prototype.reset=function(){this.I=new this.N(this.n[0]),this.S=u},sjcl.misc.hmac.prototype.update=function(t){this.S=!0,this.I.update(t)},sjcl.misc.hmac.prototype.digest=function(){var t=this.I.finalize(),t=new this.N(this.n[1]).update(t).finalize();return this.reset(),t},sjcl.misc.pbkdf2=function(t,e,c,s,n){c=c||1e3,(0>s||0>c)&&q(sjcl.exception.invalid("invalid params to pbkdf2")),"string"==typeof t&&(t=sjcl.codec.utf8String.toBits(t)),"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e)),n=n||sjcl.misc.hmac,t=new n(t);var i,r,o,a,l=[],h=sjcl.bitArray;for(a=1;32*l.length<(s||1);a++){for(n=i=t.encrypt(h.concat(e,[a])),r=1;r<c;r++)for(i=t.encrypt(i),o=0;o<i.length;o++)n[o]^=i[o];l=l.concat(n)}return s&&(l=h.clamp(l,s)),l},sjcl.prng=function(t){this.c=[new sjcl.hash.sha256],this.j=[0],this.H=0,this.u={},this.F=0,this.L={},this.Q=this.d=this.k=this.Z=0,this.b=[0,0,0,0,0,0,0,0],this.f=[0,0,0,0],this.C=s,this.D=t,this.r=u,this.B={progress:{},seeded:{}},this.m=this.Y=0,this.w=1,this.A=2,this.U=65536,this.K=[0,48,64,96,128,192,256,384,512,768,1024],this.V=3e4,this.T=80},sjcl.prng.prototype={randomWords:function(t,e){var c,s=[];c=this.isReady(e);var n;if(c===this.m&&q(new sjcl.exception.notReady("generator isn't seeded")),c&this.A){c=!(c&this.w),n=[];var i,r=0;for(this.Q=n[0]=(new Date).valueOf()+this.V,i=0;16>i;i++)n.push(4294967296*Math.random()|0);for(i=0;i<this.c.length&&(n=n.concat(this.c[i].finalize()),r+=this.j[i],this.j[i]=0,!(!c&&this.H&1<<i));i++);for(this.H>=1<<this.c.length&&(this.c.push(new sjcl.hash.sha256),this.j.push(0)),this.d-=r,r>this.k&&(this.k=r),this.H++,this.b=sjcl.hash.sha256.hash(this.b.concat(n)),this.C=new sjcl.cipher.aes(this.b),c=0;4>c&&(this.f[c]=this.f[c]+1|0,!this.f[c]);c++);}for(c=0;c<t;c+=4)0===(c+1)%this.U&&A(this),n=B(this),s.push(n[0],n[1],n[2],n[3]);return A(this),s.slice(0,t)},setDefaultParanoia:function(t,e){0===t&&"Setting paranoia=0 will ruin your security; use it only for testing"!==e&&q("Setting paranoia=0 will ruin your security; use it only for testing"),this.D=t},addEntropy:function(t,e,c){c=c||"user";var n,i,r=(new Date).valueOf(),o=this.u[c],a=this.isReady(),l=0;switch(n=this.L[c],n===s&&(n=this.L[c]=this.Z++),o===s&&(o=this.u[c]=0),this.u[c]=(this.u[c]+1)%this.c.length,typeof t){case"number":e===s&&(e=1),this.c[o].update([n,this.F++,1,e,r,1,0|t]);break;case"object":if(c=Object.prototype.toString.call(t),"[object Uint32Array]"===c){for(i=[],c=0;c<t.length;c++)i.push(t[c]);t=i}else for("[object Array]"!==c&&(l=1),c=0;c<t.length&&!l;c++)"number"!=typeof t[c]&&(l=1);if(!l){if(e===s)for(c=e=0;c<t.length;c++)for(i=t[c];0<i;)e++,i>>>=1;this.c[o].update([n,this.F++,2,e,r,t.length].concat(t))}break;case"string":e===s&&(e=t.length),this.c[o].update([n,this.F++,3,e,r,t.length]),this.c[o].update(t);break;default:l=1}l&&q(new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string")),this.j[o]+=e,this.d+=e,a===this.m&&(this.isReady()!==this.m&&C("seeded",Math.max(this.k,this.d)),C("progress",this.getProgress()))},isReady:function(t){return t=this.K[t!==s?t:this.D],this.k&&this.k>=t?this.j[0]>this.T&&(new Date).valueOf()>this.Q?this.A|this.w:this.w:this.d>=t?this.A|this.m:this.m},getProgress:function(t){return t=this.K[t?t:this.D],this.k>=t?1:this.d>t?1:this.d/t},startCollectors:function(){this.r||(this.a={loadTimeCollector:D(this,this.da),mouseCollector:D(this,this.fa),keyboardCollector:D(this,this.ca),accelerometerCollector:D(this,this.W),touchCollector:D(this,this.ha)},window.addEventListener?(window.addEventListener("load",this.a.loadTimeCollector,u),window.addEventListener("mousemove",this.a.mouseCollector,u),window.addEventListener("keypress",this.a.keyboardCollector,u),window.addEventListener("devicemotion",this.a.accelerometerCollector,u),window.addEventListener("touchmove",this.a.touchCollector,u)):document.attachEvent?(document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector)):q(new sjcl.exception.bug("can't attach event")),this.r=!0)},stopCollectors:function(){this.r&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,u),window.removeEventListener("mousemove",this.a.mouseCollector,u),window.removeEventListener("keypress",this.a.keyboardCollector,u),window.removeEventListener("devicemotion",this.a.accelerometerCollector,u),window.removeEventListener("touchmove",this.a.touchCollector,u)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.r=u)},addEventListener:function(t,e){this.B[t][this.Y++]=e},removeEventListener:function(t,e){var c,s,n=this.B[t],i=[];for(s in n)n.hasOwnProperty(s)&&n[s]===e&&i.push(s);for(c=0;c<i.length;c++)s=i[c],delete n[s]},ca:function(){E(1)},fa:function(t){var e,c;try{e=t.x||t.clientX||t.offsetX||0,c=t.y||t.clientY||t.offsetY||0}catch(s){c=e=0}0!=e&&0!=c&&sjcl.random.addEntropy([e,c],2,"mouse"),E(0)},ha:function(t){t=t.touches[0]||t.changedTouches[0],sjcl.random.addEntropy([t.pageX||t.clientX,t.pageY||t.clientY],1,"touch"),E(0)},da:function(){E(2)},W:function(t){if(t=t.accelerationIncludingGravity.x||t.accelerationIncludingGravity.y||t.accelerationIncludingGravity.z,window.orientation){var e=window.orientation;"number"==typeof e&&sjcl.random.addEntropy(e,1,"accelerometer")}t&&sjcl.random.addEntropy(t,2,"accelerometer"),E(0)}},sjcl.random=new sjcl.prng(6);t:try{var F,G,H,I;if(I="undefined"!=typeof module){var J;if(J=module.exports){var K;try{K=require("crypto")}catch(L){K=null}J=(G=K)&&G.randomBytes}I=J}if(I)F=G.randomBytes(128),F=new Uint32Array(new Uint8Array(F).buffer),sjcl.random.addEntropy(F,1024,"crypto['randomBytes']");else if("undefined"!=typeof window&&"undefined"!=typeof Uint32Array){if(H=new Uint32Array(32),window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(H);else{if(!window.msCrypto||!window.msCrypto.getRandomValues)break t;window.msCrypto.getRandomValues(H)}sjcl.random.addEntropy(H,1024,"crypto['getRandomValues']")}}catch(M){"undefined"!=typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(M))}sjcl.json={defaults:{v:1,iter:1e3,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},aa:function(t,e,c,s){c=c||{},s=s||{};var n,i=sjcl.json,r=i.e({iv:sjcl.random.randomWords(4,0)},i.defaults);return i.e(r,c),c=r.adata,"string"==typeof r.salt&&(r.salt=sjcl.codec.base64.toBits(r.salt)),"string"==typeof r.iv&&(r.iv=sjcl.codec.base64.toBits(r.iv)),(!sjcl.mode[r.mode]||!sjcl.cipher[r.cipher]||"string"==typeof t&&100>=r.iter||64!==r.ts&&96!==r.ts&&128!==r.ts||128!==r.ks&&192!==r.ks&&256!==r.ks||2>r.iv.length||4<r.iv.length)&&q(new sjcl.exception.invalid("json encrypt: invalid parameters")),"string"==typeof t?(n=sjcl.misc.cachedPbkdf2(t,r),t=n.key.slice(0,r.ks/32),r.salt=n.salt):sjcl.ecc&&t instanceof sjcl.ecc.elGamal.publicKey&&(n=t.kem(),r.kemtag=n.tag,t=n.key.slice(0,r.ks/32)),"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e)),"string"==typeof c&&(r.adata=c=sjcl.codec.utf8String.toBits(c)),n=new sjcl.cipher[r.cipher](t),i.e(s,r),s.key=t,r.ct="ccm"===r.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&e instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.encrypt(n,e,r.iv,c,r.ts):sjcl.mode[r.mode].encrypt(n,e,r.iv,c,r.ts),r},encrypt:function(t,e,c,s){var n=sjcl.json,i=n.aa.apply(n,arguments);return n.encode(i)},$:function(t,e,c,s){c=c||{},s=s||{};var n=sjcl.json;e=n.e(n.e(n.e({},n.defaults),e),c,!0);var i,r;return i=e.adata,"string"==typeof e.salt&&(e.salt=sjcl.codec.base64.toBits(e.salt)),"string"==typeof e.iv&&(e.iv=sjcl.codec.base64.toBits(e.iv)),(!sjcl.mode[e.mode]||!sjcl.cipher[e.cipher]||"string"==typeof t&&100>=e.iter||64!==e.ts&&96!==e.ts&&128!==e.ts||128!==e.ks&&192!==e.ks&&256!==e.ks||!e.iv||2>e.iv.length||4<e.iv.length)&&q(new sjcl.exception.invalid("json decrypt: invalid parameters")),"string"==typeof t?(r=sjcl.misc.cachedPbkdf2(t,e),t=r.key.slice(0,e.ks/32),e.salt=r.salt):sjcl.ecc&&t instanceof sjcl.ecc.elGamal.secretKey&&(t=t.unkem(sjcl.codec.base64.toBits(e.kemtag)).slice(0,e.ks/32)),"string"==typeof i&&(i=sjcl.codec.utf8String.toBits(i)),r=new sjcl.cipher[e.cipher](t),i="ccm"===e.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&e.ct instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.decrypt(r,e.ct,e.iv,e.tag,i,e.ts):sjcl.mode[e.mode].decrypt(r,e.ct,e.iv,i,e.ts),n.e(s,e),s.key=t,1===c.raw?i:sjcl.codec.utf8String.fromBits(i)},decrypt:function(t,e,c,s){var n=sjcl.json;return n.$(t,n.decode(e),c,s)},encode:function(t){var e,c="{",s="";for(e in t)if(t.hasOwnProperty(e))switch(e.match(/^[a-z0-9]+$/i)||q(new sjcl.exception.invalid("json encode: invalid property name")),c+=s+'"'+e+'":',s=",",typeof t[e]){case"number":case"boolean":c+=t[e];break;case"string":c+='"'+escape(t[e])+'"';break;case"object":c+='"'+sjcl.codec.base64.fromBits(t[e],0)+'"';break;default:q(new sjcl.exception.bug("json encode: unsupported type"))}return c+"}"},decode:function(t){t=t.replace(/\s/g,""),t.match(/^\{.*\}$/)||q(new sjcl.exception.invalid("json decode: this isn't json!")),t=t.replace(/^\{|\}$/g,"").split(/,/);var e,c,s={};for(e=0;e<t.length;e++)(c=t[e].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i))||q(new sjcl.exception.invalid("json decode: this isn't json!")),null!=c[3]?s[c[2]]=parseInt(c[3],10):null!=c[4]?s[c[2]]=c[2].match(/^(ct|adata|salt|iv)$/)?sjcl.codec.base64.toBits(c[4]):unescape(c[4]):null!=c[5]&&(s[c[2]]="true"===c[5]);return s},e:function(t,e,c){if(t===s&&(t={}),e===s)return t;for(var n in e)e.hasOwnProperty(n)&&(c&&t[n]!==s&&t[n]!==e[n]&&q(new sjcl.exception.invalid("required parameter overridden")),t[n]=e[n]);return t},ja:function(t,e){var c,s={};for(c in t)t.hasOwnProperty(c)&&t[c]!==e[c]&&(s[c]=t[c]);return s},ia:function(t,e){var c,n={};for(c=0;c<e.length;c++)t[e[c]]!==s&&(n[e[c]]=t[e[c]]);return n}},sjcl.encrypt=sjcl.json.encrypt,sjcl.decrypt=sjcl.json.decrypt,sjcl.misc.ga={},sjcl.misc.cachedPbkdf2=function(t,e){var c,n=sjcl.misc.ga;return e=e||{},c=e.iter||1e3,n=n[t]=n[t]||{},c=n[c]=n[c]||{firstSalt:e.salt&&e.salt.length?e.salt.slice(0):sjcl.random.randomWords(2,0)},n=e.salt===s?c.firstSalt:e.salt,c[n]=c[n]||sjcl.misc.pbkdf2(t,n,e.iter),{key:c[n].slice(0),salt:n.slice(0)}};