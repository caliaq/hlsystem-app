import mr, { ipcMain as ht, app as ye, dialog as _u, BrowserWindow as J6 } from "electron";
import Ie from "fs";
import xu from "constants";
import Ve from "stream";
import yt, { promisify as Eu } from "util";
import B2 from "assert";
import ne from "path";
import ai, { exec as e5, spawn as t5, execSync as qi } from "child_process";
import fi from "events";
import jt from "crypto";
import r5 from "tty";
import Hn from "os";
import xr from "url";
import n5 from "string_decoder";
import Vt from "zlib";
import D2, { createServer as gu } from "http";
import { fileURLToPath as Cu } from "node:url";
import Ut from "node:path";
import N2 from "buffer";
import i5 from "net";
import bu from "https";
import yu from "tls";
var De = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Tu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ne = {}, Er = {}, Ue = {};
Ue.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, o) => i != null ? n(i) : r(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Ue.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var Ot = xu, vu = process.cwd, F1 = null, Au = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return F1 || (F1 = vu.call(process)), F1;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Mo = process.chdir;
  process.chdir = function(e) {
    F1 = null, Mo.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Mo);
}
var wu = Pu;
function Pu(e) {
  Ot.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = a(e.stat), e.fstat = a(e.fstat), e.lstat = a(e.lstat), e.statSync = f(e.statSync), e.fstatSync = f(e.fstatSync), e.lstatSync = f(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, u, h) {
    h && process.nextTick(h);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, u, h, d) {
    d && process.nextTick(d);
  }, e.lchownSync = function() {
  }), Au === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function u(h, d, _) {
      var p = Date.now(), x = 0;
      l(h, d, function y(b) {
        if (b && (b.code === "EACCES" || b.code === "EPERM" || b.code === "EBUSY") && Date.now() - p < 6e4) {
          setTimeout(function() {
            e.stat(d, function(w, T) {
              w && w.code === "ENOENT" ? l(h, d, y) : _(b);
            });
          }, x), x < 100 && (x += 10);
          return;
        }
        _ && _(b);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function u(h, d, _, p, x, y) {
      var b;
      if (y && typeof y == "function") {
        var w = 0;
        b = function(T, L, G) {
          if (T && T.code === "EAGAIN" && w < 10)
            return w++, l.call(e, h, d, _, p, x, b);
          y.apply(this, arguments);
        };
      }
      return l.call(e, h, d, _, p, x, b);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(u, h, d, _, p) {
      for (var x = 0; ; )
        try {
          return l.call(e, u, h, d, _, p);
        } catch (y) {
          if (y.code === "EAGAIN" && x < 10) {
            x++;
            continue;
          }
          throw y;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(u, h, d) {
      l.open(
        u,
        Ot.O_WRONLY | Ot.O_SYMLINK,
        h,
        function(_, p) {
          if (_) {
            d && d(_);
            return;
          }
          l.fchmod(p, h, function(x) {
            l.close(p, function(y) {
              d && d(x || y);
            });
          });
        }
      );
    }, l.lchmodSync = function(u, h) {
      var d = l.openSync(u, Ot.O_WRONLY | Ot.O_SYMLINK, h), _ = !0, p;
      try {
        p = l.fchmodSync(d, h), _ = !1;
      } finally {
        if (_)
          try {
            l.closeSync(d);
          } catch {
          }
        else
          l.closeSync(d);
      }
      return p;
    };
  }
  function r(l) {
    Ot.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(u, h, d, _) {
      l.open(u, Ot.O_SYMLINK, function(p, x) {
        if (p) {
          _ && _(p);
          return;
        }
        l.futimes(x, h, d, function(y) {
          l.close(x, function(b) {
            _ && _(y || b);
          });
        });
      });
    }, l.lutimesSync = function(u, h, d) {
      var _ = l.openSync(u, Ot.O_SYMLINK), p, x = !0;
      try {
        p = l.futimesSync(_, h, d), x = !1;
      } finally {
        if (x)
          try {
            l.closeSync(_);
          } catch {
          }
        else
          l.closeSync(_);
      }
      return p;
    }) : l.futimes && (l.lutimes = function(u, h, d, _) {
      _ && process.nextTick(_);
    }, l.lutimesSync = function() {
    });
  }
  function n(l) {
    return l && function(u, h, d) {
      return l.call(e, u, h, function(_) {
        c(_) && (_ = null), d && d.apply(this, arguments);
      });
    };
  }
  function i(l) {
    return l && function(u, h) {
      try {
        return l.call(e, u, h);
      } catch (d) {
        if (!c(d)) throw d;
      }
    };
  }
  function o(l) {
    return l && function(u, h, d, _) {
      return l.call(e, u, h, d, function(p) {
        c(p) && (p = null), _ && _.apply(this, arguments);
      });
    };
  }
  function s(l) {
    return l && function(u, h, d) {
      try {
        return l.call(e, u, h, d);
      } catch (_) {
        if (!c(_)) throw _;
      }
    };
  }
  function a(l) {
    return l && function(u, h, d) {
      typeof h == "function" && (d = h, h = null);
      function _(p, x) {
        x && (x.uid < 0 && (x.uid += 4294967296), x.gid < 0 && (x.gid += 4294967296)), d && d.apply(this, arguments);
      }
      return h ? l.call(e, u, h, _) : l.call(e, u, _);
    };
  }
  function f(l) {
    return l && function(u, h) {
      var d = h ? l.call(e, u, h) : l.call(e, u);
      return d && (d.uid < 0 && (d.uid += 4294967296), d.gid < 0 && (d.gid += 4294967296)), d;
    };
  }
  function c(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var Go = Ve.Stream, Su = Ou;
function Ou(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    Go.call(this);
    var o = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var s = Object.keys(i), a = 0, f = s.length; a < f; a++) {
      var c = s[a];
      this[c] = i[c];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        o._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(l, u) {
      if (l) {
        o.emit("error", l), o.readable = !1;
        return;
      }
      o.fd = u, o.emit("open", u), o._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    Go.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), s = 0, a = o.length; s < a; s++) {
      var f = o[s];
      this[f] = i[f];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var Iu = Bu, Ru = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Bu(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Ru(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var se = Ie, Du = wu, Nu = Su, Lu = Iu, u1 = yt, Te, j1;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Te = Symbol.for("graceful-fs.queue"), j1 = Symbol.for("graceful-fs.previous")) : (Te = "___graceful-fs.queue", j1 = "___graceful-fs.previous");
function Fu() {
}
function o5(e, t) {
  Object.defineProperty(e, Te, {
    get: function() {
      return t;
    }
  });
}
var dr = Fu;
u1.debuglog ? dr = u1.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (dr = function() {
  var e = u1.format.apply(u1, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!se[Te]) {
  var $u = De[Te] || [];
  o5(se, $u), se.close = function(e) {
    function t(r, n) {
      return e.call(se, r, function(i) {
        i || Ho(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, j1, {
      value: e
    }), t;
  }(se.close), se.closeSync = function(e) {
    function t(r) {
      e.apply(se, arguments), Ho();
    }
    return Object.defineProperty(t, j1, {
      value: e
    }), t;
  }(se.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    dr(se[Te]), B2.equal(se[Te].length, 0);
  });
}
De[Te] || o5(De, se[Te]);
var ke = L2(Lu(se));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !se.__patched && (ke = L2(se), se.__patched = !0);
function L2(e) {
  Du(e), e.gracefulify = L2, e.createReadStream = L, e.createWriteStream = G;
  var t = e.readFile;
  e.readFile = r;
  function r(C, q, F) {
    return typeof q == "function" && (F = q, q = null), $(C, q, F);
    function $(W, D, I, N) {
      return t(W, D, function(O) {
        O && (O.code === "EMFILE" || O.code === "ENFILE") ? Tr([$, [W, D, I], O, N || Date.now(), Date.now()]) : typeof I == "function" && I.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(C, q, F, $) {
    return typeof F == "function" && ($ = F, F = null), W(C, q, F, $);
    function W(D, I, N, O, S) {
      return n(D, I, N, function(P) {
        P && (P.code === "EMFILE" || P.code === "ENFILE") ? Tr([W, [D, I, N, O], P, S || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = s);
  function s(C, q, F, $) {
    return typeof F == "function" && ($ = F, F = null), W(C, q, F, $);
    function W(D, I, N, O, S) {
      return o(D, I, N, function(P) {
        P && (P.code === "EMFILE" || P.code === "ENFILE") ? Tr([W, [D, I, N, O], P, S || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  var a = e.copyFile;
  a && (e.copyFile = f);
  function f(C, q, F, $) {
    return typeof F == "function" && ($ = F, F = 0), W(C, q, F, $);
    function W(D, I, N, O, S) {
      return a(D, I, N, function(P) {
        P && (P.code === "EMFILE" || P.code === "ENFILE") ? Tr([W, [D, I, N, O], P, S || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  var c = e.readdir;
  e.readdir = u;
  var l = /^v[0-5]\./;
  function u(C, q, F) {
    typeof q == "function" && (F = q, q = null);
    var $ = l.test(process.version) ? function(I, N, O, S) {
      return c(I, W(
        I,
        N,
        O,
        S
      ));
    } : function(I, N, O, S) {
      return c(I, N, W(
        I,
        N,
        O,
        S
      ));
    };
    return $(C, q, F);
    function W(D, I, N, O) {
      return function(S, P) {
        S && (S.code === "EMFILE" || S.code === "ENFILE") ? Tr([
          $,
          [D, I, N],
          S,
          O || Date.now(),
          Date.now()
        ]) : (P && P.sort && P.sort(), typeof N == "function" && N.call(this, S, P));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = Nu(e);
    y = h.ReadStream, w = h.WriteStream;
  }
  var d = e.ReadStream;
  d && (y.prototype = Object.create(d.prototype), y.prototype.open = b);
  var _ = e.WriteStream;
  _ && (w.prototype = Object.create(_.prototype), w.prototype.open = T), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return y;
    },
    set: function(C) {
      y = C;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return w;
    },
    set: function(C) {
      w = C;
    },
    enumerable: !0,
    configurable: !0
  });
  var p = y;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return p;
    },
    set: function(C) {
      p = C;
    },
    enumerable: !0,
    configurable: !0
  });
  var x = w;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return x;
    },
    set: function(C) {
      x = C;
    },
    enumerable: !0,
    configurable: !0
  });
  function y(C, q) {
    return this instanceof y ? (d.apply(this, arguments), this) : y.apply(Object.create(y.prototype), arguments);
  }
  function b() {
    var C = this;
    Q(C.path, C.flags, C.mode, function(q, F) {
      q ? (C.autoClose && C.destroy(), C.emit("error", q)) : (C.fd = F, C.emit("open", F), C.read());
    });
  }
  function w(C, q) {
    return this instanceof w ? (_.apply(this, arguments), this) : w.apply(Object.create(w.prototype), arguments);
  }
  function T() {
    var C = this;
    Q(C.path, C.flags, C.mode, function(q, F) {
      q ? (C.destroy(), C.emit("error", q)) : (C.fd = F, C.emit("open", F));
    });
  }
  function L(C, q) {
    return new e.ReadStream(C, q);
  }
  function G(C, q) {
    return new e.WriteStream(C, q);
  }
  var H = e.open;
  e.open = Q;
  function Q(C, q, F, $) {
    return typeof F == "function" && ($ = F, F = null), W(C, q, F, $);
    function W(D, I, N, O, S) {
      return H(D, I, N, function(P, U) {
        P && (P.code === "EMFILE" || P.code === "ENFILE") ? Tr([W, [D, I, N, O], P, S || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  return e;
}
function Tr(e) {
  dr("ENQUEUE", e[0].name, e[1]), se[Te].push(e), F2();
}
var h1;
function Ho() {
  for (var e = Date.now(), t = 0; t < se[Te].length; ++t)
    se[Te][t].length > 2 && (se[Te][t][3] = e, se[Te][t][4] = e);
  F2();
}
function F2() {
  if (clearTimeout(h1), h1 = void 0, se[Te].length !== 0) {
    var e = se[Te].shift(), t = e[0], r = e[1], n = e[2], i = e[3], o = e[4];
    if (i === void 0)
      dr("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      dr("TIMEOUT", t.name, r);
      var s = r.pop();
      typeof s == "function" && s.call(null, n);
    } else {
      var a = Date.now() - o, f = Math.max(o - i, 1), c = Math.min(f * 1.2, 100);
      a >= c ? (dr("RETRY", t.name, r), t.apply(null, r.concat([i]))) : se[Te].push(e);
    }
    h1 === void 0 && (h1 = setTimeout(F2, 0));
  }
}
(function(e) {
  const t = Ue.fromCallback, r = ke, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? r.exists(i, o) : new Promise((s) => r.exists(i, s));
  }, e.read = function(i, o, s, a, f, c) {
    return typeof c == "function" ? r.read(i, o, s, a, f, c) : new Promise((l, u) => {
      r.read(i, o, s, a, f, (h, d, _) => {
        if (h) return u(h);
        l({ bytesRead: d, buffer: _ });
      });
    });
  }, e.write = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? r.write(i, o, ...s) : new Promise((a, f) => {
      r.write(i, o, ...s, (c, l, u) => {
        if (c) return f(c);
        a({ bytesWritten: l, buffer: u });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? r.writev(i, o, ...s) : new Promise((a, f) => {
      r.writev(i, o, ...s, (c, l, u) => {
        if (c) return f(c);
        a({ bytesWritten: l, buffers: u });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(Er);
var $2 = {}, s5 = {};
const Uu = ne;
s5.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(Uu.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const a5 = Er, { checkPath: f5 } = s5, l5 = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
$2.makeDir = async (e, t) => (f5(e), a5.mkdir(e, {
  mode: l5(t),
  recursive: !0
}));
$2.makeDirSync = (e, t) => (f5(e), a5.mkdirSync(e, {
  mode: l5(t),
  recursive: !0
}));
const ku = Ue.fromPromise, { makeDir: Mu, makeDirSync: ji } = $2, Vi = ku(Mu);
var pt = {
  mkdirs: Vi,
  mkdirsSync: ji,
  // alias
  mkdirp: Vi,
  mkdirpSync: ji,
  ensureDir: Vi,
  ensureDirSync: ji
};
const Gu = Ue.fromPromise, c5 = Er;
function Hu(e) {
  return c5.access(e).then(() => !0).catch(() => !1);
}
var gr = {
  pathExists: Gu(Hu),
  pathExistsSync: c5.existsSync
};
const Mr = ke;
function Wu(e, t, r, n) {
  Mr.open(e, "r+", (i, o) => {
    if (i) return n(i);
    Mr.futimes(o, t, r, (s) => {
      Mr.close(o, (a) => {
        n && n(s || a);
      });
    });
  });
}
function qu(e, t, r) {
  const n = Mr.openSync(e, "r+");
  return Mr.futimesSync(n, t, r), Mr.closeSync(n);
}
var u5 = {
  utimesMillis: Wu,
  utimesMillisSync: qu
};
const jr = Er, _e = ne, ju = yt;
function Vu(e, t, r) {
  const n = r.dereference ? (i) => jr.stat(i, { bigint: !0 }) : (i) => jr.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function Ku(e, t, r) {
  let n;
  const i = r.dereference ? (s) => jr.statSync(s, { bigint: !0 }) : (s) => jr.lstatSync(s, { bigint: !0 }), o = i(e);
  try {
    n = i(t);
  } catch (s) {
    if (s.code === "ENOENT") return { srcStat: o, destStat: null };
    throw s;
  }
  return { srcStat: o, destStat: n };
}
function Xu(e, t, r, n, i) {
  ju.callbackify(Vu)(e, t, n, (o, s) => {
    if (o) return i(o);
    const { srcStat: a, destStat: f } = s;
    if (f) {
      if (Wn(a, f)) {
        const c = _e.basename(e), l = _e.basename(t);
        return r === "move" && c !== l && c.toLowerCase() === l.toLowerCase() ? i(null, { srcStat: a, destStat: f, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (a.isDirectory() && !f.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!a.isDirectory() && f.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return a.isDirectory() && U2(e, t) ? i(new Error(li(e, t, r))) : i(null, { srcStat: a, destStat: f });
  });
}
function Yu(e, t, r, n) {
  const { srcStat: i, destStat: o } = Ku(e, t, n);
  if (o) {
    if (Wn(i, o)) {
      const s = _e.basename(e), a = _e.basename(t);
      if (r === "move" && s !== a && s.toLowerCase() === a.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && U2(e, t))
    throw new Error(li(e, t, r));
  return { srcStat: i, destStat: o };
}
function h5(e, t, r, n, i) {
  const o = _e.resolve(_e.dirname(e)), s = _e.resolve(_e.dirname(r));
  if (s === o || s === _e.parse(s).root) return i();
  jr.stat(s, { bigint: !0 }, (a, f) => a ? a.code === "ENOENT" ? i() : i(a) : Wn(t, f) ? i(new Error(li(e, r, n))) : h5(e, t, s, n, i));
}
function d5(e, t, r, n) {
  const i = _e.resolve(_e.dirname(e)), o = _e.resolve(_e.dirname(r));
  if (o === i || o === _e.parse(o).root) return;
  let s;
  try {
    s = jr.statSync(o, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (Wn(t, s))
    throw new Error(li(e, r, n));
  return d5(e, t, o, n);
}
function Wn(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function U2(e, t) {
  const r = _e.resolve(e).split(_e.sep).filter((i) => i), n = _e.resolve(t).split(_e.sep).filter((i) => i);
  return r.reduce((i, o, s) => i && n[s] === o, !0);
}
function li(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Yr = {
  checkPaths: Xu,
  checkPathsSync: Yu,
  checkParentPaths: h5,
  checkParentPathsSync: d5,
  isSrcSubdir: U2,
  areIdentical: Wn
};
const He = ke, Pn = ne, zu = pt.mkdirs, Qu = gr.pathExists, Zu = u5.utimesMillis, Sn = Yr;
function Ju(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Sn.checkPaths(e, t, "copy", r, (i, o) => {
    if (i) return n(i);
    const { srcStat: s, destStat: a } = o;
    Sn.checkParentPaths(e, s, t, "copy", (f) => f ? n(f) : r.filter ? p5(Wo, a, e, t, r, n) : Wo(a, e, t, r, n));
  });
}
function Wo(e, t, r, n, i) {
  const o = Pn.dirname(r);
  Qu(o, (s, a) => {
    if (s) return i(s);
    if (a) return V1(e, t, r, n, i);
    zu(o, (f) => f ? i(f) : V1(e, t, r, n, i));
  });
}
function p5(e, t, r, n, i, o) {
  Promise.resolve(i.filter(r, n)).then((s) => s ? e(t, r, n, i, o) : o(), (s) => o(s));
}
function e4(e, t, r, n, i) {
  return n.filter ? p5(V1, e, t, r, n, i) : V1(e, t, r, n, i);
}
function V1(e, t, r, n, i) {
  (n.dereference ? He.stat : He.lstat)(t, (s, a) => s ? i(s) : a.isDirectory() ? a4(a, e, t, r, n, i) : a.isFile() || a.isCharacterDevice() || a.isBlockDevice() ? t4(a, e, t, r, n, i) : a.isSymbolicLink() ? c4(e, t, r, n, i) : a.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : a.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function t4(e, t, r, n, i, o) {
  return t ? r4(e, r, n, i, o) : m5(e, r, n, i, o);
}
function r4(e, t, r, n, i) {
  if (n.overwrite)
    He.unlink(r, (o) => o ? i(o) : m5(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function m5(e, t, r, n, i) {
  He.copyFile(t, r, (o) => o ? i(o) : n.preserveTimestamps ? n4(e.mode, t, r, i) : ci(r, e.mode, i));
}
function n4(e, t, r, n) {
  return i4(e) ? o4(r, e, (i) => i ? n(i) : qo(e, t, r, n)) : qo(e, t, r, n);
}
function i4(e) {
  return (e & 128) === 0;
}
function o4(e, t, r) {
  return ci(e, t | 128, r);
}
function qo(e, t, r, n) {
  s4(t, r, (i) => i ? n(i) : ci(r, e, n));
}
function ci(e, t, r) {
  return He.chmod(e, t, r);
}
function s4(e, t, r) {
  He.stat(e, (n, i) => n ? r(n) : Zu(t, i.atime, i.mtime, r));
}
function a4(e, t, r, n, i, o) {
  return t ? _5(r, n, i, o) : f4(e.mode, r, n, i, o);
}
function f4(e, t, r, n, i) {
  He.mkdir(r, (o) => {
    if (o) return i(o);
    _5(t, r, n, (s) => s ? i(s) : ci(r, e, i));
  });
}
function _5(e, t, r, n) {
  He.readdir(e, (i, o) => i ? n(i) : x5(o, e, t, r, n));
}
function x5(e, t, r, n, i) {
  const o = e.pop();
  return o ? l4(e, o, t, r, n, i) : i();
}
function l4(e, t, r, n, i, o) {
  const s = Pn.join(r, t), a = Pn.join(n, t);
  Sn.checkPaths(s, a, "copy", i, (f, c) => {
    if (f) return o(f);
    const { destStat: l } = c;
    e4(l, s, a, i, (u) => u ? o(u) : x5(e, r, n, i, o));
  });
}
function c4(e, t, r, n, i) {
  He.readlink(t, (o, s) => {
    if (o) return i(o);
    if (n.dereference && (s = Pn.resolve(process.cwd(), s)), e)
      He.readlink(r, (a, f) => a ? a.code === "EINVAL" || a.code === "UNKNOWN" ? He.symlink(s, r, i) : i(a) : (n.dereference && (f = Pn.resolve(process.cwd(), f)), Sn.isSrcSubdir(s, f) ? i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${f}'.`)) : e.isDirectory() && Sn.isSrcSubdir(f, s) ? i(new Error(`Cannot overwrite '${f}' with '${s}'.`)) : u4(s, r, i)));
    else
      return He.symlink(s, r, i);
  });
}
function u4(e, t, r) {
  He.unlink(t, (n) => n ? r(n) : He.symlink(e, t, r));
}
var h4 = Ju;
const Oe = ke, On = ne, d4 = pt.mkdirsSync, p4 = u5.utimesMillisSync, In = Yr;
function m4(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = In.checkPathsSync(e, t, "copy", r);
  return In.checkParentPathsSync(e, n, t, "copy"), _4(i, e, t, r);
}
function _4(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = On.dirname(r);
  return Oe.existsSync(i) || d4(i), E5(e, t, r, n);
}
function x4(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return E5(e, t, r, n);
}
function E5(e, t, r, n) {
  const o = (n.dereference ? Oe.statSync : Oe.lstatSync)(t);
  if (o.isDirectory()) return v4(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return E4(o, e, t, r, n);
  if (o.isSymbolicLink()) return P4(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function E4(e, t, r, n, i) {
  return t ? g4(e, r, n, i) : g5(e, r, n, i);
}
function g4(e, t, r, n) {
  if (n.overwrite)
    return Oe.unlinkSync(r), g5(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function g5(e, t, r, n) {
  return Oe.copyFileSync(t, r), n.preserveTimestamps && C4(e.mode, t, r), k2(r, e.mode);
}
function C4(e, t, r) {
  return b4(e) && y4(r, e), T4(t, r);
}
function b4(e) {
  return (e & 128) === 0;
}
function y4(e, t) {
  return k2(e, t | 128);
}
function k2(e, t) {
  return Oe.chmodSync(e, t);
}
function T4(e, t) {
  const r = Oe.statSync(e);
  return p4(t, r.atime, r.mtime);
}
function v4(e, t, r, n, i) {
  return t ? C5(r, n, i) : A4(e.mode, r, n, i);
}
function A4(e, t, r, n) {
  return Oe.mkdirSync(r), C5(t, r, n), k2(r, e);
}
function C5(e, t, r) {
  Oe.readdirSync(e).forEach((n) => w4(n, e, t, r));
}
function w4(e, t, r, n) {
  const i = On.join(t, e), o = On.join(r, e), { destStat: s } = In.checkPathsSync(i, o, "copy", n);
  return x4(s, i, o, n);
}
function P4(e, t, r, n) {
  let i = Oe.readlinkSync(t);
  if (n.dereference && (i = On.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = Oe.readlinkSync(r);
    } catch (s) {
      if (s.code === "EINVAL" || s.code === "UNKNOWN") return Oe.symlinkSync(i, r);
      throw s;
    }
    if (n.dereference && (o = On.resolve(process.cwd(), o)), In.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (Oe.statSync(r).isDirectory() && In.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return S4(i, r);
  } else
    return Oe.symlinkSync(i, r);
}
function S4(e, t) {
  return Oe.unlinkSync(t), Oe.symlinkSync(e, t);
}
var O4 = m4;
const I4 = Ue.fromCallback;
var M2 = {
  copy: I4(h4),
  copySync: O4
};
const jo = ke, b5 = ne, te = B2, Rn = process.platform === "win32";
function y5(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || jo[r], r = r + "Sync", e[r] = e[r] || jo[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function G2(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), te(e, "rimraf: missing path"), te.strictEqual(typeof e, "string", "rimraf: path should be a string"), te.strictEqual(typeof r, "function", "rimraf: callback function required"), te(t, "rimraf: invalid options argument provided"), te.strictEqual(typeof t, "object", "rimraf: options should be object"), y5(t), Vo(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const s = n * 100;
        return setTimeout(() => Vo(e, t, i), s);
      }
      o.code === "ENOENT" && (o = null);
    }
    r(o);
  });
}
function Vo(e, t, r) {
  te(e), te(t), te(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && Rn)
      return Ko(e, t, n, r);
    if (i && i.isDirectory())
      return $1(e, t, n, r);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return r(null);
        if (o.code === "EPERM")
          return Rn ? Ko(e, t, o, r) : $1(e, t, o, r);
        if (o.code === "EISDIR")
          return $1(e, t, o, r);
      }
      return r(o);
    });
  });
}
function Ko(e, t, r, n) {
  te(e), te(t), te(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (o, s) => {
      o ? n(o.code === "ENOENT" ? null : r) : s.isDirectory() ? $1(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function Xo(e, t, r) {
  let n;
  te(e), te(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? U1(e, t, r) : t.unlinkSync(e);
}
function $1(e, t, r, n) {
  te(e), te(t), te(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? R4(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function R4(e, t, r) {
  te(e), te(t), te(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let o = i.length, s;
    if (o === 0) return t.rmdir(e, r);
    i.forEach((a) => {
      G2(b5.join(e, a), t, (f) => {
        if (!s) {
          if (f) return r(s = f);
          --o === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function T5(e, t) {
  let r;
  t = t || {}, y5(t), te(e, "rimraf: missing path"), te.strictEqual(typeof e, "string", "rimraf: path should be a string"), te(t, "rimraf: missing options"), te.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && Rn && Xo(e, t, n);
  }
  try {
    r && r.isDirectory() ? U1(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return Rn ? Xo(e, t, n) : U1(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    U1(e, t, n);
  }
}
function U1(e, t, r) {
  te(e), te(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      B4(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function B4(e, t) {
  if (te(e), te(t), t.readdirSync(e).forEach((r) => T5(b5.join(e, r), t)), Rn) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var D4 = G2;
G2.sync = T5;
const K1 = ke, N4 = Ue.fromCallback, v5 = D4;
function L4(e, t) {
  if (K1.rm) return K1.rm(e, { recursive: !0, force: !0 }, t);
  v5(e, t);
}
function F4(e) {
  if (K1.rmSync) return K1.rmSync(e, { recursive: !0, force: !0 });
  v5.sync(e);
}
var ui = {
  remove: N4(L4),
  removeSync: F4
};
const $4 = Ue.fromPromise, A5 = Er, w5 = ne, P5 = pt, S5 = ui, Yo = $4(async function(t) {
  let r;
  try {
    r = await A5.readdir(t);
  } catch {
    return P5.mkdirs(t);
  }
  return Promise.all(r.map((n) => S5.remove(w5.join(t, n))));
});
function zo(e) {
  let t;
  try {
    t = A5.readdirSync(e);
  } catch {
    return P5.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = w5.join(e, r), S5.removeSync(r);
  });
}
var U4 = {
  emptyDirSync: zo,
  emptydirSync: zo,
  emptyDir: Yo,
  emptydir: Yo
};
const k4 = Ue.fromCallback, O5 = ne, Ft = ke, I5 = pt;
function M4(e, t) {
  function r() {
    Ft.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  Ft.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const o = O5.dirname(e);
    Ft.stat(o, (s, a) => {
      if (s)
        return s.code === "ENOENT" ? I5.mkdirs(o, (f) => {
          if (f) return t(f);
          r();
        }) : t(s);
      a.isDirectory() ? r() : Ft.readdir(o, (f) => {
        if (f) return t(f);
      });
    });
  });
}
function G4(e) {
  let t;
  try {
    t = Ft.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = O5.dirname(e);
  try {
    Ft.statSync(r).isDirectory() || Ft.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") I5.mkdirsSync(r);
    else throw n;
  }
  Ft.writeFileSync(e, "");
}
var H4 = {
  createFile: k4(M4),
  createFileSync: G4
};
const W4 = Ue.fromCallback, R5 = ne, Nt = ke, B5 = pt, q4 = gr.pathExists, { areIdentical: D5 } = Yr;
function j4(e, t, r) {
  function n(i, o) {
    Nt.link(i, o, (s) => {
      if (s) return r(s);
      r(null);
    });
  }
  Nt.lstat(t, (i, o) => {
    Nt.lstat(e, (s, a) => {
      if (s)
        return s.message = s.message.replace("lstat", "ensureLink"), r(s);
      if (o && D5(a, o)) return r(null);
      const f = R5.dirname(t);
      q4(f, (c, l) => {
        if (c) return r(c);
        if (l) return n(e, t);
        B5.mkdirs(f, (u) => {
          if (u) return r(u);
          n(e, t);
        });
      });
    });
  });
}
function V4(e, t) {
  let r;
  try {
    r = Nt.lstatSync(t);
  } catch {
  }
  try {
    const o = Nt.lstatSync(e);
    if (r && D5(o, r)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const n = R5.dirname(t);
  return Nt.existsSync(n) || B5.mkdirsSync(n), Nt.linkSync(e, t);
}
var K4 = {
  createLink: W4(j4),
  createLinkSync: V4
};
const $t = ne, yn = ke, X4 = gr.pathExists;
function Y4(e, t, r) {
  if ($t.isAbsolute(e))
    return yn.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = $t.dirname(t), i = $t.join(n, e);
    return X4(i, (o, s) => o ? r(o) : s ? r(null, {
      toCwd: i,
      toDst: e
    }) : yn.lstat(e, (a) => a ? (a.message = a.message.replace("lstat", "ensureSymlink"), r(a)) : r(null, {
      toCwd: e,
      toDst: $t.relative(n, e)
    })));
  }
}
function z4(e, t) {
  let r;
  if ($t.isAbsolute(e)) {
    if (r = yn.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = $t.dirname(t), i = $t.join(n, e);
    if (r = yn.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = yn.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: $t.relative(n, e)
    };
  }
}
var Q4 = {
  symlinkPaths: Y4,
  symlinkPathsSync: z4
};
const N5 = ke;
function Z4(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  N5.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function J4(e, t) {
  let r;
  if (t) return t;
  try {
    r = N5.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var e8 = {
  symlinkType: Z4,
  symlinkTypeSync: J4
};
const t8 = Ue.fromCallback, L5 = ne, it = Er, F5 = pt, r8 = F5.mkdirs, n8 = F5.mkdirsSync, $5 = Q4, i8 = $5.symlinkPaths, o8 = $5.symlinkPathsSync, U5 = e8, s8 = U5.symlinkType, a8 = U5.symlinkTypeSync, f8 = gr.pathExists, { areIdentical: k5 } = Yr;
function l8(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, it.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      it.stat(e),
      it.stat(t)
    ]).then(([s, a]) => {
      if (k5(s, a)) return n(null);
      Qo(e, t, r, n);
    }) : Qo(e, t, r, n);
  });
}
function Qo(e, t, r, n) {
  i8(e, t, (i, o) => {
    if (i) return n(i);
    e = o.toDst, s8(o.toCwd, r, (s, a) => {
      if (s) return n(s);
      const f = L5.dirname(t);
      f8(f, (c, l) => {
        if (c) return n(c);
        if (l) return it.symlink(e, t, a, n);
        r8(f, (u) => {
          if (u) return n(u);
          it.symlink(e, t, a, n);
        });
      });
    });
  });
}
function c8(e, t, r) {
  let n;
  try {
    n = it.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const a = it.statSync(e), f = it.statSync(t);
    if (k5(a, f)) return;
  }
  const i = o8(e, t);
  e = i.toDst, r = a8(i.toCwd, r);
  const o = L5.dirname(t);
  return it.existsSync(o) || n8(o), it.symlinkSync(e, t, r);
}
var u8 = {
  createSymlink: t8(l8),
  createSymlinkSync: c8
};
const { createFile: Zo, createFileSync: Jo } = H4, { createLink: es, createLinkSync: ts } = K4, { createSymlink: rs, createSymlinkSync: ns } = u8;
var h8 = {
  // file
  createFile: Zo,
  createFileSync: Jo,
  ensureFile: Zo,
  ensureFileSync: Jo,
  // link
  createLink: es,
  createLinkSync: ts,
  ensureLink: es,
  ensureLinkSync: ts,
  // symlink
  createSymlink: rs,
  createSymlinkSync: ns,
  ensureSymlink: rs,
  ensureSymlinkSync: ns
};
function d8(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const o = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
}
function p8(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var H2 = { stringify: d8, stripBom: p8 };
let Vr;
try {
  Vr = ke;
} catch {
  Vr = Ie;
}
const hi = Ue, { stringify: M5, stripBom: G5 } = H2;
async function m8(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Vr, n = "throws" in t ? t.throws : !0;
  let i = await hi.fromCallback(r.readFile)(e, t);
  i = G5(i);
  let o;
  try {
    o = JSON.parse(i, t ? t.reviver : null);
  } catch (s) {
    if (n)
      throw s.message = `${e}: ${s.message}`, s;
    return null;
  }
  return o;
}
const _8 = hi.fromPromise(m8);
function x8(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Vr, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = G5(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function E8(e, t, r = {}) {
  const n = r.fs || Vr, i = M5(t, r);
  await hi.fromCallback(n.writeFile)(e, i, r);
}
const g8 = hi.fromPromise(E8);
function C8(e, t, r = {}) {
  const n = r.fs || Vr, i = M5(t, r);
  return n.writeFileSync(e, i, r);
}
const b8 = {
  readFile: _8,
  readFileSync: x8,
  writeFile: g8,
  writeFileSync: C8
};
var y8 = b8;
const d1 = y8;
var T8 = {
  // jsonfile exports
  readJson: d1.readFile,
  readJsonSync: d1.readFileSync,
  writeJson: d1.writeFile,
  writeJsonSync: d1.writeFileSync
};
const v8 = Ue.fromCallback, Tn = ke, H5 = ne, W5 = pt, A8 = gr.pathExists;
function w8(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = H5.dirname(e);
  A8(i, (o, s) => {
    if (o) return n(o);
    if (s) return Tn.writeFile(e, t, r, n);
    W5.mkdirs(i, (a) => {
      if (a) return n(a);
      Tn.writeFile(e, t, r, n);
    });
  });
}
function P8(e, ...t) {
  const r = H5.dirname(e);
  if (Tn.existsSync(r))
    return Tn.writeFileSync(e, ...t);
  W5.mkdirsSync(r), Tn.writeFileSync(e, ...t);
}
var W2 = {
  outputFile: v8(w8),
  outputFileSync: P8
};
const { stringify: S8 } = H2, { outputFile: O8 } = W2;
async function I8(e, t, r = {}) {
  const n = S8(t, r);
  await O8(e, n, r);
}
var R8 = I8;
const { stringify: B8 } = H2, { outputFileSync: D8 } = W2;
function N8(e, t, r) {
  const n = B8(t, r);
  D8(e, n, r);
}
var L8 = N8;
const F8 = Ue.fromPromise, Fe = T8;
Fe.outputJson = F8(R8);
Fe.outputJsonSync = L8;
Fe.outputJSON = Fe.outputJson;
Fe.outputJSONSync = Fe.outputJsonSync;
Fe.writeJSON = Fe.writeJson;
Fe.writeJSONSync = Fe.writeJsonSync;
Fe.readJSON = Fe.readJson;
Fe.readJSONSync = Fe.readJsonSync;
var $8 = Fe;
const U8 = ke, c2 = ne, k8 = M2.copy, q5 = ui.remove, M8 = pt.mkdirp, G8 = gr.pathExists, is = Yr;
function H8(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  is.checkPaths(e, t, "move", r, (o, s) => {
    if (o) return n(o);
    const { srcStat: a, isChangingCase: f = !1 } = s;
    is.checkParentPaths(e, a, t, "move", (c) => {
      if (c) return n(c);
      if (W8(t)) return os(e, t, i, f, n);
      M8(c2.dirname(t), (l) => l ? n(l) : os(e, t, i, f, n));
    });
  });
}
function W8(e) {
  const t = c2.dirname(e);
  return c2.parse(t).root === t;
}
function os(e, t, r, n, i) {
  if (n) return Ki(e, t, r, i);
  if (r)
    return q5(t, (o) => o ? i(o) : Ki(e, t, r, i));
  G8(t, (o, s) => o ? i(o) : s ? i(new Error("dest already exists.")) : Ki(e, t, r, i));
}
function Ki(e, t, r, n) {
  U8.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : q8(e, t, r, n) : n());
}
function q8(e, t, r, n) {
  k8(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (o) => o ? n(o) : q5(e, n));
}
var j8 = H8;
const j5 = ke, u2 = ne, V8 = M2.copySync, V5 = ui.removeSync, K8 = pt.mkdirpSync, ss = Yr;
function X8(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = ss.checkPathsSync(e, t, "move", r);
  return ss.checkParentPathsSync(e, i, t, "move"), Y8(t) || K8(u2.dirname(t)), z8(e, t, n, o);
}
function Y8(e) {
  const t = u2.dirname(e);
  return u2.parse(t).root === t;
}
function z8(e, t, r, n) {
  if (n) return Xi(e, t, r);
  if (r)
    return V5(t), Xi(e, t, r);
  if (j5.existsSync(t)) throw new Error("dest already exists.");
  return Xi(e, t, r);
}
function Xi(e, t, r) {
  try {
    j5.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return Q8(e, t, r);
  }
}
function Q8(e, t, r) {
  return V8(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), V5(e);
}
var Z8 = X8;
const J8 = Ue.fromCallback;
var e7 = {
  move: J8(j8),
  moveSync: Z8
}, Kt = {
  // Export promiseified graceful-fs:
  ...Er,
  // Export extra methods:
  ...M2,
  ...U4,
  ...h8,
  ...$8,
  ...pt,
  ...e7,
  ...W2,
  ...gr,
  ...ui
}, Tt = {}, Mt = {}, Ee = {}, Gt = {};
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.CancellationError = Gt.CancellationToken = void 0;
const t7 = fi;
class r7 extends t7.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new h2());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, o) => {
      let s = null;
      if (n = () => {
        try {
          s != null && (s(), s = null);
        } finally {
          o(new h2());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, o, (a) => {
        s = a;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
Gt.CancellationToken = r7;
class h2 extends Error {
  constructor() {
    super("cancelled");
  }
}
Gt.CancellationError = h2;
var zr = {};
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.newError = n7;
function n7(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var Le = {}, d2 = { exports: {} }, p1 = { exports: {} }, Yi, as;
function i7() {
  if (as) return Yi;
  as = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, o = n * 365.25;
  Yi = function(l, u) {
    u = u || {};
    var h = typeof l;
    if (h === "string" && l.length > 0)
      return s(l);
    if (h === "number" && isFinite(l))
      return u.long ? f(l) : a(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function s(l) {
    if (l = String(l), !(l.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (u) {
        var h = parseFloat(u[1]), d = (u[2] || "ms").toLowerCase();
        switch (d) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * o;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function a(l) {
    var u = Math.abs(l);
    return u >= n ? Math.round(l / n) + "d" : u >= r ? Math.round(l / r) + "h" : u >= t ? Math.round(l / t) + "m" : u >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function f(l) {
    var u = Math.abs(l);
    return u >= n ? c(l, u, n, "day") : u >= r ? c(l, u, r, "hour") : u >= t ? c(l, u, t, "minute") : u >= e ? c(l, u, e, "second") : l + " ms";
  }
  function c(l, u, h, d) {
    var _ = u >= h * 1.5;
    return Math.round(l / h) + " " + d + (_ ? "s" : "");
  }
  return Yi;
}
var zi, fs;
function K5() {
  if (fs) return zi;
  fs = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = c, n.disable = a, n.enable = o, n.enabled = f, n.humanize = i7(), n.destroy = l, Object.keys(t).forEach((u) => {
      n[u] = t[u];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(u) {
      let h = 0;
      for (let d = 0; d < u.length; d++)
        h = (h << 5) - h + u.charCodeAt(d), h |= 0;
      return n.colors[Math.abs(h) % n.colors.length];
    }
    n.selectColor = r;
    function n(u) {
      let h, d = null, _, p;
      function x(...y) {
        if (!x.enabled)
          return;
        const b = x, w = Number(/* @__PURE__ */ new Date()), T = w - (h || w);
        b.diff = T, b.prev = h, b.curr = w, h = w, y[0] = n.coerce(y[0]), typeof y[0] != "string" && y.unshift("%O");
        let L = 0;
        y[0] = y[0].replace(/%([a-zA-Z%])/g, (H, Q) => {
          if (H === "%%")
            return "%";
          L++;
          const C = n.formatters[Q];
          if (typeof C == "function") {
            const q = y[L];
            H = C.call(b, q), y.splice(L, 1), L--;
          }
          return H;
        }), n.formatArgs.call(b, y), (b.log || n.log).apply(b, y);
      }
      return x.namespace = u, x.useColors = n.useColors(), x.color = n.selectColor(u), x.extend = i, x.destroy = n.destroy, Object.defineProperty(x, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => d !== null ? d : (_ !== n.namespaces && (_ = n.namespaces, p = n.enabled(u)), p),
        set: (y) => {
          d = y;
        }
      }), typeof n.init == "function" && n.init(x), x;
    }
    function i(u, h) {
      const d = n(this.namespace + (typeof h > "u" ? ":" : h) + u);
      return d.log = this.log, d;
    }
    function o(u) {
      n.save(u), n.namespaces = u, n.names = [], n.skips = [];
      const h = (typeof u == "string" ? u : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const d of h)
        d[0] === "-" ? n.skips.push(d.slice(1)) : n.names.push(d);
    }
    function s(u, h) {
      let d = 0, _ = 0, p = -1, x = 0;
      for (; d < u.length; )
        if (_ < h.length && (h[_] === u[d] || h[_] === "*"))
          h[_] === "*" ? (p = _, x = d, _++) : (d++, _++);
        else if (p !== -1)
          _ = p + 1, x++, d = x;
        else
          return !1;
      for (; _ < h.length && h[_] === "*"; )
        _++;
      return _ === h.length;
    }
    function a() {
      const u = [
        ...n.names,
        ...n.skips.map((h) => "-" + h)
      ].join(",");
      return n.enable(""), u;
    }
    function f(u) {
      for (const h of n.skips)
        if (s(u, h))
          return !1;
      for (const h of n.names)
        if (s(u, h))
          return !0;
      return !1;
    }
    function c(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function l() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return zi = e, zi;
}
var ls;
function o7() {
  return ls || (ls = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = o, t.useColors = r, t.storage = s(), t.destroy = /* @__PURE__ */ (() => {
      let f = !1;
      return () => {
        f || (f = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let f;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (f = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(f[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(f) {
      if (f[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + f[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const c = "color: " + this.color;
      f.splice(1, 0, c, "color: inherit");
      let l = 0, u = 0;
      f[0].replace(/%[a-zA-Z%]/g, (h) => {
        h !== "%%" && (l++, h === "%c" && (u = l));
      }), f.splice(u, 0, c);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(f) {
      try {
        f ? t.storage.setItem("debug", f) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let f;
      try {
        f = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !f && typeof process < "u" && "env" in process && (f = process.env.DEBUG), f;
    }
    function s() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = K5()(t);
    const { formatters: a } = e.exports;
    a.j = function(f) {
      try {
        return JSON.stringify(f);
      } catch (c) {
        return "[UnexpectedJSONParseError]: " + c.message;
      }
    };
  }(p1, p1.exports)), p1.exports;
}
var m1 = { exports: {} }, Qi, cs;
function s7() {
  return cs || (cs = 1, Qi = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), Qi;
}
var Zi, us;
function a7() {
  if (us) return Zi;
  us = 1;
  const e = Hn, t = r5, r = s7(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function o(f) {
    return f === 0 ? !1 : {
      level: f,
      hasBasic: !0,
      has256: f >= 2,
      has16m: f >= 3
    };
  }
  function s(f, c) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (f && !c && i === void 0)
      return 0;
    const l = i || 0;
    if (n.TERM === "dumb")
      return l;
    if (process.platform === "win32") {
      const u = e.release().split(".");
      return Number(u[0]) >= 10 && Number(u[2]) >= 10586 ? Number(u[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((u) => u in n) || n.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const u = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return u >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : l;
  }
  function a(f) {
    const c = s(f, f && f.isTTY);
    return o(c);
  }
  return Zi = {
    supportsColor: a,
    stdout: o(s(!0, t.isatty(1))),
    stderr: o(s(!0, t.isatty(2)))
  }, Zi;
}
var hs;
function f7() {
  return hs || (hs = 1, function(e, t) {
    const r = r5, n = yt;
    t.init = l, t.log = a, t.formatArgs = o, t.save = f, t.load = c, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = a7();
      h && (h.stderr || h).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((h) => /^debug_/i.test(h)).reduce((h, d) => {
      const _ = d.substring(6).toLowerCase().replace(/_([a-z])/g, (x, y) => y.toUpperCase());
      let p = process.env[d];
      return /^(yes|on|true|enabled)$/i.test(p) ? p = !0 : /^(no|off|false|disabled)$/i.test(p) ? p = !1 : p === "null" ? p = null : p = Number(p), h[_] = p, h;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function o(h) {
      const { namespace: d, useColors: _ } = this;
      if (_) {
        const p = this.color, x = "\x1B[3" + (p < 8 ? p : "8;5;" + p), y = `  ${x};1m${d} \x1B[0m`;
        h[0] = y + h[0].split(`
`).join(`
` + y), h.push(x + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        h[0] = s() + d + " " + h[0];
    }
    function s() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function a(...h) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...h) + `
`);
    }
    function f(h) {
      h ? process.env.DEBUG = h : delete process.env.DEBUG;
    }
    function c() {
      return process.env.DEBUG;
    }
    function l(h) {
      h.inspectOpts = {};
      const d = Object.keys(t.inspectOpts);
      for (let _ = 0; _ < d.length; _++)
        h.inspectOpts[d[_]] = t.inspectOpts[d[_]];
    }
    e.exports = K5()(t);
    const { formatters: u } = e.exports;
    u.o = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts).split(`
`).map((d) => d.trim()).join(" ");
    }, u.O = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts);
    };
  }(m1, m1.exports)), m1.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? d2.exports = o7() : d2.exports = f7();
var l7 = d2.exports, qn = {};
Object.defineProperty(qn, "__esModule", { value: !0 });
qn.ProgressCallbackTransform = void 0;
const c7 = Ve;
class u7 extends c7.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
qn.ProgressCallbackTransform = u7;
Object.defineProperty(Le, "__esModule", { value: !0 });
Le.DigestTransform = Le.HttpExecutor = Le.HttpError = void 0;
Le.createHttpError = p2;
Le.parseJson = g7;
Le.configureRequestOptionsFromUrl = Y5;
Le.configureRequestUrl = j2;
Le.safeGetHeader = Gr;
Le.configureRequestOptions = Y1;
Le.safeStringifyJson = z1;
const h7 = jt, d7 = l7, p7 = Ie, m7 = Ve, X5 = xr, _7 = Gt, ds = zr, x7 = qn, fn = (0, d7.default)("electron-builder");
function p2(e, t = null) {
  return new q2(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + z1(e.headers), t);
}
const E7 = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class q2 extends Error {
  constructor(t, r = `HTTP error: ${E7.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Le.HttpError = q2;
function g7(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class X1 {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new _7.CancellationToken(), n) {
    Y1(t);
    const i = n == null ? void 0 : JSON.stringify(n), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      fn(i);
      const { headers: s, ...a } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": o.length,
          ...s
        },
        ...a
      };
    }
    return this.doApiRequest(t, r, (s) => s.end(o));
  }
  doApiRequest(t, r, n, i = 0) {
    return fn.enabled && fn(`Request: ${z1(t)}`), r.createPromise((o, s, a) => {
      const f = this.createRequest(t, (c) => {
        try {
          this.handleResponse(c, t, r, o, s, i, n);
        } catch (l) {
          s(l);
        }
      });
      this.addErrorAndTimeoutHandlers(f, s, t.timeout), this.addRedirectHandlers(f, t, s, i, (c) => {
        this.doApiRequest(c, r, n, i).then(o).catch(s);
      }), n(f, s), a(() => f.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, o) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, o, s, a) {
    var f;
    if (fn.enabled && fn(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${z1(r)}`), t.statusCode === 404) {
      o(p2(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const c = (f = t.statusCode) !== null && f !== void 0 ? f : 0, l = c >= 300 && c < 400, u = Gr(t, "location");
    if (l && u != null) {
      if (s > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(X1.prepareRedirectUrlOptions(u, r), n, a, s).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let h = "";
    t.on("error", o), t.on("data", (d) => h += d), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const d = Gr(t, "content-type"), _ = d != null && (Array.isArray(d) ? d.find((p) => p.includes("json")) != null : d.includes("json"));
          o(p2(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${_ ? JSON.stringify(JSON.parse(h)) : h}
          `));
        } else
          i(h.length === 0 ? null : h);
      } catch (d) {
        o(d);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, o) => {
      const s = [], a = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      j2(t, a), Y1(a), this.doDownload(a, {
        destination: null,
        options: r,
        onCancel: o,
        callback: (f) => {
          f == null ? n(Buffer.concat(s)) : i(f);
        },
        responseHandler: (f, c) => {
          let l = 0;
          f.on("data", (u) => {
            if (l += u.length, l > 524288e3) {
              c(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            s.push(u);
          }), f.on("end", () => {
            c(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (o) => {
      if (o.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${o.statusCode}: ${o.statusMessage}`));
        return;
      }
      o.on("error", r.callback);
      const s = Gr(o, "location");
      if (s != null) {
        n < this.maxRedirects ? this.doDownload(X1.prepareRedirectUrlOptions(s, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? b7(r, o) : r.responseHandler(o, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (o) => {
      this.doDownload(o, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = Y5(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const o = new X5.URL(t);
      (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return n;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof q2 && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
Le.HttpExecutor = X1;
function Y5(e, t) {
  const r = Y1(t);
  return j2(new X5.URL(e), r), r;
}
function j2(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class m2 extends m7.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, h7.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, ds.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, ds.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Le.DigestTransform = m2;
function C7(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Gr(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function b7(e, t) {
  if (!C7(Gr(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const s = Gr(t, "content-length");
    s != null && r.push(new x7.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new m2(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new m2(e.options.sha2, "sha256", "hex"));
  const i = (0, p7.createWriteStream)(e.destination);
  r.push(i);
  let o = t;
  for (const s of r)
    s.on("error", (a) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(a);
    }), o = o.pipe(s);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function Y1(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function z1(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var di = {};
Object.defineProperty(di, "__esModule", { value: !0 });
di.MemoLazy = void 0;
class y7 {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && z5(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
di.MemoLazy = y7;
function z5(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((s) => z5(e[s], t[s]));
  }
  return e === t;
}
var pi = {};
Object.defineProperty(pi, "__esModule", { value: !0 });
pi.githubUrl = T7;
pi.getS3LikeProviderBaseUrl = v7;
function T7(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function v7(e) {
  const t = e.provider;
  if (t === "s3")
    return A7(e);
  if (t === "spaces")
    return w7(e);
  throw new Error(`Not supported provider: ${t}`);
}
function A7(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return Q5(t, e.path);
}
function Q5(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function w7(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return Q5(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var V2 = {};
Object.defineProperty(V2, "__esModule", { value: !0 });
V2.retry = Z5;
const P7 = Gt;
async function Z5(e, t, r, n = 0, i = 0, o) {
  var s;
  const a = new P7.CancellationToken();
  try {
    return await e();
  } catch (f) {
    if ((!((s = o == null ? void 0 : o(f)) !== null && s !== void 0) || s) && t > 0 && !a.cancelled)
      return await new Promise((c) => setTimeout(c, r + n * i)), await Z5(e, t - 1, r, n, i + 1, o);
    throw f;
  }
}
var K2 = {};
Object.defineProperty(K2, "__esModule", { value: !0 });
K2.parseDn = S7;
function S7(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const o = /* @__PURE__ */ new Map();
  for (let s = 0; s <= e.length; s++) {
    if (s === e.length) {
      r !== null && o.set(r, n);
      break;
    }
    const a = e[s];
    if (t) {
      if (a === '"') {
        t = !1;
        continue;
      }
    } else {
      if (a === '"') {
        t = !0;
        continue;
      }
      if (a === "\\") {
        s++;
        const f = parseInt(e.slice(s, s + 2), 16);
        Number.isNaN(f) ? n += e[s] : (s++, n += String.fromCharCode(f));
        continue;
      }
      if (r === null && a === "=") {
        r = n, n = "";
        continue;
      }
      if (a === "," || a === ";" || a === "+") {
        r !== null && o.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (a === " " && !t) {
      if (n.length === 0)
        continue;
      if (s > i) {
        let f = s;
        for (; e[f] === " "; )
          f++;
        i = f;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        s = i - 1;
        continue;
      }
    }
    n += a;
  }
  return o;
}
var Kr = {};
Object.defineProperty(Kr, "__esModule", { value: !0 });
Kr.nil = Kr.UUID = void 0;
const J5 = jt, ef = zr, O7 = "options.name must be either a string or a Buffer", ps = (0, J5.randomBytes)(16);
ps[0] = ps[0] | 1;
const k1 = {}, Z = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  k1[t] = e, Z[e] = t;
}
class _r {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = _r.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return I7(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = R7(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (k1[t[14] + t[15]] & 240) >> 4,
        variant: ms((k1[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: ms((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, ef.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = k1[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
Kr.UUID = _r;
_r.OID = _r.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function ms(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var vn;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(vn || (vn = {}));
function I7(e, t, r, n, i = vn.ASCII) {
  const o = (0, J5.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, ef.newError)(O7, "ERR_INVALID_UUID_NAME");
  o.update(n), o.update(e);
  const a = o.digest();
  let f;
  switch (i) {
    case vn.BINARY:
      a[6] = a[6] & 15 | r, a[8] = a[8] & 63 | 128, f = a;
      break;
    case vn.OBJECT:
      a[6] = a[6] & 15 | r, a[8] = a[8] & 63 | 128, f = new _r(a);
      break;
    default:
      f = Z[a[0]] + Z[a[1]] + Z[a[2]] + Z[a[3]] + "-" + Z[a[4]] + Z[a[5]] + "-" + Z[a[6] & 15 | r] + Z[a[7]] + "-" + Z[a[8] & 63 | 128] + Z[a[9]] + "-" + Z[a[10]] + Z[a[11]] + Z[a[12]] + Z[a[13]] + Z[a[14]] + Z[a[15]];
      break;
  }
  return f;
}
function R7(e) {
  return Z[e[0]] + Z[e[1]] + Z[e[2]] + Z[e[3]] + "-" + Z[e[4]] + Z[e[5]] + "-" + Z[e[6]] + Z[e[7]] + "-" + Z[e[8]] + Z[e[9]] + "-" + Z[e[10]] + Z[e[11]] + Z[e[12]] + Z[e[13]] + Z[e[14]] + Z[e[15]];
}
Kr.nil = new _r("00000000-0000-0000-0000-000000000000");
var jn = {}, tf = {};
(function(e) {
  (function(t) {
    t.parser = function(E, m) {
      return new n(E, m);
    }, t.SAXParser = n, t.SAXStream = l, t.createStream = c, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(E, m) {
      if (!(this instanceof n))
        return new n(E, m);
      var R = this;
      o(R), R.q = R.c = "", R.bufferCheckPosition = t.MAX_BUFFER_LENGTH, R.opt = m || {}, R.opt.lowercase = R.opt.lowercase || R.opt.lowercasetags, R.looseCase = R.opt.lowercase ? "toLowerCase" : "toUpperCase", R.tags = [], R.closed = R.closedRoot = R.sawRoot = !1, R.tag = R.error = null, R.strict = !!E, R.noscript = !!(E || R.opt.noscript), R.state = C.BEGIN, R.strictEntities = R.opt.strictEntities, R.ENTITIES = R.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), R.attribList = [], R.opt.xmlns && (R.ns = Object.create(p)), R.opt.unquotedAttributeValues === void 0 && (R.opt.unquotedAttributeValues = !E), R.trackPosition = R.opt.position !== !1, R.trackPosition && (R.position = R.line = R.column = 0), F(R, "onready");
    }
    Object.create || (Object.create = function(E) {
      function m() {
      }
      m.prototype = E;
      var R = new m();
      return R;
    }), Object.keys || (Object.keys = function(E) {
      var m = [];
      for (var R in E) E.hasOwnProperty(R) && m.push(R);
      return m;
    });
    function i(E) {
      for (var m = Math.max(t.MAX_BUFFER_LENGTH, 10), R = 0, A = 0, J = r.length; A < J; A++) {
        var ie = E[r[A]].length;
        if (ie > m)
          switch (r[A]) {
            case "textNode":
              W(E);
              break;
            case "cdata":
              $(E, "oncdata", E.cdata), E.cdata = "";
              break;
            case "script":
              $(E, "onscript", E.script), E.script = "";
              break;
            default:
              I(E, "Max buffer length exceeded: " + r[A]);
          }
        R = Math.max(R, ie);
      }
      var ae = t.MAX_BUFFER_LENGTH - R;
      E.bufferCheckPosition = ae + E.position;
    }
    function o(E) {
      for (var m = 0, R = r.length; m < R; m++)
        E[r[m]] = "";
    }
    function s(E) {
      W(E), E.cdata !== "" && ($(E, "oncdata", E.cdata), E.cdata = ""), E.script !== "" && ($(E, "onscript", E.script), E.script = "");
    }
    n.prototype = {
      end: function() {
        N(this);
      },
      write: Ae,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        s(this);
      }
    };
    var a;
    try {
      a = require("stream").Stream;
    } catch {
      a = function() {
      };
    }
    a || (a = function() {
    });
    var f = t.EVENTS.filter(function(E) {
      return E !== "error" && E !== "end";
    });
    function c(E, m) {
      return new l(E, m);
    }
    function l(E, m) {
      if (!(this instanceof l))
        return new l(E, m);
      a.apply(this), this._parser = new n(E, m), this.writable = !0, this.readable = !0;
      var R = this;
      this._parser.onend = function() {
        R.emit("end");
      }, this._parser.onerror = function(A) {
        R.emit("error", A), R._parser.error = null;
      }, this._decoder = null, f.forEach(function(A) {
        Object.defineProperty(R, "on" + A, {
          get: function() {
            return R._parser["on" + A];
          },
          set: function(J) {
            if (!J)
              return R.removeAllListeners(A), R._parser["on" + A] = J, J;
            R.on(A, J);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    l.prototype = Object.create(a.prototype, {
      constructor: {
        value: l
      }
    }), l.prototype.write = function(E) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(E)) {
        if (!this._decoder) {
          var m = n5.StringDecoder;
          this._decoder = new m("utf8");
        }
        E = this._decoder.write(E);
      }
      return this._parser.write(E.toString()), this.emit("data", E), !0;
    }, l.prototype.end = function(E) {
      return E && E.length && this.write(E), this._parser.end(), !0;
    }, l.prototype.on = function(E, m) {
      var R = this;
      return !R._parser["on" + E] && f.indexOf(E) !== -1 && (R._parser["on" + E] = function() {
        var A = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        A.splice(0, 0, E), R.emit.apply(R, A);
      }), a.prototype.on.call(R, E, m);
    };
    var u = "[CDATA[", h = "DOCTYPE", d = "http://www.w3.org/XML/1998/namespace", _ = "http://www.w3.org/2000/xmlns/", p = { xml: d, xmlns: _ }, x = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, y = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, b = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, w = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function T(E) {
      return E === " " || E === `
` || E === "\r" || E === "	";
    }
    function L(E) {
      return E === '"' || E === "'";
    }
    function G(E) {
      return E === ">" || T(E);
    }
    function H(E, m) {
      return E.test(m);
    }
    function Q(E, m) {
      return !H(E, m);
    }
    var C = 0;
    t.STATE = {
      BEGIN: C++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: C++,
      // leading whitespace
      TEXT: C++,
      // general stuff
      TEXT_ENTITY: C++,
      // &amp and such.
      OPEN_WAKA: C++,
      // <
      SGML_DECL: C++,
      // <!BLARG
      SGML_DECL_QUOTED: C++,
      // <!BLARG foo "bar
      DOCTYPE: C++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: C++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: C++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: C++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: C++,
      // <!-
      COMMENT: C++,
      // <!--
      COMMENT_ENDING: C++,
      // <!-- blah -
      COMMENT_ENDED: C++,
      // <!-- blah --
      CDATA: C++,
      // <![CDATA[ something
      CDATA_ENDING: C++,
      // ]
      CDATA_ENDING_2: C++,
      // ]]
      PROC_INST: C++,
      // <?hi
      PROC_INST_BODY: C++,
      // <?hi there
      PROC_INST_ENDING: C++,
      // <?hi "there" ?
      OPEN_TAG: C++,
      // <strong
      OPEN_TAG_SLASH: C++,
      // <strong /
      ATTRIB: C++,
      // <a
      ATTRIB_NAME: C++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: C++,
      // <a foo _
      ATTRIB_VALUE: C++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: C++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: C++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: C++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: C++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: C++,
      // <foo bar=&quot
      CLOSE_TAG: C++,
      // </a
      CLOSE_TAG_SAW_WHITE: C++,
      // </a   >
      SCRIPT: C++,
      // <script> ...
      SCRIPT_ENDING: C++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(E) {
      var m = t.ENTITIES[E], R = typeof m == "number" ? String.fromCharCode(m) : m;
      t.ENTITIES[E] = R;
    });
    for (var q in t.STATE)
      t.STATE[t.STATE[q]] = q;
    C = t.STATE;
    function F(E, m, R) {
      E[m] && E[m](R);
    }
    function $(E, m, R) {
      E.textNode && W(E), F(E, m, R);
    }
    function W(E) {
      E.textNode = D(E.opt, E.textNode), E.textNode && F(E, "ontext", E.textNode), E.textNode = "";
    }
    function D(E, m) {
      return E.trim && (m = m.trim()), E.normalize && (m = m.replace(/\s+/g, " ")), m;
    }
    function I(E, m) {
      return W(E), E.trackPosition && (m += `
Line: ` + E.line + `
Column: ` + E.column + `
Char: ` + E.c), m = new Error(m), E.error = m, F(E, "onerror", m), E;
    }
    function N(E) {
      return E.sawRoot && !E.closedRoot && O(E, "Unclosed root tag"), E.state !== C.BEGIN && E.state !== C.BEGIN_WHITESPACE && E.state !== C.TEXT && I(E, "Unexpected end"), W(E), E.c = "", E.closed = !0, F(E, "onend"), n.call(E, E.strict, E.opt), E;
    }
    function O(E, m) {
      if (typeof E != "object" || !(E instanceof n))
        throw new Error("bad call to strictFail");
      E.strict && I(E, m);
    }
    function S(E) {
      E.strict || (E.tagName = E.tagName[E.looseCase]());
      var m = E.tags[E.tags.length - 1] || E, R = E.tag = { name: E.tagName, attributes: {} };
      E.opt.xmlns && (R.ns = m.ns), E.attribList.length = 0, $(E, "onopentagstart", R);
    }
    function P(E, m) {
      var R = E.indexOf(":"), A = R < 0 ? ["", E] : E.split(":"), J = A[0], ie = A[1];
      return m && E === "xmlns" && (J = "xmlns", ie = ""), { prefix: J, local: ie };
    }
    function U(E) {
      if (E.strict || (E.attribName = E.attribName[E.looseCase]()), E.attribList.indexOf(E.attribName) !== -1 || E.tag.attributes.hasOwnProperty(E.attribName)) {
        E.attribName = E.attribValue = "";
        return;
      }
      if (E.opt.xmlns) {
        var m = P(E.attribName, !0), R = m.prefix, A = m.local;
        if (R === "xmlns")
          if (A === "xml" && E.attribValue !== d)
            O(
              E,
              "xml: prefix must be bound to " + d + `
Actual: ` + E.attribValue
            );
          else if (A === "xmlns" && E.attribValue !== _)
            O(
              E,
              "xmlns: prefix must be bound to " + _ + `
Actual: ` + E.attribValue
            );
          else {
            var J = E.tag, ie = E.tags[E.tags.length - 1] || E;
            J.ns === ie.ns && (J.ns = Object.create(ie.ns)), J.ns[A] = E.attribValue;
          }
        E.attribList.push([E.attribName, E.attribValue]);
      } else
        E.tag.attributes[E.attribName] = E.attribValue, $(E, "onattribute", {
          name: E.attribName,
          value: E.attribValue
        });
      E.attribName = E.attribValue = "";
    }
    function k(E, m) {
      if (E.opt.xmlns) {
        var R = E.tag, A = P(E.tagName);
        R.prefix = A.prefix, R.local = A.local, R.uri = R.ns[A.prefix] || "", R.prefix && !R.uri && (O(E, "Unbound namespace prefix: " + JSON.stringify(E.tagName)), R.uri = A.prefix);
        var J = E.tags[E.tags.length - 1] || E;
        R.ns && J.ns !== R.ns && Object.keys(R.ns).forEach(function(r1) {
          $(E, "onopennamespace", {
            prefix: r1,
            uri: R.ns[r1]
          });
        });
        for (var ie = 0, ae = E.attribList.length; ie < ae; ie++) {
          var Ce = E.attribList[ie], we = Ce[0], At = Ce[1], he = P(we, !0), tt = he.prefix, Fi = he.local, t1 = tt === "" ? "" : R.ns[tt] || "", rn = {
            name: we,
            value: At,
            prefix: tt,
            local: Fi,
            uri: t1
          };
          tt && tt !== "xmlns" && !t1 && (O(E, "Unbound namespace prefix: " + JSON.stringify(tt)), rn.uri = tt), E.tag.attributes[we] = rn, $(E, "onattribute", rn);
        }
        E.attribList.length = 0;
      }
      E.tag.isSelfClosing = !!m, E.sawRoot = !0, E.tags.push(E.tag), $(E, "onopentag", E.tag), m || (!E.noscript && E.tagName.toLowerCase() === "script" ? E.state = C.SCRIPT : E.state = C.TEXT, E.tag = null, E.tagName = ""), E.attribName = E.attribValue = "", E.attribList.length = 0;
    }
    function j(E) {
      if (!E.tagName) {
        O(E, "Weird empty close tag."), E.textNode += "</>", E.state = C.TEXT;
        return;
      }
      if (E.script) {
        if (E.tagName !== "script") {
          E.script += "</" + E.tagName + ">", E.tagName = "", E.state = C.SCRIPT;
          return;
        }
        $(E, "onscript", E.script), E.script = "";
      }
      var m = E.tags.length, R = E.tagName;
      E.strict || (R = R[E.looseCase]());
      for (var A = R; m--; ) {
        var J = E.tags[m];
        if (J.name !== A)
          O(E, "Unexpected close tag");
        else
          break;
      }
      if (m < 0) {
        O(E, "Unmatched closing tag: " + E.tagName), E.textNode += "</" + E.tagName + ">", E.state = C.TEXT;
        return;
      }
      E.tagName = R;
      for (var ie = E.tags.length; ie-- > m; ) {
        var ae = E.tag = E.tags.pop();
        E.tagName = E.tag.name, $(E, "onclosetag", E.tagName);
        var Ce = {};
        for (var we in ae.ns)
          Ce[we] = ae.ns[we];
        var At = E.tags[E.tags.length - 1] || E;
        E.opt.xmlns && ae.ns !== At.ns && Object.keys(ae.ns).forEach(function(he) {
          var tt = ae.ns[he];
          $(E, "onclosenamespace", { prefix: he, uri: tt });
        });
      }
      m === 0 && (E.closedRoot = !0), E.tagName = E.attribValue = E.attribName = "", E.attribList.length = 0, E.state = C.TEXT;
    }
    function z(E) {
      var m = E.entity, R = m.toLowerCase(), A, J = "";
      return E.ENTITIES[m] ? E.ENTITIES[m] : E.ENTITIES[R] ? E.ENTITIES[R] : (m = R, m.charAt(0) === "#" && (m.charAt(1) === "x" ? (m = m.slice(2), A = parseInt(m, 16), J = A.toString(16)) : (m = m.slice(1), A = parseInt(m, 10), J = A.toString(10))), m = m.replace(/^0+/, ""), isNaN(A) || J.toLowerCase() !== m ? (O(E, "Invalid character entity"), "&" + E.entity + ";") : String.fromCodePoint(A));
    }
    function ee(E, m) {
      m === "<" ? (E.state = C.OPEN_WAKA, E.startTagPosition = E.position) : T(m) || (O(E, "Non-whitespace before first tag."), E.textNode = m, E.state = C.TEXT);
    }
    function V(E, m) {
      var R = "";
      return m < E.length && (R = E.charAt(m)), R;
    }
    function Ae(E) {
      var m = this;
      if (this.error)
        throw this.error;
      if (m.closed)
        return I(
          m,
          "Cannot write after close. Assign an onready handler."
        );
      if (E === null)
        return N(m);
      typeof E == "object" && (E = E.toString());
      for (var R = 0, A = ""; A = V(E, R++), m.c = A, !!A; )
        switch (m.trackPosition && (m.position++, A === `
` ? (m.line++, m.column = 0) : m.column++), m.state) {
          case C.BEGIN:
            if (m.state = C.BEGIN_WHITESPACE, A === "\uFEFF")
              continue;
            ee(m, A);
            continue;
          case C.BEGIN_WHITESPACE:
            ee(m, A);
            continue;
          case C.TEXT:
            if (m.sawRoot && !m.closedRoot) {
              for (var J = R - 1; A && A !== "<" && A !== "&"; )
                A = V(E, R++), A && m.trackPosition && (m.position++, A === `
` ? (m.line++, m.column = 0) : m.column++);
              m.textNode += E.substring(J, R - 1);
            }
            A === "<" && !(m.sawRoot && m.closedRoot && !m.strict) ? (m.state = C.OPEN_WAKA, m.startTagPosition = m.position) : (!T(A) && (!m.sawRoot || m.closedRoot) && O(m, "Text data outside of root node."), A === "&" ? m.state = C.TEXT_ENTITY : m.textNode += A);
            continue;
          case C.SCRIPT:
            A === "<" ? m.state = C.SCRIPT_ENDING : m.script += A;
            continue;
          case C.SCRIPT_ENDING:
            A === "/" ? m.state = C.CLOSE_TAG : (m.script += "<" + A, m.state = C.SCRIPT);
            continue;
          case C.OPEN_WAKA:
            if (A === "!")
              m.state = C.SGML_DECL, m.sgmlDecl = "";
            else if (!T(A)) if (H(x, A))
              m.state = C.OPEN_TAG, m.tagName = A;
            else if (A === "/")
              m.state = C.CLOSE_TAG, m.tagName = "";
            else if (A === "?")
              m.state = C.PROC_INST, m.procInstName = m.procInstBody = "";
            else {
              if (O(m, "Unencoded <"), m.startTagPosition + 1 < m.position) {
                var ie = m.position - m.startTagPosition;
                A = new Array(ie).join(" ") + A;
              }
              m.textNode += "<" + A, m.state = C.TEXT;
            }
            continue;
          case C.SGML_DECL:
            if (m.sgmlDecl + A === "--") {
              m.state = C.COMMENT, m.comment = "", m.sgmlDecl = "";
              continue;
            }
            m.doctype && m.doctype !== !0 && m.sgmlDecl ? (m.state = C.DOCTYPE_DTD, m.doctype += "<!" + m.sgmlDecl + A, m.sgmlDecl = "") : (m.sgmlDecl + A).toUpperCase() === u ? ($(m, "onopencdata"), m.state = C.CDATA, m.sgmlDecl = "", m.cdata = "") : (m.sgmlDecl + A).toUpperCase() === h ? (m.state = C.DOCTYPE, (m.doctype || m.sawRoot) && O(
              m,
              "Inappropriately located doctype declaration"
            ), m.doctype = "", m.sgmlDecl = "") : A === ">" ? ($(m, "onsgmldeclaration", m.sgmlDecl), m.sgmlDecl = "", m.state = C.TEXT) : (L(A) && (m.state = C.SGML_DECL_QUOTED), m.sgmlDecl += A);
            continue;
          case C.SGML_DECL_QUOTED:
            A === m.q && (m.state = C.SGML_DECL, m.q = ""), m.sgmlDecl += A;
            continue;
          case C.DOCTYPE:
            A === ">" ? (m.state = C.TEXT, $(m, "ondoctype", m.doctype), m.doctype = !0) : (m.doctype += A, A === "[" ? m.state = C.DOCTYPE_DTD : L(A) && (m.state = C.DOCTYPE_QUOTED, m.q = A));
            continue;
          case C.DOCTYPE_QUOTED:
            m.doctype += A, A === m.q && (m.q = "", m.state = C.DOCTYPE);
            continue;
          case C.DOCTYPE_DTD:
            A === "]" ? (m.doctype += A, m.state = C.DOCTYPE) : A === "<" ? (m.state = C.OPEN_WAKA, m.startTagPosition = m.position) : L(A) ? (m.doctype += A, m.state = C.DOCTYPE_DTD_QUOTED, m.q = A) : m.doctype += A;
            continue;
          case C.DOCTYPE_DTD_QUOTED:
            m.doctype += A, A === m.q && (m.state = C.DOCTYPE_DTD, m.q = "");
            continue;
          case C.COMMENT:
            A === "-" ? m.state = C.COMMENT_ENDING : m.comment += A;
            continue;
          case C.COMMENT_ENDING:
            A === "-" ? (m.state = C.COMMENT_ENDED, m.comment = D(m.opt, m.comment), m.comment && $(m, "oncomment", m.comment), m.comment = "") : (m.comment += "-" + A, m.state = C.COMMENT);
            continue;
          case C.COMMENT_ENDED:
            A !== ">" ? (O(m, "Malformed comment"), m.comment += "--" + A, m.state = C.COMMENT) : m.doctype && m.doctype !== !0 ? m.state = C.DOCTYPE_DTD : m.state = C.TEXT;
            continue;
          case C.CDATA:
            A === "]" ? m.state = C.CDATA_ENDING : m.cdata += A;
            continue;
          case C.CDATA_ENDING:
            A === "]" ? m.state = C.CDATA_ENDING_2 : (m.cdata += "]" + A, m.state = C.CDATA);
            continue;
          case C.CDATA_ENDING_2:
            A === ">" ? (m.cdata && $(m, "oncdata", m.cdata), $(m, "onclosecdata"), m.cdata = "", m.state = C.TEXT) : A === "]" ? m.cdata += "]" : (m.cdata += "]]" + A, m.state = C.CDATA);
            continue;
          case C.PROC_INST:
            A === "?" ? m.state = C.PROC_INST_ENDING : T(A) ? m.state = C.PROC_INST_BODY : m.procInstName += A;
            continue;
          case C.PROC_INST_BODY:
            if (!m.procInstBody && T(A))
              continue;
            A === "?" ? m.state = C.PROC_INST_ENDING : m.procInstBody += A;
            continue;
          case C.PROC_INST_ENDING:
            A === ">" ? ($(m, "onprocessinginstruction", {
              name: m.procInstName,
              body: m.procInstBody
            }), m.procInstName = m.procInstBody = "", m.state = C.TEXT) : (m.procInstBody += "?" + A, m.state = C.PROC_INST_BODY);
            continue;
          case C.OPEN_TAG:
            H(y, A) ? m.tagName += A : (S(m), A === ">" ? k(m) : A === "/" ? m.state = C.OPEN_TAG_SLASH : (T(A) || O(m, "Invalid character in tag name"), m.state = C.ATTRIB));
            continue;
          case C.OPEN_TAG_SLASH:
            A === ">" ? (k(m, !0), j(m)) : (O(m, "Forward-slash in opening tag not followed by >"), m.state = C.ATTRIB);
            continue;
          case C.ATTRIB:
            if (T(A))
              continue;
            A === ">" ? k(m) : A === "/" ? m.state = C.OPEN_TAG_SLASH : H(x, A) ? (m.attribName = A, m.attribValue = "", m.state = C.ATTRIB_NAME) : O(m, "Invalid attribute name");
            continue;
          case C.ATTRIB_NAME:
            A === "=" ? m.state = C.ATTRIB_VALUE : A === ">" ? (O(m, "Attribute without value"), m.attribValue = m.attribName, U(m), k(m)) : T(A) ? m.state = C.ATTRIB_NAME_SAW_WHITE : H(y, A) ? m.attribName += A : O(m, "Invalid attribute name");
            continue;
          case C.ATTRIB_NAME_SAW_WHITE:
            if (A === "=")
              m.state = C.ATTRIB_VALUE;
            else {
              if (T(A))
                continue;
              O(m, "Attribute without value"), m.tag.attributes[m.attribName] = "", m.attribValue = "", $(m, "onattribute", {
                name: m.attribName,
                value: ""
              }), m.attribName = "", A === ">" ? k(m) : H(x, A) ? (m.attribName = A, m.state = C.ATTRIB_NAME) : (O(m, "Invalid attribute name"), m.state = C.ATTRIB);
            }
            continue;
          case C.ATTRIB_VALUE:
            if (T(A))
              continue;
            L(A) ? (m.q = A, m.state = C.ATTRIB_VALUE_QUOTED) : (m.opt.unquotedAttributeValues || I(m, "Unquoted attribute value"), m.state = C.ATTRIB_VALUE_UNQUOTED, m.attribValue = A);
            continue;
          case C.ATTRIB_VALUE_QUOTED:
            if (A !== m.q) {
              A === "&" ? m.state = C.ATTRIB_VALUE_ENTITY_Q : m.attribValue += A;
              continue;
            }
            U(m), m.q = "", m.state = C.ATTRIB_VALUE_CLOSED;
            continue;
          case C.ATTRIB_VALUE_CLOSED:
            T(A) ? m.state = C.ATTRIB : A === ">" ? k(m) : A === "/" ? m.state = C.OPEN_TAG_SLASH : H(x, A) ? (O(m, "No whitespace between attributes"), m.attribName = A, m.attribValue = "", m.state = C.ATTRIB_NAME) : O(m, "Invalid attribute name");
            continue;
          case C.ATTRIB_VALUE_UNQUOTED:
            if (!G(A)) {
              A === "&" ? m.state = C.ATTRIB_VALUE_ENTITY_U : m.attribValue += A;
              continue;
            }
            U(m), A === ">" ? k(m) : m.state = C.ATTRIB;
            continue;
          case C.CLOSE_TAG:
            if (m.tagName)
              A === ">" ? j(m) : H(y, A) ? m.tagName += A : m.script ? (m.script += "</" + m.tagName, m.tagName = "", m.state = C.SCRIPT) : (T(A) || O(m, "Invalid tagname in closing tag"), m.state = C.CLOSE_TAG_SAW_WHITE);
            else {
              if (T(A))
                continue;
              Q(x, A) ? m.script ? (m.script += "</" + A, m.state = C.SCRIPT) : O(m, "Invalid tagname in closing tag.") : m.tagName = A;
            }
            continue;
          case C.CLOSE_TAG_SAW_WHITE:
            if (T(A))
              continue;
            A === ">" ? j(m) : O(m, "Invalid characters in closing tag");
            continue;
          case C.TEXT_ENTITY:
          case C.ATTRIB_VALUE_ENTITY_Q:
          case C.ATTRIB_VALUE_ENTITY_U:
            var ae, Ce;
            switch (m.state) {
              case C.TEXT_ENTITY:
                ae = C.TEXT, Ce = "textNode";
                break;
              case C.ATTRIB_VALUE_ENTITY_Q:
                ae = C.ATTRIB_VALUE_QUOTED, Ce = "attribValue";
                break;
              case C.ATTRIB_VALUE_ENTITY_U:
                ae = C.ATTRIB_VALUE_UNQUOTED, Ce = "attribValue";
                break;
            }
            if (A === ";") {
              var we = z(m);
              m.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(we) ? (m.entity = "", m.state = ae, m.write(we)) : (m[Ce] += we, m.entity = "", m.state = ae);
            } else H(m.entity.length ? w : b, A) ? m.entity += A : (O(m, "Invalid character in entity name"), m[Ce] += "&" + m.entity + A, m.entity = "", m.state = ae);
            continue;
          default:
            throw new Error(m, "Unknown state: " + m.state);
        }
      return m.position >= m.bufferCheckPosition && i(m), m;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var E = String.fromCharCode, m = Math.floor, R = function() {
        var A = 16384, J = [], ie, ae, Ce = -1, we = arguments.length;
        if (!we)
          return "";
        for (var At = ""; ++Ce < we; ) {
          var he = Number(arguments[Ce]);
          if (!isFinite(he) || // `NaN`, `+Infinity`, or `-Infinity`
          he < 0 || // not a valid Unicode code point
          he > 1114111 || // not a valid Unicode code point
          m(he) !== he)
            throw RangeError("Invalid code point: " + he);
          he <= 65535 ? J.push(he) : (he -= 65536, ie = (he >> 10) + 55296, ae = he % 1024 + 56320, J.push(ie, ae)), (Ce + 1 === we || J.length > A) && (At += E.apply(null, J), J.length = 0);
        }
        return At;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: R,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = R;
    }();
  })(e);
})(tf);
Object.defineProperty(jn, "__esModule", { value: !0 });
jn.XElement = void 0;
jn.parseXml = L7;
const B7 = tf, _1 = zr;
class rf {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, _1.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!N7(t))
      throw (0, _1.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, _1.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, _1.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (_s(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => _s(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
jn.XElement = rf;
const D7 = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function N7(e) {
  return D7.test(e);
}
function _s(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function L7(e) {
  let t = null;
  const r = B7.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const o = new rf(i.name);
    if (o.attributes = i.attributes, t === null)
      t = o;
    else {
      const s = n[n.length - 1];
      s.elements == null && (s.elements = []), s.elements.push(o);
    }
    n.push(o);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const o = n[n.length - 1];
    o.value = i, o.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = u;
  var t = Gt;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var r = zr;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return r.newError;
  } });
  var n = Le;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return n.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return n.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return n.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return n.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return n.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return n.HttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return n.HttpExecutor;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return n.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return n.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return n.safeStringifyJson;
  } });
  var i = di;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var o = qn;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return o.ProgressCallbackTransform;
  } });
  var s = pi;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return s.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return s.githubUrl;
  } });
  var a = V2;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return a.retry;
  } });
  var f = K2;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return f.parseDn;
  } });
  var c = Kr;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return c.UUID;
  } });
  var l = jn;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return l.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return l.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function u(h) {
    return h == null ? [] : Array.isArray(h) ? h : [h];
  }
})(Ee);
var ve = {}, X2 = {}, st = {};
function nf(e) {
  return typeof e > "u" || e === null;
}
function F7(e) {
  return typeof e == "object" && e !== null;
}
function $7(e) {
  return Array.isArray(e) ? e : nf(e) ? [] : [e];
}
function U7(e, t) {
  var r, n, i, o;
  if (t)
    for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1)
      i = o[r], e[i] = t[i];
  return e;
}
function k7(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function M7(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
st.isNothing = nf;
st.isObject = F7;
st.toArray = $7;
st.repeat = k7;
st.isNegativeZero = M7;
st.extend = U7;
function of(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function Bn(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = of(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Bn.prototype = Object.create(Error.prototype);
Bn.prototype.constructor = Bn;
Bn.prototype.toString = function(t) {
  return this.name + ": " + of(this, t);
};
var Vn = Bn, En = st;
function Ji(e, t, r, n, i) {
  var o = "", s = "", a = Math.floor(i / 2) - 1;
  return n - t > a && (o = " ... ", t = n - a + o.length), r - n > a && (s = " ...", r = n + a - s.length), {
    str: o + e.slice(t, r).replace(/\t/g, "→") + s,
    pos: n - t + o.length
    // relative position
  };
}
function e0(e, t) {
  return En.repeat(" ", t - e.length) + e;
}
function G7(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, s = -1; o = r.exec(e.buffer); )
    i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && s < 0 && (s = n.length - 2);
  s < 0 && (s = n.length - 1);
  var a = "", f, c, l = Math.min(e.line + t.linesAfter, i.length).toString().length, u = t.maxLength - (t.indent + l + 3);
  for (f = 1; f <= t.linesBefore && !(s - f < 0); f++)
    c = Ji(
      e.buffer,
      n[s - f],
      i[s - f],
      e.position - (n[s] - n[s - f]),
      u
    ), a = En.repeat(" ", t.indent) + e0((e.line - f + 1).toString(), l) + " | " + c.str + `
` + a;
  for (c = Ji(e.buffer, n[s], i[s], e.position, u), a += En.repeat(" ", t.indent) + e0((e.line + 1).toString(), l) + " | " + c.str + `
`, a += En.repeat("-", t.indent + l + 3 + c.pos) + `^
`, f = 1; f <= t.linesAfter && !(s + f >= i.length); f++)
    c = Ji(
      e.buffer,
      n[s + f],
      i[s + f],
      e.position - (n[s] - n[s + f]),
      u
    ), a += En.repeat(" ", t.indent) + e0((e.line + f + 1).toString(), l) + " | " + c.str + `
`;
  return a.replace(/\n$/, "");
}
var H7 = G7, xs = Vn, W7 = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], q7 = [
  "scalar",
  "sequence",
  "mapping"
];
function j7(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function V7(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (W7.indexOf(r) === -1)
      throw new xs('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = j7(t.styleAliases || null), q7.indexOf(this.kind) === -1)
    throw new xs('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Me = V7, ln = Vn, t0 = Me;
function Es(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(o, s) {
      o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = s);
    }), r[i] = n;
  }), r;
}
function K7() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function _2(e) {
  return this.extend(e);
}
_2.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof t0)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new ln("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(o) {
    if (!(o instanceof t0))
      throw new ln("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new ln("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new ln("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(o) {
    if (!(o instanceof t0))
      throw new ln("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(_2.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = Es(i, "implicit"), i.compiledExplicit = Es(i, "explicit"), i.compiledTypeMap = K7(i.compiledImplicit, i.compiledExplicit), i;
};
var sf = _2, X7 = Me, af = new X7("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Y7 = Me, ff = new Y7("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), z7 = Me, lf = new z7("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Q7 = sf, cf = new Q7({
  explicit: [
    af,
    ff,
    lf
  ]
}), Z7 = Me;
function J7(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function e3() {
  return null;
}
function t3(e) {
  return e === null;
}
var uf = new Z7("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: J7,
  construct: e3,
  predicate: t3,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), r3 = Me;
function n3(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function i3(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function o3(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var hf = new r3("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: n3,
  construct: i3,
  predicate: o3,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), s3 = st, a3 = Me;
function f3(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function l3(e) {
  return 48 <= e && e <= 55;
}
function c3(e) {
  return 48 <= e && e <= 57;
}
function u3(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!f3(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!l3(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!c3(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function h3(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function d3(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !s3.isNegativeZero(e);
}
var df = new a3("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: u3,
  construct: h3,
  predicate: d3,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), pf = st, p3 = Me, m3 = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function _3(e) {
  return !(e === null || !m3.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function x3(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var E3 = /^[-+]?[0-9]+e/;
function g3(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (pf.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), E3.test(r) ? r.replace("e", ".e") : r;
}
function C3(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || pf.isNegativeZero(e));
}
var mf = new p3("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: _3,
  construct: x3,
  predicate: C3,
  represent: g3,
  defaultStyle: "lowercase"
}), _f = cf.extend({
  implicit: [
    uf,
    hf,
    df,
    mf
  ]
}), xf = _f, b3 = Me, Ef = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), gf = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function y3(e) {
  return e === null ? !1 : Ef.exec(e) !== null || gf.exec(e) !== null;
}
function T3(e) {
  var t, r, n, i, o, s, a, f = 0, c = null, l, u, h;
  if (t = Ef.exec(e), t === null && (t = gf.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (o = +t[4], s = +t[5], a = +t[6], t[7]) {
    for (f = t[7].slice(0, 3); f.length < 3; )
      f += "0";
    f = +f;
  }
  return t[9] && (l = +t[10], u = +(t[11] || 0), c = (l * 60 + u) * 6e4, t[9] === "-" && (c = -c)), h = new Date(Date.UTC(r, n, i, o, s, a, f)), c && h.setTime(h.getTime() - c), h;
}
function v3(e) {
  return e.toISOString();
}
var Cf = new b3("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: y3,
  construct: T3,
  instanceOf: Date,
  represent: v3
}), A3 = Me;
function w3(e) {
  return e === "<<" || e === null;
}
var bf = new A3("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: w3
}), P3 = Me, Y2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function S3(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, o = Y2;
  for (r = 0; r < i; r++)
    if (t = o.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function O3(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, o = Y2, s = 0, a = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)), s = s << 6 | o.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)) : r === 18 ? (a.push(s >> 10 & 255), a.push(s >> 2 & 255)) : r === 12 && a.push(s >> 4 & 255), new Uint8Array(a);
}
function I3(e) {
  var t = "", r = 0, n, i, o = e.length, s = Y2;
  for (n = 0; n < o; n++)
    n % 3 === 0 && n && (t += s[r >> 18 & 63], t += s[r >> 12 & 63], t += s[r >> 6 & 63], t += s[r & 63]), r = (r << 8) + e[n];
  return i = o % 3, i === 0 ? (t += s[r >> 18 & 63], t += s[r >> 12 & 63], t += s[r >> 6 & 63], t += s[r & 63]) : i === 2 ? (t += s[r >> 10 & 63], t += s[r >> 4 & 63], t += s[r << 2 & 63], t += s[64]) : i === 1 && (t += s[r >> 2 & 63], t += s[r << 4 & 63], t += s[64], t += s[64]), t;
}
function R3(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var yf = new P3("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: S3,
  construct: O3,
  predicate: R3,
  represent: I3
}), B3 = Me, D3 = Object.prototype.hasOwnProperty, N3 = Object.prototype.toString;
function L3(e) {
  if (e === null) return !0;
  var t = [], r, n, i, o, s, a = e;
  for (r = 0, n = a.length; r < n; r += 1) {
    if (i = a[r], s = !1, N3.call(i) !== "[object Object]") return !1;
    for (o in i)
      if (D3.call(i, o))
        if (!s) s = !0;
        else return !1;
    if (!s) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function F3(e) {
  return e !== null ? e : [];
}
var Tf = new B3("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: L3,
  construct: F3
}), $3 = Me, U3 = Object.prototype.toString;
function k3(e) {
  if (e === null) return !0;
  var t, r, n, i, o, s = e;
  for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1) {
    if (n = s[t], U3.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    o[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function M3(e) {
  if (e === null) return [];
  var t, r, n, i, o, s = e;
  for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1)
    n = s[t], i = Object.keys(n), o[t] = [i[0], n[i[0]]];
  return o;
}
var vf = new $3("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: k3,
  construct: M3
}), G3 = Me, H3 = Object.prototype.hasOwnProperty;
function W3(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (H3.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function q3(e) {
  return e !== null ? e : {};
}
var Af = new G3("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: W3,
  construct: q3
}), z2 = xf.extend({
  implicit: [
    Cf,
    bf
  ],
  explicit: [
    yf,
    Tf,
    vf,
    Af
  ]
}), ur = st, wf = Vn, j3 = H7, V3 = z2, Ht = Object.prototype.hasOwnProperty, Q1 = 1, Pf = 2, Sf = 3, Z1 = 4, r0 = 1, K3 = 2, gs = 3, X3 = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Y3 = /[\x85\u2028\u2029]/, z3 = /[,\[\]\{\}]/, Of = /^(?:!|!!|![a-z\-]+!)$/i, If = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Cs(e) {
  return Object.prototype.toString.call(e);
}
function dt(e) {
  return e === 10 || e === 13;
}
function pr(e) {
  return e === 9 || e === 32;
}
function We(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Dr(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Q3(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function Z3(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function J3(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function bs(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function eh(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Rf = new Array(256), Bf = new Array(256);
for (var vr = 0; vr < 256; vr++)
  Rf[vr] = bs(vr) ? 1 : 0, Bf[vr] = bs(vr);
function th(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || V3, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Df(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = j3(r), new wf(t, r);
}
function K(e, t) {
  throw Df(e, t);
}
function J1(e, t) {
  e.onWarning && e.onWarning.call(null, Df(e, t));
}
var ys = {
  YAML: function(t, r, n) {
    var i, o, s;
    t.version !== null && K(t, "duplication of %YAML directive"), n.length !== 1 && K(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && K(t, "ill-formed argument of the YAML directive"), o = parseInt(i[1], 10), s = parseInt(i[2], 10), o !== 1 && K(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = s < 2, s !== 1 && s !== 2 && J1(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, o;
    n.length !== 2 && K(t, "TAG directive accepts exactly two arguments"), i = n[0], o = n[1], Of.test(i) || K(t, "ill-formed tag handle (first argument) of the TAG directive"), Ht.call(t.tagMap, i) && K(t, 'there is a previously declared suffix for "' + i + '" tag handle'), If.test(o) || K(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      K(t, "tag prefix is malformed: " + o);
    }
    t.tagMap[i] = o;
  }
};
function kt(e, t, r, n) {
  var i, o, s, a;
  if (t < r) {
    if (a = e.input.slice(t, r), n)
      for (i = 0, o = a.length; i < o; i += 1)
        s = a.charCodeAt(i), s === 9 || 32 <= s && s <= 1114111 || K(e, "expected valid JSON character");
    else X3.test(a) && K(e, "the stream contains non-printable characters");
    e.result += a;
  }
}
function Ts(e, t, r, n) {
  var i, o, s, a;
  for (ur.isObject(r) || K(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), s = 0, a = i.length; s < a; s += 1)
    o = i[s], Ht.call(t, o) || (t[o] = r[o], n[o] = !0);
}
function Nr(e, t, r, n, i, o, s, a, f) {
  var c, l;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), c = 0, l = i.length; c < l; c += 1)
      Array.isArray(i[c]) && K(e, "nested arrays are not supported inside keys"), typeof i == "object" && Cs(i[c]) === "[object Object]" && (i[c] = "[object Object]");
  if (typeof i == "object" && Cs(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (c = 0, l = o.length; c < l; c += 1)
        Ts(e, t, o[c], r);
    else
      Ts(e, t, o, r);
  else
    !e.json && !Ht.call(r, i) && Ht.call(t, i) && (e.line = s || e.line, e.lineStart = a || e.lineStart, e.position = f || e.position, K(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : t[i] = o, delete r[i];
  return t;
}
function Q2(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : K(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function ue(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; pr(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (dt(i))
      for (Q2(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && J1(e, "deficient indentation"), n;
}
function mi(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || We(r)));
}
function Z2(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += ur.repeat(`
`, t - 1));
}
function rh(e, t, r) {
  var n, i, o, s, a, f, c, l, u = e.kind, h = e.result, d;
  if (d = e.input.charCodeAt(e.position), We(d) || Dr(d) || d === 35 || d === 38 || d === 42 || d === 33 || d === 124 || d === 62 || d === 39 || d === 34 || d === 37 || d === 64 || d === 96 || (d === 63 || d === 45) && (i = e.input.charCodeAt(e.position + 1), We(i) || r && Dr(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", o = s = e.position, a = !1; d !== 0; ) {
    if (d === 58) {
      if (i = e.input.charCodeAt(e.position + 1), We(i) || r && Dr(i))
        break;
    } else if (d === 35) {
      if (n = e.input.charCodeAt(e.position - 1), We(n))
        break;
    } else {
      if (e.position === e.lineStart && mi(e) || r && Dr(d))
        break;
      if (dt(d))
        if (f = e.line, c = e.lineStart, l = e.lineIndent, ue(e, !1, -1), e.lineIndent >= t) {
          a = !0, d = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = s, e.line = f, e.lineStart = c, e.lineIndent = l;
          break;
        }
    }
    a && (kt(e, o, s, !1), Z2(e, e.line - f), o = s = e.position, a = !1), pr(d) || (s = e.position + 1), d = e.input.charCodeAt(++e.position);
  }
  return kt(e, o, s, !1), e.result ? !0 : (e.kind = u, e.result = h, !1);
}
function nh(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (kt(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else dt(r) ? (kt(e, n, i, !0), Z2(e, ue(e, !1, t)), n = i = e.position) : e.position === e.lineStart && mi(e) ? K(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  K(e, "unexpected end of the stream within a single quoted scalar");
}
function ih(e, t) {
  var r, n, i, o, s, a;
  if (a = e.input.charCodeAt(e.position), a !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (a = e.input.charCodeAt(e.position)) !== 0; ) {
    if (a === 34)
      return kt(e, r, e.position, !0), e.position++, !0;
    if (a === 92) {
      if (kt(e, r, e.position, !0), a = e.input.charCodeAt(++e.position), dt(a))
        ue(e, !1, t);
      else if (a < 256 && Rf[a])
        e.result += Bf[a], e.position++;
      else if ((s = Z3(a)) > 0) {
        for (i = s, o = 0; i > 0; i--)
          a = e.input.charCodeAt(++e.position), (s = Q3(a)) >= 0 ? o = (o << 4) + s : K(e, "expected hexadecimal character");
        e.result += eh(o), e.position++;
      } else
        K(e, "unknown escape sequence");
      r = n = e.position;
    } else dt(a) ? (kt(e, r, n, !0), Z2(e, ue(e, !1, t)), r = n = e.position) : e.position === e.lineStart && mi(e) ? K(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  K(e, "unexpected end of the stream within a double quoted scalar");
}
function oh(e, t) {
  var r = !0, n, i, o, s = e.tag, a, f = e.anchor, c, l, u, h, d, _ = /* @__PURE__ */ Object.create(null), p, x, y, b;
  if (b = e.input.charCodeAt(e.position), b === 91)
    l = 93, d = !1, a = [];
  else if (b === 123)
    l = 125, d = !0, a = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), b = e.input.charCodeAt(++e.position); b !== 0; ) {
    if (ue(e, !0, t), b = e.input.charCodeAt(e.position), b === l)
      return e.position++, e.tag = s, e.anchor = f, e.kind = d ? "mapping" : "sequence", e.result = a, !0;
    r ? b === 44 && K(e, "expected the node content, but found ','") : K(e, "missed comma between flow collection entries"), x = p = y = null, u = h = !1, b === 63 && (c = e.input.charCodeAt(e.position + 1), We(c) && (u = h = !0, e.position++, ue(e, !0, t))), n = e.line, i = e.lineStart, o = e.position, Xr(e, t, Q1, !1, !0), x = e.tag, p = e.result, ue(e, !0, t), b = e.input.charCodeAt(e.position), (h || e.line === n) && b === 58 && (u = !0, b = e.input.charCodeAt(++e.position), ue(e, !0, t), Xr(e, t, Q1, !1, !0), y = e.result), d ? Nr(e, a, _, x, p, y, n, i, o) : u ? a.push(Nr(e, null, _, x, p, y, n, i, o)) : a.push(p), ue(e, !0, t), b = e.input.charCodeAt(e.position), b === 44 ? (r = !0, b = e.input.charCodeAt(++e.position)) : r = !1;
  }
  K(e, "unexpected end of the stream within a flow collection");
}
function sh(e, t) {
  var r, n, i = r0, o = !1, s = !1, a = t, f = 0, c = !1, l, u;
  if (u = e.input.charCodeAt(e.position), u === 124)
    n = !1;
  else if (u === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; u !== 0; )
    if (u = e.input.charCodeAt(++e.position), u === 43 || u === 45)
      r0 === i ? i = u === 43 ? gs : K3 : K(e, "repeat of a chomping mode identifier");
    else if ((l = J3(u)) >= 0)
      l === 0 ? K(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : s ? K(e, "repeat of an indentation width identifier") : (a = t + l - 1, s = !0);
    else
      break;
  if (pr(u)) {
    do
      u = e.input.charCodeAt(++e.position);
    while (pr(u));
    if (u === 35)
      do
        u = e.input.charCodeAt(++e.position);
      while (!dt(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (Q2(e), e.lineIndent = 0, u = e.input.charCodeAt(e.position); (!s || e.lineIndent < a) && u === 32; )
      e.lineIndent++, u = e.input.charCodeAt(++e.position);
    if (!s && e.lineIndent > a && (a = e.lineIndent), dt(u)) {
      f++;
      continue;
    }
    if (e.lineIndent < a) {
      i === gs ? e.result += ur.repeat(`
`, o ? 1 + f : f) : i === r0 && o && (e.result += `
`);
      break;
    }
    for (n ? pr(u) ? (c = !0, e.result += ur.repeat(`
`, o ? 1 + f : f)) : c ? (c = !1, e.result += ur.repeat(`
`, f + 1)) : f === 0 ? o && (e.result += " ") : e.result += ur.repeat(`
`, f) : e.result += ur.repeat(`
`, o ? 1 + f : f), o = !0, s = !0, f = 0, r = e.position; !dt(u) && u !== 0; )
      u = e.input.charCodeAt(++e.position);
    kt(e, r, e.position, !1);
  }
  return !0;
}
function vs(e, t) {
  var r, n = e.tag, i = e.anchor, o = [], s, a = !1, f;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), f = e.input.charCodeAt(e.position); f !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, K(e, "tab characters must not be used in indentation")), !(f !== 45 || (s = e.input.charCodeAt(e.position + 1), !We(s)))); ) {
    if (a = !0, e.position++, ue(e, !0, -1) && e.lineIndent <= t) {
      o.push(null), f = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, Xr(e, t, Sf, !1, !0), o.push(e.result), ue(e, !0, -1), f = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && f !== 0)
      K(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return a ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = o, !0) : !1;
}
function ah(e, t, r) {
  var n, i, o, s, a, f, c = e.tag, l = e.anchor, u = {}, h = /* @__PURE__ */ Object.create(null), d = null, _ = null, p = null, x = !1, y = !1, b;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), b = e.input.charCodeAt(e.position); b !== 0; ) {
    if (!x && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, K(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), o = e.line, (b === 63 || b === 58) && We(n))
      b === 63 ? (x && (Nr(e, u, h, d, _, null, s, a, f), d = _ = p = null), y = !0, x = !0, i = !0) : x ? (x = !1, i = !0) : K(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, b = n;
    else {
      if (s = e.line, a = e.lineStart, f = e.position, !Xr(e, r, Pf, !1, !0))
        break;
      if (e.line === o) {
        for (b = e.input.charCodeAt(e.position); pr(b); )
          b = e.input.charCodeAt(++e.position);
        if (b === 58)
          b = e.input.charCodeAt(++e.position), We(b) || K(e, "a whitespace character is expected after the key-value separator within a block mapping"), x && (Nr(e, u, h, d, _, null, s, a, f), d = _ = p = null), y = !0, x = !1, i = !1, d = e.tag, _ = e.result;
        else if (y)
          K(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = c, e.anchor = l, !0;
      } else if (y)
        K(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = c, e.anchor = l, !0;
    }
    if ((e.line === o || e.lineIndent > t) && (x && (s = e.line, a = e.lineStart, f = e.position), Xr(e, t, Z1, !0, i) && (x ? _ = e.result : p = e.result), x || (Nr(e, u, h, d, _, p, s, a, f), d = _ = p = null), ue(e, !0, -1), b = e.input.charCodeAt(e.position)), (e.line === o || e.lineIndent > t) && b !== 0)
      K(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return x && Nr(e, u, h, d, _, null, s, a, f), y && (e.tag = c, e.anchor = l, e.kind = "mapping", e.result = u), y;
}
function fh(e) {
  var t, r = !1, n = !1, i, o, s;
  if (s = e.input.charCodeAt(e.position), s !== 33) return !1;
  if (e.tag !== null && K(e, "duplication of a tag property"), s = e.input.charCodeAt(++e.position), s === 60 ? (r = !0, s = e.input.charCodeAt(++e.position)) : s === 33 ? (n = !0, i = "!!", s = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      s = e.input.charCodeAt(++e.position);
    while (s !== 0 && s !== 62);
    e.position < e.length ? (o = e.input.slice(t, e.position), s = e.input.charCodeAt(++e.position)) : K(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; s !== 0 && !We(s); )
      s === 33 && (n ? K(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), Of.test(i) || K(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), s = e.input.charCodeAt(++e.position);
    o = e.input.slice(t, e.position), z3.test(o) && K(e, "tag suffix cannot contain flow indicator characters");
  }
  o && !If.test(o) && K(e, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    K(e, "tag name is malformed: " + o);
  }
  return r ? e.tag = o : Ht.call(e.tagMap, i) ? e.tag = e.tagMap[i] + o : i === "!" ? e.tag = "!" + o : i === "!!" ? e.tag = "tag:yaml.org,2002:" + o : K(e, 'undeclared tag handle "' + i + '"'), !0;
}
function lh(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && K(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !We(r) && !Dr(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && K(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function ch(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !We(n) && !Dr(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && K(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), Ht.call(e.anchorMap, r) || K(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], ue(e, !0, -1), !0;
}
function Xr(e, t, r, n, i) {
  var o, s, a, f = 1, c = !1, l = !1, u, h, d, _, p, x;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = s = a = Z1 === r || Sf === r, n && ue(e, !0, -1) && (c = !0, e.lineIndent > t ? f = 1 : e.lineIndent === t ? f = 0 : e.lineIndent < t && (f = -1)), f === 1)
    for (; fh(e) || lh(e); )
      ue(e, !0, -1) ? (c = !0, a = o, e.lineIndent > t ? f = 1 : e.lineIndent === t ? f = 0 : e.lineIndent < t && (f = -1)) : a = !1;
  if (a && (a = c || i), (f === 1 || Z1 === r) && (Q1 === r || Pf === r ? p = t : p = t + 1, x = e.position - e.lineStart, f === 1 ? a && (vs(e, x) || ah(e, x, p)) || oh(e, p) ? l = !0 : (s && sh(e, p) || nh(e, p) || ih(e, p) ? l = !0 : ch(e) ? (l = !0, (e.tag !== null || e.anchor !== null) && K(e, "alias node should not have any properties")) : rh(e, p, Q1 === r) && (l = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : f === 0 && (l = a && vs(e, x))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && K(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), u = 0, h = e.implicitTypes.length; u < h; u += 1)
      if (_ = e.implicitTypes[u], _.resolve(e.result)) {
        e.result = _.construct(e.result), e.tag = _.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (Ht.call(e.typeMap[e.kind || "fallback"], e.tag))
      _ = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (_ = null, d = e.typeMap.multi[e.kind || "fallback"], u = 0, h = d.length; u < h; u += 1)
        if (e.tag.slice(0, d[u].tag.length) === d[u].tag) {
          _ = d[u];
          break;
        }
    _ || K(e, "unknown tag !<" + e.tag + ">"), e.result !== null && _.kind !== e.kind && K(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + _.kind + '", not "' + e.kind + '"'), _.resolve(e.result, e.tag) ? (e.result = _.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : K(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || l;
}
function uh(e) {
  var t = e.position, r, n, i, o = !1, s;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (s = e.input.charCodeAt(e.position)) !== 0 && (ue(e, !0, -1), s = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || s !== 37)); ) {
    for (o = !0, s = e.input.charCodeAt(++e.position), r = e.position; s !== 0 && !We(s); )
      s = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && K(e, "directive name must not be less than one character in length"); s !== 0; ) {
      for (; pr(s); )
        s = e.input.charCodeAt(++e.position);
      if (s === 35) {
        do
          s = e.input.charCodeAt(++e.position);
        while (s !== 0 && !dt(s));
        break;
      }
      if (dt(s)) break;
      for (r = e.position; s !== 0 && !We(s); )
        s = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    s !== 0 && Q2(e), Ht.call(ys, n) ? ys[n](e, n, i) : J1(e, 'unknown document directive "' + n + '"');
  }
  if (ue(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, ue(e, !0, -1)) : o && K(e, "directives end mark is expected"), Xr(e, e.lineIndent - 1, Z1, !1, !0), ue(e, !0, -1), e.checkLineBreaks && Y3.test(e.input.slice(t, e.position)) && J1(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && mi(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, ue(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    K(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Nf(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new th(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, K(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    uh(r);
  return r.documents;
}
function hh(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = Nf(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, o = n.length; i < o; i += 1)
    t(n[i]);
}
function dh(e, t) {
  var r = Nf(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new wf("expected a single document in the stream, but found more");
  }
}
X2.loadAll = hh;
X2.load = dh;
var Lf = {}, _i = st, Kn = Vn, ph = z2, Ff = Object.prototype.toString, $f = Object.prototype.hasOwnProperty, J2 = 65279, mh = 9, Dn = 10, _h = 13, xh = 32, Eh = 33, gh = 34, x2 = 35, Ch = 37, bh = 38, yh = 39, Th = 42, Uf = 44, vh = 45, ei = 58, Ah = 61, wh = 62, Ph = 63, Sh = 64, kf = 91, Mf = 93, Oh = 96, Gf = 123, Ih = 124, Hf = 125, Re = {};
Re[0] = "\\0";
Re[7] = "\\a";
Re[8] = "\\b";
Re[9] = "\\t";
Re[10] = "\\n";
Re[11] = "\\v";
Re[12] = "\\f";
Re[13] = "\\r";
Re[27] = "\\e";
Re[34] = '\\"';
Re[92] = "\\\\";
Re[133] = "\\N";
Re[160] = "\\_";
Re[8232] = "\\L";
Re[8233] = "\\P";
var Rh = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], Bh = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function Dh(e, t) {
  var r, n, i, o, s, a, f;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
    s = n[i], a = String(t[s]), s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2)), f = e.compiledTypeMap.fallback[s], f && $f.call(f.styleAliases, a) && (a = f.styleAliases[a]), r[s] = a;
  return r;
}
function Nh(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new Kn("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + _i.repeat("0", n - t.length) + t;
}
var Lh = 1, Nn = 2;
function Fh(e) {
  this.schema = e.schema || ph, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = _i.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = Dh(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Nn : Lh, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function As(e, t) {
  for (var r = _i.repeat(" ", t), n = 0, i = -1, o = "", s, a = e.length; n < a; )
    i = e.indexOf(`
`, n), i === -1 ? (s = e.slice(n), n = a) : (s = e.slice(n, i + 1), n = i + 1), s.length && s !== `
` && (o += r), o += s;
  return o;
}
function E2(e, t) {
  return `
` + _i.repeat(" ", e.indent * t);
}
function $h(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function ti(e) {
  return e === xh || e === mh;
}
function Ln(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== J2 || 65536 <= e && e <= 1114111;
}
function ws(e) {
  return Ln(e) && e !== J2 && e !== _h && e !== Dn;
}
function Ps(e, t, r) {
  var n = ws(e), i = n && !ti(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== Uf && e !== kf && e !== Mf && e !== Gf && e !== Hf) && e !== x2 && !(t === ei && !i) || ws(t) && !ti(t) && e === x2 || t === ei && i
  );
}
function Uh(e) {
  return Ln(e) && e !== J2 && !ti(e) && e !== vh && e !== Ph && e !== ei && e !== Uf && e !== kf && e !== Mf && e !== Gf && e !== Hf && e !== x2 && e !== bh && e !== Th && e !== Eh && e !== Ih && e !== Ah && e !== wh && e !== yh && e !== gh && e !== Ch && e !== Sh && e !== Oh;
}
function kh(e) {
  return !ti(e) && e !== ei;
}
function gn(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function Wf(e) {
  var t = /^\n* /;
  return t.test(e);
}
var qf = 1, g2 = 2, jf = 3, Vf = 4, Br = 5;
function Mh(e, t, r, n, i, o, s, a) {
  var f, c = 0, l = null, u = !1, h = !1, d = n !== -1, _ = -1, p = Uh(gn(e, 0)) && kh(gn(e, e.length - 1));
  if (t || s)
    for (f = 0; f < e.length; c >= 65536 ? f += 2 : f++) {
      if (c = gn(e, f), !Ln(c))
        return Br;
      p = p && Ps(c, l, a), l = c;
    }
  else {
    for (f = 0; f < e.length; c >= 65536 ? f += 2 : f++) {
      if (c = gn(e, f), c === Dn)
        u = !0, d && (h = h || // Foldable line = too long, and not more-indented.
        f - _ - 1 > n && e[_ + 1] !== " ", _ = f);
      else if (!Ln(c))
        return Br;
      p = p && Ps(c, l, a), l = c;
    }
    h = h || d && f - _ - 1 > n && e[_ + 1] !== " ";
  }
  return !u && !h ? p && !s && !i(e) ? qf : o === Nn ? Br : g2 : r > 9 && Wf(e) ? Br : s ? o === Nn ? Br : g2 : h ? Vf : jf;
}
function Gh(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Nn ? '""' : "''";
    if (!e.noCompatMode && (Rh.indexOf(t) !== -1 || Bh.test(t)))
      return e.quotingType === Nn ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, r), s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), a = n || e.flowLevel > -1 && r >= e.flowLevel;
    function f(c) {
      return $h(e, c);
    }
    switch (Mh(
      t,
      a,
      e.indent,
      s,
      f,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case qf:
        return t;
      case g2:
        return "'" + t.replace(/'/g, "''") + "'";
      case jf:
        return "|" + Ss(t, e.indent) + Os(As(t, o));
      case Vf:
        return ">" + Ss(t, e.indent) + Os(As(Hh(t, s), o));
      case Br:
        return '"' + Wh(t) + '"';
      default:
        throw new Kn("impossible error: invalid scalar style");
    }
  }();
}
function Ss(e, t) {
  var r = Wf(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), o = i ? "+" : n ? "" : "-";
  return r + o + `
`;
}
function Os(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function Hh(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var c = e.indexOf(`
`);
    return c = c !== -1 ? c : e.length, r.lastIndex = c, Is(e.slice(0, c), t);
  }(), i = e[0] === `
` || e[0] === " ", o, s; s = r.exec(e); ) {
    var a = s[1], f = s[2];
    o = f[0] === " ", n += a + (!i && !o && f !== "" ? `
` : "") + Is(f, t), i = o;
  }
  return n;
}
function Is(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, o, s = 0, a = 0, f = ""; n = r.exec(e); )
    a = n.index, a - i > t && (o = s > i ? s : a, f += `
` + e.slice(i, o), i = o + 1), s = a;
  return f += `
`, e.length - i > t && s > i ? f += e.slice(i, s) + `
` + e.slice(s + 1) : f += e.slice(i), f.slice(1);
}
function Wh(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = gn(e, i), n = Re[r], !n && Ln(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || Nh(r);
  return t;
}
function qh(e, t, r) {
  var n = "", i = e.tag, o, s, a;
  for (o = 0, s = r.length; o < s; o += 1)
    a = r[o], e.replacer && (a = e.replacer.call(r, String(o), a)), (bt(e, t, a, !1, !1) || typeof a > "u" && bt(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function Rs(e, t, r, n) {
  var i = "", o = e.tag, s, a, f;
  for (s = 0, a = r.length; s < a; s += 1)
    f = r[s], e.replacer && (f = e.replacer.call(r, String(s), f)), (bt(e, t + 1, f, !0, !0, !1, !0) || typeof f > "u" && bt(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += E2(e, t)), e.dump && Dn === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = o, e.dump = i || "[]";
}
function jh(e, t, r) {
  var n = "", i = e.tag, o = Object.keys(r), s, a, f, c, l;
  for (s = 0, a = o.length; s < a; s += 1)
    l = "", n !== "" && (l += ", "), e.condenseFlow && (l += '"'), f = o[s], c = r[f], e.replacer && (c = e.replacer.call(r, f, c)), bt(e, t, f, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), bt(e, t, c, !1, !1) && (l += e.dump, n += l));
  e.tag = i, e.dump = "{" + n + "}";
}
function Vh(e, t, r, n) {
  var i = "", o = e.tag, s = Object.keys(r), a, f, c, l, u, h;
  if (e.sortKeys === !0)
    s.sort();
  else if (typeof e.sortKeys == "function")
    s.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Kn("sortKeys must be a boolean or a function");
  for (a = 0, f = s.length; a < f; a += 1)
    h = "", (!n || i !== "") && (h += E2(e, t)), c = s[a], l = r[c], e.replacer && (l = e.replacer.call(r, c, l)), bt(e, t + 1, c, !0, !0, !0) && (u = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, u && (e.dump && Dn === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, u && (h += E2(e, t)), bt(e, t + 1, l, !0, u) && (e.dump && Dn === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, i += h));
  e.tag = o, e.dump = i || "{}";
}
function Bs(e, t, r) {
  var n, i, o, s, a, f;
  for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, s = i.length; o < s; o += 1)
    if (a = i[o], (a.instanceOf || a.predicate) && (!a.instanceOf || typeof t == "object" && t instanceof a.instanceOf) && (!a.predicate || a.predicate(t))) {
      if (r ? a.multi && a.representName ? e.tag = a.representName(t) : e.tag = a.tag : e.tag = "?", a.represent) {
        if (f = e.styleMap[a.tag] || a.defaultStyle, Ff.call(a.represent) === "[object Function]")
          n = a.represent(t, f);
        else if ($f.call(a.represent, f))
          n = a.represent[f](t, f);
        else
          throw new Kn("!<" + a.tag + '> tag resolver accepts not "' + f + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function bt(e, t, r, n, i, o, s) {
  e.tag = null, e.dump = r, Bs(e, r, !1) || Bs(e, r, !0);
  var a = Ff.call(e.dump), f = n, c;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var l = a === "[object Object]" || a === "[object Array]", u, h;
  if (l && (u = e.duplicates.indexOf(r), h = u !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && t > 0) && (i = !1), h && e.usedDuplicates[u])
    e.dump = "*ref_" + u;
  else {
    if (l && h && !e.usedDuplicates[u] && (e.usedDuplicates[u] = !0), a === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (Vh(e, t, e.dump, i), h && (e.dump = "&ref_" + u + e.dump)) : (jh(e, t, e.dump), h && (e.dump = "&ref_" + u + " " + e.dump));
    else if (a === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !s && t > 0 ? Rs(e, t - 1, e.dump, i) : Rs(e, t, e.dump, i), h && (e.dump = "&ref_" + u + e.dump)) : (qh(e, t, e.dump), h && (e.dump = "&ref_" + u + " " + e.dump));
    else if (a === "[object String]")
      e.tag !== "?" && Gh(e, e.dump, t, o, f);
    else {
      if (a === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Kn("unacceptable kind of an object to dump " + a);
    }
    e.tag !== null && e.tag !== "?" && (c = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? c = "!" + c : c.slice(0, 18) === "tag:yaml.org,2002:" ? c = "!!" + c.slice(18) : c = "!<" + c + ">", e.dump = c + " " + e.dump);
  }
  return !0;
}
function Kh(e, t) {
  var r = [], n = [], i, o;
  for (C2(e, r, n), i = 0, o = n.length; i < o; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(o);
}
function C2(e, t, r) {
  var n, i, o;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, o = e.length; i < o; i += 1)
        C2(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1)
        C2(e[n[i]], t, r);
}
function Xh(e, t) {
  t = t || {};
  var r = new Fh(t);
  r.noRefs || Kh(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), bt(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
Lf.dump = Xh;
var Kf = X2, Yh = Lf;
function eo(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
ve.Type = Me;
ve.Schema = sf;
ve.FAILSAFE_SCHEMA = cf;
ve.JSON_SCHEMA = _f;
ve.CORE_SCHEMA = xf;
ve.DEFAULT_SCHEMA = z2;
ve.load = Kf.load;
ve.loadAll = Kf.loadAll;
ve.dump = Yh.dump;
ve.YAMLException = Vn;
ve.types = {
  binary: yf,
  float: mf,
  map: lf,
  null: uf,
  pairs: vf,
  set: Af,
  timestamp: Cf,
  bool: hf,
  int: df,
  merge: bf,
  omap: Tf,
  seq: ff,
  str: af
};
ve.safeLoad = eo("safeLoad", "load");
ve.safeLoadAll = eo("safeLoadAll", "loadAll");
ve.safeDump = eo("safeDump", "dump");
var xi = {};
Object.defineProperty(xi, "__esModule", { value: !0 });
xi.Lazy = void 0;
class zh {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
xi.Lazy = zh;
var b2 = { exports: {} };
const Qh = "2.0.0", Xf = 256, Zh = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Jh = 16, e9 = Xf - 6, t9 = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Ei = {
  MAX_LENGTH: Xf,
  MAX_SAFE_COMPONENT_LENGTH: Jh,
  MAX_SAFE_BUILD_LENGTH: e9,
  MAX_SAFE_INTEGER: Zh,
  RELEASE_TYPES: t9,
  SEMVER_SPEC_VERSION: Qh,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const r9 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var gi = r9;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = Ei, o = gi;
  t = e.exports = {};
  const s = t.re = [], a = t.safeRe = [], f = t.src = [], c = t.safeSrc = [], l = t.t = {};
  let u = 0;
  const h = "[a-zA-Z0-9-]", d = [
    ["\\s", 1],
    ["\\d", i],
    [h, n]
  ], _ = (x) => {
    for (const [y, b] of d)
      x = x.split(`${y}*`).join(`${y}{0,${b}}`).split(`${y}+`).join(`${y}{1,${b}}`);
    return x;
  }, p = (x, y, b) => {
    const w = _(y), T = u++;
    o(x, T, y), l[x] = T, f[T] = y, c[T] = w, s[T] = new RegExp(y, b ? "g" : void 0), a[T] = new RegExp(w, b ? "g" : void 0);
  };
  p("NUMERICIDENTIFIER", "0|[1-9]\\d*"), p("NUMERICIDENTIFIERLOOSE", "\\d+"), p("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), p("MAINVERSION", `(${f[l.NUMERICIDENTIFIER]})\\.(${f[l.NUMERICIDENTIFIER]})\\.(${f[l.NUMERICIDENTIFIER]})`), p("MAINVERSIONLOOSE", `(${f[l.NUMERICIDENTIFIERLOOSE]})\\.(${f[l.NUMERICIDENTIFIERLOOSE]})\\.(${f[l.NUMERICIDENTIFIERLOOSE]})`), p("PRERELEASEIDENTIFIER", `(?:${f[l.NONNUMERICIDENTIFIER]}|${f[l.NUMERICIDENTIFIER]})`), p("PRERELEASEIDENTIFIERLOOSE", `(?:${f[l.NONNUMERICIDENTIFIER]}|${f[l.NUMERICIDENTIFIERLOOSE]})`), p("PRERELEASE", `(?:-(${f[l.PRERELEASEIDENTIFIER]}(?:\\.${f[l.PRERELEASEIDENTIFIER]})*))`), p("PRERELEASELOOSE", `(?:-?(${f[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${f[l.PRERELEASEIDENTIFIERLOOSE]})*))`), p("BUILDIDENTIFIER", `${h}+`), p("BUILD", `(?:\\+(${f[l.BUILDIDENTIFIER]}(?:\\.${f[l.BUILDIDENTIFIER]})*))`), p("FULLPLAIN", `v?${f[l.MAINVERSION]}${f[l.PRERELEASE]}?${f[l.BUILD]}?`), p("FULL", `^${f[l.FULLPLAIN]}$`), p("LOOSEPLAIN", `[v=\\s]*${f[l.MAINVERSIONLOOSE]}${f[l.PRERELEASELOOSE]}?${f[l.BUILD]}?`), p("LOOSE", `^${f[l.LOOSEPLAIN]}$`), p("GTLT", "((?:<|>)?=?)"), p("XRANGEIDENTIFIERLOOSE", `${f[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), p("XRANGEIDENTIFIER", `${f[l.NUMERICIDENTIFIER]}|x|X|\\*`), p("XRANGEPLAIN", `[v=\\s]*(${f[l.XRANGEIDENTIFIER]})(?:\\.(${f[l.XRANGEIDENTIFIER]})(?:\\.(${f[l.XRANGEIDENTIFIER]})(?:${f[l.PRERELEASE]})?${f[l.BUILD]}?)?)?`), p("XRANGEPLAINLOOSE", `[v=\\s]*(${f[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${f[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${f[l.XRANGEIDENTIFIERLOOSE]})(?:${f[l.PRERELEASELOOSE]})?${f[l.BUILD]}?)?)?`), p("XRANGE", `^${f[l.GTLT]}\\s*${f[l.XRANGEPLAIN]}$`), p("XRANGELOOSE", `^${f[l.GTLT]}\\s*${f[l.XRANGEPLAINLOOSE]}$`), p("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), p("COERCE", `${f[l.COERCEPLAIN]}(?:$|[^\\d])`), p("COERCEFULL", f[l.COERCEPLAIN] + `(?:${f[l.PRERELEASE]})?(?:${f[l.BUILD]})?(?:$|[^\\d])`), p("COERCERTL", f[l.COERCE], !0), p("COERCERTLFULL", f[l.COERCEFULL], !0), p("LONETILDE", "(?:~>?)"), p("TILDETRIM", `(\\s*)${f[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", p("TILDE", `^${f[l.LONETILDE]}${f[l.XRANGEPLAIN]}$`), p("TILDELOOSE", `^${f[l.LONETILDE]}${f[l.XRANGEPLAINLOOSE]}$`), p("LONECARET", "(?:\\^)"), p("CARETTRIM", `(\\s*)${f[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", p("CARET", `^${f[l.LONECARET]}${f[l.XRANGEPLAIN]}$`), p("CARETLOOSE", `^${f[l.LONECARET]}${f[l.XRANGEPLAINLOOSE]}$`), p("COMPARATORLOOSE", `^${f[l.GTLT]}\\s*(${f[l.LOOSEPLAIN]})$|^$`), p("COMPARATOR", `^${f[l.GTLT]}\\s*(${f[l.FULLPLAIN]})$|^$`), p("COMPARATORTRIM", `(\\s*)${f[l.GTLT]}\\s*(${f[l.LOOSEPLAIN]}|${f[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", p("HYPHENRANGE", `^\\s*(${f[l.XRANGEPLAIN]})\\s+-\\s+(${f[l.XRANGEPLAIN]})\\s*$`), p("HYPHENRANGELOOSE", `^\\s*(${f[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${f[l.XRANGEPLAINLOOSE]})\\s*$`), p("STAR", "(<|>)?=?\\s*\\*"), p("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), p("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(b2, b2.exports);
var Xn = b2.exports;
const n9 = Object.freeze({ loose: !0 }), i9 = Object.freeze({}), o9 = (e) => e ? typeof e != "object" ? n9 : e : i9;
var to = o9;
const Ds = /^[0-9]+$/, Yf = (e, t) => {
  const r = Ds.test(e), n = Ds.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, s9 = (e, t) => Yf(t, e);
var zf = {
  compareIdentifiers: Yf,
  rcompareIdentifiers: s9
};
const x1 = gi, { MAX_LENGTH: Ns, MAX_SAFE_INTEGER: E1 } = Ei, { safeRe: g1, t: C1 } = Xn, a9 = to, { compareIdentifiers: Ar } = zf;
let f9 = class ut {
  constructor(t, r) {
    if (r = a9(r), t instanceof ut) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Ns)
      throw new TypeError(
        `version is longer than ${Ns} characters`
      );
    x1("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? g1[C1.LOOSE] : g1[C1.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > E1 || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > E1 || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > E1 || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < E1)
          return o;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (x1("SemVer.compare", this.version, this.options, t), !(t instanceof ut)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new ut(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof ut || (t = new ut(t, this.options)), Ar(this.major, t.major) || Ar(this.minor, t.minor) || Ar(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof ut || (t = new ut(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (x1("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Ar(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof ut || (t = new ut(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (x1("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Ar(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = `-${r}`.match(this.options.loose ? g1[C1.PRERELEASELOOSE] : g1[C1.PRERELEASE]);
        if (!i || i[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let o = [r, i];
          n === !1 && (o = [r]), Ar(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Ge = f9;
const Ls = Ge, l9 = (e, t, r = !1) => {
  if (e instanceof Ls)
    return e;
  try {
    return new Ls(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Qr = l9;
const c9 = Qr, u9 = (e, t) => {
  const r = c9(e, t);
  return r ? r.version : null;
};
var h9 = u9;
const d9 = Qr, p9 = (e, t) => {
  const r = d9(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var m9 = p9;
const Fs = Ge, _9 = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new Fs(
      e instanceof Fs ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var x9 = _9;
const $s = Qr, E9 = (e, t) => {
  const r = $s(e, null, !0), n = $s(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const o = i > 0, s = o ? r : n, a = o ? n : r, f = !!s.prerelease.length;
  if (!!a.prerelease.length && !f) {
    if (!a.patch && !a.minor)
      return "major";
    if (a.compareMain(s) === 0)
      return a.minor && !a.patch ? "minor" : "patch";
  }
  const l = f ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var g9 = E9;
const C9 = Ge, b9 = (e, t) => new C9(e, t).major;
var y9 = b9;
const T9 = Ge, v9 = (e, t) => new T9(e, t).minor;
var A9 = v9;
const w9 = Ge, P9 = (e, t) => new w9(e, t).patch;
var S9 = P9;
const O9 = Qr, I9 = (e, t) => {
  const r = O9(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var R9 = I9;
const Us = Ge, B9 = (e, t, r) => new Us(e, r).compare(new Us(t, r));
var at = B9;
const D9 = at, N9 = (e, t, r) => D9(t, e, r);
var L9 = N9;
const F9 = at, $9 = (e, t) => F9(e, t, !0);
var U9 = $9;
const ks = Ge, k9 = (e, t, r) => {
  const n = new ks(e, r), i = new ks(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var ro = k9;
const M9 = ro, G9 = (e, t) => e.sort((r, n) => M9(r, n, t));
var H9 = G9;
const W9 = ro, q9 = (e, t) => e.sort((r, n) => W9(n, r, t));
var j9 = q9;
const V9 = at, K9 = (e, t, r) => V9(e, t, r) > 0;
var Ci = K9;
const X9 = at, Y9 = (e, t, r) => X9(e, t, r) < 0;
var no = Y9;
const z9 = at, Q9 = (e, t, r) => z9(e, t, r) === 0;
var Qf = Q9;
const Z9 = at, J9 = (e, t, r) => Z9(e, t, r) !== 0;
var Zf = J9;
const ed = at, td = (e, t, r) => ed(e, t, r) >= 0;
var io = td;
const rd = at, nd = (e, t, r) => rd(e, t, r) <= 0;
var oo = nd;
const id = Qf, od = Zf, sd = Ci, ad = io, fd = no, ld = oo, cd = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return id(e, r, n);
    case "!=":
      return od(e, r, n);
    case ">":
      return sd(e, r, n);
    case ">=":
      return ad(e, r, n);
    case "<":
      return fd(e, r, n);
    case "<=":
      return ld(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Jf = cd;
const ud = Ge, hd = Qr, { safeRe: b1, t: y1 } = Xn, dd = (e, t) => {
  if (e instanceof ud)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? b1[y1.COERCEFULL] : b1[y1.COERCE]);
  else {
    const f = t.includePrerelease ? b1[y1.COERCERTLFULL] : b1[y1.COERCERTL];
    let c;
    for (; (c = f.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || c.index + c[0].length !== r.index + r[0].length) && (r = c), f.lastIndex = c.index + c[1].length + c[2].length;
    f.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", o = r[4] || "0", s = t.includePrerelease && r[5] ? `-${r[5]}` : "", a = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return hd(`${n}.${i}.${o}${s}${a}`, t);
};
var pd = dd;
class md {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var _d = md, n0, Ms;
function ft() {
  if (Ms) return n0;
  Ms = 1;
  const e = /\s+/g;
  class t {
    constructor(I, N) {
      if (N = i(N), I instanceof t)
        return I.loose === !!N.loose && I.includePrerelease === !!N.includePrerelease ? I : new t(I.raw, N);
      if (I instanceof o)
        return this.raw = I.value, this.set = [[I]], this.formatted = void 0, this;
      if (this.options = N, this.loose = !!N.loose, this.includePrerelease = !!N.includePrerelease, this.raw = I.trim().replace(e, " "), this.set = this.raw.split("||").map((O) => this.parseRange(O.trim())).filter((O) => O.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const O = this.set[0];
        if (this.set = this.set.filter((S) => !p(S[0])), this.set.length === 0)
          this.set = [O];
        else if (this.set.length > 1) {
          for (const S of this.set)
            if (S.length === 1 && x(S[0])) {
              this.set = [S];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let I = 0; I < this.set.length; I++) {
          I > 0 && (this.formatted += "||");
          const N = this.set[I];
          for (let O = 0; O < N.length; O++)
            O > 0 && (this.formatted += " "), this.formatted += N[O].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(I) {
      const O = ((this.options.includePrerelease && d) | (this.options.loose && _)) + ":" + I, S = n.get(O);
      if (S)
        return S;
      const P = this.options.loose, U = P ? f[c.HYPHENRANGELOOSE] : f[c.HYPHENRANGE];
      I = I.replace(U, $(this.options.includePrerelease)), s("hyphen replace", I), I = I.replace(f[c.COMPARATORTRIM], l), s("comparator trim", I), I = I.replace(f[c.TILDETRIM], u), s("tilde trim", I), I = I.replace(f[c.CARETTRIM], h), s("caret trim", I);
      let k = I.split(" ").map((V) => b(V, this.options)).join(" ").split(/\s+/).map((V) => F(V, this.options));
      P && (k = k.filter((V) => (s("loose invalid filter", V, this.options), !!V.match(f[c.COMPARATORLOOSE])))), s("range list", k);
      const j = /* @__PURE__ */ new Map(), z = k.map((V) => new o(V, this.options));
      for (const V of z) {
        if (p(V))
          return [V];
        j.set(V.value, V);
      }
      j.size > 1 && j.has("") && j.delete("");
      const ee = [...j.values()];
      return n.set(O, ee), ee;
    }
    intersects(I, N) {
      if (!(I instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((O) => y(O, N) && I.set.some((S) => y(S, N) && O.every((P) => S.every((U) => P.intersects(U, N)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(I) {
      if (!I)
        return !1;
      if (typeof I == "string")
        try {
          I = new a(I, this.options);
        } catch {
          return !1;
        }
      for (let N = 0; N < this.set.length; N++)
        if (W(this.set[N], I, this.options))
          return !0;
      return !1;
    }
  }
  n0 = t;
  const r = _d, n = new r(), i = to, o = bi(), s = gi, a = Ge, {
    safeRe: f,
    t: c,
    comparatorTrimReplace: l,
    tildeTrimReplace: u,
    caretTrimReplace: h
  } = Xn, { FLAG_INCLUDE_PRERELEASE: d, FLAG_LOOSE: _ } = Ei, p = (D) => D.value === "<0.0.0-0", x = (D) => D.value === "", y = (D, I) => {
    let N = !0;
    const O = D.slice();
    let S = O.pop();
    for (; N && O.length; )
      N = O.every((P) => S.intersects(P, I)), S = O.pop();
    return N;
  }, b = (D, I) => (s("comp", D, I), D = G(D, I), s("caret", D), D = T(D, I), s("tildes", D), D = Q(D, I), s("xrange", D), D = q(D, I), s("stars", D), D), w = (D) => !D || D.toLowerCase() === "x" || D === "*", T = (D, I) => D.trim().split(/\s+/).map((N) => L(N, I)).join(" "), L = (D, I) => {
    const N = I.loose ? f[c.TILDELOOSE] : f[c.TILDE];
    return D.replace(N, (O, S, P, U, k) => {
      s("tilde", D, O, S, P, U, k);
      let j;
      return w(S) ? j = "" : w(P) ? j = `>=${S}.0.0 <${+S + 1}.0.0-0` : w(U) ? j = `>=${S}.${P}.0 <${S}.${+P + 1}.0-0` : k ? (s("replaceTilde pr", k), j = `>=${S}.${P}.${U}-${k} <${S}.${+P + 1}.0-0`) : j = `>=${S}.${P}.${U} <${S}.${+P + 1}.0-0`, s("tilde return", j), j;
    });
  }, G = (D, I) => D.trim().split(/\s+/).map((N) => H(N, I)).join(" "), H = (D, I) => {
    s("caret", D, I);
    const N = I.loose ? f[c.CARETLOOSE] : f[c.CARET], O = I.includePrerelease ? "-0" : "";
    return D.replace(N, (S, P, U, k, j) => {
      s("caret", D, S, P, U, k, j);
      let z;
      return w(P) ? z = "" : w(U) ? z = `>=${P}.0.0${O} <${+P + 1}.0.0-0` : w(k) ? P === "0" ? z = `>=${P}.${U}.0${O} <${P}.${+U + 1}.0-0` : z = `>=${P}.${U}.0${O} <${+P + 1}.0.0-0` : j ? (s("replaceCaret pr", j), P === "0" ? U === "0" ? z = `>=${P}.${U}.${k}-${j} <${P}.${U}.${+k + 1}-0` : z = `>=${P}.${U}.${k}-${j} <${P}.${+U + 1}.0-0` : z = `>=${P}.${U}.${k}-${j} <${+P + 1}.0.0-0`) : (s("no pr"), P === "0" ? U === "0" ? z = `>=${P}.${U}.${k}${O} <${P}.${U}.${+k + 1}-0` : z = `>=${P}.${U}.${k}${O} <${P}.${+U + 1}.0-0` : z = `>=${P}.${U}.${k} <${+P + 1}.0.0-0`), s("caret return", z), z;
    });
  }, Q = (D, I) => (s("replaceXRanges", D, I), D.split(/\s+/).map((N) => C(N, I)).join(" ")), C = (D, I) => {
    D = D.trim();
    const N = I.loose ? f[c.XRANGELOOSE] : f[c.XRANGE];
    return D.replace(N, (O, S, P, U, k, j) => {
      s("xRange", D, O, S, P, U, k, j);
      const z = w(P), ee = z || w(U), V = ee || w(k), Ae = V;
      return S === "=" && Ae && (S = ""), j = I.includePrerelease ? "-0" : "", z ? S === ">" || S === "<" ? O = "<0.0.0-0" : O = "*" : S && Ae ? (ee && (U = 0), k = 0, S === ">" ? (S = ">=", ee ? (P = +P + 1, U = 0, k = 0) : (U = +U + 1, k = 0)) : S === "<=" && (S = "<", ee ? P = +P + 1 : U = +U + 1), S === "<" && (j = "-0"), O = `${S + P}.${U}.${k}${j}`) : ee ? O = `>=${P}.0.0${j} <${+P + 1}.0.0-0` : V && (O = `>=${P}.${U}.0${j} <${P}.${+U + 1}.0-0`), s("xRange return", O), O;
    });
  }, q = (D, I) => (s("replaceStars", D, I), D.trim().replace(f[c.STAR], "")), F = (D, I) => (s("replaceGTE0", D, I), D.trim().replace(f[I.includePrerelease ? c.GTE0PRE : c.GTE0], "")), $ = (D) => (I, N, O, S, P, U, k, j, z, ee, V, Ae) => (w(O) ? N = "" : w(S) ? N = `>=${O}.0.0${D ? "-0" : ""}` : w(P) ? N = `>=${O}.${S}.0${D ? "-0" : ""}` : U ? N = `>=${N}` : N = `>=${N}${D ? "-0" : ""}`, w(z) ? j = "" : w(ee) ? j = `<${+z + 1}.0.0-0` : w(V) ? j = `<${z}.${+ee + 1}.0-0` : Ae ? j = `<=${z}.${ee}.${V}-${Ae}` : D ? j = `<${z}.${ee}.${+V + 1}-0` : j = `<=${j}`, `${N} ${j}`.trim()), W = (D, I, N) => {
    for (let O = 0; O < D.length; O++)
      if (!D[O].test(I))
        return !1;
    if (I.prerelease.length && !N.includePrerelease) {
      for (let O = 0; O < D.length; O++)
        if (s(D[O].semver), D[O].semver !== o.ANY && D[O].semver.prerelease.length > 0) {
          const S = D[O].semver;
          if (S.major === I.major && S.minor === I.minor && S.patch === I.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return n0;
}
var i0, Gs;
function bi() {
  if (Gs) return i0;
  Gs = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, u) {
      if (u = r(u), l instanceof t) {
        if (l.loose === !!u.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), s("comparator", l, u), this.options = u, this.loose = !!u.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, s("comp", this);
    }
    parse(l) {
      const u = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], h = l.match(u);
      if (!h)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new a(h[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (s("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new a(l, this.options);
        } catch {
          return !1;
        }
      return o(l, this.operator, this.semver, this.options);
    }
    intersects(l, u) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new f(l.value, u).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new f(this.value, u).test(l.semver) : (u = r(u), u.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !u.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || o(this.semver, "<", l.semver, u) && this.operator.startsWith(">") && l.operator.startsWith("<") || o(this.semver, ">", l.semver, u) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  i0 = t;
  const r = to, { safeRe: n, t: i } = Xn, o = Jf, s = gi, a = Ge, f = ft();
  return i0;
}
const xd = ft(), Ed = (e, t, r) => {
  try {
    t = new xd(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var yi = Ed;
const gd = ft(), Cd = (e, t) => new gd(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var bd = Cd;
const yd = Ge, Td = ft(), vd = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new Td(t, r);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!n || i.compare(s) === -1) && (n = s, i = new yd(n, r));
  }), n;
};
var Ad = vd;
const wd = Ge, Pd = ft(), Sd = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new Pd(t, r);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!n || i.compare(s) === 1) && (n = s, i = new wd(n, r));
  }), n;
};
var Od = Sd;
const o0 = Ge, Id = ft(), Hs = Ci, Rd = (e, t) => {
  e = new Id(e, t);
  let r = new o0("0.0.0");
  if (e.test(r) || (r = new o0("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let o = null;
    i.forEach((s) => {
      const a = new o0(s.semver.version);
      switch (s.operator) {
        case ">":
          a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), a.raw = a.format();
        case "":
        case ">=":
          (!o || Hs(a, o)) && (o = a);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${s.operator}`);
      }
    }), o && (!r || Hs(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var Bd = Rd;
const Dd = ft(), Nd = (e, t) => {
  try {
    return new Dd(e, t).range || "*";
  } catch {
    return null;
  }
};
var Ld = Nd;
const Fd = Ge, el = bi(), { ANY: $d } = el, Ud = ft(), kd = yi, Ws = Ci, qs = no, Md = oo, Gd = io, Hd = (e, t, r, n) => {
  e = new Fd(e, n), t = new Ud(t, n);
  let i, o, s, a, f;
  switch (r) {
    case ">":
      i = Ws, o = Md, s = qs, a = ">", f = ">=";
      break;
    case "<":
      i = qs, o = Gd, s = Ws, a = "<", f = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (kd(e, t, n))
    return !1;
  for (let c = 0; c < t.set.length; ++c) {
    const l = t.set[c];
    let u = null, h = null;
    if (l.forEach((d) => {
      d.semver === $d && (d = new el(">=0.0.0")), u = u || d, h = h || d, i(d.semver, u.semver, n) ? u = d : s(d.semver, h.semver, n) && (h = d);
    }), u.operator === a || u.operator === f || (!h.operator || h.operator === a) && o(e, h.semver))
      return !1;
    if (h.operator === f && s(e, h.semver))
      return !1;
  }
  return !0;
};
var so = Hd;
const Wd = so, qd = (e, t, r) => Wd(e, t, ">", r);
var jd = qd;
const Vd = so, Kd = (e, t, r) => Vd(e, t, "<", r);
var Xd = Kd;
const js = ft(), Yd = (e, t, r) => (e = new js(e, r), t = new js(t, r), e.intersects(t, r));
var zd = Yd;
const Qd = yi, Zd = at;
var Jd = (e, t, r) => {
  const n = [];
  let i = null, o = null;
  const s = e.sort((l, u) => Zd(l, u, r));
  for (const l of s)
    Qd(l, t, r) ? (o = l, i || (i = l)) : (o && n.push([i, o]), o = null, i = null);
  i && n.push([i, null]);
  const a = [];
  for (const [l, u] of n)
    l === u ? a.push(l) : !u && l === s[0] ? a.push("*") : u ? l === s[0] ? a.push(`<=${u}`) : a.push(`${l} - ${u}`) : a.push(`>=${l}`);
  const f = a.join(" || "), c = typeof t.raw == "string" ? t.raw : String(t);
  return f.length < c.length ? f : t;
};
const Vs = ft(), ao = bi(), { ANY: s0 } = ao, cn = yi, fo = at, ep = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Vs(e, r), t = new Vs(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const s = rp(i, o, r);
      if (n = n || s !== null, s)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, tp = [new ao(">=0.0.0-0")], Ks = [new ao(">=0.0.0")], rp = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === s0) {
    if (t.length === 1 && t[0].semver === s0)
      return !0;
    r.includePrerelease ? e = tp : e = Ks;
  }
  if (t.length === 1 && t[0].semver === s0) {
    if (r.includePrerelease)
      return !0;
    t = Ks;
  }
  const n = /* @__PURE__ */ new Set();
  let i, o;
  for (const d of e)
    d.operator === ">" || d.operator === ">=" ? i = Xs(i, d, r) : d.operator === "<" || d.operator === "<=" ? o = Ys(o, d, r) : n.add(d.semver);
  if (n.size > 1)
    return null;
  let s;
  if (i && o) {
    if (s = fo(i.semver, o.semver, r), s > 0)
      return null;
    if (s === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const d of n) {
    if (i && !cn(d, String(i), r) || o && !cn(d, String(o), r))
      return null;
    for (const _ of t)
      if (!cn(d, String(_), r))
        return !1;
    return !0;
  }
  let a, f, c, l, u = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, h = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && o.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const d of t) {
    if (l = l || d.operator === ">" || d.operator === ">=", c = c || d.operator === "<" || d.operator === "<=", i) {
      if (h && d.semver.prerelease && d.semver.prerelease.length && d.semver.major === h.major && d.semver.minor === h.minor && d.semver.patch === h.patch && (h = !1), d.operator === ">" || d.operator === ">=") {
        if (a = Xs(i, d, r), a === d && a !== i)
          return !1;
      } else if (i.operator === ">=" && !cn(i.semver, String(d), r))
        return !1;
    }
    if (o) {
      if (u && d.semver.prerelease && d.semver.prerelease.length && d.semver.major === u.major && d.semver.minor === u.minor && d.semver.patch === u.patch && (u = !1), d.operator === "<" || d.operator === "<=") {
        if (f = Ys(o, d, r), f === d && f !== o)
          return !1;
      } else if (o.operator === "<=" && !cn(o.semver, String(d), r))
        return !1;
    }
    if (!d.operator && (o || i) && s !== 0)
      return !1;
  }
  return !(i && c && !o && s !== 0 || o && l && !i && s !== 0 || h || u);
}, Xs = (e, t, r) => {
  if (!e)
    return t;
  const n = fo(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Ys = (e, t, r) => {
  if (!e)
    return t;
  const n = fo(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var np = ep;
const a0 = Xn, zs = Ei, ip = Ge, Qs = zf, op = Qr, sp = h9, ap = m9, fp = x9, lp = g9, cp = y9, up = A9, hp = S9, dp = R9, pp = at, mp = L9, _p = U9, xp = ro, Ep = H9, gp = j9, Cp = Ci, bp = no, yp = Qf, Tp = Zf, vp = io, Ap = oo, wp = Jf, Pp = pd, Sp = bi(), Op = ft(), Ip = yi, Rp = bd, Bp = Ad, Dp = Od, Np = Bd, Lp = Ld, Fp = so, $p = jd, Up = Xd, kp = zd, Mp = Jd, Gp = np;
var tl = {
  parse: op,
  valid: sp,
  clean: ap,
  inc: fp,
  diff: lp,
  major: cp,
  minor: up,
  patch: hp,
  prerelease: dp,
  compare: pp,
  rcompare: mp,
  compareLoose: _p,
  compareBuild: xp,
  sort: Ep,
  rsort: gp,
  gt: Cp,
  lt: bp,
  eq: yp,
  neq: Tp,
  gte: vp,
  lte: Ap,
  cmp: wp,
  coerce: Pp,
  Comparator: Sp,
  Range: Op,
  satisfies: Ip,
  toComparators: Rp,
  maxSatisfying: Bp,
  minSatisfying: Dp,
  minVersion: Np,
  validRange: Lp,
  outside: Fp,
  gtr: $p,
  ltr: Up,
  intersects: kp,
  simplifyRange: Mp,
  subset: Gp,
  SemVer: ip,
  re: a0.re,
  src: a0.src,
  tokens: a0.t,
  SEMVER_SPEC_VERSION: zs.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: zs.RELEASE_TYPES,
  compareIdentifiers: Qs.compareIdentifiers,
  rcompareIdentifiers: Qs.rcompareIdentifiers
}, Yn = {}, ri = { exports: {} };
ri.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, o = 2, s = 9007199254740991, a = "[object Arguments]", f = "[object Array]", c = "[object AsyncFunction]", l = "[object Boolean]", u = "[object Date]", h = "[object Error]", d = "[object Function]", _ = "[object GeneratorFunction]", p = "[object Map]", x = "[object Number]", y = "[object Null]", b = "[object Object]", w = "[object Promise]", T = "[object Proxy]", L = "[object RegExp]", G = "[object Set]", H = "[object String]", Q = "[object Symbol]", C = "[object Undefined]", q = "[object WeakMap]", F = "[object ArrayBuffer]", $ = "[object DataView]", W = "[object Float32Array]", D = "[object Float64Array]", I = "[object Int8Array]", N = "[object Int16Array]", O = "[object Int32Array]", S = "[object Uint8Array]", P = "[object Uint8ClampedArray]", U = "[object Uint16Array]", k = "[object Uint32Array]", j = /[\\^$.*+?()[\]{}|]/g, z = /^\[object .+?Constructor\]$/, ee = /^(?:0|[1-9]\d*)$/, V = {};
  V[W] = V[D] = V[I] = V[N] = V[O] = V[S] = V[P] = V[U] = V[k] = !0, V[a] = V[f] = V[F] = V[l] = V[$] = V[u] = V[h] = V[d] = V[p] = V[x] = V[b] = V[L] = V[G] = V[H] = V[q] = !1;
  var Ae = typeof De == "object" && De && De.Object === Object && De, E = typeof self == "object" && self && self.Object === Object && self, m = Ae || E || Function("return this")(), R = t && !t.nodeType && t, A = R && !0 && e && !e.nodeType && e, J = A && A.exports === R, ie = J && Ae.process, ae = function() {
    try {
      return ie && ie.binding && ie.binding("util");
    } catch {
    }
  }(), Ce = ae && ae.isTypedArray;
  function we(g, v) {
    for (var B = -1, M = g == null ? 0 : g.length, re = 0, Y = []; ++B < M; ) {
      var fe = g[B];
      v(fe, B, g) && (Y[re++] = fe);
    }
    return Y;
  }
  function At(g, v) {
    for (var B = -1, M = v.length, re = g.length; ++B < M; )
      g[re + B] = v[B];
    return g;
  }
  function he(g, v) {
    for (var B = -1, M = g == null ? 0 : g.length; ++B < M; )
      if (v(g[B], B, g))
        return !0;
    return !1;
  }
  function tt(g, v) {
    for (var B = -1, M = Array(g); ++B < g; )
      M[B] = v(B);
    return M;
  }
  function Fi(g) {
    return function(v) {
      return g(v);
    };
  }
  function t1(g, v) {
    return g.has(v);
  }
  function rn(g, v) {
    return g == null ? void 0 : g[v];
  }
  function r1(g) {
    var v = -1, B = Array(g.size);
    return g.forEach(function(M, re) {
      B[++v] = [re, M];
    }), B;
  }
  function pc(g, v) {
    return function(B) {
      return g(v(B));
    };
  }
  function mc(g) {
    var v = -1, B = Array(g.size);
    return g.forEach(function(M) {
      B[++v] = M;
    }), B;
  }
  var _c = Array.prototype, xc = Function.prototype, n1 = Object.prototype, $i = m["__core-js_shared__"], yo = xc.toString, lt = n1.hasOwnProperty, To = function() {
    var g = /[^.]+$/.exec($i && $i.keys && $i.keys.IE_PROTO || "");
    return g ? "Symbol(src)_1." + g : "";
  }(), vo = n1.toString, Ec = RegExp(
    "^" + yo.call(lt).replace(j, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Ao = J ? m.Buffer : void 0, i1 = m.Symbol, wo = m.Uint8Array, Po = n1.propertyIsEnumerable, gc = _c.splice, Zt = i1 ? i1.toStringTag : void 0, So = Object.getOwnPropertySymbols, Cc = Ao ? Ao.isBuffer : void 0, bc = pc(Object.keys, Object), Ui = yr(m, "DataView"), nn = yr(m, "Map"), ki = yr(m, "Promise"), Mi = yr(m, "Set"), Gi = yr(m, "WeakMap"), on = yr(Object, "create"), yc = tr(Ui), Tc = tr(nn), vc = tr(ki), Ac = tr(Mi), wc = tr(Gi), Oo = i1 ? i1.prototype : void 0, Hi = Oo ? Oo.valueOf : void 0;
  function Jt(g) {
    var v = -1, B = g == null ? 0 : g.length;
    for (this.clear(); ++v < B; ) {
      var M = g[v];
      this.set(M[0], M[1]);
    }
  }
  function Pc() {
    this.__data__ = on ? on(null) : {}, this.size = 0;
  }
  function Sc(g) {
    var v = this.has(g) && delete this.__data__[g];
    return this.size -= v ? 1 : 0, v;
  }
  function Oc(g) {
    var v = this.__data__;
    if (on) {
      var B = v[g];
      return B === n ? void 0 : B;
    }
    return lt.call(v, g) ? v[g] : void 0;
  }
  function Ic(g) {
    var v = this.__data__;
    return on ? v[g] !== void 0 : lt.call(v, g);
  }
  function Rc(g, v) {
    var B = this.__data__;
    return this.size += this.has(g) ? 0 : 1, B[g] = on && v === void 0 ? n : v, this;
  }
  Jt.prototype.clear = Pc, Jt.prototype.delete = Sc, Jt.prototype.get = Oc, Jt.prototype.has = Ic, Jt.prototype.set = Rc;
  function _t(g) {
    var v = -1, B = g == null ? 0 : g.length;
    for (this.clear(); ++v < B; ) {
      var M = g[v];
      this.set(M[0], M[1]);
    }
  }
  function Bc() {
    this.__data__ = [], this.size = 0;
  }
  function Dc(g) {
    var v = this.__data__, B = s1(v, g);
    if (B < 0)
      return !1;
    var M = v.length - 1;
    return B == M ? v.pop() : gc.call(v, B, 1), --this.size, !0;
  }
  function Nc(g) {
    var v = this.__data__, B = s1(v, g);
    return B < 0 ? void 0 : v[B][1];
  }
  function Lc(g) {
    return s1(this.__data__, g) > -1;
  }
  function Fc(g, v) {
    var B = this.__data__, M = s1(B, g);
    return M < 0 ? (++this.size, B.push([g, v])) : B[M][1] = v, this;
  }
  _t.prototype.clear = Bc, _t.prototype.delete = Dc, _t.prototype.get = Nc, _t.prototype.has = Lc, _t.prototype.set = Fc;
  function er(g) {
    var v = -1, B = g == null ? 0 : g.length;
    for (this.clear(); ++v < B; ) {
      var M = g[v];
      this.set(M[0], M[1]);
    }
  }
  function $c() {
    this.size = 0, this.__data__ = {
      hash: new Jt(),
      map: new (nn || _t)(),
      string: new Jt()
    };
  }
  function Uc(g) {
    var v = a1(this, g).delete(g);
    return this.size -= v ? 1 : 0, v;
  }
  function kc(g) {
    return a1(this, g).get(g);
  }
  function Mc(g) {
    return a1(this, g).has(g);
  }
  function Gc(g, v) {
    var B = a1(this, g), M = B.size;
    return B.set(g, v), this.size += B.size == M ? 0 : 1, this;
  }
  er.prototype.clear = $c, er.prototype.delete = Uc, er.prototype.get = kc, er.prototype.has = Mc, er.prototype.set = Gc;
  function o1(g) {
    var v = -1, B = g == null ? 0 : g.length;
    for (this.__data__ = new er(); ++v < B; )
      this.add(g[v]);
  }
  function Hc(g) {
    return this.__data__.set(g, n), this;
  }
  function Wc(g) {
    return this.__data__.has(g);
  }
  o1.prototype.add = o1.prototype.push = Hc, o1.prototype.has = Wc;
  function wt(g) {
    var v = this.__data__ = new _t(g);
    this.size = v.size;
  }
  function qc() {
    this.__data__ = new _t(), this.size = 0;
  }
  function jc(g) {
    var v = this.__data__, B = v.delete(g);
    return this.size = v.size, B;
  }
  function Vc(g) {
    return this.__data__.get(g);
  }
  function Kc(g) {
    return this.__data__.has(g);
  }
  function Xc(g, v) {
    var B = this.__data__;
    if (B instanceof _t) {
      var M = B.__data__;
      if (!nn || M.length < r - 1)
        return M.push([g, v]), this.size = ++B.size, this;
      B = this.__data__ = new er(M);
    }
    return B.set(g, v), this.size = B.size, this;
  }
  wt.prototype.clear = qc, wt.prototype.delete = jc, wt.prototype.get = Vc, wt.prototype.has = Kc, wt.prototype.set = Xc;
  function Yc(g, v) {
    var B = f1(g), M = !B && cu(g), re = !B && !M && Wi(g), Y = !B && !M && !re && Uo(g), fe = B || M || re || Y, me = fe ? tt(g.length, String) : [], be = me.length;
    for (var oe in g)
      lt.call(g, oe) && !(fe && // Safari 9 has enumerable `arguments.length` in strict mode.
      (oe == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      re && (oe == "offset" || oe == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      Y && (oe == "buffer" || oe == "byteLength" || oe == "byteOffset") || // Skip index properties.
      ou(oe, be))) && me.push(oe);
    return me;
  }
  function s1(g, v) {
    for (var B = g.length; B--; )
      if (No(g[B][0], v))
        return B;
    return -1;
  }
  function zc(g, v, B) {
    var M = v(g);
    return f1(g) ? M : At(M, B(g));
  }
  function sn(g) {
    return g == null ? g === void 0 ? C : y : Zt && Zt in Object(g) ? nu(g) : lu(g);
  }
  function Io(g) {
    return an(g) && sn(g) == a;
  }
  function Ro(g, v, B, M, re) {
    return g === v ? !0 : g == null || v == null || !an(g) && !an(v) ? g !== g && v !== v : Qc(g, v, B, M, Ro, re);
  }
  function Qc(g, v, B, M, re, Y) {
    var fe = f1(g), me = f1(v), be = fe ? f : Pt(g), oe = me ? f : Pt(v);
    be = be == a ? b : be, oe = oe == a ? b : oe;
    var qe = be == b, rt = oe == b, Pe = be == oe;
    if (Pe && Wi(g)) {
      if (!Wi(v))
        return !1;
      fe = !0, qe = !1;
    }
    if (Pe && !qe)
      return Y || (Y = new wt()), fe || Uo(g) ? Bo(g, v, B, M, re, Y) : tu(g, v, be, B, M, re, Y);
    if (!(B & i)) {
      var Ke = qe && lt.call(g, "__wrapped__"), Xe = rt && lt.call(v, "__wrapped__");
      if (Ke || Xe) {
        var St = Ke ? g.value() : g, xt = Xe ? v.value() : v;
        return Y || (Y = new wt()), re(St, xt, B, M, Y);
      }
    }
    return Pe ? (Y || (Y = new wt()), ru(g, v, B, M, re, Y)) : !1;
  }
  function Zc(g) {
    if (!$o(g) || au(g))
      return !1;
    var v = Lo(g) ? Ec : z;
    return v.test(tr(g));
  }
  function Jc(g) {
    return an(g) && Fo(g.length) && !!V[sn(g)];
  }
  function eu(g) {
    if (!fu(g))
      return bc(g);
    var v = [];
    for (var B in Object(g))
      lt.call(g, B) && B != "constructor" && v.push(B);
    return v;
  }
  function Bo(g, v, B, M, re, Y) {
    var fe = B & i, me = g.length, be = v.length;
    if (me != be && !(fe && be > me))
      return !1;
    var oe = Y.get(g);
    if (oe && Y.get(v))
      return oe == v;
    var qe = -1, rt = !0, Pe = B & o ? new o1() : void 0;
    for (Y.set(g, v), Y.set(v, g); ++qe < me; ) {
      var Ke = g[qe], Xe = v[qe];
      if (M)
        var St = fe ? M(Xe, Ke, qe, v, g, Y) : M(Ke, Xe, qe, g, v, Y);
      if (St !== void 0) {
        if (St)
          continue;
        rt = !1;
        break;
      }
      if (Pe) {
        if (!he(v, function(xt, rr) {
          if (!t1(Pe, rr) && (Ke === xt || re(Ke, xt, B, M, Y)))
            return Pe.push(rr);
        })) {
          rt = !1;
          break;
        }
      } else if (!(Ke === Xe || re(Ke, Xe, B, M, Y))) {
        rt = !1;
        break;
      }
    }
    return Y.delete(g), Y.delete(v), rt;
  }
  function tu(g, v, B, M, re, Y, fe) {
    switch (B) {
      case $:
        if (g.byteLength != v.byteLength || g.byteOffset != v.byteOffset)
          return !1;
        g = g.buffer, v = v.buffer;
      case F:
        return !(g.byteLength != v.byteLength || !Y(new wo(g), new wo(v)));
      case l:
      case u:
      case x:
        return No(+g, +v);
      case h:
        return g.name == v.name && g.message == v.message;
      case L:
      case H:
        return g == v + "";
      case p:
        var me = r1;
      case G:
        var be = M & i;
        if (me || (me = mc), g.size != v.size && !be)
          return !1;
        var oe = fe.get(g);
        if (oe)
          return oe == v;
        M |= o, fe.set(g, v);
        var qe = Bo(me(g), me(v), M, re, Y, fe);
        return fe.delete(g), qe;
      case Q:
        if (Hi)
          return Hi.call(g) == Hi.call(v);
    }
    return !1;
  }
  function ru(g, v, B, M, re, Y) {
    var fe = B & i, me = Do(g), be = me.length, oe = Do(v), qe = oe.length;
    if (be != qe && !fe)
      return !1;
    for (var rt = be; rt--; ) {
      var Pe = me[rt];
      if (!(fe ? Pe in v : lt.call(v, Pe)))
        return !1;
    }
    var Ke = Y.get(g);
    if (Ke && Y.get(v))
      return Ke == v;
    var Xe = !0;
    Y.set(g, v), Y.set(v, g);
    for (var St = fe; ++rt < be; ) {
      Pe = me[rt];
      var xt = g[Pe], rr = v[Pe];
      if (M)
        var ko = fe ? M(rr, xt, Pe, v, g, Y) : M(xt, rr, Pe, g, v, Y);
      if (!(ko === void 0 ? xt === rr || re(xt, rr, B, M, Y) : ko)) {
        Xe = !1;
        break;
      }
      St || (St = Pe == "constructor");
    }
    if (Xe && !St) {
      var l1 = g.constructor, c1 = v.constructor;
      l1 != c1 && "constructor" in g && "constructor" in v && !(typeof l1 == "function" && l1 instanceof l1 && typeof c1 == "function" && c1 instanceof c1) && (Xe = !1);
    }
    return Y.delete(g), Y.delete(v), Xe;
  }
  function Do(g) {
    return zc(g, du, iu);
  }
  function a1(g, v) {
    var B = g.__data__;
    return su(v) ? B[typeof v == "string" ? "string" : "hash"] : B.map;
  }
  function yr(g, v) {
    var B = rn(g, v);
    return Zc(B) ? B : void 0;
  }
  function nu(g) {
    var v = lt.call(g, Zt), B = g[Zt];
    try {
      g[Zt] = void 0;
      var M = !0;
    } catch {
    }
    var re = vo.call(g);
    return M && (v ? g[Zt] = B : delete g[Zt]), re;
  }
  var iu = So ? function(g) {
    return g == null ? [] : (g = Object(g), we(So(g), function(v) {
      return Po.call(g, v);
    }));
  } : pu, Pt = sn;
  (Ui && Pt(new Ui(new ArrayBuffer(1))) != $ || nn && Pt(new nn()) != p || ki && Pt(ki.resolve()) != w || Mi && Pt(new Mi()) != G || Gi && Pt(new Gi()) != q) && (Pt = function(g) {
    var v = sn(g), B = v == b ? g.constructor : void 0, M = B ? tr(B) : "";
    if (M)
      switch (M) {
        case yc:
          return $;
        case Tc:
          return p;
        case vc:
          return w;
        case Ac:
          return G;
        case wc:
          return q;
      }
    return v;
  });
  function ou(g, v) {
    return v = v ?? s, !!v && (typeof g == "number" || ee.test(g)) && g > -1 && g % 1 == 0 && g < v;
  }
  function su(g) {
    var v = typeof g;
    return v == "string" || v == "number" || v == "symbol" || v == "boolean" ? g !== "__proto__" : g === null;
  }
  function au(g) {
    return !!To && To in g;
  }
  function fu(g) {
    var v = g && g.constructor, B = typeof v == "function" && v.prototype || n1;
    return g === B;
  }
  function lu(g) {
    return vo.call(g);
  }
  function tr(g) {
    if (g != null) {
      try {
        return yo.call(g);
      } catch {
      }
      try {
        return g + "";
      } catch {
      }
    }
    return "";
  }
  function No(g, v) {
    return g === v || g !== g && v !== v;
  }
  var cu = Io(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Io : function(g) {
    return an(g) && lt.call(g, "callee") && !Po.call(g, "callee");
  }, f1 = Array.isArray;
  function uu(g) {
    return g != null && Fo(g.length) && !Lo(g);
  }
  var Wi = Cc || mu;
  function hu(g, v) {
    return Ro(g, v);
  }
  function Lo(g) {
    if (!$o(g))
      return !1;
    var v = sn(g);
    return v == d || v == _ || v == c || v == T;
  }
  function Fo(g) {
    return typeof g == "number" && g > -1 && g % 1 == 0 && g <= s;
  }
  function $o(g) {
    var v = typeof g;
    return g != null && (v == "object" || v == "function");
  }
  function an(g) {
    return g != null && typeof g == "object";
  }
  var Uo = Ce ? Fi(Ce) : Jc;
  function du(g) {
    return uu(g) ? Yc(g) : eu(g);
  }
  function pu() {
    return [];
  }
  function mu() {
    return !1;
  }
  e.exports = hu;
})(ri, ri.exports);
var Hp = ri.exports;
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.DownloadedUpdateHelper = void 0;
Yn.createTempUpdateFile = Kp;
const Wp = jt, qp = Ie, Zs = Hp, ar = Kt, An = ne;
class jp {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return An.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Zs(this.versionInfo, r) && Zs(this.fileInfo.info, n.info) && await (0, ar.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(n, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, r, n, i, o, s) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, s && await (0, ar.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, ar.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, ar.pathExists)(n))
      return null;
    let o;
    try {
      o = await (0, ar.readJson)(n);
    } catch (c) {
      let l = "No cached update info available";
      return c.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), l += ` (error on read: ${c.message})`), r.info(l), null;
    }
    if (!((o == null ? void 0 : o.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const a = An.join(this.cacheDirForPendingUpdate, o.fileName);
    if (!await (0, ar.pathExists)(a))
      return r.info("Cached update file doesn't exist"), null;
    const f = await Vp(a);
    return t.info.sha512 !== f ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${f}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, a);
  }
  getUpdateInfoFile() {
    return An.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Yn.DownloadedUpdateHelper = jp;
function Vp(e, t = "sha512", r = "base64", n) {
  return new Promise((i, o) => {
    const s = (0, Wp.createHash)(t);
    s.on("error", o).setEncoding(r), (0, qp.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      s.end(), i(s.read());
    }).pipe(s, { end: !1 });
  });
}
async function Kp(e, t, r) {
  let n = 0, i = An.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, ar.unlink)(i), i;
    } catch (s) {
      if (s.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${s}`), i = An.join(t, `${n++}-${e}`);
    }
  return i;
}
var Ti = {}, lo = {};
Object.defineProperty(lo, "__esModule", { value: !0 });
lo.getAppCacheDir = Yp;
const f0 = ne, Xp = Hn;
function Yp() {
  const e = (0, Xp.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || f0.join(e, "AppData", "Local") : process.platform === "darwin" ? t = f0.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || f0.join(e, ".cache"), t;
}
Object.defineProperty(Ti, "__esModule", { value: !0 });
Ti.ElectronAppAdapter = void 0;
const Js = ne, zp = lo;
class Qp {
  constructor(t = mr.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? Js.join(process.resourcesPath, "app-update.yml") : Js.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, zp.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
Ti.ElectronAppAdapter = Qp;
var rl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = Ee;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return mr.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, s, a) {
      return await a.cancellationToken.createPromise((f, c, l) => {
        const u = {
          headers: a.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, u), (0, t.configureRequestOptions)(u), this.doDownload(u, {
          destination: s,
          options: a,
          onCancel: l,
          callback: (h) => {
            h == null ? f(s) : c(h);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, s) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const a = mr.net.request({
        ...o,
        session: this.cachedSession
      });
      return a.on("response", s), this.proxyLoginCallback != null && a.on("login", this.proxyLoginCallback), a;
    }
    addRedirectHandlers(o, s, a, f, c) {
      o.on("redirect", (l, u, h) => {
        o.abort(), f > this.maxRedirects ? a(this.createMaxRedirectError()) : c(t.HttpExecutor.prepareRedirectUrlOptions(h, s));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(rl);
var zn = {}, et = {}, Zp = "[object Symbol]", nl = /[\\^$.*+?()[\]{}|]/g, Jp = RegExp(nl.source), em = typeof De == "object" && De && De.Object === Object && De, tm = typeof self == "object" && self && self.Object === Object && self, rm = em || tm || Function("return this")(), nm = Object.prototype, im = nm.toString, ea = rm.Symbol, ta = ea ? ea.prototype : void 0, ra = ta ? ta.toString : void 0;
function om(e) {
  if (typeof e == "string")
    return e;
  if (am(e))
    return ra ? ra.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function sm(e) {
  return !!e && typeof e == "object";
}
function am(e) {
  return typeof e == "symbol" || sm(e) && im.call(e) == Zp;
}
function fm(e) {
  return e == null ? "" : om(e);
}
function lm(e) {
  return e = fm(e), e && Jp.test(e) ? e.replace(nl, "\\$&") : e;
}
var cm = lm;
Object.defineProperty(et, "__esModule", { value: !0 });
et.newBaseUrl = hm;
et.newUrlFromBase = y2;
et.getChannelFilename = dm;
et.blockmapFiles = pm;
const il = xr, um = cm;
function hm(e) {
  const t = new il.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function y2(e, t, r = !1) {
  const n = new il.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function dm(e) {
  return `${e}.yml`;
}
function pm(e, t, r) {
  const n = y2(`${e.pathname}.blockmap`, e);
  return [y2(`${e.pathname.replace(new RegExp(um(r), "g"), t)}.blockmap`, e), n];
}
var pe = {};
Object.defineProperty(pe, "__esModule", { value: !0 });
pe.Provider = void 0;
pe.findFile = xm;
pe.parseUpdateInfo = Em;
pe.getFileList = ol;
pe.resolveFiles = gm;
const Wt = Ee, mm = ve, na = et;
class _m {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, Wt.configureRequestUrl)(t, n), n;
  }
}
pe.Provider = _m;
function xm(e, t, r) {
  if (e.length === 0)
    throw (0, Wt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const n = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return n ?? (r == null ? e[0] : e.find((i) => !r.some((o) => i.url.pathname.toLowerCase().endsWith(`.${o}`))));
}
function Em(e, t, r) {
  if (e == null)
    throw (0, Wt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, mm.load)(e);
  } catch (i) {
    throw (0, Wt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function ol(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, Wt.newError)(`No files provided: ${(0, Wt.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function gm(e, t, r = (n) => n) {
  const i = ol(e).map((a) => {
    if (a.sha2 == null && a.sha512 == null)
      throw (0, Wt.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, Wt.safeStringifyJson)(a)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, na.newUrlFromBase)(r(a.url), t),
      info: a
    };
  }), o = e.packages, s = o == null ? null : o[process.arch] || o.ia32;
  return s != null && (i[0].packageInfo = {
    ...s,
    path: (0, na.newUrlFromBase)(r(s.path), t).href
  }), i;
}
Object.defineProperty(zn, "__esModule", { value: !0 });
zn.GenericProvider = void 0;
const ia = Ee, l0 = et, c0 = pe;
class Cm extends c0.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, l0.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, l0.getChannelFilename)(this.channel), r = (0, l0.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, c0.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof ia.HttpError && i.statusCode === 404)
          throw (0, ia.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((o, s) => {
            try {
              setTimeout(o, 1e3 * n);
            } catch (a) {
              s(a);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, c0.resolveFiles)(t, this.baseUrl);
  }
}
zn.GenericProvider = Cm;
var vi = {}, Ai = {};
Object.defineProperty(Ai, "__esModule", { value: !0 });
Ai.BitbucketProvider = void 0;
const oa = Ee, u0 = et, h0 = pe;
class bm extends h0.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, u0.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new oa.CancellationToken(), r = (0, u0.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, u0.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, h0.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, oa.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, h0.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
Ai.BitbucketProvider = bm;
var qt = {};
Object.defineProperty(qt, "__esModule", { value: !0 });
qt.GitHubProvider = qt.BaseGitHubProvider = void 0;
qt.computeReleaseNotes = al;
const gt = Ee, Lr = tl, ym = xr, Fr = et, T2 = pe, d0 = /\/tag\/([^/]+)$/;
class sl extends T2.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Fr.newBaseUrl)((0, gt.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, Fr.newBaseUrl)((0, gt.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
qt.BaseGitHubProvider = sl;
class Tm extends sl {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, o;
    const s = new gt.CancellationToken(), a = await this.httpRequest((0, Fr.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, s), f = (0, gt.parseXml)(a);
    let c = f.element("entry", !1, "No published versions on GitHub"), l = null;
    try {
      if (this.updater.allowPrerelease) {
        const x = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = Lr.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (x === null)
          l = d0.exec(c.element("link").attribute("href"))[1];
        else
          for (const y of f.getElements("entry")) {
            const b = d0.exec(y.element("link").attribute("href"));
            if (b === null)
              continue;
            const w = b[1], T = ((n = Lr.prerelease(w)) === null || n === void 0 ? void 0 : n[0]) || null, L = !x || ["alpha", "beta"].includes(x), G = T !== null && !["alpha", "beta"].includes(String(T));
            if (L && !G && !(x === "beta" && T === "alpha")) {
              l = w;
              break;
            }
            if (T && T === x) {
              l = w;
              break;
            }
          }
      } else {
        l = await this.getLatestTagName(s);
        for (const x of f.getElements("entry"))
          if (d0.exec(x.element("link").attribute("href"))[1] === l) {
            c = x;
            break;
          }
      }
    } catch (x) {
      throw (0, gt.newError)(`Cannot parse releases feed: ${x.stack || x.message},
XML:
${a}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (l == null)
      throw (0, gt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, h = "", d = "";
    const _ = async (x) => {
      h = (0, Fr.getChannelFilename)(x), d = (0, Fr.newUrlFromBase)(this.getBaseDownloadPath(String(l), h), this.baseUrl);
      const y = this.createRequestOptions(d);
      try {
        return await this.executor.request(y, s);
      } catch (b) {
        throw b instanceof gt.HttpError && b.statusCode === 404 ? (0, gt.newError)(`Cannot find ${h} in the latest release artifacts (${d}): ${b.stack || b.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : b;
      }
    };
    try {
      let x = this.channel;
      this.updater.allowPrerelease && (!((i = Lr.prerelease(l)) === null || i === void 0) && i[0]) && (x = this.getCustomChannelName(String((o = Lr.prerelease(l)) === null || o === void 0 ? void 0 : o[0]))), u = await _(x);
    } catch (x) {
      if (this.updater.allowPrerelease)
        u = await _(this.getDefaultChannelName());
      else
        throw x;
    }
    const p = (0, T2.parseUpdateInfo)(u, h, d);
    return p.releaseName == null && (p.releaseName = c.elementValueOrEmpty("title")), p.releaseNotes == null && (p.releaseNotes = al(this.updater.currentVersion, this.updater.fullChangelog, f, c)), {
      tag: l,
      ...p
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, Fr.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new ym.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, gt.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, T2.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
qt.GitHubProvider = Tm;
function sa(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function al(e, t, r, n) {
  if (!t)
    return sa(n);
  const i = [];
  for (const o of r.getElements("entry")) {
    const s = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
    Lr.lt(e, s) && i.push({
      version: s,
      note: sa(o)
    });
  }
  return i.sort((o, s) => Lr.rcompare(o.version, s.version));
}
var wi = {};
Object.defineProperty(wi, "__esModule", { value: !0 });
wi.KeygenProvider = void 0;
const aa = Ee, p0 = et, m0 = pe;
class vm extends m0.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, p0.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new aa.CancellationToken(), r = (0, p0.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, p0.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, m0.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, aa.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, m0.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
wi.KeygenProvider = vm;
var Pi = {};
Object.defineProperty(Pi, "__esModule", { value: !0 });
Pi.PrivateGitHubProvider = void 0;
const wr = Ee, Am = ve, wm = ne, fa = xr, la = et, Pm = qt, Sm = pe;
class Om extends Pm.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new wr.CancellationToken(), r = (0, la.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((a) => a.name === r);
    if (i == null)
      throw (0, wr.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new fa.URL(i.url);
    let s;
    try {
      s = (0, Am.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (a) {
      throw a instanceof wr.HttpError && a.statusCode === 404 ? (0, wr.newError)(`Cannot find ${r} in the latest release artifacts (${o}): ${a.stack || a.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : a;
    }
    return s.assets = n.assets, s;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, la.newUrlFromBase)(n, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? o.find((s) => s.prerelease) || o[0] : o;
    } catch (o) {
      throw (0, wr.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, Sm.getFileList)(t).map((r) => {
      const n = wm.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === n);
      if (i == null)
        throw (0, wr.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new fa.URL(i.url),
        info: r
      };
    });
  }
}
Pi.PrivateGitHubProvider = Om;
Object.defineProperty(vi, "__esModule", { value: !0 });
vi.isUrlProbablySupportMultiRangeRequests = fl;
vi.createClient = Nm;
const T1 = Ee, Im = Ai, ca = zn, Rm = qt, Bm = wi, Dm = Pi;
function fl(e) {
  return !e.includes("s3.amazonaws.com");
}
function Nm(e, t, r) {
  if (typeof e == "string")
    throw (0, T1.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new Rm.GitHubProvider(i, t, r) : new Dm.PrivateGitHubProvider(i, t, o, r);
    }
    case "bitbucket":
      return new Im.BitbucketProvider(e, t, r);
    case "keygen":
      return new Bm.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new ca.GenericProvider({
        provider: "generic",
        url: (0, T1.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new ca.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && fl(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, T1.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, r);
    }
    default:
      throw (0, T1.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var Si = {}, Qn = {}, Zr = {}, Cr = {};
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.OperationKind = void 0;
Cr.computeOperations = Lm;
var hr;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(hr || (Cr.OperationKind = hr = {}));
function Lm(e, t, r) {
  const n = ha(e.files), i = ha(t.files);
  let o = null;
  const s = t.files[0], a = [], f = s.name, c = n.get(f);
  if (c == null)
    throw new Error(`no file ${f} in old blockmap`);
  const l = i.get(f);
  let u = 0;
  const { checksumToOffset: h, checksumToOldSize: d } = $m(n.get(f), c.offset, r);
  let _ = s.offset;
  for (let p = 0; p < l.checksums.length; _ += l.sizes[p], p++) {
    const x = l.sizes[p], y = l.checksums[p];
    let b = h.get(y);
    b != null && d.get(y) !== x && (r.warn(`Checksum ("${y}") matches, but size differs (old: ${d.get(y)}, new: ${x})`), b = void 0), b === void 0 ? (u++, o != null && o.kind === hr.DOWNLOAD && o.end === _ ? o.end += x : (o = {
      kind: hr.DOWNLOAD,
      start: _,
      end: _ + x
      // oldBlocks: null,
    }, ua(o, a, y, p))) : o != null && o.kind === hr.COPY && o.end === b ? o.end += x : (o = {
      kind: hr.COPY,
      start: b,
      end: b + x
      // oldBlocks: [checksum]
    }, ua(o, a, y, p));
  }
  return u > 0 && r.info(`File${s.name === "file" ? "" : " " + s.name} has ${u} changed blocks`), a;
}
const Fm = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function ua(e, t, r, n) {
  if (Fm && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((s, a) => s < a ? s : a);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${hr[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function $m(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let s = 0; s < e.checksums.length; s++) {
    const a = e.checksums[s], f = e.sizes[s], c = i.get(a);
    if (c === void 0)
      n.set(a, o), i.set(a, f);
    else if (r.debug != null) {
      const l = c === f ? "(same size)" : `(size: ${c}, this size: ${f})`;
      r.debug(`${a} duplicated in blockmap ${l}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += f;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function ha(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.DataSplitter = void 0;
Zr.copyData = ll;
const v1 = Ee, Um = Ie, km = Ve, Mm = Cr, da = Buffer.from(`\r
\r
`);
var Rt;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(Rt || (Rt = {}));
function ll(e, t, r, n, i) {
  const o = (0, Um.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  o.on("error", n), o.once("end", i), o.pipe(t, {
    end: !1
  });
}
class Gm extends km.Writable {
  constructor(t, r, n, i, o, s) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = o, this.finishHandler = s, this.partIndex = -1, this.headerListBuffer = null, this.readState = Rt.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(n).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, v1.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === Rt.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = Rt.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === Rt.BODY)
          this.readState = Rt.INIT;
        else {
          this.partIndex++;
          let s = this.partIndexToTaskIndex.get(this.partIndex);
          if (s == null)
            if (this.isFinished)
              s = this.options.end;
            else
              throw (0, v1.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (a < s)
            await this.copyExistingData(a, s);
          else if (a > s)
            throw (0, v1.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = Rt.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, o = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, o), this.remainingPartDataCount = n - (o - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const o = () => {
        if (t === r) {
          n();
          return;
        }
        const s = this.options.tasks[t];
        if (s.kind !== Mm.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        ll(s, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(da, r);
    if (n !== -1)
      return n + da.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, v1.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((o, s) => {
      i.on("error", s), i.once("drain", () => {
        i.removeListener("error", s), o();
      });
    });
  }
}
Zr.DataSplitter = Gm;
var Oi = {};
Object.defineProperty(Oi, "__esModule", { value: !0 });
Oi.executeTasksUsingMultipleRangeRequests = Hm;
Oi.checkIsRangesSupported = A2;
const v2 = Ee, pa = Zr, ma = Cr;
function Hm(e, t, r, n, i) {
  const o = (s) => {
    if (s >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const a = s + 1e3;
    Wm(e, {
      tasks: t,
      start: s,
      end: Math.min(t.length, a),
      oldFileFd: n
    }, r, () => o(a), i);
  };
  return o;
}
function Wm(e, t, r, n, i) {
  let o = "bytes=", s = 0;
  const a = /* @__PURE__ */ new Map(), f = [];
  for (let u = t.start; u < t.end; u++) {
    const h = t.tasks[u];
    h.kind === ma.OperationKind.DOWNLOAD && (o += `${h.start}-${h.end - 1}, `, a.set(s, u), s++, f.push(h.end - h.start));
  }
  if (s <= 1) {
    const u = (h) => {
      if (h >= t.end) {
        n();
        return;
      }
      const d = t.tasks[h++];
      if (d.kind === ma.OperationKind.COPY)
        (0, pa.copyData)(d, r, t.oldFileFd, i, () => u(h));
      else {
        const _ = e.createRequestOptions();
        _.headers.Range = `bytes=${d.start}-${d.end - 1}`;
        const p = e.httpExecutor.createRequest(_, (x) => {
          A2(x, i) && (x.pipe(r, {
            end: !1
          }), x.once("end", () => u(h)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(p, i), p.end();
      }
    };
    u(t.start);
    return;
  }
  const c = e.createRequestOptions();
  c.headers.Range = o.substring(0, o.length - 2);
  const l = e.httpExecutor.createRequest(c, (u) => {
    if (!A2(u, i))
      return;
    const h = (0, v2.safeGetHeader)(u, "content-type"), d = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(h);
    if (d == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${h}"`));
      return;
    }
    const _ = new pa.DataSplitter(r, t, a, d[1] || d[2], f, n);
    _.on("error", i), u.pipe(_), u.on("end", () => {
      setTimeout(() => {
        l.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(l, i), l.end();
}
function A2(e, t) {
  if (e.statusCode >= 400)
    return t((0, v2.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, v2.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var Ii = {};
Object.defineProperty(Ii, "__esModule", { value: !0 });
Ii.ProgressDifferentialDownloadCallbackTransform = void 0;
const qm = Ve;
var $r;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})($r || ($r = {}));
class jm extends qm.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = $r.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == $r.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = $r.COPY;
  }
  beginRangeDownload() {
    this.operationType = $r.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
Ii.ProgressDifferentialDownloadCallbackTransform = jm;
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.DifferentialDownloader = void 0;
const un = Ee, _0 = Kt, Vm = Ie, Km = Zr, Xm = xr, A1 = Cr, _a = Oi, Ym = Ii;
class zm {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, un.configureRequestUrl)(this.options.newUrl, t), (0, un.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, A1.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let o = 0, s = 0;
    for (const f of i) {
      const c = f.end - f.start;
      f.kind === A1.OperationKind.DOWNLOAD ? o += c : s += c;
    }
    const a = this.blockAwareFileInfo.size;
    if (o + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${s}, newSize: ${a}`);
    return n.info(`Full: ${xa(a)}, To download: ${xa(o)} (${Math.round(o / (a / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, _0.close)(i.descriptor).catch((o) => {
      this.logger.error(`cannot close file "${i.path}": ${o}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((o) => {
      try {
        this.logger.error(`cannot close files: ${o}`);
      } catch (s) {
        try {
          console.error(s);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, _0.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, _0.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const o = (0, Vm.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((s, a) => {
      const f = [];
      let c;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const y = [];
        let b = 0;
        for (const T of t)
          T.kind === A1.OperationKind.DOWNLOAD && (y.push(T.end - T.start), b += T.end - T.start);
        const w = {
          expectedByteCounts: y,
          grandTotal: b
        };
        c = new Ym.ProgressDifferentialDownloadCallbackTransform(w, this.options.cancellationToken, this.options.onProgress), f.push(c);
      }
      const l = new un.DigestTransform(this.blockAwareFileInfo.sha512);
      l.isValidateOnEnd = !1, f.push(l), o.on("finish", () => {
        o.close(() => {
          r.splice(1, 1);
          try {
            l.validate();
          } catch (y) {
            a(y);
            return;
          }
          s(void 0);
        });
      }), f.push(o);
      let u = null;
      for (const y of f)
        y.on("error", a), u == null ? u = y : u = u.pipe(y);
      const h = f[0];
      let d;
      if (this.options.isUseMultipleRangeRequest) {
        d = (0, _a.executeTasksUsingMultipleRangeRequests)(this, t, h, n, a), d(0);
        return;
      }
      let _ = 0, p = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const x = this.createRequestOptions();
      x.redirect = "manual", d = (y) => {
        var b, w;
        if (y >= t.length) {
          this.fileMetadataBuffer != null && h.write(this.fileMetadataBuffer), h.end();
          return;
        }
        const T = t[y++];
        if (T.kind === A1.OperationKind.COPY) {
          c && c.beginFileCopy(), (0, Km.copyData)(T, h, n, a, () => d(y));
          return;
        }
        const L = `bytes=${T.start}-${T.end - 1}`;
        x.headers.range = L, (w = (b = this.logger) === null || b === void 0 ? void 0 : b.debug) === null || w === void 0 || w.call(b, `download range: ${L}`), c && c.beginRangeDownload();
        const G = this.httpExecutor.createRequest(x, (H) => {
          H.on("error", a), H.on("aborted", () => {
            a(new Error("response has been aborted by the server"));
          }), H.statusCode >= 400 && a((0, un.createHttpError)(H)), H.pipe(h, {
            end: !1
          }), H.once("end", () => {
            c && c.endRangeDownload(), ++_ === 100 ? (_ = 0, setTimeout(() => d(y), 1e3)) : d(y);
          });
        });
        G.on("redirect", (H, Q, C) => {
          this.logger.info(`Redirect to ${Qm(C)}`), p = C, (0, un.configureRequestUrl)(new Xm.URL(p), x), G.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(G, a), G.end();
      }, d(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let o = 0;
    if (await this.request(i, (s) => {
      s.copy(n, o), o += s.length;
    }), o !== n.length)
      throw new Error(`Received data length ${o} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const o = this.httpExecutor.createRequest(t, (s) => {
        (0, _a.checkIsRangesSupported)(s, i) && (s.on("error", i), s.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), s.on("data", r), s.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
Qn.DifferentialDownloader = zm;
function xa(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function Qm(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(Si, "__esModule", { value: !0 });
Si.GenericDifferentialDownloader = void 0;
const Zm = Qn;
class Jm extends Zm.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
Si.GenericDifferentialDownloader = Jm;
var Xt = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
  const t = Ee;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class r {
    constructor(o) {
      this.emitter = o;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(o) {
      n(this.emitter, "login", o);
    }
    progress(o) {
      n(this.emitter, e.DOWNLOAD_PROGRESS, o);
    }
    updateDownloaded(o) {
      n(this.emitter, e.UPDATE_DOWNLOADED, o);
    }
    updateCancelled(o) {
      n(this.emitter, "update-cancelled", o);
    }
  }
  e.UpdaterSignal = r;
  function n(i, o, s) {
    i.on(o, s);
  }
})(Xt);
Object.defineProperty(Mt, "__esModule", { value: !0 });
Mt.NoOpLogger = Mt.AppUpdater = void 0;
const Be = Ee, e_ = jt, t_ = Hn, r_ = fi, Pr = Kt, n_ = ve, x0 = xi, nr = ne, fr = tl, Ea = Yn, i_ = Ti, ga = rl, o_ = zn, E0 = vi, s_ = Vt, a_ = et, f_ = Si, Sr = Xt;
class co extends r_.EventEmitter {
  /**
   * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
   */
  get channel() {
    return this._channel;
  }
  /**
   * Set the update channel. Overrides `channel` in the update configuration.
   *
   * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
   */
  set channel(t) {
    if (this._channel != null) {
      if (typeof t != "string")
        throw (0, Be.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, Be.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = t, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(t) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: t
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, ga.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new cl();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new x0.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(t) {
    t && (this._isUpdateSupported = t);
  }
  constructor(t, r) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new Sr.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (o) => this.checkIfUpdateSupported(o), this.clientPromise = null, this.stagingUserIdPromise = new x0.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new x0.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (o) => {
      this._logger.error(`Error: ${o.stack || o.message}`);
    }), r == null ? (this.app = new i_.ElectronAppAdapter(), this.httpExecutor = new ga.ElectronHttpExecutor((o, s) => this.emit("login", o, s))) : (this.app = r, this.httpExecutor = null);
    const n = this.app.version, i = (0, fr.parse)(n);
    if (i == null)
      throw (0, Be.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = l_(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(t) {
    const r = this.createProviderRuntimeOptions();
    let n;
    typeof t == "string" ? n = new o_.GenericProvider({ provider: "generic", url: t }, this, {
      ...r,
      isUseMultipleRangeRequest: (0, E0.isUrlProbablySupportMultiRangeRequests)(t)
    }) : n = (0, E0.createClient)(t, this, r), this.clientPromise = Promise.resolve(n);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let t = this.checkForUpdatesPromise;
    if (t != null)
      return this._logger.info("Checking for update (already in progress)"), t;
    const r = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((n) => (r(), n)).catch((n) => {
      throw r(), this.emit("error", n, `Cannot check for updates: ${(n.stack || n).toString()}`), n;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((r) => r != null && r.downloadPromise ? (r.downloadPromise.then(() => {
      const n = co.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
      new mr.Notification(n).show();
    }), r) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), r));
  }
  static formatDownloadNotification(t, r, n) {
    return n == null && (n = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), n = {
      title: n.title.replace("{appName}", r).replace("{version}", t),
      body: n.body.replace("{appName}", r).replace("{version}", t)
    }, n;
  }
  async isStagingMatch(t) {
    const r = t.stagingPercentage;
    let n = r;
    if (n == null)
      return !0;
    if (n = parseInt(n, 10), isNaN(n))
      return this._logger.warn(`Staging percentage is NaN: ${r}`), !0;
    n = n / 100;
    const i = await this.stagingUserIdPromise.value, s = Be.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${n}, percentage: ${s}, user id: ${i}`), s < n;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const r = (0, fr.parse)(t.version);
    if (r == null)
      throw (0, Be.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const n = this.currentVersion;
    if ((0, fr.eq)(r, n) || !await Promise.resolve(this.isUpdateSupported(t)) || !await this.isStagingMatch(t))
      return !1;
    const o = (0, fr.gt)(r, n), s = (0, fr.lt)(r, n);
    return o ? !0 : this.allowDowngrade && s;
  }
  checkIfUpdateSupported(t) {
    const r = t == null ? void 0 : t.minimumSystemVersion, n = (0, t_.release)();
    if (r)
      try {
        if ((0, fr.lt)(n, r))
          return this._logger.info(`Current OS version ${n} is less than the minimum OS version required ${r} for version ${n}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${n}) with minimum OS version(${r}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((n) => (0, E0.createClient)(n, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, r = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": r })), {
      info: await t.getLatestVersion(),
      provider: t
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: !0,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const t = await this.getUpdateInfoAndProvider(), r = t.info;
    if (!await this.isUpdateAvailable(r))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${r.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", r), {
        isUpdateAvailable: !1,
        versionInfo: r,
        updateInfo: r
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(r);
    const n = new Be.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: r,
      updateInfo: r,
      cancellationToken: n,
      downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, Be.asArray)(t.files).map((r) => r.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new Be.CancellationToken()) {
    const r = this.updateInfoAndProvider;
    if (r == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, Be.asArray)(r.info.files).map((i) => i.url).join(", ")}`);
    const n = (i) => {
      if (!(i instanceof Be.CancellationError))
        try {
          this.dispatchError(i);
        } catch (o) {
          this._logger.warn(`Cannot dispatch error event: ${o.stack || o}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: r,
      requestHeaders: this.computeRequestHeaders(r.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw n(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(Sr.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, n_.load)(await (0, Pr.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const r = t.fileExtraDownloadHeaders;
    if (r != null) {
      const n = this.requestHeaders;
      return n == null ? r : {
        ...r,
        ...n
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = nr.join(this.app.userDataPath, ".updaterId");
    try {
      const n = await (0, Pr.readFile)(t, "utf-8");
      if (Be.UUID.check(n))
        return n;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
    } catch (n) {
      n.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${n}`);
    }
    const r = Be.UUID.v5((0, e_.randomBytes)(4096), Be.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${r}`);
    try {
      await (0, Pr.outputFile)(t, r);
    } catch (n) {
      this._logger.warn(`Couldn't write out staging user ID: ${n}`);
    }
    return r;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const r of Object.keys(t)) {
      const n = r.toLowerCase();
      if (n === "authorization" || n === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const r = (await this.configOnDisk.value).updaterCacheDirName, n = this._logger;
      r == null && n.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = nr.join(this.app.baseCachePath, r || this.app.name);
      n.debug != null && n.debug(`updater cache dir: ${i}`), t = new Ea.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const r = t.fileInfo, n = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: r.info.sha2,
      sha512: r.info.sha512
    };
    this.listenerCount(Sr.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (b) => this.emit(Sr.DOWNLOAD_PROGRESS, b));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, o = i.version, s = r.packageInfo;
    function a() {
      const b = decodeURIComponent(t.fileInfo.url.pathname);
      return b.endsWith(`.${t.fileExtension}`) ? nr.basename(b) : t.fileInfo.info.url;
    }
    const f = await this.getOrCreateDownloadHelper(), c = f.cacheDirForPendingUpdate;
    await (0, Pr.mkdir)(c, { recursive: !0 });
    const l = a();
    let u = nr.join(c, l);
    const h = s == null ? null : nr.join(c, `package-${o}${nr.extname(s.path) || ".7z"}`), d = async (b) => (await f.setDownloadedFile(u, h, i, r, l, b), await t.done({
      ...i,
      downloadedFile: u
    }), h == null ? [u] : [u, h]), _ = this._logger, p = await f.validateDownloadedPath(u, i, r, _);
    if (p != null)
      return u = p, await d(!1);
    const x = async () => (await f.clear().catch(() => {
    }), await (0, Pr.unlink)(u).catch(() => {
    })), y = await (0, Ea.createTempUpdateFile)(`temp-${l}`, c, _);
    try {
      await t.task(y, n, h, x), await (0, Be.retry)(() => (0, Pr.rename)(y, u), 60, 500, 0, 0, (b) => b instanceof Error && /^EBUSY:/.test(b.message));
    } catch (b) {
      throw await x(), b instanceof Be.CancellationError && (_.info("cancelled"), this.emit("update-cancelled", i)), b;
    }
    return _.info(`New version ${o} has been downloaded to ${u}`), await d(!0);
  }
  async differentialDownloadInstaller(t, r, n, i, o) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const s = (0, a_.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
      this._logger.info(`Download block maps (old: "${s[0]}", new: ${s[1]})`);
      const a = async (l) => {
        const u = await this.httpExecutor.downloadToBuffer(l, {
          headers: r.requestHeaders,
          cancellationToken: r.cancellationToken
        });
        if (u == null || u.length === 0)
          throw new Error(`Blockmap "${l.href}" is empty`);
        try {
          return JSON.parse((0, s_.gunzipSync)(u).toString());
        } catch (h) {
          throw new Error(`Cannot parse blockmap "${l.href}", error: ${h}`);
        }
      }, f = {
        newUrl: t.url,
        oldFile: nr.join(this.downloadedUpdateHelper.cacheDir, o),
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: r.requestHeaders,
        cancellationToken: r.cancellationToken
      };
      this.listenerCount(Sr.DOWNLOAD_PROGRESS) > 0 && (f.onProgress = (l) => this.emit(Sr.DOWNLOAD_PROGRESS, l));
      const c = await Promise.all(s.map((l) => a(l)));
      return await new f_.GenericDifferentialDownloader(t.info, this.httpExecutor, f).download(c[0], c[1]), !1;
    } catch (s) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), this._testOnlyOptions != null)
        throw s;
      return !0;
    }
  }
}
Mt.AppUpdater = co;
function l_(e) {
  const t = (0, fr.prerelease)(e);
  return t != null && t.length > 0;
}
class cl {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(t) {
  }
}
Mt.NoOpLogger = cl;
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.BaseUpdater = void 0;
const Ca = ai, c_ = Mt;
class u_ extends c_.AppUpdater {
  constructor(t, r) {
    super(t, r), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, r = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? r : this.autoRunAppAfterInstall) ? setImmediate(() => {
      mr.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (r) => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, r = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const n = this.downloadedUpdateHelper, i = this.installerPath, o = n == null ? null : n.downloadedFileInfo;
    if (i == null || o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${r}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: r,
        isAdminRightsRequired: o.isAdminRightsRequired
      });
    } catch (s) {
      return this.dispatchError(s), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (t !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  wrapSudo() {
    const { name: t } = this.app, r = `"${t} would like to update"`, n = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), i = [n];
    return /kdesudo/i.test(n) ? (i.push("--comment", r), i.push("-c")) : /gksudo/i.test(n) ? i.push("--message", r) : /pkexec/i.test(n) && i.push("--disable-internal-agent"), i.join(" ");
  }
  spawnSyncLog(t, r = [], n = {}) {
    this._logger.info(`Executing: ${t} with args: ${r}`);
    const i = (0, Ca.spawnSync)(t, r, {
      env: { ...process.env, ...n },
      encoding: "utf-8",
      shell: !0
    }), { error: o, status: s, stdout: a, stderr: f } = i;
    if (o != null)
      throw this._logger.error(f), o;
    if (s != null && s !== 0)
      throw this._logger.error(f), new Error(`Command ${t} exited with code ${s}`);
    return a.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, r = [], n = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${r}`), new Promise((o, s) => {
      try {
        const a = { stdio: i, env: n, detached: !0 }, f = (0, Ca.spawn)(t, r, a);
        f.on("error", (c) => {
          s(c);
        }), f.unref(), f.pid !== void 0 && o(!0);
      } catch (a) {
        s(a);
      }
    });
  }
}
Tt.BaseUpdater = u_;
var Fn = {}, Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Or = Kt, h_ = Qn, d_ = Vt;
class p_ extends h_.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = ul(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await m_(this.options.oldFile), i);
  }
}
Zn.FileWithEmbeddedBlockMapDifferentialDownloader = p_;
function ul(e) {
  return JSON.parse((0, d_.inflateRawSync)(e).toString());
}
async function m_(e) {
  const t = await (0, Or.open)(e, "r");
  try {
    const r = (await (0, Or.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, Or.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, Or.read)(t, i, 0, i.length, r - n.length - i.length), await (0, Or.close)(t), ul(i);
  } catch (r) {
    throw await (0, Or.close)(t), r;
  }
}
Object.defineProperty(Fn, "__esModule", { value: !0 });
Fn.AppImageUpdater = void 0;
const ba = Ee, ya = ai, __ = Kt, x_ = Ie, hn = ne, E_ = Tt, g_ = Zn, C_ = pe, Ta = Xt;
class b_ extends E_.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, C_.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        const s = process.env.APPIMAGE;
        if (s == null)
          throw (0, ba.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(n, s, i, r, t)) && await this.httpExecutor.download(n.url, i, o), await (0, __.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, r, n, i, o) {
    try {
      const s = {
        newUrl: t.url,
        oldFile: r,
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: o.requestHeaders,
        cancellationToken: o.cancellationToken
      };
      return this.listenerCount(Ta.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(Ta.DOWNLOAD_PROGRESS, a)), await new g_.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, s).download(), !1;
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const r = process.env.APPIMAGE;
    if (r == null)
      throw (0, ba.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, x_.unlinkSync)(r);
    let n;
    const i = hn.basename(r), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    hn.basename(o) === i || !/\d+\.\d+\.\d+/.test(i) ? n = r : n = hn.join(hn.dirname(r), hn.basename(o)), (0, ya.execFileSync)("mv", ["-f", o, n]), n !== r && this.emit("appimage-filename-updated", n);
    const s = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(n, [], s) : (s.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, ya.execFileSync)(n, [], { env: s })), !0;
  }
}
Fn.AppImageUpdater = b_;
var $n = {};
Object.defineProperty($n, "__esModule", { value: !0 });
$n.DebUpdater = void 0;
const y_ = Tt, T_ = pe, va = Xt;
class v_ extends y_.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, T_.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(va.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(va.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.installerPath;
    if (i == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const o = ["dpkg", "-i", i, "||", "apt-get", "install", "-f", "-y"];
    return this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${o.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
$n.DebUpdater = v_;
var Un = {};
Object.defineProperty(Un, "__esModule", { value: !0 });
Un.PacmanUpdater = void 0;
const A_ = Tt, Aa = Xt, w_ = pe;
class P_ extends A_.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, w_.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Aa.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Aa.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.installerPath;
    if (i == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const o = ["pacman", "-U", "--noconfirm", i];
    return this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${o.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
Un.PacmanUpdater = P_;
var kn = {};
Object.defineProperty(kn, "__esModule", { value: !0 });
kn.RpmUpdater = void 0;
const S_ = Tt, wa = Xt, O_ = pe;
class I_ extends S_.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, O_.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(wa.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(wa.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.spawnSyncLog("which zypper"), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    let s;
    return i ? s = [i, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", o] : s = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", o], this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${s.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
kn.RpmUpdater = I_;
var Mn = {};
Object.defineProperty(Mn, "__esModule", { value: !0 });
Mn.MacUpdater = void 0;
const Pa = Ee, g0 = Kt, R_ = Ie, Sa = ne, B_ = D2, D_ = Mt, N_ = pe, Oa = ai, Ia = jt;
class L_ extends D_.AppUpdater {
  constructor(t, r) {
    super(t, r), this.nativeUpdater = mr.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (n) => {
      this._logger.warn(n), this.emit("error", n);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  debug(t) {
    this._logger.debug != null && this._logger.debug(t);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
      t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(t) {
    let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const n = this._logger, i = "sysctl.proc_translated";
    let o = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), o = (0, Oa.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), n.info(`Checked for macOS Rosetta environment (isRosetta=${o})`);
    } catch (u) {
      n.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${u}`);
    }
    let s = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const h = (0, Oa.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      n.info(`Checked 'uname -a': arm64=${h}`), s = s || h;
    } catch (u) {
      n.warn(`uname shell command to check for arm64 failed: ${u}`);
    }
    s = s || process.arch === "arm64" || o;
    const a = (u) => {
      var h;
      return u.url.pathname.includes("arm64") || ((h = u.info.url) === null || h === void 0 ? void 0 : h.includes("arm64"));
    };
    s && r.some(a) ? r = r.filter((u) => s === a(u)) : r = r.filter((u) => !a(u));
    const f = (0, N_.findFile)(r, "zip", ["pkg", "dmg"]);
    if (f == null)
      throw (0, Pa.newError)(`ZIP file not provided: ${(0, Pa.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const c = t.updateInfoAndProvider.provider, l = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: f,
      downloadUpdateOptions: t,
      task: async (u, h) => {
        const d = Sa.join(this.downloadedUpdateHelper.cacheDir, l), _ = () => (0, g0.pathExistsSync)(d) ? !t.disableDifferentialDownload : (n.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let p = !0;
        _() && (p = await this.differentialDownloadInstaller(f, t, u, c, l)), p && await this.httpExecutor.download(f.url, u, h);
      },
      done: async (u) => {
        if (!t.disableDifferentialDownload)
          try {
            const h = Sa.join(this.downloadedUpdateHelper.cacheDir, l);
            await (0, g0.copyFile)(u.downloadedFile, h);
          } catch (h) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${h.message}`);
          }
        return this.updateDownloaded(f, u);
      }
    });
  }
  async updateDownloaded(t, r) {
    var n;
    const i = r.downloadedFile, o = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, g0.stat)(i)).size, s = this._logger, a = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${a})`), this.server = (0, B_.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${a})`), this.server.on("close", () => {
      s.info(`Proxy server for native Squirrel.Mac is closed (${a})`);
    });
    const f = (c) => {
      const l = c.address();
      return typeof l == "string" ? l : `http://127.0.0.1:${l == null ? void 0 : l.port}`;
    };
    return await new Promise((c, l) => {
      const u = (0, Ia.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), h = Buffer.from(`autoupdater:${u}`, "ascii"), d = `/${(0, Ia.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (_, p) => {
        const x = _.url;
        if (s.info(`${x} requested`), x === "/") {
          if (!_.headers.authorization || _.headers.authorization.indexOf("Basic ") === -1) {
            p.statusCode = 401, p.statusMessage = "Invalid Authentication Credentials", p.end(), s.warn("No authenthication info");
            return;
          }
          const w = _.headers.authorization.split(" ")[1], T = Buffer.from(w, "base64").toString("ascii"), [L, G] = T.split(":");
          if (L !== "autoupdater" || G !== u) {
            p.statusCode = 401, p.statusMessage = "Invalid Authentication Credentials", p.end(), s.warn("Invalid authenthication credentials");
            return;
          }
          const H = Buffer.from(`{ "url": "${f(this.server)}${d}" }`);
          p.writeHead(200, { "Content-Type": "application/json", "Content-Length": H.length }), p.end(H);
          return;
        }
        if (!x.startsWith(d)) {
          s.warn(`${x} requested, but not supported`), p.writeHead(404), p.end();
          return;
        }
        s.info(`${d} requested by Squirrel.Mac, pipe ${i}`);
        let y = !1;
        p.on("finish", () => {
          y || (this.nativeUpdater.removeListener("error", l), c([]));
        });
        const b = (0, R_.createReadStream)(i);
        b.on("error", (w) => {
          try {
            p.end();
          } catch (T) {
            s.warn(`cannot end response: ${T}`);
          }
          y = !0, this.nativeUpdater.removeListener("error", l), l(new Error(`Cannot pipe "${i}": ${w}`));
        }), p.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": o
        }), b.pipe(p);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${a})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${f(this.server)}, ${a})`), this.nativeUpdater.setFeedURL({
          url: f(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${h.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", l), this.nativeUpdater.checkForUpdates()) : c([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
Mn.MacUpdater = L_;
var Gn = {}, uo = {};
Object.defineProperty(uo, "__esModule", { value: !0 });
uo.verifySignature = $_;
const Ra = Ee, hl = ai, F_ = Hn, Ba = ne;
function $_(e, t, r) {
  return new Promise((n, i) => {
    const o = t.replace(/'/g, "''");
    r.info(`Verifying signature ${o}`), (0, hl.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (s, a, f) => {
      var c;
      try {
        if (s != null || f) {
          C0(r, s, f, i), n(null);
          return;
        }
        const l = U_(a);
        if (l.Status === 0) {
          try {
            const _ = Ba.normalize(l.Path), p = Ba.normalize(t);
            if (r.info(`LiteralPath: ${_}. Update Path: ${p}`), _ !== p) {
              C0(r, new Error(`LiteralPath of ${_} is different than ${p}`), f, i), n(null);
              return;
            }
          } catch (_) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(c = _.message) !== null && c !== void 0 ? c : _.stack}`);
          }
          const h = (0, Ra.parseDn)(l.SignerCertificate.Subject);
          let d = !1;
          for (const _ of e) {
            const p = (0, Ra.parseDn)(_);
            if (p.size ? d = Array.from(p.keys()).every((y) => p.get(y) === h.get(y)) : _ === h.get("CN") && (r.warn(`Signature validated using only CN ${_}. Please add your full Distinguished Name (DN) to publisherNames configuration`), d = !0), d) {
              n(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(l, (h, d) => h === "RawData" ? void 0 : d, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), n(u);
      } catch (l) {
        C0(r, l, null, i), n(null);
        return;
      }
    });
  });
}
function U_(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function C0(e, t, r, n) {
  if (k_()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, hl.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function k_() {
  const e = F_.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(Gn, "__esModule", { value: !0 });
Gn.NsisUpdater = void 0;
const w1 = Ee, Da = ne, M_ = Tt, G_ = Zn, Na = Xt, H_ = pe, W_ = Kt, q_ = uo, La = xr;
class j_ extends M_.BaseUpdater {
  constructor(t, r) {
    super(t, r), this._verifyUpdateCodeSignature = (n, i) => (0, q_.verifySignature)(n, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(t) {
    t && (this._verifyUpdateCodeSignature = t);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, H_.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: n,
      task: async (i, o, s, a) => {
        const f = n.packageInfo, c = f != null && s != null;
        if (c && t.disableWebInstaller)
          throw (0, w1.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !c && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (c || t.disableDifferentialDownload || await this.differentialDownloadInstaller(n, t, i, r, w1.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(n.url, i, o);
        const l = await this.verifySignature(i);
        if (l != null)
          throw await a(), (0, w1.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${l}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (c && await this.differentialDownloadWebPackage(t, f, s, r))
          try {
            await this.httpExecutor.download(new La.URL(f.path), s, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: f.sha512
            });
          } catch (u) {
            try {
              await (0, W_.unlink)(s);
            } catch {
            }
            throw u;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let r;
    try {
      if (r = (await this.configOnDisk.value).publisherName, r == null)
        return null;
    } catch (n) {
      if (n.code === "ENOENT")
        return null;
      throw n;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const n = ["--updated"];
    t.isSilent && n.push("/S"), t.isForceRunAfter && n.push("--force-run"), this.installDirectory && n.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && n.push(`--package-file=${i}`);
    const o = () => {
      this.spawnLog(Da.join(process.resourcesPath, "elevate.exe"), [r].concat(n)).catch((s) => this.dispatchError(s));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), o(), !0) : (this.spawnLog(r, n).catch((s) => {
      const a = s.code;
      this._logger.info(`Cannot run installer: error code: ${a}, error message: "${s.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), a === "UNKNOWN" || a === "EACCES" ? o() : a === "ENOENT" ? mr.shell.openPath(r).catch((f) => this.dispatchError(f)) : this.dispatchError(s);
    }), !0);
  }
  async differentialDownloadWebPackage(t, r, n, i) {
    if (r.blockMapSize == null)
      return !0;
    try {
      const o = {
        newUrl: new La.URL(r.path),
        oldFile: Da.join(this.downloadedUpdateHelper.cacheDir, w1.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: n,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(Na.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Na.DOWNLOAD_PROGRESS, s)), await new G_.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, o).download();
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "win32";
    }
    return !1;
  }
}
Gn.NsisUpdater = j_;
(function(e) {
  var t = De && De.__createBinding || (Object.create ? function(x, y, b, w) {
    w === void 0 && (w = b);
    var T = Object.getOwnPropertyDescriptor(y, b);
    (!T || ("get" in T ? !y.__esModule : T.writable || T.configurable)) && (T = { enumerable: !0, get: function() {
      return y[b];
    } }), Object.defineProperty(x, w, T);
  } : function(x, y, b, w) {
    w === void 0 && (w = b), x[w] = y[b];
  }), r = De && De.__exportStar || function(x, y) {
    for (var b in x) b !== "default" && !Object.prototype.hasOwnProperty.call(y, b) && t(y, x, b);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const n = Kt, i = ne;
  var o = Tt;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return o.BaseUpdater;
  } });
  var s = Mt;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return s.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return s.NoOpLogger;
  } });
  var a = pe;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return a.Provider;
  } });
  var f = Fn;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return f.AppImageUpdater;
  } });
  var c = $n;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return c.DebUpdater;
  } });
  var l = Un;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return l.PacmanUpdater;
  } });
  var u = kn;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return u.RpmUpdater;
  } });
  var h = Mn;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return h.MacUpdater;
  } });
  var d = Gn;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return d.NsisUpdater;
  } }), r(Xt, e);
  let _;
  function p() {
    if (process.platform === "win32")
      _ = new Gn.NsisUpdater();
    else if (process.platform === "darwin")
      _ = new Mn.MacUpdater();
    else {
      _ = new Fn.AppImageUpdater();
      try {
        const x = i.join(process.resourcesPath, "package-type");
        if (!(0, n.existsSync)(x))
          return _;
        console.info("Checking for beta autoupdate feature for deb/rpm distributions");
        const y = (0, n.readFileSync)(x).toString().trim();
        switch (console.info("Found package-type:", y), y) {
          case "deb":
            _ = new $n.DebUpdater();
            break;
          case "rpm":
            _ = new kn.RpmUpdater();
            break;
          case "pacman":
            _ = new Un.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (x) {
        console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", x.message);
      }
    }
    return _;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => _ || p()
  });
})(Ne);
var br = {}, dl = { exports: {} }, pl = { exports: {} };
let V_ = yt, ml = Ve, ot = pl.exports = function() {
  ml.call(this), this._buffers = [], this._buffered = 0, this._reads = [], this._paused = !1, this._encoding = "utf8", this.writable = !0;
};
V_.inherits(ot, ml);
ot.prototype.read = function(e, t) {
  this._reads.push({
    length: Math.abs(e),
    // if length < 0 then at most this length
    allowLess: e < 0,
    func: t
  }), process.nextTick(
    (function() {
      this._process(), this._paused && this._reads && this._reads.length > 0 && (this._paused = !1, this.emit("drain"));
    }).bind(this)
  );
};
ot.prototype.write = function(e, t) {
  if (!this.writable)
    return this.emit("error", new Error("Stream not writable")), !1;
  let r;
  return Buffer.isBuffer(e) ? r = e : r = Buffer.from(e, t || this._encoding), this._buffers.push(r), this._buffered += r.length, this._process(), this._reads && this._reads.length === 0 && (this._paused = !0), this.writable && !this._paused;
};
ot.prototype.end = function(e, t) {
  e && this.write(e, t), this.writable = !1, this._buffers && (this._buffers.length === 0 ? this._end() : (this._buffers.push(null), this._process()));
};
ot.prototype.destroySoon = ot.prototype.end;
ot.prototype._end = function() {
  this._reads.length > 0 && this.emit("error", new Error("Unexpected end of input")), this.destroy();
};
ot.prototype.destroy = function() {
  this._buffers && (this.writable = !1, this._reads = null, this._buffers = null, this.emit("close"));
};
ot.prototype._processReadAllowingLess = function(e) {
  this._reads.shift();
  let t = this._buffers[0];
  t.length > e.length ? (this._buffered -= e.length, this._buffers[0] = t.slice(e.length), e.func.call(this, t.slice(0, e.length))) : (this._buffered -= t.length, this._buffers.shift(), e.func.call(this, t));
};
ot.prototype._processRead = function(e) {
  this._reads.shift();
  let t = 0, r = 0, n = Buffer.alloc(e.length);
  for (; t < e.length; ) {
    let i = this._buffers[r++], o = Math.min(i.length, e.length - t);
    i.copy(n, t, 0, o), t += o, o !== i.length && (this._buffers[--r] = i.slice(o));
  }
  r > 0 && this._buffers.splice(0, r), this._buffered -= e.length, e.func.call(this, n);
};
ot.prototype._process = function() {
  try {
    for (; this._buffered > 0 && this._reads && this._reads.length > 0; ) {
      let e = this._reads[0];
      if (e.allowLess)
        this._processReadAllowingLess(e);
      else if (this._buffered >= e.length)
        this._processRead(e);
      else
        break;
    }
    this._buffers && !this.writable && this._end();
  } catch (e) {
    this.emit("error", e);
  }
};
var _l = pl.exports, xl = { exports: {} }, El = { exports: {} }, Ri = {};
let Bt = [
  {
    // pass 1 - 1px
    x: [0],
    y: [0]
  },
  {
    // pass 2 - 1px
    x: [4],
    y: [0]
  },
  {
    // pass 3 - 2px
    x: [0, 4],
    y: [4]
  },
  {
    // pass 4 - 4px
    x: [2, 6],
    y: [0, 4]
  },
  {
    // pass 5 - 8px
    x: [0, 2, 4, 6],
    y: [2, 6]
  },
  {
    // pass 6 - 16px
    x: [1, 3, 5, 7],
    y: [0, 2, 4, 6]
  },
  {
    // pass 7 - 32px
    x: [0, 1, 2, 3, 4, 5, 6, 7],
    y: [1, 3, 5, 7]
  }
];
Ri.getImagePasses = function(e, t) {
  let r = [], n = e % 8, i = t % 8, o = (e - n) / 8, s = (t - i) / 8;
  for (let a = 0; a < Bt.length; a++) {
    let f = Bt[a], c = o * f.x.length, l = s * f.y.length;
    for (let u = 0; u < f.x.length && f.x[u] < n; u++)
      c++;
    for (let u = 0; u < f.y.length && f.y[u] < i; u++)
      l++;
    c > 0 && l > 0 && r.push({ width: c, height: l, index: a });
  }
  return r;
};
Ri.getInterlaceIterator = function(e) {
  return function(t, r, n) {
    let i = t % Bt[n].x.length, o = (t - i) / Bt[n].x.length * 8 + Bt[n].x[i], s = r % Bt[n].y.length, a = (r - s) / Bt[n].y.length * 8 + Bt[n].y[s];
    return o * 4 + a * e * 4;
  };
};
var gl = function(t, r, n) {
  let i = t + r - n, o = Math.abs(i - t), s = Math.abs(i - r), a = Math.abs(i - n);
  return o <= s && o <= a ? t : s <= a ? r : n;
};
let K_ = Ri, X_ = gl;
function Fa(e, t, r) {
  let n = e * t;
  return r !== 8 && (n = Math.ceil(n / (8 / r))), n;
}
let Jr = El.exports = function(e, t) {
  let r = e.width, n = e.height, i = e.interlace, o = e.bpp, s = e.depth;
  if (this.read = t.read, this.write = t.write, this.complete = t.complete, this._imageIndex = 0, this._images = [], i) {
    let a = K_.getImagePasses(r, n);
    for (let f = 0; f < a.length; f++)
      this._images.push({
        byteWidth: Fa(a[f].width, o, s),
        height: a[f].height,
        lineIndex: 0
      });
  } else
    this._images.push({
      byteWidth: Fa(r, o, s),
      height: n,
      lineIndex: 0
    });
  s === 8 ? this._xComparison = o : s === 16 ? this._xComparison = o * 2 : this._xComparison = 1;
};
Jr.prototype.start = function() {
  this.read(
    this._images[this._imageIndex].byteWidth + 1,
    this._reverseFilterLine.bind(this)
  );
};
Jr.prototype._unFilterType1 = function(e, t, r) {
  let n = this._xComparison, i = n - 1;
  for (let o = 0; o < r; o++) {
    let s = e[1 + o], a = o > i ? t[o - n] : 0;
    t[o] = s + a;
  }
};
Jr.prototype._unFilterType2 = function(e, t, r) {
  let n = this._lastLine;
  for (let i = 0; i < r; i++) {
    let o = e[1 + i], s = n ? n[i] : 0;
    t[i] = o + s;
  }
};
Jr.prototype._unFilterType3 = function(e, t, r) {
  let n = this._xComparison, i = n - 1, o = this._lastLine;
  for (let s = 0; s < r; s++) {
    let a = e[1 + s], f = o ? o[s] : 0, c = s > i ? t[s - n] : 0, l = Math.floor((c + f) / 2);
    t[s] = a + l;
  }
};
Jr.prototype._unFilterType4 = function(e, t, r) {
  let n = this._xComparison, i = n - 1, o = this._lastLine;
  for (let s = 0; s < r; s++) {
    let a = e[1 + s], f = o ? o[s] : 0, c = s > i ? t[s - n] : 0, l = s > i && o ? o[s - n] : 0, u = X_(c, f, l);
    t[s] = a + u;
  }
};
Jr.prototype._reverseFilterLine = function(e) {
  let t = e[0], r, n = this._images[this._imageIndex], i = n.byteWidth;
  if (t === 0)
    r = e.slice(1, i + 1);
  else
    switch (r = Buffer.alloc(i), t) {
      case 1:
        this._unFilterType1(e, r, i);
        break;
      case 2:
        this._unFilterType2(e, r, i);
        break;
      case 3:
        this._unFilterType3(e, r, i);
        break;
      case 4:
        this._unFilterType4(e, r, i);
        break;
      default:
        throw new Error("Unrecognised filter type - " + t);
    }
  this.write(r), n.lineIndex++, n.lineIndex >= n.height ? (this._lastLine = null, this._imageIndex++, n = this._images[this._imageIndex]) : this._lastLine = r, n ? this.read(n.byteWidth + 1, this._reverseFilterLine.bind(this)) : (this._lastLine = null, this.complete());
};
var Cl = El.exports;
let Y_ = yt, bl = _l, z_ = Cl, Q_ = xl.exports = function(e) {
  bl.call(this);
  let t = [], r = this;
  this._filter = new z_(e, {
    read: this.read.bind(this),
    write: function(n) {
      t.push(n);
    },
    complete: function() {
      r.emit("complete", Buffer.concat(t));
    }
  }), this._filter.start();
};
Y_.inherits(Q_, bl);
var Z_ = xl.exports, yl = { exports: {} }, Jn = {
  PNG_SIGNATURE: [137, 80, 78, 71, 13, 10, 26, 10],
  TYPE_IHDR: 1229472850,
  TYPE_IEND: 1229278788,
  TYPE_IDAT: 1229209940,
  TYPE_PLTE: 1347179589,
  TYPE_tRNS: 1951551059,
  // eslint-disable-line camelcase
  TYPE_gAMA: 1732332865,
  // eslint-disable-line camelcase
  // color-type bits
  COLORTYPE_GRAYSCALE: 0,
  COLORTYPE_PALETTE: 1,
  COLORTYPE_COLOR: 2,
  COLORTYPE_ALPHA: 4,
  // e.g. grayscale and alpha
  // color-type combinations
  COLORTYPE_PALETTE_COLOR: 3,
  COLORTYPE_COLOR_ALPHA: 6,
  COLORTYPE_TO_BPP_MAP: {
    0: 1,
    2: 3,
    3: 1,
    4: 2,
    6: 4
  },
  GAMMA_DIVISION: 1e5
}, Tl = { exports: {} };
let ho = [];
(function() {
  for (let e = 0; e < 256; e++) {
    let t = e;
    for (let r = 0; r < 8; r++)
      t & 1 ? t = 3988292384 ^ t >>> 1 : t = t >>> 1;
    ho[e] = t;
  }
})();
let po = Tl.exports = function() {
  this._crc = -1;
};
po.prototype.write = function(e) {
  for (let t = 0; t < e.length; t++)
    this._crc = ho[(this._crc ^ e[t]) & 255] ^ this._crc >>> 8;
  return !0;
};
po.prototype.crc32 = function() {
  return this._crc ^ -1;
};
po.crc32 = function(e) {
  let t = -1;
  for (let r = 0; r < e.length; r++)
    t = ho[(t ^ e[r]) & 255] ^ t >>> 8;
  return t ^ -1;
};
var vl = Tl.exports;
let de = Jn, J_ = vl, ge = yl.exports = function(e, t) {
  this._options = e, e.checkCRC = e.checkCRC !== !1, this._hasIHDR = !1, this._hasIEND = !1, this._emittedHeadersFinished = !1, this._palette = [], this._colorType = 0, this._chunks = {}, this._chunks[de.TYPE_IHDR] = this._handleIHDR.bind(this), this._chunks[de.TYPE_IEND] = this._handleIEND.bind(this), this._chunks[de.TYPE_IDAT] = this._handleIDAT.bind(this), this._chunks[de.TYPE_PLTE] = this._handlePLTE.bind(this), this._chunks[de.TYPE_tRNS] = this._handleTRNS.bind(this), this._chunks[de.TYPE_gAMA] = this._handleGAMA.bind(this), this.read = t.read, this.error = t.error, this.metadata = t.metadata, this.gamma = t.gamma, this.transColor = t.transColor, this.palette = t.palette, this.parsed = t.parsed, this.inflateData = t.inflateData, this.finished = t.finished, this.simpleTransparency = t.simpleTransparency, this.headersFinished = t.headersFinished || function() {
  };
};
ge.prototype.start = function() {
  this.read(de.PNG_SIGNATURE.length, this._parseSignature.bind(this));
};
ge.prototype._parseSignature = function(e) {
  let t = de.PNG_SIGNATURE;
  for (let r = 0; r < t.length; r++)
    if (e[r] !== t[r]) {
      this.error(new Error("Invalid file signature"));
      return;
    }
  this.read(8, this._parseChunkBegin.bind(this));
};
ge.prototype._parseChunkBegin = function(e) {
  let t = e.readUInt32BE(0), r = e.readUInt32BE(4), n = "";
  for (let o = 4; o < 8; o++)
    n += String.fromCharCode(e[o]);
  let i = !!(e[4] & 32);
  if (!this._hasIHDR && r !== de.TYPE_IHDR) {
    this.error(new Error("Expected IHDR on beggining"));
    return;
  }
  if (this._crc = new J_(), this._crc.write(Buffer.from(n)), this._chunks[r])
    return this._chunks[r](t);
  if (!i) {
    this.error(new Error("Unsupported critical chunk type " + n));
    return;
  }
  this.read(t + 4, this._skipChunk.bind(this));
};
ge.prototype._skipChunk = function() {
  this.read(8, this._parseChunkBegin.bind(this));
};
ge.prototype._handleChunkEnd = function() {
  this.read(4, this._parseChunkEnd.bind(this));
};
ge.prototype._parseChunkEnd = function(e) {
  let t = e.readInt32BE(0), r = this._crc.crc32();
  if (this._options.checkCRC && r !== t) {
    this.error(new Error("Crc error - " + t + " - " + r));
    return;
  }
  this._hasIEND || this.read(8, this._parseChunkBegin.bind(this));
};
ge.prototype._handleIHDR = function(e) {
  this.read(e, this._parseIHDR.bind(this));
};
ge.prototype._parseIHDR = function(e) {
  this._crc.write(e);
  let t = e.readUInt32BE(0), r = e.readUInt32BE(4), n = e[8], i = e[9], o = e[10], s = e[11], a = e[12];
  if (n !== 8 && n !== 4 && n !== 2 && n !== 1 && n !== 16) {
    this.error(new Error("Unsupported bit depth " + n));
    return;
  }
  if (!(i in de.COLORTYPE_TO_BPP_MAP)) {
    this.error(new Error("Unsupported color type"));
    return;
  }
  if (o !== 0) {
    this.error(new Error("Unsupported compression method"));
    return;
  }
  if (s !== 0) {
    this.error(new Error("Unsupported filter method"));
    return;
  }
  if (a !== 0 && a !== 1) {
    this.error(new Error("Unsupported interlace method"));
    return;
  }
  this._colorType = i;
  let f = de.COLORTYPE_TO_BPP_MAP[this._colorType];
  this._hasIHDR = !0, this.metadata({
    width: t,
    height: r,
    depth: n,
    interlace: !!a,
    palette: !!(i & de.COLORTYPE_PALETTE),
    color: !!(i & de.COLORTYPE_COLOR),
    alpha: !!(i & de.COLORTYPE_ALPHA),
    bpp: f,
    colorType: i
  }), this._handleChunkEnd();
};
ge.prototype._handlePLTE = function(e) {
  this.read(e, this._parsePLTE.bind(this));
};
ge.prototype._parsePLTE = function(e) {
  this._crc.write(e);
  let t = Math.floor(e.length / 3);
  for (let r = 0; r < t; r++)
    this._palette.push([e[r * 3], e[r * 3 + 1], e[r * 3 + 2], 255]);
  this.palette(this._palette), this._handleChunkEnd();
};
ge.prototype._handleTRNS = function(e) {
  this.simpleTransparency(), this.read(e, this._parseTRNS.bind(this));
};
ge.prototype._parseTRNS = function(e) {
  if (this._crc.write(e), this._colorType === de.COLORTYPE_PALETTE_COLOR) {
    if (this._palette.length === 0) {
      this.error(new Error("Transparency chunk must be after palette"));
      return;
    }
    if (e.length > this._palette.length) {
      this.error(new Error("More transparent colors than palette size"));
      return;
    }
    for (let t = 0; t < e.length; t++)
      this._palette[t][3] = e[t];
    this.palette(this._palette);
  }
  this._colorType === de.COLORTYPE_GRAYSCALE && this.transColor([e.readUInt16BE(0)]), this._colorType === de.COLORTYPE_COLOR && this.transColor([
    e.readUInt16BE(0),
    e.readUInt16BE(2),
    e.readUInt16BE(4)
  ]), this._handleChunkEnd();
};
ge.prototype._handleGAMA = function(e) {
  this.read(e, this._parseGAMA.bind(this));
};
ge.prototype._parseGAMA = function(e) {
  this._crc.write(e), this.gamma(e.readUInt32BE(0) / de.GAMMA_DIVISION), this._handleChunkEnd();
};
ge.prototype._handleIDAT = function(e) {
  this._emittedHeadersFinished || (this._emittedHeadersFinished = !0, this.headersFinished()), this.read(-e, this._parseIDAT.bind(this, e));
};
ge.prototype._parseIDAT = function(e, t) {
  if (this._crc.write(t), this._colorType === de.COLORTYPE_PALETTE_COLOR && this._palette.length === 0)
    throw new Error("Expected palette not found");
  this.inflateData(t);
  let r = e - t.length;
  r > 0 ? this._handleIDAT(r) : this._handleChunkEnd();
};
ge.prototype._handleIEND = function(e) {
  this.read(e, this._parseIEND.bind(this));
};
ge.prototype._parseIEND = function(e) {
  this._crc.write(e), this._hasIEND = !0, this._handleChunkEnd(), this.finished && this.finished();
};
var Al = yl.exports, mo = {};
let $a = Ri, ex = [
  // 0 - dummy entry
  function() {
  },
  // 1 - L
  // 0: 0, 1: 0, 2: 0, 3: 0xff
  function(e, t, r, n) {
    if (n === t.length)
      throw new Error("Ran out of data");
    let i = t[n];
    e[r] = i, e[r + 1] = i, e[r + 2] = i, e[r + 3] = 255;
  },
  // 2 - LA
  // 0: 0, 1: 0, 2: 0, 3: 1
  function(e, t, r, n) {
    if (n + 1 >= t.length)
      throw new Error("Ran out of data");
    let i = t[n];
    e[r] = i, e[r + 1] = i, e[r + 2] = i, e[r + 3] = t[n + 1];
  },
  // 3 - RGB
  // 0: 0, 1: 1, 2: 2, 3: 0xff
  function(e, t, r, n) {
    if (n + 2 >= t.length)
      throw new Error("Ran out of data");
    e[r] = t[n], e[r + 1] = t[n + 1], e[r + 2] = t[n + 2], e[r + 3] = 255;
  },
  // 4 - RGBA
  // 0: 0, 1: 1, 2: 2, 3: 3
  function(e, t, r, n) {
    if (n + 3 >= t.length)
      throw new Error("Ran out of data");
    e[r] = t[n], e[r + 1] = t[n + 1], e[r + 2] = t[n + 2], e[r + 3] = t[n + 3];
  }
], tx = [
  // 0 - dummy entry
  function() {
  },
  // 1 - L
  // 0: 0, 1: 0, 2: 0, 3: 0xff
  function(e, t, r, n) {
    let i = t[0];
    e[r] = i, e[r + 1] = i, e[r + 2] = i, e[r + 3] = n;
  },
  // 2 - LA
  // 0: 0, 1: 0, 2: 0, 3: 1
  function(e, t, r) {
    let n = t[0];
    e[r] = n, e[r + 1] = n, e[r + 2] = n, e[r + 3] = t[1];
  },
  // 3 - RGB
  // 0: 0, 1: 1, 2: 2, 3: 0xff
  function(e, t, r, n) {
    e[r] = t[0], e[r + 1] = t[1], e[r + 2] = t[2], e[r + 3] = n;
  },
  // 4 - RGBA
  // 0: 0, 1: 1, 2: 2, 3: 3
  function(e, t, r) {
    e[r] = t[0], e[r + 1] = t[1], e[r + 2] = t[2], e[r + 3] = t[3];
  }
];
function rx(e, t) {
  let r = [], n = 0;
  function i() {
    if (n === e.length)
      throw new Error("Ran out of data");
    let o = e[n];
    n++;
    let s, a, f, c, l, u, h, d;
    switch (t) {
      default:
        throw new Error("unrecognised depth");
      case 16:
        h = e[n], n++, r.push((o << 8) + h);
        break;
      case 4:
        h = o & 15, d = o >> 4, r.push(d, h);
        break;
      case 2:
        l = o & 3, u = o >> 2 & 3, h = o >> 4 & 3, d = o >> 6 & 3, r.push(d, h, u, l);
        break;
      case 1:
        s = o & 1, a = o >> 1 & 1, f = o >> 2 & 1, c = o >> 3 & 1, l = o >> 4 & 1, u = o >> 5 & 1, h = o >> 6 & 1, d = o >> 7 & 1, r.push(d, h, u, l, c, f, a, s);
        break;
    }
  }
  return {
    get: function(o) {
      for (; r.length < o; )
        i();
      let s = r.slice(0, o);
      return r = r.slice(o), s;
    },
    resetAfterLine: function() {
      r.length = 0;
    },
    end: function() {
      if (n !== e.length)
        throw new Error("extra data found");
    }
  };
}
function nx(e, t, r, n, i, o) {
  let s = e.width, a = e.height, f = e.index;
  for (let c = 0; c < a; c++)
    for (let l = 0; l < s; l++) {
      let u = r(l, c, f);
      ex[n](t, i, u, o), o += n;
    }
  return o;
}
function ix(e, t, r, n, i, o) {
  let s = e.width, a = e.height, f = e.index;
  for (let c = 0; c < a; c++) {
    for (let l = 0; l < s; l++) {
      let u = i.get(n), h = r(l, c, f);
      tx[n](t, u, h, o);
    }
    i.resetAfterLine();
  }
}
mo.dataToBitMap = function(e, t) {
  let r = t.width, n = t.height, i = t.depth, o = t.bpp, s = t.interlace, a;
  i !== 8 && (a = rx(e, i));
  let f;
  i <= 8 ? f = Buffer.alloc(r * n * 4) : f = new Uint16Array(r * n * 4);
  let c = Math.pow(2, i) - 1, l = 0, u, h;
  if (s)
    u = $a.getImagePasses(r, n), h = $a.getInterlaceIterator(r, n);
  else {
    let d = 0;
    h = function() {
      let _ = d;
      return d += 4, _;
    }, u = [{ width: r, height: n }];
  }
  for (let d = 0; d < u.length; d++)
    i === 8 ? l = nx(
      u[d],
      f,
      h,
      o,
      e,
      l
    ) : ix(
      u[d],
      f,
      h,
      o,
      a,
      c
    );
  if (i === 8) {
    if (l !== e.length)
      throw new Error("extra data found");
  } else
    a.end();
  return f;
};
function ox(e, t, r, n, i) {
  let o = 0;
  for (let s = 0; s < n; s++)
    for (let a = 0; a < r; a++) {
      let f = i[e[o]];
      if (!f)
        throw new Error("index " + e[o] + " not in palette");
      for (let c = 0; c < 4; c++)
        t[o + c] = f[c];
      o += 4;
    }
}
function sx(e, t, r, n, i) {
  let o = 0;
  for (let s = 0; s < n; s++)
    for (let a = 0; a < r; a++) {
      let f = !1;
      if (i.length === 1 ? i[0] === e[o] && (f = !0) : i[0] === e[o] && i[1] === e[o + 1] && i[2] === e[o + 2] && (f = !0), f)
        for (let c = 0; c < 4; c++)
          t[o + c] = 0;
      o += 4;
    }
}
function ax(e, t, r, n, i) {
  let o = 255, s = Math.pow(2, i) - 1, a = 0;
  for (let f = 0; f < n; f++)
    for (let c = 0; c < r; c++) {
      for (let l = 0; l < 4; l++)
        t[a + l] = Math.floor(
          e[a + l] * o / s + 0.5
        );
      a += 4;
    }
}
var wl = function(e, t, r = !1) {
  let n = t.depth, i = t.width, o = t.height, s = t.colorType, a = t.transColor, f = t.palette, c = e;
  return s === 3 ? ox(e, c, i, o, f) : (a && sx(e, c, i, o, a), n !== 8 && !r && (n === 16 && (c = Buffer.alloc(i * o * 4)), ax(e, c, i, o, n))), c;
};
let fx = yt, b0 = Vt, Pl = _l, lx = Z_, cx = Al, ux = mo, hx = wl, mt = dl.exports = function(e) {
  Pl.call(this), this._parser = new cx(e, {
    read: this.read.bind(this),
    error: this._handleError.bind(this),
    metadata: this._handleMetaData.bind(this),
    gamma: this.emit.bind(this, "gamma"),
    palette: this._handlePalette.bind(this),
    transColor: this._handleTransColor.bind(this),
    finished: this._finished.bind(this),
    inflateData: this._inflateData.bind(this),
    simpleTransparency: this._simpleTransparency.bind(this),
    headersFinished: this._headersFinished.bind(this)
  }), this._options = e, this.writable = !0, this._parser.start();
};
fx.inherits(mt, Pl);
mt.prototype._handleError = function(e) {
  this.emit("error", e), this.writable = !1, this.destroy(), this._inflate && this._inflate.destroy && this._inflate.destroy(), this._filter && (this._filter.destroy(), this._filter.on("error", function() {
  })), this.errord = !0;
};
mt.prototype._inflateData = function(e) {
  if (!this._inflate)
    if (this._bitmapInfo.interlace)
      this._inflate = b0.createInflate(), this._inflate.on("error", this.emit.bind(this, "error")), this._filter.on("complete", this._complete.bind(this)), this._inflate.pipe(this._filter);
    else {
      let r = ((this._bitmapInfo.width * this._bitmapInfo.bpp * this._bitmapInfo.depth + 7 >> 3) + 1) * this._bitmapInfo.height, n = Math.max(r, b0.Z_MIN_CHUNK);
      this._inflate = b0.createInflate({ chunkSize: n });
      let i = r, o = this.emit.bind(this, "error");
      this._inflate.on("error", function(a) {
        i && o(a);
      }), this._filter.on("complete", this._complete.bind(this));
      let s = this._filter.write.bind(this._filter);
      this._inflate.on("data", function(a) {
        i && (a.length > i && (a = a.slice(0, i)), i -= a.length, s(a));
      }), this._inflate.on("end", this._filter.end.bind(this._filter));
    }
  this._inflate.write(e);
};
mt.prototype._handleMetaData = function(e) {
  this._metaData = e, this._bitmapInfo = Object.create(e), this._filter = new lx(this._bitmapInfo);
};
mt.prototype._handleTransColor = function(e) {
  this._bitmapInfo.transColor = e;
};
mt.prototype._handlePalette = function(e) {
  this._bitmapInfo.palette = e;
};
mt.prototype._simpleTransparency = function() {
  this._metaData.alpha = !0;
};
mt.prototype._headersFinished = function() {
  this.emit("metadata", this._metaData);
};
mt.prototype._finished = function() {
  this.errord || (this._inflate ? this._inflate.end() : this.emit("error", "No Inflate block"));
};
mt.prototype._complete = function(e) {
  if (this.errord)
    return;
  let t;
  try {
    let r = ux.dataToBitMap(e, this._bitmapInfo);
    t = hx(
      r,
      this._bitmapInfo,
      this._options.skipRescale
    ), r = null;
  } catch (r) {
    this._handleError(r);
    return;
  }
  this.emit("parsed", t);
};
var dx = dl.exports, Sl = { exports: {} }, Ol = { exports: {} };
let Ye = Jn;
var px = function(e, t, r, n) {
  let i = [Ye.COLORTYPE_COLOR_ALPHA, Ye.COLORTYPE_ALPHA].indexOf(
    n.colorType
  ) !== -1;
  if (n.colorType === n.inputColorType) {
    let _ = function() {
      let p = new ArrayBuffer(2);
      return new DataView(p).setInt16(
        0,
        256,
        !0
        /* littleEndian */
      ), new Int16Array(p)[0] !== 256;
    }();
    if (n.bitDepth === 8 || n.bitDepth === 16 && _)
      return e;
  }
  let o = n.bitDepth !== 16 ? e : new Uint16Array(e.buffer), s = 255, a = Ye.COLORTYPE_TO_BPP_MAP[n.inputColorType];
  a === 4 && !n.inputHasAlpha && (a = 3);
  let f = Ye.COLORTYPE_TO_BPP_MAP[n.colorType];
  n.bitDepth === 16 && (s = 65535, f *= 2);
  let c = Buffer.alloc(t * r * f), l = 0, u = 0, h = n.bgColor || {};
  h.red === void 0 && (h.red = s), h.green === void 0 && (h.green = s), h.blue === void 0 && (h.blue = s);
  function d() {
    let _, p, x, y = s;
    switch (n.inputColorType) {
      case Ye.COLORTYPE_COLOR_ALPHA:
        y = o[l + 3], _ = o[l], p = o[l + 1], x = o[l + 2];
        break;
      case Ye.COLORTYPE_COLOR:
        _ = o[l], p = o[l + 1], x = o[l + 2];
        break;
      case Ye.COLORTYPE_ALPHA:
        y = o[l + 1], _ = o[l], p = _, x = _;
        break;
      case Ye.COLORTYPE_GRAYSCALE:
        _ = o[l], p = _, x = _;
        break;
      default:
        throw new Error(
          "input color type:" + n.inputColorType + " is not supported at present"
        );
    }
    return n.inputHasAlpha && (i || (y /= s, _ = Math.min(
      Math.max(Math.round((1 - y) * h.red + y * _), 0),
      s
    ), p = Math.min(
      Math.max(Math.round((1 - y) * h.green + y * p), 0),
      s
    ), x = Math.min(
      Math.max(Math.round((1 - y) * h.blue + y * x), 0),
      s
    ))), { red: _, green: p, blue: x, alpha: y };
  }
  for (let _ = 0; _ < r; _++)
    for (let p = 0; p < t; p++) {
      let x = d();
      switch (n.colorType) {
        case Ye.COLORTYPE_COLOR_ALPHA:
        case Ye.COLORTYPE_COLOR:
          n.bitDepth === 8 ? (c[u] = x.red, c[u + 1] = x.green, c[u + 2] = x.blue, i && (c[u + 3] = x.alpha)) : (c.writeUInt16BE(x.red, u), c.writeUInt16BE(x.green, u + 2), c.writeUInt16BE(x.blue, u + 4), i && c.writeUInt16BE(x.alpha, u + 6));
          break;
        case Ye.COLORTYPE_ALPHA:
        case Ye.COLORTYPE_GRAYSCALE: {
          let y = (x.red + x.green + x.blue) / 3;
          n.bitDepth === 8 ? (c[u] = y, i && (c[u + 1] = x.alpha)) : (c.writeUInt16BE(y, u), i && c.writeUInt16BE(x.alpha, u + 2));
          break;
        }
        default:
          throw new Error("unrecognised color Type " + n.colorType);
      }
      l += a, u += f;
    }
  return c;
};
let Il = gl;
function mx(e, t, r, n, i) {
  for (let o = 0; o < r; o++)
    n[i + o] = e[t + o];
}
function _x(e, t, r) {
  let n = 0, i = t + r;
  for (let o = t; o < i; o++)
    n += Math.abs(e[o]);
  return n;
}
function xx(e, t, r, n, i, o) {
  for (let s = 0; s < r; s++) {
    let a = s >= o ? e[t + s - o] : 0, f = e[t + s] - a;
    n[i + s] = f;
  }
}
function Ex(e, t, r, n) {
  let i = 0;
  for (let o = 0; o < r; o++) {
    let s = o >= n ? e[t + o - n] : 0, a = e[t + o] - s;
    i += Math.abs(a);
  }
  return i;
}
function gx(e, t, r, n, i) {
  for (let o = 0; o < r; o++) {
    let s = t > 0 ? e[t + o - r] : 0, a = e[t + o] - s;
    n[i + o] = a;
  }
}
function Cx(e, t, r) {
  let n = 0, i = t + r;
  for (let o = t; o < i; o++) {
    let s = t > 0 ? e[o - r] : 0, a = e[o] - s;
    n += Math.abs(a);
  }
  return n;
}
function bx(e, t, r, n, i, o) {
  for (let s = 0; s < r; s++) {
    let a = s >= o ? e[t + s - o] : 0, f = t > 0 ? e[t + s - r] : 0, c = e[t + s] - (a + f >> 1);
    n[i + s] = c;
  }
}
function yx(e, t, r, n) {
  let i = 0;
  for (let o = 0; o < r; o++) {
    let s = o >= n ? e[t + o - n] : 0, a = t > 0 ? e[t + o - r] : 0, f = e[t + o] - (s + a >> 1);
    i += Math.abs(f);
  }
  return i;
}
function Tx(e, t, r, n, i, o) {
  for (let s = 0; s < r; s++) {
    let a = s >= o ? e[t + s - o] : 0, f = t > 0 ? e[t + s - r] : 0, c = t > 0 && s >= o ? e[t + s - (r + o)] : 0, l = e[t + s] - Il(a, f, c);
    n[i + s] = l;
  }
}
function vx(e, t, r, n) {
  let i = 0;
  for (let o = 0; o < r; o++) {
    let s = o >= n ? e[t + o - n] : 0, a = t > 0 ? e[t + o - r] : 0, f = t > 0 && o >= n ? e[t + o - (r + n)] : 0, c = e[t + o] - Il(s, a, f);
    i += Math.abs(c);
  }
  return i;
}
let Ax = {
  0: mx,
  1: xx,
  2: gx,
  3: bx,
  4: Tx
}, wx = {
  0: _x,
  1: Ex,
  2: Cx,
  3: yx,
  4: vx
};
var Px = function(e, t, r, n, i) {
  let o;
  if (!("filterType" in n) || n.filterType === -1)
    o = [0, 1, 2, 3, 4];
  else if (typeof n.filterType == "number")
    o = [n.filterType];
  else
    throw new Error("unrecognised filter types");
  n.bitDepth === 16 && (i *= 2);
  let s = t * i, a = 0, f = 0, c = Buffer.alloc((s + 1) * r), l = o[0];
  for (let u = 0; u < r; u++) {
    if (o.length > 1) {
      let h = 1 / 0;
      for (let d = 0; d < o.length; d++) {
        let _ = wx[o[d]](e, f, s, i);
        _ < h && (l = o[d], h = _);
      }
    }
    c[a] = l, a++, Ax[l](e, f, s, c, a, i), a += s, f += s;
  }
  return c;
};
let Se = Jn, Sx = vl, Ox = px, Ix = Px, Rx = Vt, Yt = Ol.exports = function(e) {
  if (this._options = e, e.deflateChunkSize = e.deflateChunkSize || 32 * 1024, e.deflateLevel = e.deflateLevel != null ? e.deflateLevel : 9, e.deflateStrategy = e.deflateStrategy != null ? e.deflateStrategy : 3, e.inputHasAlpha = e.inputHasAlpha != null ? e.inputHasAlpha : !0, e.deflateFactory = e.deflateFactory || Rx.createDeflate, e.bitDepth = e.bitDepth || 8, e.colorType = typeof e.colorType == "number" ? e.colorType : Se.COLORTYPE_COLOR_ALPHA, e.inputColorType = typeof e.inputColorType == "number" ? e.inputColorType : Se.COLORTYPE_COLOR_ALPHA, [
    Se.COLORTYPE_GRAYSCALE,
    Se.COLORTYPE_COLOR,
    Se.COLORTYPE_COLOR_ALPHA,
    Se.COLORTYPE_ALPHA
  ].indexOf(e.colorType) === -1)
    throw new Error(
      "option color type:" + e.colorType + " is not supported at present"
    );
  if ([
    Se.COLORTYPE_GRAYSCALE,
    Se.COLORTYPE_COLOR,
    Se.COLORTYPE_COLOR_ALPHA,
    Se.COLORTYPE_ALPHA
  ].indexOf(e.inputColorType) === -1)
    throw new Error(
      "option input color type:" + e.inputColorType + " is not supported at present"
    );
  if (e.bitDepth !== 8 && e.bitDepth !== 16)
    throw new Error(
      "option bit depth:" + e.bitDepth + " is not supported at present"
    );
};
Yt.prototype.getDeflateOptions = function() {
  return {
    chunkSize: this._options.deflateChunkSize,
    level: this._options.deflateLevel,
    strategy: this._options.deflateStrategy
  };
};
Yt.prototype.createDeflate = function() {
  return this._options.deflateFactory(this.getDeflateOptions());
};
Yt.prototype.filterData = function(e, t, r) {
  let n = Ox(e, t, r, this._options), i = Se.COLORTYPE_TO_BPP_MAP[this._options.colorType];
  return Ix(n, t, r, this._options, i);
};
Yt.prototype._packChunk = function(e, t) {
  let r = t ? t.length : 0, n = Buffer.alloc(r + 12);
  return n.writeUInt32BE(r, 0), n.writeUInt32BE(e, 4), t && t.copy(n, 8), n.writeInt32BE(
    Sx.crc32(n.slice(4, n.length - 4)),
    n.length - 4
  ), n;
};
Yt.prototype.packGAMA = function(e) {
  let t = Buffer.alloc(4);
  return t.writeUInt32BE(Math.floor(e * Se.GAMMA_DIVISION), 0), this._packChunk(Se.TYPE_gAMA, t);
};
Yt.prototype.packIHDR = function(e, t) {
  let r = Buffer.alloc(13);
  return r.writeUInt32BE(e, 0), r.writeUInt32BE(t, 4), r[8] = this._options.bitDepth, r[9] = this._options.colorType, r[10] = 0, r[11] = 0, r[12] = 0, this._packChunk(Se.TYPE_IHDR, r);
};
Yt.prototype.packIDAT = function(e) {
  return this._packChunk(Se.TYPE_IDAT, e);
};
Yt.prototype.packIEND = function() {
  return this._packChunk(Se.TYPE_IEND, null);
};
var Rl = Ol.exports;
let Bx = yt, Bl = Ve, Dx = Jn, Nx = Rl, Dl = Sl.exports = function(e) {
  Bl.call(this);
  let t = e || {};
  this._packer = new Nx(t), this._deflate = this._packer.createDeflate(), this.readable = !0;
};
Bx.inherits(Dl, Bl);
Dl.prototype.pack = function(e, t, r, n) {
  this.emit("data", Buffer.from(Dx.PNG_SIGNATURE)), this.emit("data", this._packer.packIHDR(t, r)), n && this.emit("data", this._packer.packGAMA(n));
  let i = this._packer.filterData(e, t, r);
  this._deflate.on("error", this.emit.bind(this, "error")), this._deflate.on(
    "data",
    (function(o) {
      this.emit("data", this._packer.packIDAT(o));
    }).bind(this)
  ), this._deflate.on(
    "end",
    (function() {
      this.emit("data", this._packer.packIEND()), this.emit("end");
    }).bind(this)
  ), this._deflate.end(i);
};
var Lx = Sl.exports, _o = {}, w2 = { exports: {} };
(function(e, t) {
  let r = B2.ok, n = Vt, i = yt, o = N2.kMaxLength;
  function s(u) {
    if (!(this instanceof s))
      return new s(u);
    u && u.chunkSize < n.Z_MIN_CHUNK && (u.chunkSize = n.Z_MIN_CHUNK), n.Inflate.call(this, u), this._offset = this._offset === void 0 ? this._outOffset : this._offset, this._buffer = this._buffer || this._outBuffer, u && u.maxLength != null && (this._maxLength = u.maxLength);
  }
  function a(u) {
    return new s(u);
  }
  function f(u, h) {
    u._handle && (u._handle.close(), u._handle = null);
  }
  s.prototype._processChunk = function(u, h, d) {
    if (typeof d == "function")
      return n.Inflate._processChunk.call(this, u, h, d);
    let _ = this, p = u && u.length, x = this._chunkSize - this._offset, y = this._maxLength, b = 0, w = [], T = 0, L;
    this.on("error", function(C) {
      L = C;
    });
    function G(C, q) {
      if (_._hadError)
        return;
      let F = x - q;
      if (r(F >= 0, "have should not go down"), F > 0) {
        let $ = _._buffer.slice(_._offset, _._offset + F);
        if (_._offset += F, $.length > y && ($ = $.slice(0, y)), w.push($), T += $.length, y -= $.length, y === 0)
          return !1;
      }
      return (q === 0 || _._offset >= _._chunkSize) && (x = _._chunkSize, _._offset = 0, _._buffer = Buffer.allocUnsafe(_._chunkSize)), q === 0 ? (b += p - C, p = C, !0) : !1;
    }
    r(this._handle, "zlib binding closed");
    let H;
    do
      H = this._handle.writeSync(
        h,
        u,
        // in
        b,
        // in_off
        p,
        // in_len
        this._buffer,
        // out
        this._offset,
        //out_off
        x
      ), H = H || this._writeState;
    while (!this._hadError && G(H[0], H[1]));
    if (this._hadError)
      throw L;
    if (T >= o)
      throw f(this), new RangeError(
        "Cannot create final Buffer. It would be larger than 0x" + o.toString(16) + " bytes"
      );
    let Q = Buffer.concat(w, T);
    return f(this), Q;
  }, i.inherits(s, n.Inflate);
  function c(u, h) {
    if (typeof h == "string" && (h = Buffer.from(h)), !(h instanceof Buffer))
      throw new TypeError("Not a string or buffer");
    let d = u._finishFlushFlag;
    return d == null && (d = n.Z_FINISH), u._processChunk(h, d);
  }
  function l(u, h) {
    return c(new s(h), u);
  }
  e.exports = t = l, t.Inflate = s, t.createInflate = a, t.inflateSync = l;
})(w2, w2.exports);
var Fx = w2.exports, Nl = { exports: {} };
let Ll = Nl.exports = function(e) {
  this._buffer = e, this._reads = [];
};
Ll.prototype.read = function(e, t) {
  this._reads.push({
    length: Math.abs(e),
    // if length < 0 then at most this length
    allowLess: e < 0,
    func: t
  });
};
Ll.prototype.process = function() {
  for (; this._reads.length > 0 && this._buffer.length; ) {
    let e = this._reads[0];
    if (this._buffer.length && (this._buffer.length >= e.length || e.allowLess)) {
      this._reads.shift();
      let t = this._buffer;
      this._buffer = t.slice(e.length), e.func.call(this, t.slice(0, e.length));
    } else
      break;
  }
  if (this._reads.length > 0)
    throw new Error("There are some read requests waitng on finished stream");
  if (this._buffer.length > 0)
    throw new Error("unrecognised content at end of stream");
};
var Fl = Nl.exports, $l = {};
let $x = Fl, Ux = Cl;
$l.process = function(e, t) {
  let r = [], n = new $x(e);
  return new Ux(t, {
    read: n.read.bind(n),
    write: function(o) {
      r.push(o);
    },
    complete: function() {
    }
  }).start(), n.process(), Buffer.concat(r);
};
let Ul = !0, kl = Vt, kx = Fx;
kl.deflateSync || (Ul = !1);
let Mx = Fl, Gx = $l, Hx = Al, Wx = mo, qx = wl;
var jx = function(e, t) {
  if (!Ul)
    throw new Error(
      "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
    );
  let r;
  function n(T) {
    r = T;
  }
  let i;
  function o(T) {
    i = T;
  }
  function s(T) {
    i.transColor = T;
  }
  function a(T) {
    i.palette = T;
  }
  function f() {
    i.alpha = !0;
  }
  let c;
  function l(T) {
    c = T;
  }
  let u = [];
  function h(T) {
    u.push(T);
  }
  let d = new Mx(e);
  if (new Hx(t, {
    read: d.read.bind(d),
    error: n,
    metadata: o,
    gamma: l,
    palette: a,
    transColor: s,
    inflateData: h,
    simpleTransparency: f
  }).start(), d.process(), r)
    throw r;
  let p = Buffer.concat(u);
  u.length = 0;
  let x;
  if (i.interlace)
    x = kl.inflateSync(p);
  else {
    let L = ((i.width * i.bpp * i.depth + 7 >> 3) + 1) * i.height;
    x = kx(p, {
      chunkSize: L,
      maxLength: L
    });
  }
  if (p = null, !x || !x.length)
    throw new Error("bad png - invalid inflate data response");
  let y = Gx.process(x, i);
  p = null;
  let b = Wx.dataToBitMap(y, i);
  y = null;
  let w = qx(
    b,
    i,
    t.skipRescale
  );
  return i.data = w, i.gamma = c || 0, i;
};
let Ml = !0, Gl = Vt;
Gl.deflateSync || (Ml = !1);
let Vx = Jn, Kx = Rl;
var Xx = function(e, t) {
  if (!Ml)
    throw new Error(
      "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
    );
  let r = t || {}, n = new Kx(r), i = [];
  i.push(Buffer.from(Vx.PNG_SIGNATURE)), i.push(n.packIHDR(e.width, e.height)), e.gamma && i.push(n.packGAMA(e.gamma));
  let o = n.filterData(
    e.data,
    e.width,
    e.height
  ), s = Gl.deflateSync(
    o,
    n.getDeflateOptions()
  );
  if (o = null, !s || !s.length)
    throw new Error("bad png - invalid compressed data response");
  return i.push(n.packIDAT(s)), i.push(n.packIEND()), Buffer.concat(i);
};
let Yx = jx, zx = Xx;
_o.read = function(e, t) {
  return Yx(e, t || {});
};
_o.write = function(e, t) {
  return zx(e, t);
};
let Qx = yt, Hl = Ve, Zx = dx, Jx = Lx, eE = _o, $e = br.PNG = function(e) {
  Hl.call(this), e = e || {}, this.width = e.width | 0, this.height = e.height | 0, this.data = this.width > 0 && this.height > 0 ? Buffer.alloc(4 * this.width * this.height) : null, e.fill && this.data && this.data.fill(0), this.gamma = 0, this.readable = this.writable = !0, this._parser = new Zx(e), this._parser.on("error", this.emit.bind(this, "error")), this._parser.on("close", this._handleClose.bind(this)), this._parser.on("metadata", this._metadata.bind(this)), this._parser.on("gamma", this._gamma.bind(this)), this._parser.on(
    "parsed",
    (function(t) {
      this.data = t, this.emit("parsed", t);
    }).bind(this)
  ), this._packer = new Jx(e), this._packer.on("data", this.emit.bind(this, "data")), this._packer.on("end", this.emit.bind(this, "end")), this._parser.on("close", this._handleClose.bind(this)), this._packer.on("error", this.emit.bind(this, "error"));
};
Qx.inherits($e, Hl);
$e.sync = eE;
$e.prototype.pack = function() {
  return !this.data || !this.data.length ? (this.emit("error", "No data provided"), this) : (process.nextTick(
    (function() {
      this._packer.pack(this.data, this.width, this.height, this.gamma);
    }).bind(this)
  ), this);
};
$e.prototype.parse = function(e, t) {
  if (t) {
    let r, n;
    r = (function(i) {
      this.removeListener("error", n), this.data = i, t(null, this);
    }).bind(this), n = (function(i) {
      this.removeListener("parsed", r), t(i, null);
    }).bind(this), this.once("parsed", r), this.once("error", n);
  }
  return this.end(e), this;
};
$e.prototype.write = function(e) {
  return this._parser.write(e), !0;
};
$e.prototype.end = function(e) {
  this._parser.end(e);
};
$e.prototype._metadata = function(e) {
  this.width = e.width, this.height = e.height, this.emit("metadata", e);
};
$e.prototype._gamma = function(e) {
  this.gamma = e;
};
$e.prototype._handleClose = function() {
  !this._parser.writable && !this._packer.readable && this.emit("close");
};
$e.bitblt = function(e, t, r, n, i, o, s, a) {
  if (r |= 0, n |= 0, i |= 0, o |= 0, s |= 0, a |= 0, r > e.width || n > e.height || r + i > e.width || n + o > e.height)
    throw new Error("bitblt reading outside image");
  if (s > t.width || a > t.height || s + i > t.width || a + o > t.height)
    throw new Error("bitblt writing outside image");
  for (let f = 0; f < o; f++)
    e.data.copy(
      t.data,
      (a + f) * t.width + s << 2,
      (n + f) * e.width + r << 2,
      (n + f) * e.width + r + i << 2
    );
};
$e.prototype.bitblt = function(e, t, r, n, i, o, s) {
  return $e.bitblt(this, e, t, r, n, i, o, s), this;
};
$e.adjustGamma = function(e) {
  if (e.gamma) {
    for (let t = 0; t < e.height; t++)
      for (let r = 0; r < e.width; r++) {
        let n = e.width * t + r << 2;
        for (let i = 0; i < 3; i++) {
          let o = e.data[n + i] / 255;
          o = Math.pow(o, 1 / 2.2 / e.gamma), e.data[n + i] = Math.round(o * 255);
        }
      }
    e.gamma = 0;
  }
};
$e.prototype.adjustGamma = function() {
  $e.adjustGamma(this);
};
var Wl = { exports: {} }, M1 = N2, Hr = M1.Buffer, Ze = {}, Je;
for (Je in M1)
  M1.hasOwnProperty(Je) && (Je === "SlowBuffer" || Je === "Buffer" || (Ze[Je] = M1[Je]));
var Wr = Ze.Buffer = {};
for (Je in Hr)
  Hr.hasOwnProperty(Je) && (Je === "allocUnsafe" || Je === "allocUnsafeSlow" || (Wr[Je] = Hr[Je]));
Ze.Buffer.prototype = Hr.prototype;
(!Wr.from || Wr.from === Uint8Array.from) && (Wr.from = function(e, t, r) {
  if (typeof e == "number")
    throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof e);
  if (e && typeof e.length > "u")
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
  return Hr(e, t, r);
});
Wr.alloc || (Wr.alloc = function(e, t, r) {
  if (typeof e != "number")
    throw new TypeError('The "size" argument must be of type number. Received type ' + typeof e);
  if (e < 0 || e >= 2 * (1 << 30))
    throw new RangeError('The value "' + e + '" is invalid for option "size"');
  var n = Hr(e);
  return !t || t.length === 0 ? n.fill(0) : typeof r == "string" ? n.fill(t, r) : n.fill(t), n;
});
if (!Ze.kStringMaxLength)
  try {
    Ze.kStringMaxLength = process.binding("buffer").kStringMaxLength;
  } catch {
  }
Ze.constants || (Ze.constants = {
  MAX_LENGTH: Ze.kMaxLength
}, Ze.kStringMaxLength && (Ze.constants.MAX_STRING_LENGTH = Ze.kStringMaxLength));
var zt = Ze, xo = {}, ql = "\uFEFF";
xo.PrependBOM = Eo;
function Eo(e, t) {
  this.encoder = e, this.addBOM = !0;
}
Eo.prototype.write = function(e) {
  return this.addBOM && (e = ql + e, this.addBOM = !1), this.encoder.write(e);
};
Eo.prototype.end = function() {
  return this.encoder.end();
};
xo.StripBOM = go;
function go(e, t) {
  this.decoder = e, this.pass = !1, this.options = t || {};
}
go.prototype.write = function(e) {
  var t = this.decoder.write(e);
  return this.pass || !t || (t[0] === ql && (t = t.slice(1), typeof this.options.stripBOM == "function" && this.options.stripBOM()), this.pass = !0), t;
};
go.prototype.end = function() {
  return this.decoder.end();
};
var y0 = {}, T0, Ua;
function tE() {
  if (Ua) return T0;
  Ua = 1;
  var e = zt.Buffer;
  T0 = {
    // Encodings
    utf8: { type: "_internal", bomAware: !0 },
    cesu8: { type: "_internal", bomAware: !0 },
    unicode11utf8: "utf8",
    ucs2: { type: "_internal", bomAware: !0 },
    utf16le: "ucs2",
    binary: { type: "_internal" },
    base64: { type: "_internal" },
    hex: { type: "_internal" },
    // Codec.
    _internal: t
  };
  function t(f, c) {
    this.enc = f.encodingName, this.bomAware = f.bomAware, this.enc === "base64" ? this.encoder = o : this.enc === "cesu8" && (this.enc = "utf8", this.encoder = s, e.from("eda0bdedb2a9", "hex").toString() !== "💩" && (this.decoder = a, this.defaultCharUnicode = c.defaultCharUnicode));
  }
  t.prototype.encoder = i, t.prototype.decoder = n;
  var r = n5.StringDecoder;
  r.prototype.end || (r.prototype.end = function() {
  });
  function n(f, c) {
    this.decoder = new r(c.enc);
  }
  n.prototype.write = function(f) {
    return e.isBuffer(f) || (f = e.from(f)), this.decoder.write(f);
  }, n.prototype.end = function() {
    return this.decoder.end();
  };
  function i(f, c) {
    this.enc = c.enc;
  }
  i.prototype.write = function(f) {
    return e.from(f, this.enc);
  }, i.prototype.end = function() {
  };
  function o(f, c) {
    this.prevStr = "";
  }
  o.prototype.write = function(f) {
    f = this.prevStr + f;
    var c = f.length - f.length % 4;
    return this.prevStr = f.slice(c), f = f.slice(0, c), e.from(f, "base64");
  }, o.prototype.end = function() {
    return e.from(this.prevStr, "base64");
  };
  function s(f, c) {
  }
  s.prototype.write = function(f) {
    for (var c = e.alloc(f.length * 3), l = 0, u = 0; u < f.length; u++) {
      var h = f.charCodeAt(u);
      h < 128 ? c[l++] = h : h < 2048 ? (c[l++] = 192 + (h >>> 6), c[l++] = 128 + (h & 63)) : (c[l++] = 224 + (h >>> 12), c[l++] = 128 + (h >>> 6 & 63), c[l++] = 128 + (h & 63));
    }
    return c.slice(0, l);
  }, s.prototype.end = function() {
  };
  function a(f, c) {
    this.acc = 0, this.contBytes = 0, this.accBytes = 0, this.defaultCharUnicode = c.defaultCharUnicode;
  }
  return a.prototype.write = function(f) {
    for (var c = this.acc, l = this.contBytes, u = this.accBytes, h = "", d = 0; d < f.length; d++) {
      var _ = f[d];
      (_ & 192) !== 128 ? (l > 0 && (h += this.defaultCharUnicode, l = 0), _ < 128 ? h += String.fromCharCode(_) : _ < 224 ? (c = _ & 31, l = 1, u = 1) : _ < 240 ? (c = _ & 15, l = 2, u = 1) : h += this.defaultCharUnicode) : l > 0 ? (c = c << 6 | _ & 63, l--, u++, l === 0 && (u === 2 && c < 128 && c > 0 ? h += this.defaultCharUnicode : u === 3 && c < 2048 ? h += this.defaultCharUnicode : h += String.fromCharCode(c))) : h += this.defaultCharUnicode;
    }
    return this.acc = c, this.contBytes = l, this.accBytes = u, h;
  }, a.prototype.end = function() {
    var f = 0;
    return this.contBytes > 0 && (f += this.defaultCharUnicode), f;
  }, T0;
}
var Et = {}, ka;
function rE() {
  if (ka) return Et;
  ka = 1;
  var e = zt.Buffer;
  Et._utf32 = t;
  function t(c, l) {
    this.iconv = l, this.bomAware = !0, this.isLE = c.isLE;
  }
  Et.utf32le = { type: "_utf32", isLE: !0 }, Et.utf32be = { type: "_utf32", isLE: !1 }, Et.ucs4le = "utf32le", Et.ucs4be = "utf32be", t.prototype.encoder = r, t.prototype.decoder = n;
  function r(c, l) {
    this.isLE = l.isLE, this.highSurrogate = 0;
  }
  r.prototype.write = function(c) {
    for (var l = e.from(c, "ucs2"), u = e.alloc(l.length * 2), h = this.isLE ? u.writeUInt32LE : u.writeUInt32BE, d = 0, _ = 0; _ < l.length; _ += 2) {
      var p = l.readUInt16LE(_), x = 55296 <= p && p < 56320, y = 56320 <= p && p < 57344;
      if (this.highSurrogate)
        if (x || !y)
          h.call(u, this.highSurrogate, d), d += 4;
        else {
          var b = (this.highSurrogate - 55296 << 10 | p - 56320) + 65536;
          h.call(u, b, d), d += 4, this.highSurrogate = 0;
          continue;
        }
      x ? this.highSurrogate = p : (h.call(u, p, d), d += 4, this.highSurrogate = 0);
    }
    return d < u.length && (u = u.slice(0, d)), u;
  }, r.prototype.end = function() {
    if (this.highSurrogate) {
      var c = e.alloc(4);
      return this.isLE ? c.writeUInt32LE(this.highSurrogate, 0) : c.writeUInt32BE(this.highSurrogate, 0), this.highSurrogate = 0, c;
    }
  };
  function n(c, l) {
    this.isLE = l.isLE, this.badChar = l.iconv.defaultCharUnicode.charCodeAt(0), this.overflow = [];
  }
  n.prototype.write = function(c) {
    if (c.length === 0)
      return "";
    var l = 0, u = 0, h = e.alloc(c.length + 4), d = 0, _ = this.isLE, p = this.overflow, x = this.badChar;
    if (p.length > 0) {
      for (; l < c.length && p.length < 4; l++)
        p.push(c[l]);
      p.length === 4 && (_ ? u = p[l] | p[l + 1] << 8 | p[l + 2] << 16 | p[l + 3] << 24 : u = p[l + 3] | p[l + 2] << 8 | p[l + 1] << 16 | p[l] << 24, p.length = 0, d = i(h, d, u, x));
    }
    for (; l < c.length - 3; l += 4)
      _ ? u = c[l] | c[l + 1] << 8 | c[l + 2] << 16 | c[l + 3] << 24 : u = c[l + 3] | c[l + 2] << 8 | c[l + 1] << 16 | c[l] << 24, d = i(h, d, u, x);
    for (; l < c.length; l++)
      p.push(c[l]);
    return h.slice(0, d).toString("ucs2");
  };
  function i(c, l, u, h) {
    if ((u < 0 || u > 1114111) && (u = h), u >= 65536) {
      u -= 65536;
      var d = 55296 | u >> 10;
      c[l++] = d & 255, c[l++] = d >> 8;
      var u = 56320 | u & 1023;
    }
    return c[l++] = u & 255, c[l++] = u >> 8, l;
  }
  n.prototype.end = function() {
    this.overflow.length = 0;
  }, Et.utf32 = o, Et.ucs4 = "utf32";
  function o(c, l) {
    this.iconv = l;
  }
  o.prototype.encoder = s, o.prototype.decoder = a;
  function s(c, l) {
    c = c || {}, c.addBOM === void 0 && (c.addBOM = !0), this.encoder = l.iconv.getEncoder(c.defaultEncoding || "utf-32le", c);
  }
  s.prototype.write = function(c) {
    return this.encoder.write(c);
  }, s.prototype.end = function() {
    return this.encoder.end();
  };
  function a(c, l) {
    this.decoder = null, this.initialBufs = [], this.initialBufsLen = 0, this.options = c || {}, this.iconv = l.iconv;
  }
  a.prototype.write = function(c) {
    if (!this.decoder) {
      if (this.initialBufs.push(c), this.initialBufsLen += c.length, this.initialBufsLen < 32)
        return "";
      var l = f(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(l, this.options);
      for (var u = "", h = 0; h < this.initialBufs.length; h++)
        u += this.decoder.write(this.initialBufs[h]);
      return this.initialBufs.length = this.initialBufsLen = 0, u;
    }
    return this.decoder.write(c);
  }, a.prototype.end = function() {
    if (!this.decoder) {
      var c = f(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(c, this.options);
      for (var l = "", u = 0; u < this.initialBufs.length; u++)
        l += this.decoder.write(this.initialBufs[u]);
      var h = this.decoder.end();
      return h && (l += h), this.initialBufs.length = this.initialBufsLen = 0, l;
    }
    return this.decoder.end();
  };
  function f(c, l) {
    var u = [], h = 0, d = 0, _ = 0, p = 0, x = 0;
    e:
      for (var y = 0; y < c.length; y++)
        for (var b = c[y], w = 0; w < b.length; w++)
          if (u.push(b[w]), u.length === 4) {
            if (h === 0) {
              if (u[0] === 255 && u[1] === 254 && u[2] === 0 && u[3] === 0)
                return "utf-32le";
              if (u[0] === 0 && u[1] === 0 && u[2] === 254 && u[3] === 255)
                return "utf-32be";
            }
            if ((u[0] !== 0 || u[1] > 16) && _++, (u[3] !== 0 || u[2] > 16) && d++, u[0] === 0 && u[1] === 0 && (u[2] !== 0 || u[3] !== 0) && x++, (u[0] !== 0 || u[1] !== 0) && u[2] === 0 && u[3] === 0 && p++, u.length = 0, h++, h >= 100)
              break e;
          }
    return x - _ > p - d ? "utf-32be" : x - _ < p - d ? "utf-32le" : l || "utf-32le";
  }
  return Et;
}
var P1 = {}, Ma;
function nE() {
  if (Ma) return P1;
  Ma = 1;
  var e = zt.Buffer;
  P1.utf16be = t;
  function t() {
  }
  t.prototype.encoder = r, t.prototype.decoder = n, t.prototype.bomAware = !0;
  function r() {
  }
  r.prototype.write = function(f) {
    for (var c = e.from(f, "ucs2"), l = 0; l < c.length; l += 2) {
      var u = c[l];
      c[l] = c[l + 1], c[l + 1] = u;
    }
    return c;
  }, r.prototype.end = function() {
  };
  function n() {
    this.overflowByte = -1;
  }
  n.prototype.write = function(f) {
    if (f.length == 0)
      return "";
    var c = e.alloc(f.length + 1), l = 0, u = 0;
    for (this.overflowByte !== -1 && (c[0] = f[0], c[1] = this.overflowByte, l = 1, u = 2); l < f.length - 1; l += 2, u += 2)
      c[u] = f[l + 1], c[u + 1] = f[l];
    return this.overflowByte = l == f.length - 1 ? f[f.length - 1] : -1, c.slice(0, u).toString("ucs2");
  }, n.prototype.end = function() {
    this.overflowByte = -1;
  }, P1.utf16 = i;
  function i(f, c) {
    this.iconv = c;
  }
  i.prototype.encoder = o, i.prototype.decoder = s;
  function o(f, c) {
    f = f || {}, f.addBOM === void 0 && (f.addBOM = !0), this.encoder = c.iconv.getEncoder("utf-16le", f);
  }
  o.prototype.write = function(f) {
    return this.encoder.write(f);
  }, o.prototype.end = function() {
    return this.encoder.end();
  };
  function s(f, c) {
    this.decoder = null, this.initialBufs = [], this.initialBufsLen = 0, this.options = f || {}, this.iconv = c.iconv;
  }
  s.prototype.write = function(f) {
    if (!this.decoder) {
      if (this.initialBufs.push(f), this.initialBufsLen += f.length, this.initialBufsLen < 16)
        return "";
      var c = a(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(c, this.options);
      for (var l = "", u = 0; u < this.initialBufs.length; u++)
        l += this.decoder.write(this.initialBufs[u]);
      return this.initialBufs.length = this.initialBufsLen = 0, l;
    }
    return this.decoder.write(f);
  }, s.prototype.end = function() {
    if (!this.decoder) {
      var f = a(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(f, this.options);
      for (var c = "", l = 0; l < this.initialBufs.length; l++)
        c += this.decoder.write(this.initialBufs[l]);
      var u = this.decoder.end();
      return u && (c += u), this.initialBufs.length = this.initialBufsLen = 0, c;
    }
    return this.decoder.end();
  };
  function a(f, c) {
    var l = [], u = 0, h = 0, d = 0;
    e:
      for (var _ = 0; _ < f.length; _++)
        for (var p = f[_], x = 0; x < p.length; x++)
          if (l.push(p[x]), l.length === 2) {
            if (u === 0) {
              if (l[0] === 255 && l[1] === 254) return "utf-16le";
              if (l[0] === 254 && l[1] === 255) return "utf-16be";
            }
            if (l[0] === 0 && l[1] !== 0 && d++, l[0] !== 0 && l[1] === 0 && h++, l.length = 0, u++, u >= 100)
              break e;
          }
    return d > h ? "utf-16be" : d < h ? "utf-16le" : c || "utf-16le";
  }
  return P1;
}
var dn = {}, Ga;
function iE() {
  if (Ga) return dn;
  Ga = 1;
  var e = zt.Buffer;
  dn.utf7 = t, dn.unicode11utf7 = "utf7";
  function t(p, x) {
    this.iconv = x;
  }
  t.prototype.encoder = n, t.prototype.decoder = i, t.prototype.bomAware = !0;
  var r = /[^A-Za-z0-9'\(\),-\.\/:\? \n\r\t]+/g;
  function n(p, x) {
    this.iconv = x.iconv;
  }
  n.prototype.write = function(p) {
    return e.from(p.replace(r, (function(x) {
      return "+" + (x === "+" ? "" : this.iconv.encode(x, "utf16-be").toString("base64").replace(/=+$/, "")) + "-";
    }).bind(this)));
  }, n.prototype.end = function() {
  };
  function i(p, x) {
    this.iconv = x.iconv, this.inBase64 = !1, this.base64Accum = "";
  }
  for (var o = /[A-Za-z0-9\/+]/, s = [], a = 0; a < 256; a++)
    s[a] = o.test(String.fromCharCode(a));
  var f = 43, c = 45, l = 38;
  i.prototype.write = function(p) {
    for (var x = "", y = 0, b = this.inBase64, w = this.base64Accum, T = 0; T < p.length; T++)
      if (!b)
        p[T] == f && (x += this.iconv.decode(p.slice(y, T), "ascii"), y = T + 1, b = !0);
      else if (!s[p[T]]) {
        if (T == y && p[T] == c)
          x += "+";
        else {
          var L = w + this.iconv.decode(p.slice(y, T), "ascii");
          x += this.iconv.decode(e.from(L, "base64"), "utf16-be");
        }
        p[T] != c && T--, y = T + 1, b = !1, w = "";
      }
    if (!b)
      x += this.iconv.decode(p.slice(y), "ascii");
    else {
      var L = w + this.iconv.decode(p.slice(y), "ascii"), G = L.length - L.length % 8;
      w = L.slice(G), L = L.slice(0, G), x += this.iconv.decode(e.from(L, "base64"), "utf16-be");
    }
    return this.inBase64 = b, this.base64Accum = w, x;
  }, i.prototype.end = function() {
    var p = "";
    return this.inBase64 && this.base64Accum.length > 0 && (p = this.iconv.decode(e.from(this.base64Accum, "base64"), "utf16-be")), this.inBase64 = !1, this.base64Accum = "", p;
  }, dn.utf7imap = u;
  function u(p, x) {
    this.iconv = x;
  }
  u.prototype.encoder = h, u.prototype.decoder = d, u.prototype.bomAware = !0;
  function h(p, x) {
    this.iconv = x.iconv, this.inBase64 = !1, this.base64Accum = e.alloc(6), this.base64AccumIdx = 0;
  }
  h.prototype.write = function(p) {
    for (var x = this.inBase64, y = this.base64Accum, b = this.base64AccumIdx, w = e.alloc(p.length * 5 + 10), T = 0, L = 0; L < p.length; L++) {
      var G = p.charCodeAt(L);
      32 <= G && G <= 126 ? (x && (b > 0 && (T += w.write(y.slice(0, b).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), T), b = 0), w[T++] = c, x = !1), x || (w[T++] = G, G === l && (w[T++] = c))) : (x || (w[T++] = l, x = !0), x && (y[b++] = G >> 8, y[b++] = G & 255, b == y.length && (T += w.write(y.toString("base64").replace(/\//g, ","), T), b = 0)));
    }
    return this.inBase64 = x, this.base64AccumIdx = b, w.slice(0, T);
  }, h.prototype.end = function() {
    var p = e.alloc(10), x = 0;
    return this.inBase64 && (this.base64AccumIdx > 0 && (x += p.write(this.base64Accum.slice(0, this.base64AccumIdx).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), x), this.base64AccumIdx = 0), p[x++] = c, this.inBase64 = !1), p.slice(0, x);
  };
  function d(p, x) {
    this.iconv = x.iconv, this.inBase64 = !1, this.base64Accum = "";
  }
  var _ = s.slice();
  return _[44] = !0, d.prototype.write = function(p) {
    for (var x = "", y = 0, b = this.inBase64, w = this.base64Accum, T = 0; T < p.length; T++)
      if (!b)
        p[T] == l && (x += this.iconv.decode(p.slice(y, T), "ascii"), y = T + 1, b = !0);
      else if (!_[p[T]]) {
        if (T == y && p[T] == c)
          x += "&";
        else {
          var L = w + this.iconv.decode(p.slice(y, T), "ascii").replace(/,/g, "/");
          x += this.iconv.decode(e.from(L, "base64"), "utf16-be");
        }
        p[T] != c && T--, y = T + 1, b = !1, w = "";
      }
    if (!b)
      x += this.iconv.decode(p.slice(y), "ascii");
    else {
      var L = w + this.iconv.decode(p.slice(y), "ascii").replace(/,/g, "/"), G = L.length - L.length % 8;
      w = L.slice(G), L = L.slice(0, G), x += this.iconv.decode(e.from(L, "base64"), "utf16-be");
    }
    return this.inBase64 = b, this.base64Accum = w, x;
  }, d.prototype.end = function() {
    var p = "";
    return this.inBase64 && this.base64Accum.length > 0 && (p = this.iconv.decode(e.from(this.base64Accum, "base64"), "utf16-be")), this.inBase64 = !1, this.base64Accum = "", p;
  }, dn;
}
var v0 = {}, Ha;
function oE() {
  if (Ha) return v0;
  Ha = 1;
  var e = zt.Buffer;
  v0._sbcs = t;
  function t(i, o) {
    if (!i)
      throw new Error("SBCS codec is called without the data.");
    if (!i.chars || i.chars.length !== 128 && i.chars.length !== 256)
      throw new Error("Encoding '" + i.type + "' has incorrect 'chars' (must be of len 128 or 256)");
    if (i.chars.length === 128) {
      for (var s = "", a = 0; a < 128; a++)
        s += String.fromCharCode(a);
      i.chars = s + i.chars;
    }
    this.decodeBuf = e.from(i.chars, "ucs2");
    for (var f = e.alloc(65536, o.defaultCharSingleByte.charCodeAt(0)), a = 0; a < i.chars.length; a++)
      f[i.chars.charCodeAt(a)] = a;
    this.encodeBuf = f;
  }
  t.prototype.encoder = r, t.prototype.decoder = n;
  function r(i, o) {
    this.encodeBuf = o.encodeBuf;
  }
  r.prototype.write = function(i) {
    for (var o = e.alloc(i.length), s = 0; s < i.length; s++)
      o[s] = this.encodeBuf[i.charCodeAt(s)];
    return o;
  }, r.prototype.end = function() {
  };
  function n(i, o) {
    this.decodeBuf = o.decodeBuf;
  }
  return n.prototype.write = function(i) {
    for (var o = this.decodeBuf, s = e.alloc(i.length * 2), a = 0, f = 0, c = 0; c < i.length; c++)
      a = i[c] * 2, f = c * 2, s[f] = o[a], s[f + 1] = o[a + 1];
    return s.toString("ucs2");
  }, n.prototype.end = function() {
  }, v0;
}
var A0, Wa;
function sE() {
  return Wa || (Wa = 1, A0 = {
    // Not supported by iconv, not sure why.
    10029: "maccenteuro",
    maccenteuro: {
      type: "_sbcs",
      chars: "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ"
    },
    808: "cp808",
    ibm808: "cp808",
    cp808: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№€■ "
    },
    mik: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя└┴┬├─┼╣║╚╔╩╦╠═╬┐░▒▓│┤№§╗╝┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    cp720: {
      type: "_sbcs",
      chars: "éâàçêëèïîّْô¤ـûùءآأؤ£إئابةتثجحخدذرزسشص«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ضطظعغفµقكلمنهوىي≡ًٌٍَُِ≈°∙·√ⁿ²■ "
    },
    // Aliases of generated encodings.
    ascii8bit: "ascii",
    usascii: "ascii",
    ansix34: "ascii",
    ansix341968: "ascii",
    ansix341986: "ascii",
    csascii: "ascii",
    cp367: "ascii",
    ibm367: "ascii",
    isoir6: "ascii",
    iso646us: "ascii",
    iso646irv: "ascii",
    us: "ascii",
    latin1: "iso88591",
    latin2: "iso88592",
    latin3: "iso88593",
    latin4: "iso88594",
    latin5: "iso88599",
    latin6: "iso885910",
    latin7: "iso885913",
    latin8: "iso885914",
    latin9: "iso885915",
    latin10: "iso885916",
    csisolatin1: "iso88591",
    csisolatin2: "iso88592",
    csisolatin3: "iso88593",
    csisolatin4: "iso88594",
    csisolatincyrillic: "iso88595",
    csisolatinarabic: "iso88596",
    csisolatingreek: "iso88597",
    csisolatinhebrew: "iso88598",
    csisolatin5: "iso88599",
    csisolatin6: "iso885910",
    l1: "iso88591",
    l2: "iso88592",
    l3: "iso88593",
    l4: "iso88594",
    l5: "iso88599",
    l6: "iso885910",
    l7: "iso885913",
    l8: "iso885914",
    l9: "iso885915",
    l10: "iso885916",
    isoir14: "iso646jp",
    isoir57: "iso646cn",
    isoir100: "iso88591",
    isoir101: "iso88592",
    isoir109: "iso88593",
    isoir110: "iso88594",
    isoir144: "iso88595",
    isoir127: "iso88596",
    isoir126: "iso88597",
    isoir138: "iso88598",
    isoir148: "iso88599",
    isoir157: "iso885910",
    isoir166: "tis620",
    isoir179: "iso885913",
    isoir199: "iso885914",
    isoir203: "iso885915",
    isoir226: "iso885916",
    cp819: "iso88591",
    ibm819: "iso88591",
    cyrillic: "iso88595",
    arabic: "iso88596",
    arabic8: "iso88596",
    ecma114: "iso88596",
    asmo708: "iso88596",
    greek: "iso88597",
    greek8: "iso88597",
    ecma118: "iso88597",
    elot928: "iso88597",
    hebrew: "iso88598",
    hebrew8: "iso88598",
    turkish: "iso88599",
    turkish8: "iso88599",
    thai: "iso885911",
    thai8: "iso885911",
    celtic: "iso885914",
    celtic8: "iso885914",
    isoceltic: "iso885914",
    tis6200: "tis620",
    tis62025291: "tis620",
    tis62025330: "tis620",
    1e4: "macroman",
    10006: "macgreek",
    10007: "maccyrillic",
    10079: "maciceland",
    10081: "macturkish",
    cspc8codepage437: "cp437",
    cspc775baltic: "cp775",
    cspc850multilingual: "cp850",
    cspcp852: "cp852",
    cspc862latinhebrew: "cp862",
    cpgr: "cp869",
    msee: "cp1250",
    mscyrl: "cp1251",
    msansi: "cp1252",
    msgreek: "cp1253",
    msturk: "cp1254",
    mshebr: "cp1255",
    msarab: "cp1256",
    winbaltrim: "cp1257",
    cp20866: "koi8r",
    20866: "koi8r",
    ibm878: "koi8r",
    cskoi8r: "koi8r",
    cp21866: "koi8u",
    21866: "koi8u",
    ibm1168: "koi8u",
    strk10482002: "rk1048",
    tcvn5712: "tcvn",
    tcvn57121: "tcvn",
    gb198880: "iso646cn",
    cn: "iso646cn",
    csiso14jisc6220ro: "iso646jp",
    jisc62201969ro: "iso646jp",
    jp: "iso646jp",
    cshproman8: "hproman8",
    r8: "hproman8",
    roman8: "hproman8",
    xroman8: "hproman8",
    ibm1051: "hproman8",
    mac: "macintosh",
    csmacintosh: "macintosh"
  }), A0;
}
var w0, qa;
function aE() {
  return qa || (qa = 1, w0 = {
    437: "cp437",
    737: "cp737",
    775: "cp775",
    850: "cp850",
    852: "cp852",
    855: "cp855",
    856: "cp856",
    857: "cp857",
    858: "cp858",
    860: "cp860",
    861: "cp861",
    862: "cp862",
    863: "cp863",
    864: "cp864",
    865: "cp865",
    866: "cp866",
    869: "cp869",
    874: "windows874",
    922: "cp922",
    1046: "cp1046",
    1124: "cp1124",
    1125: "cp1125",
    1129: "cp1129",
    1133: "cp1133",
    1161: "cp1161",
    1162: "cp1162",
    1163: "cp1163",
    1250: "windows1250",
    1251: "windows1251",
    1252: "windows1252",
    1253: "windows1253",
    1254: "windows1254",
    1255: "windows1255",
    1256: "windows1256",
    1257: "windows1257",
    1258: "windows1258",
    28591: "iso88591",
    28592: "iso88592",
    28593: "iso88593",
    28594: "iso88594",
    28595: "iso88595",
    28596: "iso88596",
    28597: "iso88597",
    28598: "iso88598",
    28599: "iso88599",
    28600: "iso885910",
    28601: "iso885911",
    28603: "iso885913",
    28604: "iso885914",
    28605: "iso885915",
    28606: "iso885916",
    windows874: {
      type: "_sbcs",
      chars: "€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    win874: "windows874",
    cp874: "windows874",
    windows1250: {
      type: "_sbcs",
      chars: "€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
    },
    win1250: "windows1250",
    cp1250: "windows1250",
    windows1251: {
      type: "_sbcs",
      chars: "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    win1251: "windows1251",
    cp1251: "windows1251",
    windows1252: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    win1252: "windows1252",
    cp1252: "windows1252",
    windows1253: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
    },
    win1253: "windows1253",
    cp1253: "windows1253",
    windows1254: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
    },
    win1254: "windows1254",
    cp1254: "windows1254",
    windows1255: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹֺֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
    },
    win1255: "windows1255",
    cp1255: "windows1255",
    windows1256: {
      type: "_sbcs",
      chars: "€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے"
    },
    win1256: "windows1256",
    cp1256: "windows1256",
    windows1257: {
      type: "_sbcs",
      chars: "€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙"
    },
    win1257: "windows1257",
    cp1257: "windows1257",
    windows1258: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    win1258: "windows1258",
    cp1258: "windows1258",
    iso88591: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    cp28591: "iso88591",
    iso88592: {
      type: "_sbcs",
      chars: " Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
    },
    cp28592: "iso88592",
    iso88593: {
      type: "_sbcs",
      chars: " Ħ˘£¤�Ĥ§¨İŞĞĴ­�Ż°ħ²³´µĥ·¸ışğĵ½�żÀÁÂ�ÄĊĈÇÈÉÊËÌÍÎÏ�ÑÒÓÔĠÖ×ĜÙÚÛÜŬŜßàáâ�äċĉçèéêëìíîï�ñòóôġö÷ĝùúûüŭŝ˙"
    },
    cp28593: "iso88593",
    iso88594: {
      type: "_sbcs",
      chars: " ĄĸŖ¤ĨĻ§¨ŠĒĢŦ­Ž¯°ą˛ŗ´ĩļˇ¸šēģŧŊžŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎĪĐŅŌĶÔÕÖ×ØŲÚÛÜŨŪßāáâãäåæįčéęëėíîīđņōķôõö÷øųúûüũū˙"
    },
    cp28594: "iso88594",
    iso88595: {
      type: "_sbcs",
      chars: " ЁЂЃЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђѓєѕіїјљњћќ§ўџ"
    },
    cp28595: "iso88595",
    iso88596: {
      type: "_sbcs",
      chars: " ���¤�������،­�������������؛���؟�ءآأؤإئابةتثجحخدذرزسشصضطظعغ�����ـفقكلمنهوىيًٌٍَُِّْ�������������"
    },
    cp28596: "iso88596",
    iso88597: {
      type: "_sbcs",
      chars: " ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
    },
    cp28597: "iso88597",
    iso88598: {
      type: "_sbcs",
      chars: " �¢£¤¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾��������������������������������‗אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
    },
    cp28598: "iso88598",
    iso88599: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
    },
    cp28599: "iso88599",
    iso885910: {
      type: "_sbcs",
      chars: " ĄĒĢĪĨĶ§ĻĐŠŦŽ­ŪŊ°ąēģīĩķ·ļđšŧž―ūŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎÏÐŅŌÓÔÕÖŨØŲÚÛÜÝÞßāáâãäåæįčéęëėíîïðņōóôõöũøųúûüýþĸ"
    },
    cp28600: "iso885910",
    iso885911: {
      type: "_sbcs",
      chars: " กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    cp28601: "iso885911",
    iso885913: {
      type: "_sbcs",
      chars: " ”¢£¤„¦§Ø©Ŗ«¬­®Æ°±²³“µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž’"
    },
    cp28603: "iso885913",
    iso885914: {
      type: "_sbcs",
      chars: " Ḃḃ£ĊċḊ§Ẁ©ẂḋỲ­®ŸḞḟĠġṀṁ¶ṖẁṗẃṠỳẄẅṡÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŴÑÒÓÔÕÖṪØÙÚÛÜÝŶßàáâãäåæçèéêëìíîïŵñòóôõöṫøùúûüýŷÿ"
    },
    cp28604: "iso885914",
    iso885915: {
      type: "_sbcs",
      chars: " ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    cp28605: "iso885915",
    iso885916: {
      type: "_sbcs",
      chars: " ĄąŁ€„Š§š©Ș«Ź­źŻ°±ČłŽ”¶·žčș»ŒœŸżÀÁÂĂÄĆÆÇÈÉÊËÌÍÎÏĐŃÒÓÔŐÖŚŰÙÚÛÜĘȚßàáâăäćæçèéêëìíîïđńòóôőöśűùúûüęțÿ"
    },
    cp28606: "iso885916",
    cp437: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm437: "cp437",
    csibm437: "cp437",
    cp737: {
      type: "_sbcs",
      chars: "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ "
    },
    ibm737: "cp737",
    csibm737: "cp737",
    cp775: {
      type: "_sbcs",
      chars: "ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ "
    },
    ibm775: "cp775",
    csibm775: "cp775",
    cp850: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm850: "cp850",
    csibm850: "cp850",
    cp852: {
      type: "_sbcs",
      chars: "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ "
    },
    ibm852: "cp852",
    csibm852: "cp852",
    cp855: {
      type: "_sbcs",
      chars: "ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ "
    },
    ibm855: "cp855",
    csibm855: "cp855",
    cp856: {
      type: "_sbcs",
      chars: "אבגדהוזחטיךכלםמןנסעףפץצקרשת�£�×����������®¬½¼�«»░▒▓│┤���©╣║╗╝¢¥┐└┴┬├─┼��╚╔╩╦╠═╬¤���������┘┌█▄¦�▀������µ�������¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm856: "cp856",
    csibm856: "cp856",
    cp857: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ "
    },
    ibm857: "cp857",
    csibm857: "cp857",
    cp858: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm858: "cp858",
    csibm858: "cp858",
    cp860: {
      type: "_sbcs",
      chars: "ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm860: "cp860",
    csibm860: "cp860",
    cp861: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm861: "cp861",
    csibm861: "cp861",
    cp862: {
      type: "_sbcs",
      chars: "אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm862: "cp862",
    csibm862: "cp862",
    cp863: {
      type: "_sbcs",
      chars: "ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm863: "cp863",
    csibm863: "cp863",
    cp864: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�`
    },
    ibm864: "cp864",
    csibm864: "cp864",
    cp865: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm865: "cp865",
    csibm865: "cp865",
    cp866: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ "
    },
    ibm866: "cp866",
    csibm866: "cp866",
    cp869: {
      type: "_sbcs",
      chars: "������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ "
    },
    ibm869: "cp869",
    csibm869: "cp869",
    cp922: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ"
    },
    ibm922: "cp922",
    csibm922: "cp922",
    cp1046: {
      type: "_sbcs",
      chars: "ﺈ×÷ﹱ■│─┐┌└┘ﹹﹻﹽﹿﹷﺊﻰﻳﻲﻎﻏﻐﻶﻸﻺﻼ ¤ﺋﺑﺗﺛﺟﺣ،­ﺧﺳ٠١٢٣٤٥٦٧٨٩ﺷ؛ﺻﺿﻊ؟ﻋءآأؤإئابةتثجحخدذرزسشصضطﻇعغﻌﺂﺄﺎﻓـفقكلمنهوىيًٌٍَُِّْﻗﻛﻟﻵﻷﻹﻻﻣﻧﻬﻩ�"
    },
    ibm1046: "cp1046",
    csibm1046: "cp1046",
    cp1124: {
      type: "_sbcs",
      chars: " ЁЂҐЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђґєѕіїјљњћќ§ўџ"
    },
    ibm1124: "cp1124",
    csibm1124: "cp1124",
    cp1125: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ "
    },
    ibm1125: "cp1125",
    csibm1125: "cp1125",
    cp1129: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    ibm1129: "cp1129",
    csibm1129: "cp1129",
    cp1133: {
      type: "_sbcs",
      chars: " ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ���ຯະາຳິີຶືຸູຼັົຽ���ເແໂໃໄ່້໊໋໌ໍໆ�ໜໝ₭����������������໐໑໒໓໔໕໖໗໘໙��¢¬¦�"
    },
    ibm1133: "cp1133",
    csibm1133: "cp1133",
    cp1161: {
      type: "_sbcs",
      chars: "��������������������������������่กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู้๊๋€฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛¢¬¦ "
    },
    ibm1161: "cp1161",
    csibm1161: "cp1161",
    cp1162: {
      type: "_sbcs",
      chars: "€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    ibm1162: "cp1162",
    csibm1162: "cp1162",
    cp1163: {
      type: "_sbcs",
      chars: " ¡¢£€¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    ibm1163: "cp1163",
    csibm1163: "cp1163",
    maccroatian: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊�©⁄¤‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ"
    },
    maccyrillic: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
    },
    macgreek: {
      type: "_sbcs",
      chars: "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�"
    },
    maciceland: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macroman: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macromania: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂŞ∞±≤≥¥µ∂∑∏π∫ªºΩăş¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›Ţţ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macthai: {
      type: "_sbcs",
      chars: "«»…“”�•‘’� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู\uFEFF​–—฿เแโใไๅๆ็่้๊๋์ํ™๏๐๑๒๓๔๕๖๗๘๙®©����"
    },
    macturkish: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macukraine: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
    },
    koi8r: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ё╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡Ё╢╣╤╥╦╧╨╩╪╫╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8u: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґ╝╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪Ґ╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8ru: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґў╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪ҐЎ©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8t: {
      type: "_sbcs",
      chars: "қғ‚Ғ„…†‡�‰ҳ‹ҲҷҶ�Қ‘’“”•–—�™�›�����ӯӮё¤ӣ¦§���«¬­®�°±²Ё�Ӣ¶·�№�»���©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    armscii8: {
      type: "_sbcs",
      chars: " �և։)(»«—.՝,-֊…՜՛՞ԱաԲբԳգԴդԵեԶզԷէԸըԹթԺժԻիԼլԽխԾծԿկՀհՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռՍսՎվՏտՐրՑցՒւՓփՔքՕօՖֆ՚�"
    },
    rk1048: {
      type: "_sbcs",
      chars: "ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    tcvn: {
      type: "_sbcs",
      chars: `\0ÚỤỪỬỮ\x07\b	
\v\f\rỨỰỲỶỸÝỴ\x1B !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~ÀẢÃÁẠẶẬÈẺẼÉẸỆÌỈĨÍỊÒỎÕÓỌỘỜỞỠỚỢÙỦŨ ĂÂÊÔƠƯĐăâêôơưđẶ̀̀̉̃́àảãáạẲằẳẵắẴẮẦẨẪẤỀặầẩẫấậèỂẻẽéẹềểễếệìỉỄẾỒĩíịòỔỏõóọồổỗốộờởỡớợùỖủũúụừửữứựỳỷỹýỵỐ`
    },
    georgianacademy: {
      type: "_sbcs",
      chars: "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    georgianps: {
      type: "_sbcs",
      chars: "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    pt154: {
      type: "_sbcs",
      chars: "ҖҒӮғ„…ҶҮҲүҠӢҢҚҺҸҗ‘’“”•–—ҳҷҡӣңқһҹ ЎўЈӨҘҰ§Ё©Ә«¬ӯ®Ҝ°ұІіҙө¶·ё№ә»јҪҫҝАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    viscii: {
      type: "_sbcs",
      chars: `\0ẲẴẪ\x07\b	
\v\f\rỶỸ\x1BỴ !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~ẠẮẰẶẤẦẨẬẼẸẾỀỂỄỆỐỒỔỖỘỢỚỜỞỊỎỌỈỦŨỤỲÕắằặấầẩậẽẹếềểễệốồổỗỠƠộờởịỰỨỪỬơớƯÀÁÂÃẢĂẳẵÈÉÊẺÌÍĨỳĐứÒÓÔạỷừửÙÚỹỵÝỡưàáâãảăữẫèéêẻìíĩỉđựòóôõỏọụùúũủýợỮ`
    },
    iso646cn: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#¥%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������`
    },
    iso646jp: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[¥]^_\`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������`
    },
    hproman8: {
      type: "_sbcs",
      chars: " ÀÂÈÊËÎÏ´ˋˆ¨˜ÙÛ₤¯Ýý°ÇçÑñ¡¿¤£¥§ƒ¢âêôûáéóúàèòùäëöüÅîØÆåíøæÄìÖÜÉïßÔÁÃãÐðÍÌÓÒÕõŠšÚŸÿÞþ·µ¶¾—¼½ªº«■»±�"
    },
    macintosh: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    ascii: {
      type: "_sbcs",
      chars: "��������������������������������������������������������������������������������������������������������������������������������"
    },
    tis620: {
      type: "_sbcs",
      chars: "���������������������������������กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    }
  }), w0;
}
var P0 = {}, ja;
function fE() {
  if (ja) return P0;
  ja = 1;
  var e = zt.Buffer;
  P0._dbcs = f;
  for (var t = -1, r = -2, n = -10, i = -1e3, o = new Array(256), s = -1, a = 0; a < 256; a++)
    o[a] = t;
  function f(h, d) {
    if (this.encodingName = h.encodingName, !h)
      throw new Error("DBCS codec is called without the data.");
    if (!h.table)
      throw new Error("Encoding '" + this.encodingName + "' has no data.");
    var _ = h.table();
    this.decodeTables = [], this.decodeTables[0] = o.slice(0), this.decodeTableSeq = [];
    for (var p = 0; p < _.length; p++)
      this._addDecodeChunk(_[p]);
    if (typeof h.gb18030 == "function") {
      this.gb18030 = h.gb18030();
      var x = this.decodeTables.length;
      this.decodeTables.push(o.slice(0));
      var y = this.decodeTables.length;
      this.decodeTables.push(o.slice(0));
      for (var b = this.decodeTables[0], p = 129; p <= 254; p++)
        for (var w = this.decodeTables[i - b[p]], T = 48; T <= 57; T++) {
          if (w[T] === t)
            w[T] = i - x;
          else if (w[T] > i)
            throw new Error("gb18030 decode tables conflict at byte 2");
          for (var L = this.decodeTables[i - w[T]], G = 129; G <= 254; G++) {
            if (L[G] === t)
              L[G] = i - y;
            else {
              if (L[G] === i - y)
                continue;
              if (L[G] > i)
                throw new Error("gb18030 decode tables conflict at byte 3");
            }
            for (var H = this.decodeTables[i - L[G]], Q = 48; Q <= 57; Q++)
              H[Q] === t && (H[Q] = r);
          }
        }
    }
    this.defaultCharUnicode = d.defaultCharUnicode, this.encodeTable = [], this.encodeTableSeq = [];
    var C = {};
    if (h.encodeSkipVals)
      for (var p = 0; p < h.encodeSkipVals.length; p++) {
        var q = h.encodeSkipVals[p];
        if (typeof q == "number")
          C[q] = !0;
        else
          for (var T = q.from; T <= q.to; T++)
            C[T] = !0;
      }
    if (this._fillEncodeTable(0, 0, C), h.encodeAdd)
      for (var F in h.encodeAdd)
        Object.prototype.hasOwnProperty.call(h.encodeAdd, F) && this._setEncodeChar(F.charCodeAt(0), h.encodeAdd[F]);
    this.defCharSB = this.encodeTable[0][d.defaultCharSingleByte.charCodeAt(0)], this.defCharSB === t && (this.defCharSB = this.encodeTable[0]["?"]), this.defCharSB === t && (this.defCharSB = 63);
  }
  f.prototype.encoder = c, f.prototype.decoder = l, f.prototype._getDecodeTrieNode = function(h) {
    for (var d = []; h > 0; h >>>= 8)
      d.push(h & 255);
    d.length == 0 && d.push(0);
    for (var _ = this.decodeTables[0], p = d.length - 1; p > 0; p--) {
      var x = _[d[p]];
      if (x == t)
        _[d[p]] = i - this.decodeTables.length, this.decodeTables.push(_ = o.slice(0));
      else if (x <= i)
        _ = this.decodeTables[i - x];
      else
        throw new Error("Overwrite byte in " + this.encodingName + ", addr: " + h.toString(16));
    }
    return _;
  }, f.prototype._addDecodeChunk = function(h) {
    var d = parseInt(h[0], 16), _ = this._getDecodeTrieNode(d);
    d = d & 255;
    for (var p = 1; p < h.length; p++) {
      var x = h[p];
      if (typeof x == "string")
        for (var y = 0; y < x.length; ) {
          var b = x.charCodeAt(y++);
          if (55296 <= b && b < 56320) {
            var w = x.charCodeAt(y++);
            if (56320 <= w && w < 57344)
              _[d++] = 65536 + (b - 55296) * 1024 + (w - 56320);
            else
              throw new Error("Incorrect surrogate pair in " + this.encodingName + " at chunk " + h[0]);
          } else if (4080 < b && b <= 4095) {
            for (var T = 4095 - b + 2, L = [], G = 0; G < T; G++)
              L.push(x.charCodeAt(y++));
            _[d++] = n - this.decodeTableSeq.length, this.decodeTableSeq.push(L);
          } else
            _[d++] = b;
        }
      else if (typeof x == "number")
        for (var H = _[d - 1] + 1, y = 0; y < x; y++)
          _[d++] = H++;
      else
        throw new Error("Incorrect type '" + typeof x + "' given in " + this.encodingName + " at chunk " + h[0]);
    }
    if (d > 255)
      throw new Error("Incorrect chunk in " + this.encodingName + " at addr " + h[0] + ": too long" + d);
  }, f.prototype._getEncodeBucket = function(h) {
    var d = h >> 8;
    return this.encodeTable[d] === void 0 && (this.encodeTable[d] = o.slice(0)), this.encodeTable[d];
  }, f.prototype._setEncodeChar = function(h, d) {
    var _ = this._getEncodeBucket(h), p = h & 255;
    _[p] <= n ? this.encodeTableSeq[n - _[p]][s] = d : _[p] == t && (_[p] = d);
  }, f.prototype._setEncodeSequence = function(h, d) {
    var _ = h[0], p = this._getEncodeBucket(_), x = _ & 255, y;
    p[x] <= n ? y = this.encodeTableSeq[n - p[x]] : (y = {}, p[x] !== t && (y[s] = p[x]), p[x] = n - this.encodeTableSeq.length, this.encodeTableSeq.push(y));
    for (var b = 1; b < h.length - 1; b++) {
      var w = y[_];
      typeof w == "object" ? y = w : (y = y[_] = {}, w !== void 0 && (y[s] = w));
    }
    _ = h[h.length - 1], y[_] = d;
  }, f.prototype._fillEncodeTable = function(h, d, _) {
    for (var p = this.decodeTables[h], x = !1, y = {}, b = 0; b < 256; b++) {
      var w = p[b], T = d + b;
      if (!_[T])
        if (w >= 0)
          this._setEncodeChar(w, T), x = !0;
        else if (w <= i) {
          var L = i - w;
          if (!y[L]) {
            var G = T << 8 >>> 0;
            this._fillEncodeTable(L, G, _) ? x = !0 : y[L] = !0;
          }
        } else w <= n && (this._setEncodeSequence(this.decodeTableSeq[n - w], T), x = !0);
    }
    return x;
  };
  function c(h, d) {
    this.leadSurrogate = -1, this.seqObj = void 0, this.encodeTable = d.encodeTable, this.encodeTableSeq = d.encodeTableSeq, this.defaultCharSingleByte = d.defCharSB, this.gb18030 = d.gb18030;
  }
  c.prototype.write = function(h) {
    for (var d = e.alloc(h.length * (this.gb18030 ? 4 : 3)), _ = this.leadSurrogate, p = this.seqObj, x = -1, y = 0, b = 0; ; ) {
      if (x === -1) {
        if (y == h.length) break;
        var w = h.charCodeAt(y++);
      } else {
        var w = x;
        x = -1;
      }
      if (55296 <= w && w < 57344)
        if (w < 56320)
          if (_ === -1) {
            _ = w;
            continue;
          } else
            _ = w, w = t;
        else
          _ !== -1 ? (w = 65536 + (_ - 55296) * 1024 + (w - 56320), _ = -1) : w = t;
      else _ !== -1 && (x = w, w = t, _ = -1);
      var T = t;
      if (p !== void 0 && w != t) {
        var L = p[w];
        if (typeof L == "object") {
          p = L;
          continue;
        } else typeof L == "number" ? T = L : L == null && (L = p[s], L !== void 0 && (T = L, x = w));
        p = void 0;
      } else if (w >= 0) {
        var G = this.encodeTable[w >> 8];
        if (G !== void 0 && (T = G[w & 255]), T <= n) {
          p = this.encodeTableSeq[n - T];
          continue;
        }
        if (T == t && this.gb18030) {
          var H = u(this.gb18030.uChars, w);
          if (H != -1) {
            var T = this.gb18030.gbChars[H] + (w - this.gb18030.uChars[H]);
            d[b++] = 129 + Math.floor(T / 12600), T = T % 12600, d[b++] = 48 + Math.floor(T / 1260), T = T % 1260, d[b++] = 129 + Math.floor(T / 10), T = T % 10, d[b++] = 48 + T;
            continue;
          }
        }
      }
      T === t && (T = this.defaultCharSingleByte), T < 256 ? d[b++] = T : T < 65536 ? (d[b++] = T >> 8, d[b++] = T & 255) : T < 16777216 ? (d[b++] = T >> 16, d[b++] = T >> 8 & 255, d[b++] = T & 255) : (d[b++] = T >>> 24, d[b++] = T >>> 16 & 255, d[b++] = T >>> 8 & 255, d[b++] = T & 255);
    }
    return this.seqObj = p, this.leadSurrogate = _, d.slice(0, b);
  }, c.prototype.end = function() {
    if (!(this.leadSurrogate === -1 && this.seqObj === void 0)) {
      var h = e.alloc(10), d = 0;
      if (this.seqObj) {
        var _ = this.seqObj[s];
        _ !== void 0 && (_ < 256 ? h[d++] = _ : (h[d++] = _ >> 8, h[d++] = _ & 255)), this.seqObj = void 0;
      }
      return this.leadSurrogate !== -1 && (h[d++] = this.defaultCharSingleByte, this.leadSurrogate = -1), h.slice(0, d);
    }
  }, c.prototype.findIdx = u;
  function l(h, d) {
    this.nodeIdx = 0, this.prevBytes = [], this.decodeTables = d.decodeTables, this.decodeTableSeq = d.decodeTableSeq, this.defaultCharUnicode = d.defaultCharUnicode, this.gb18030 = d.gb18030;
  }
  l.prototype.write = function(h) {
    for (var d = e.alloc(h.length * 2), _ = this.nodeIdx, p = this.prevBytes, x = this.prevBytes.length, y = -this.prevBytes.length, b, w = 0, T = 0; w < h.length; w++) {
      var L = w >= 0 ? h[w] : p[w + x], b = this.decodeTables[_][L];
      if (!(b >= 0)) if (b === t)
        b = this.defaultCharUnicode.charCodeAt(0), w = y;
      else if (b === r) {
        if (w >= 3)
          var G = (h[w - 3] - 129) * 12600 + (h[w - 2] - 48) * 1260 + (h[w - 1] - 129) * 10 + (L - 48);
        else
          var G = (p[w - 3 + x] - 129) * 12600 + ((w - 2 >= 0 ? h[w - 2] : p[w - 2 + x]) - 48) * 1260 + ((w - 1 >= 0 ? h[w - 1] : p[w - 1 + x]) - 129) * 10 + (L - 48);
        var H = u(this.gb18030.gbChars, G);
        b = this.gb18030.uChars[H] + G - this.gb18030.gbChars[H];
      } else if (b <= i) {
        _ = i - b;
        continue;
      } else if (b <= n) {
        for (var Q = this.decodeTableSeq[n - b], C = 0; C < Q.length - 1; C++)
          b = Q[C], d[T++] = b & 255, d[T++] = b >> 8;
        b = Q[Q.length - 1];
      } else
        throw new Error("iconv-lite internal error: invalid decoding table value " + b + " at " + _ + "/" + L);
      if (b >= 65536) {
        b -= 65536;
        var q = 55296 | b >> 10;
        d[T++] = q & 255, d[T++] = q >> 8, b = 56320 | b & 1023;
      }
      d[T++] = b & 255, d[T++] = b >> 8, _ = 0, y = w + 1;
    }
    return this.nodeIdx = _, this.prevBytes = y >= 0 ? Array.prototype.slice.call(h, y) : p.slice(y + x).concat(Array.prototype.slice.call(h)), d.slice(0, T).toString("ucs2");
  }, l.prototype.end = function() {
    for (var h = ""; this.prevBytes.length > 0; ) {
      h += this.defaultCharUnicode;
      var d = this.prevBytes.slice(1);
      this.prevBytes = [], this.nodeIdx = 0, d.length > 0 && (h += this.write(d));
    }
    return this.prevBytes = [], this.nodeIdx = 0, h;
  };
  function u(h, d) {
    if (h[0] > d)
      return -1;
    for (var _ = 0, p = h.length; _ < p - 1; ) {
      var x = _ + (p - _ + 1 >> 1);
      h[x] <= d ? _ = x : p = x;
    }
    return _;
  }
  return P0;
}
const lE = [
  [
    "0",
    "\0",
    128
  ],
  [
    "a1",
    "｡",
    62
  ],
  [
    "8140",
    "　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
    9,
    "＋－±×"
  ],
  [
    "8180",
    "÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓"
  ],
  [
    "81b8",
    "∈∋⊆⊇⊂⊃∪∩"
  ],
  [
    "81c8",
    "∧∨￢⇒⇔∀∃"
  ],
  [
    "81da",
    "∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
  ],
  [
    "81f0",
    "Å‰♯♭♪†‡¶"
  ],
  [
    "81fc",
    "◯"
  ],
  [
    "824f",
    "０",
    9
  ],
  [
    "8260",
    "Ａ",
    25
  ],
  [
    "8281",
    "ａ",
    25
  ],
  [
    "829f",
    "ぁ",
    82
  ],
  [
    "8340",
    "ァ",
    62
  ],
  [
    "8380",
    "ム",
    22
  ],
  [
    "839f",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "83bf",
    "α",
    16,
    "σ",
    6
  ],
  [
    "8440",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "8470",
    "а",
    5,
    "ёж",
    7
  ],
  [
    "8480",
    "о",
    17
  ],
  [
    "849f",
    "─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
  ],
  [
    "8740",
    "①",
    19,
    "Ⅰ",
    9
  ],
  [
    "875f",
    "㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
  ],
  [
    "877e",
    "㍻"
  ],
  [
    "8780",
    "〝〟№㏍℡㊤",
    4,
    "㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
  ],
  [
    "889f",
    "亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
  ],
  [
    "8940",
    "院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円"
  ],
  [
    "8980",
    "園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
  ],
  [
    "8a40",
    "魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫"
  ],
  [
    "8a80",
    "橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
  ],
  [
    "8b40",
    "機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救"
  ],
  [
    "8b80",
    "朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
  ],
  [
    "8c40",
    "掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨"
  ],
  [
    "8c80",
    "劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
  ],
  [
    "8d40",
    "后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降"
  ],
  [
    "8d80",
    "項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
  ],
  [
    "8e40",
    "察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止"
  ],
  [
    "8e80",
    "死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
  ],
  [
    "8f40",
    "宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳"
  ],
  [
    "8f80",
    "準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
  ],
  [
    "9040",
    "拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨"
  ],
  [
    "9080",
    "逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
  ],
  [
    "9140",
    "繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻"
  ],
  [
    "9180",
    "操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
  ],
  [
    "9240",
    "叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄"
  ],
  [
    "9280",
    "逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
  ],
  [
    "9340",
    "邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬"
  ],
  [
    "9380",
    "凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
  ],
  [
    "9440",
    "如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅"
  ],
  [
    "9480",
    "楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
  ],
  [
    "9540",
    "鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷"
  ],
  [
    "9580",
    "斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
  ],
  [
    "9640",
    "法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆"
  ],
  [
    "9680",
    "摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
  ],
  [
    "9740",
    "諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲"
  ],
  [
    "9780",
    "沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
  ],
  [
    "9840",
    "蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
  ],
  [
    "989f",
    "弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
  ],
  [
    "9940",
    "僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭"
  ],
  [
    "9980",
    "凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
  ],
  [
    "9a40",
    "咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸"
  ],
  [
    "9a80",
    "噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
  ],
  [
    "9b40",
    "奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀"
  ],
  [
    "9b80",
    "它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
  ],
  [
    "9c40",
    "廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠"
  ],
  [
    "9c80",
    "怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
  ],
  [
    "9d40",
    "戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫"
  ],
  [
    "9d80",
    "捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
  ],
  [
    "9e40",
    "曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎"
  ],
  [
    "9e80",
    "梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
  ],
  [
    "9f40",
    "檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯"
  ],
  [
    "9f80",
    "麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
  ],
  [
    "e040",
    "漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝"
  ],
  [
    "e080",
    "烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
  ],
  [
    "e140",
    "瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿"
  ],
  [
    "e180",
    "痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
  ],
  [
    "e240",
    "磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰"
  ],
  [
    "e280",
    "窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
  ],
  [
    "e340",
    "紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷"
  ],
  [
    "e380",
    "縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
  ],
  [
    "e440",
    "隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤"
  ],
  [
    "e480",
    "艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
  ],
  [
    "e540",
    "蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬"
  ],
  [
    "e580",
    "蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
  ],
  [
    "e640",
    "襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧"
  ],
  [
    "e680",
    "諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
  ],
  [
    "e740",
    "蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜"
  ],
  [
    "e780",
    "轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
  ],
  [
    "e840",
    "錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙"
  ],
  [
    "e880",
    "閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
  ],
  [
    "e940",
    "顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃"
  ],
  [
    "e980",
    "騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
  ],
  [
    "ea40",
    "鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯"
  ],
  [
    "ea80",
    "黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙"
  ],
  [
    "ed40",
    "纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏"
  ],
  [
    "ed80",
    "塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
  ],
  [
    "ee40",
    "犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙"
  ],
  [
    "ee80",
    "蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ],
  [
    "eeef",
    "ⅰ",
    9,
    "￢￤＇＂"
  ],
  [
    "f040",
    "",
    62
  ],
  [
    "f080",
    "",
    124
  ],
  [
    "f140",
    "",
    62
  ],
  [
    "f180",
    "",
    124
  ],
  [
    "f240",
    "",
    62
  ],
  [
    "f280",
    "",
    124
  ],
  [
    "f340",
    "",
    62
  ],
  [
    "f380",
    "",
    124
  ],
  [
    "f440",
    "",
    62
  ],
  [
    "f480",
    "",
    124
  ],
  [
    "f540",
    "",
    62
  ],
  [
    "f580",
    "",
    124
  ],
  [
    "f640",
    "",
    62
  ],
  [
    "f680",
    "",
    124
  ],
  [
    "f740",
    "",
    62
  ],
  [
    "f780",
    "",
    124
  ],
  [
    "f840",
    "",
    62
  ],
  [
    "f880",
    "",
    124
  ],
  [
    "f940",
    ""
  ],
  [
    "fa40",
    "ⅰ",
    9,
    "Ⅰ",
    9,
    "￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊"
  ],
  [
    "fa80",
    "兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯"
  ],
  [
    "fb40",
    "涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神"
  ],
  [
    "fb80",
    "祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙"
  ],
  [
    "fc40",
    "髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ]
], cE = [
  [
    "0",
    "\0",
    127
  ],
  [
    "8ea1",
    "｡",
    62
  ],
  [
    "a1a1",
    "　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
    9,
    "＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇"
  ],
  [
    "a2a1",
    "◆□■△▲▽▼※〒→←↑↓〓"
  ],
  [
    "a2ba",
    "∈∋⊆⊇⊂⊃∪∩"
  ],
  [
    "a2ca",
    "∧∨￢⇒⇔∀∃"
  ],
  [
    "a2dc",
    "∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
  ],
  [
    "a2f2",
    "Å‰♯♭♪†‡¶"
  ],
  [
    "a2fe",
    "◯"
  ],
  [
    "a3b0",
    "０",
    9
  ],
  [
    "a3c1",
    "Ａ",
    25
  ],
  [
    "a3e1",
    "ａ",
    25
  ],
  [
    "a4a1",
    "ぁ",
    82
  ],
  [
    "a5a1",
    "ァ",
    85
  ],
  [
    "a6a1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a6c1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a7a1",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "a7d1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "a8a1",
    "─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
  ],
  [
    "ada1",
    "①",
    19,
    "Ⅰ",
    9
  ],
  [
    "adc0",
    "㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
  ],
  [
    "addf",
    "㍻〝〟№㏍℡㊤",
    4,
    "㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
  ],
  [
    "b0a1",
    "亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
  ],
  [
    "b1a1",
    "院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応"
  ],
  [
    "b2a1",
    "押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
  ],
  [
    "b3a1",
    "魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱"
  ],
  [
    "b4a1",
    "粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
  ],
  [
    "b5a1",
    "機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京"
  ],
  [
    "b6a1",
    "供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
  ],
  [
    "b7a1",
    "掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲"
  ],
  [
    "b8a1",
    "検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
  ],
  [
    "b9a1",
    "后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込"
  ],
  [
    "baa1",
    "此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
  ],
  [
    "bba1",
    "察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時"
  ],
  [
    "bca1",
    "次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
  ],
  [
    "bda1",
    "宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償"
  ],
  [
    "bea1",
    "勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
  ],
  [
    "bfa1",
    "拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾"
  ],
  [
    "c0a1",
    "澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
  ],
  [
    "c1a1",
    "繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎"
  ],
  [
    "c2a1",
    "臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
  ],
  [
    "c3a1",
    "叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵"
  ],
  [
    "c4a1",
    "帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
  ],
  [
    "c5a1",
    "邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到"
  ],
  [
    "c6a1",
    "董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
  ],
  [
    "c7a1",
    "如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦"
  ],
  [
    "c8a1",
    "函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
  ],
  [
    "c9a1",
    "鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服"
  ],
  [
    "caa1",
    "福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
  ],
  [
    "cba1",
    "法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満"
  ],
  [
    "cca1",
    "漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
  ],
  [
    "cda1",
    "諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃"
  ],
  [
    "cea1",
    "痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
  ],
  [
    "cfa1",
    "蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
  ],
  [
    "d0a1",
    "弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
  ],
  [
    "d1a1",
    "僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨"
  ],
  [
    "d2a1",
    "辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
  ],
  [
    "d3a1",
    "咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉"
  ],
  [
    "d4a1",
    "圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
  ],
  [
    "d5a1",
    "奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓"
  ],
  [
    "d6a1",
    "屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
  ],
  [
    "d7a1",
    "廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚"
  ],
  [
    "d8a1",
    "悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
  ],
  [
    "d9a1",
    "戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼"
  ],
  [
    "daa1",
    "據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
  ],
  [
    "dba1",
    "曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍"
  ],
  [
    "dca1",
    "棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
  ],
  [
    "dda1",
    "檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾"
  ],
  [
    "dea1",
    "沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
  ],
  [
    "dfa1",
    "漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼"
  ],
  [
    "e0a1",
    "燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
  ],
  [
    "e1a1",
    "瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰"
  ],
  [
    "e2a1",
    "癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
  ],
  [
    "e3a1",
    "磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐"
  ],
  [
    "e4a1",
    "筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
  ],
  [
    "e5a1",
    "紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺"
  ],
  [
    "e6a1",
    "罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
  ],
  [
    "e7a1",
    "隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙"
  ],
  [
    "e8a1",
    "茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
  ],
  [
    "e9a1",
    "蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙"
  ],
  [
    "eaa1",
    "蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
  ],
  [
    "eba1",
    "襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫"
  ],
  [
    "eca1",
    "譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
  ],
  [
    "eda1",
    "蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸"
  ],
  [
    "eea1",
    "遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
  ],
  [
    "efa1",
    "錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞"
  ],
  [
    "f0a1",
    "陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
  ],
  [
    "f1a1",
    "顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷"
  ],
  [
    "f2a1",
    "髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
  ],
  [
    "f3a1",
    "鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠"
  ],
  [
    "f4a1",
    "堯槇遙瑤凜熙"
  ],
  [
    "f9a1",
    "纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德"
  ],
  [
    "faa1",
    "忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
  ],
  [
    "fba1",
    "犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚"
  ],
  [
    "fca1",
    "釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ],
  [
    "fcf1",
    "ⅰ",
    9,
    "￢￤＇＂"
  ],
  [
    "8fa2af",
    "˘ˇ¸˙˝¯˛˚～΄΅"
  ],
  [
    "8fa2c2",
    "¡¦¿"
  ],
  [
    "8fa2eb",
    "ºª©®™¤№"
  ],
  [
    "8fa6e1",
    "ΆΈΉΊΪ"
  ],
  [
    "8fa6e7",
    "Ό"
  ],
  [
    "8fa6e9",
    "ΎΫ"
  ],
  [
    "8fa6ec",
    "Ώ"
  ],
  [
    "8fa6f1",
    "άέήίϊΐόςύϋΰώ"
  ],
  [
    "8fa7c2",
    "Ђ",
    10,
    "ЎЏ"
  ],
  [
    "8fa7f2",
    "ђ",
    10,
    "ўџ"
  ],
  [
    "8fa9a1",
    "ÆĐ"
  ],
  [
    "8fa9a4",
    "Ħ"
  ],
  [
    "8fa9a6",
    "Ĳ"
  ],
  [
    "8fa9a8",
    "ŁĿ"
  ],
  [
    "8fa9ab",
    "ŊØŒ"
  ],
  [
    "8fa9af",
    "ŦÞ"
  ],
  [
    "8fa9c1",
    "æđðħıĳĸłŀŉŋøœßŧþ"
  ],
  [
    "8faaa1",
    "ÁÀÄÂĂǍĀĄÅÃĆĈČÇĊĎÉÈËÊĚĖĒĘ"
  ],
  [
    "8faaba",
    "ĜĞĢĠĤÍÌÏÎǏİĪĮĨĴĶĹĽĻŃŇŅÑÓÒÖÔǑŐŌÕŔŘŖŚŜŠŞŤŢÚÙÜÛŬǓŰŪŲŮŨǗǛǙǕŴÝŸŶŹŽŻ"
  ],
  [
    "8faba1",
    "áàäâăǎāąåãćĉčçċďéèëêěėēęǵĝğ"
  ],
  [
    "8fabbd",
    "ġĥíìïîǐ"
  ],
  [
    "8fabc5",
    "īįĩĵķĺľļńňņñóòöôǒőōõŕřŗśŝšşťţúùüûŭǔűūųůũǘǜǚǖŵýÿŷźžż"
  ],
  [
    "8fb0a1",
    "丂丄丅丌丒丟丣两丨丫丮丯丰丵乀乁乄乇乑乚乜乣乨乩乴乵乹乿亍亖亗亝亯亹仃仐仚仛仠仡仢仨仯仱仳仵份仾仿伀伂伃伈伋伌伒伕伖众伙伮伱你伳伵伷伹伻伾佀佂佈佉佋佌佒佔佖佘佟佣佪佬佮佱佷佸佹佺佽佾侁侂侄"
  ],
  [
    "8fb1a1",
    "侅侉侊侌侎侐侒侓侔侗侙侚侞侟侲侷侹侻侼侽侾俀俁俅俆俈俉俋俌俍俏俒俜俠俢俰俲俼俽俿倀倁倄倇倊倌倎倐倓倗倘倛倜倝倞倢倧倮倰倲倳倵偀偁偂偅偆偊偌偎偑偒偓偗偙偟偠偢偣偦偧偪偭偰偱倻傁傃傄傆傊傎傏傐"
  ],
  [
    "8fb2a1",
    "傒傓傔傖傛傜傞",
    4,
    "傪傯傰傹傺傽僀僃僄僇僌僎僐僓僔僘僜僝僟僢僤僦僨僩僯僱僶僺僾儃儆儇儈儋儌儍儎僲儐儗儙儛儜儝儞儣儧儨儬儭儯儱儳儴儵儸儹兂兊兏兓兕兗兘兟兤兦兾冃冄冋冎冘冝冡冣冭冸冺冼冾冿凂"
  ],
  [
    "8fb3a1",
    "凈减凑凒凓凕凘凞凢凥凮凲凳凴凷刁刂刅划刓刕刖刘刢刨刱刲刵刼剅剉剕剗剘剚剜剟剠剡剦剮剷剸剹劀劂劅劊劌劓劕劖劗劘劚劜劤劥劦劧劯劰劶劷劸劺劻劽勀勄勆勈勌勏勑勔勖勛勜勡勥勨勩勪勬勰勱勴勶勷匀匃匊匋"
  ],
  [
    "8fb4a1",
    "匌匑匓匘匛匜匞匟匥匧匨匩匫匬匭匰匲匵匼匽匾卂卌卋卙卛卡卣卥卬卭卲卹卾厃厇厈厎厓厔厙厝厡厤厪厫厯厲厴厵厷厸厺厽叀叅叏叒叓叕叚叝叞叠另叧叵吂吓吚吡吧吨吪启吱吴吵呃呄呇呍呏呞呢呤呦呧呩呫呭呮呴呿"
  ],
  [
    "8fb5a1",
    "咁咃咅咈咉咍咑咕咖咜咟咡咦咧咩咪咭咮咱咷咹咺咻咿哆哊响哎哠哪哬哯哶哼哾哿唀唁唅唈唉唌唍唎唕唪唫唲唵唶唻唼唽啁啇啉啊啍啐啑啘啚啛啞啠啡啤啦啿喁喂喆喈喎喏喑喒喓喔喗喣喤喭喲喿嗁嗃嗆嗉嗋嗌嗎嗑嗒"
  ],
  [
    "8fb6a1",
    "嗓嗗嗘嗛嗞嗢嗩嗶嗿嘅嘈嘊嘍",
    5,
    "嘙嘬嘰嘳嘵嘷嘹嘻嘼嘽嘿噀噁噃噄噆噉噋噍噏噔噞噠噡噢噣噦噩噭噯噱噲噵嚄嚅嚈嚋嚌嚕嚙嚚嚝嚞嚟嚦嚧嚨嚩嚫嚬嚭嚱嚳嚷嚾囅囉囊囋囏囐囌囍囙囜囝囟囡囤",
    4,
    "囱囫园"
  ],
  [
    "8fb7a1",
    "囶囷圁圂圇圊圌圑圕圚圛圝圠圢圣圤圥圩圪圬圮圯圳圴圽圾圿坅坆坌坍坒坢坥坧坨坫坭",
    4,
    "坳坴坵坷坹坺坻坼坾垁垃垌垔垗垙垚垜垝垞垟垡垕垧垨垩垬垸垽埇埈埌埏埕埝埞埤埦埧埩埭埰埵埶埸埽埾埿堃堄堈堉埡"
  ],
  [
    "8fb8a1",
    "堌堍堛堞堟堠堦堧堭堲堹堿塉塌塍塏塐塕塟塡塤塧塨塸塼塿墀墁墇墈墉墊墌墍墏墐墔墖墝墠墡墢墦墩墱墲壄墼壂壈壍壎壐壒壔壖壚壝壡壢壩壳夅夆夋夌夒夓夔虁夝夡夣夤夨夯夰夳夵夶夿奃奆奒奓奙奛奝奞奟奡奣奫奭"
  ],
  [
    "8fb9a1",
    "奯奲奵奶她奻奼妋妌妎妒妕妗妟妤妧妭妮妯妰妳妷妺妼姁姃姄姈姊姍姒姝姞姟姣姤姧姮姯姱姲姴姷娀娄娌娍娎娒娓娞娣娤娧娨娪娭娰婄婅婇婈婌婐婕婞婣婥婧婭婷婺婻婾媋媐媓媖媙媜媞媟媠媢媧媬媱媲媳媵媸媺媻媿"
  ],
  [
    "8fbaa1",
    "嫄嫆嫈嫏嫚嫜嫠嫥嫪嫮嫵嫶嫽嬀嬁嬈嬗嬴嬙嬛嬝嬡嬥嬭嬸孁孋孌孒孖孞孨孮孯孼孽孾孿宁宄宆宊宎宐宑宓宔宖宨宩宬宭宯宱宲宷宺宼寀寁寍寏寖",
    4,
    "寠寯寱寴寽尌尗尞尟尣尦尩尫尬尮尰尲尵尶屙屚屜屢屣屧屨屩"
  ],
  [
    "8fbba1",
    "屭屰屴屵屺屻屼屽岇岈岊岏岒岝岟岠岢岣岦岪岲岴岵岺峉峋峒峝峗峮峱峲峴崁崆崍崒崫崣崤崦崧崱崴崹崽崿嵂嵃嵆嵈嵕嵑嵙嵊嵟嵠嵡嵢嵤嵪嵭嵰嵹嵺嵾嵿嶁嶃嶈嶊嶒嶓嶔嶕嶙嶛嶟嶠嶧嶫嶰嶴嶸嶹巃巇巋巐巎巘巙巠巤"
  ],
  [
    "8fbca1",
    "巩巸巹帀帇帍帒帔帕帘帟帠帮帨帲帵帾幋幐幉幑幖幘幛幜幞幨幪",
    4,
    "幰庀庋庎庢庤庥庨庪庬庱庳庽庾庿廆廌廋廎廑廒廔廕廜廞廥廫异弆弇弈弎弙弜弝弡弢弣弤弨弫弬弮弰弴弶弻弽弿彀彄彅彇彍彐彔彘彛彠彣彤彧"
  ],
  [
    "8fbda1",
    "彯彲彴彵彸彺彽彾徉徍徏徖徜徝徢徧徫徤徬徯徰徱徸忄忇忈忉忋忐",
    4,
    "忞忡忢忨忩忪忬忭忮忯忲忳忶忺忼怇怊怍怓怔怗怘怚怟怤怭怳怵恀恇恈恉恌恑恔恖恗恝恡恧恱恾恿悂悆悈悊悎悑悓悕悘悝悞悢悤悥您悰悱悷"
  ],
  [
    "8fbea1",
    "悻悾惂惄惈惉惊惋惎惏惔惕惙惛惝惞惢惥惲惵惸惼惽愂愇愊愌愐",
    4,
    "愖愗愙愜愞愢愪愫愰愱愵愶愷愹慁慅慆慉慞慠慬慲慸慻慼慿憀憁憃憄憋憍憒憓憗憘憜憝憟憠憥憨憪憭憸憹憼懀懁懂懎懏懕懜懝懞懟懡懢懧懩懥"
  ],
  [
    "8fbfa1",
    "懬懭懯戁戃戄戇戓戕戜戠戢戣戧戩戫戹戽扂扃扄扆扌扐扑扒扔扖扚扜扤扭扯扳扺扽抍抎抏抐抦抨抳抶抷抺抾抿拄拎拕拖拚拪拲拴拼拽挃挄挊挋挍挐挓挖挘挩挪挭挵挶挹挼捁捂捃捄捆捊捋捎捒捓捔捘捛捥捦捬捭捱捴捵"
  ],
  [
    "8fc0a1",
    "捸捼捽捿掂掄掇掊掐掔掕掙掚掞掤掦掭掮掯掽揁揅揈揎揑揓揔揕揜揠揥揪揬揲揳揵揸揹搉搊搐搒搔搘搞搠搢搤搥搩搪搯搰搵搽搿摋摏摑摒摓摔摚摛摜摝摟摠摡摣摭摳摴摻摽撅撇撏撐撑撘撙撛撝撟撡撣撦撨撬撳撽撾撿"
  ],
  [
    "8fc1a1",
    "擄擉擊擋擌擎擐擑擕擗擤擥擩擪擭擰擵擷擻擿攁攄攈攉攊攏攓攔攖攙攛攞攟攢攦攩攮攱攺攼攽敃敇敉敐敒敔敟敠敧敫敺敽斁斅斊斒斕斘斝斠斣斦斮斲斳斴斿旂旈旉旎旐旔旖旘旟旰旲旴旵旹旾旿昀昄昈昉昍昑昒昕昖昝"
  ],
  [
    "8fc2a1",
    "昞昡昢昣昤昦昩昪昫昬昮昰昱昳昹昷晀晅晆晊晌晑晎晗晘晙晛晜晠晡曻晪晫晬晾晳晵晿晷晸晹晻暀晼暋暌暍暐暒暙暚暛暜暟暠暤暭暱暲暵暻暿曀曂曃曈曌曎曏曔曛曟曨曫曬曮曺朅朇朎朓朙朜朠朢朳朾杅杇杈杌杔杕杝"
  ],
  [
    "8fc3a1",
    "杦杬杮杴杶杻极构枎枏枑枓枖枘枙枛枰枱枲枵枻枼枽柹柀柂柃柅柈柉柒柗柙柜柡柦柰柲柶柷桒栔栙栝栟栨栧栬栭栯栰栱栳栻栿桄桅桊桌桕桗桘桛桫桮",
    4,
    "桵桹桺桻桼梂梄梆梈梖梘梚梜梡梣梥梩梪梮梲梻棅棈棌棏"
  ],
  [
    "8fc4a1",
    "棐棑棓棖棙棜棝棥棨棪棫棬棭棰棱棵棶棻棼棽椆椉椊椐椑椓椖椗椱椳椵椸椻楂楅楉楎楗楛楣楤楥楦楨楩楬楰楱楲楺楻楿榀榍榒榖榘榡榥榦榨榫榭榯榷榸榺榼槅槈槑槖槗槢槥槮槯槱槳槵槾樀樁樃樏樑樕樚樝樠樤樨樰樲"
  ],
  [
    "8fc5a1",
    "樴樷樻樾樿橅橆橉橊橎橐橑橒橕橖橛橤橧橪橱橳橾檁檃檆檇檉檋檑檛檝檞檟檥檫檯檰檱檴檽檾檿櫆櫉櫈櫌櫐櫔櫕櫖櫜櫝櫤櫧櫬櫰櫱櫲櫼櫽欂欃欆欇欉欏欐欑欗欛欞欤欨欫欬欯欵欶欻欿歆歊歍歒歖歘歝歠歧歫歮歰歵歽"
  ],
  [
    "8fc6a1",
    "歾殂殅殗殛殟殠殢殣殨殩殬殭殮殰殸殹殽殾毃毄毉毌毖毚毡毣毦毧毮毱毷毹毿氂氄氅氉氍氎氐氒氙氟氦氧氨氬氮氳氵氶氺氻氿汊汋汍汏汒汔汙汛汜汫汭汯汴汶汸汹汻沅沆沇沉沔沕沗沘沜沟沰沲沴泂泆泍泏泐泑泒泔泖"
  ],
  [
    "8fc7a1",
    "泚泜泠泧泩泫泬泮泲泴洄洇洊洎洏洑洓洚洦洧洨汧洮洯洱洹洼洿浗浞浟浡浥浧浯浰浼涂涇涑涒涔涖涗涘涪涬涴涷涹涽涿淄淈淊淎淏淖淛淝淟淠淢淥淩淯淰淴淶淼渀渄渞渢渧渲渶渹渻渼湄湅湈湉湋湏湑湒湓湔湗湜湝湞"
  ],
  [
    "8fc8a1",
    "湢湣湨湳湻湽溍溓溙溠溧溭溮溱溳溻溿滀滁滃滇滈滊滍滎滏滫滭滮滹滻滽漄漈漊漌漍漖漘漚漛漦漩漪漯漰漳漶漻漼漭潏潑潒潓潗潙潚潝潞潡潢潨潬潽潾澃澇澈澋澌澍澐澒澓澔澖澚澟澠澥澦澧澨澮澯澰澵澶澼濅濇濈濊"
  ],
  [
    "8fc9a1",
    "濚濞濨濩濰濵濹濼濽瀀瀅瀆瀇瀍瀗瀠瀣瀯瀴瀷瀹瀼灃灄灈灉灊灋灔灕灝灞灎灤灥灬灮灵灶灾炁炅炆炔",
    4,
    "炛炤炫炰炱炴炷烊烑烓烔烕烖烘烜烤烺焃",
    4,
    "焋焌焏焞焠焫焭焯焰焱焸煁煅煆煇煊煋煐煒煗煚煜煞煠"
  ],
  [
    "8fcaa1",
    "煨煹熀熅熇熌熒熚熛熠熢熯熰熲熳熺熿燀燁燄燋燌燓燖燙燚燜燸燾爀爇爈爉爓爗爚爝爟爤爫爯爴爸爹牁牂牃牅牎牏牐牓牕牖牚牜牞牠牣牨牫牮牯牱牷牸牻牼牿犄犉犍犎犓犛犨犭犮犱犴犾狁狇狉狌狕狖狘狟狥狳狴狺狻"
  ],
  [
    "8fcba1",
    "狾猂猄猅猇猋猍猒猓猘猙猞猢猤猧猨猬猱猲猵猺猻猽獃獍獐獒獖獘獝獞獟獠獦獧獩獫獬獮獯獱獷獹獼玀玁玃玅玆玎玐玓玕玗玘玜玞玟玠玢玥玦玪玫玭玵玷玹玼玽玿珅珆珉珋珌珏珒珓珖珙珝珡珣珦珧珩珴珵珷珹珺珻珽"
  ],
  [
    "8fcca1",
    "珿琀琁琄琇琊琑琚琛琤琦琨",
    9,
    "琹瑀瑃瑄瑆瑇瑋瑍瑑瑒瑗瑝瑢瑦瑧瑨瑫瑭瑮瑱瑲璀璁璅璆璇璉璏璐璑璒璘璙璚璜璟璠璡璣璦璨璩璪璫璮璯璱璲璵璹璻璿瓈瓉瓌瓐瓓瓘瓚瓛瓞瓟瓤瓨瓪瓫瓯瓴瓺瓻瓼瓿甆"
  ],
  [
    "8fcda1",
    "甒甖甗甠甡甤甧甩甪甯甶甹甽甾甿畀畃畇畈畎畐畒畗畞畟畡畯畱畹",
    5,
    "疁疅疐疒疓疕疙疜疢疤疴疺疿痀痁痄痆痌痎痏痗痜痟痠痡痤痧痬痮痯痱痹瘀瘂瘃瘄瘇瘈瘊瘌瘏瘒瘓瘕瘖瘙瘛瘜瘝瘞瘣瘥瘦瘩瘭瘲瘳瘵瘸瘹"
  ],
  [
    "8fcea1",
    "瘺瘼癊癀癁癃癄癅癉癋癕癙癟癤癥癭癮癯癱癴皁皅皌皍皕皛皜皝皟皠皢",
    6,
    "皪皭皽盁盅盉盋盌盎盔盙盠盦盨盬盰盱盶盹盼眀眆眊眎眒眔眕眗眙眚眜眢眨眭眮眯眴眵眶眹眽眾睂睅睆睊睍睎睏睒睖睗睜睞睟睠睢"
  ],
  [
    "8fcfa1",
    "睤睧睪睬睰睲睳睴睺睽瞀瞄瞌瞍瞔瞕瞖瞚瞟瞢瞧瞪瞮瞯瞱瞵瞾矃矉矑矒矕矙矞矟矠矤矦矪矬矰矱矴矸矻砅砆砉砍砎砑砝砡砢砣砭砮砰砵砷硃硄硇硈硌硎硒硜硞硠硡硣硤硨硪确硺硾碊碏碔碘碡碝碞碟碤碨碬碭碰碱碲碳"
  ],
  [
    "8fd0a1",
    "碻碽碿磇磈磉磌磎磒磓磕磖磤磛磟磠磡磦磪磲磳礀磶磷磺磻磿礆礌礐礚礜礞礟礠礥礧礩礭礱礴礵礻礽礿祄祅祆祊祋祏祑祔祘祛祜祧祩祫祲祹祻祼祾禋禌禑禓禔禕禖禘禛禜禡禨禩禫禯禱禴禸离秂秄秇秈秊秏秔秖秚秝秞"
  ],
  [
    "8fd1a1",
    "秠秢秥秪秫秭秱秸秼稂稃稇稉稊稌稑稕稛稞稡稧稫稭稯稰稴稵稸稹稺穄穅穇穈穌穕穖穙穜穝穟穠穥穧穪穭穵穸穾窀窂窅窆窊窋窐窑窔窞窠窣窬窳窵窹窻窼竆竉竌竎竑竛竨竩竫竬竱竴竻竽竾笇笔笟笣笧笩笪笫笭笮笯笰"
  ],
  [
    "8fd2a1",
    "笱笴笽笿筀筁筇筎筕筠筤筦筩筪筭筯筲筳筷箄箉箎箐箑箖箛箞箠箥箬箯箰箲箵箶箺箻箼箽篂篅篈篊篔篖篗篙篚篛篨篪篲篴篵篸篹篺篼篾簁簂簃簄簆簉簋簌簎簏簙簛簠簥簦簨簬簱簳簴簶簹簺籆籊籕籑籒籓籙",
    5
  ],
  [
    "8fd3a1",
    "籡籣籧籩籭籮籰籲籹籼籽粆粇粏粔粞粠粦粰粶粷粺粻粼粿糄糇糈糉糍糏糓糔糕糗糙糚糝糦糩糫糵紃紇紈紉紏紑紒紓紖紝紞紣紦紪紭紱紼紽紾絀絁絇絈絍絑絓絗絙絚絜絝絥絧絪絰絸絺絻絿綁綂綃綅綆綈綋綌綍綑綖綗綝"
  ],
  [
    "8fd4a1",
    "綞綦綧綪綳綶綷綹緂",
    4,
    "緌緍緎緗緙縀緢緥緦緪緫緭緱緵緶緹緺縈縐縑縕縗縜縝縠縧縨縬縭縯縳縶縿繄繅繇繎繐繒繘繟繡繢繥繫繮繯繳繸繾纁纆纇纊纍纑纕纘纚纝纞缼缻缽缾缿罃罄罇罏罒罓罛罜罝罡罣罤罥罦罭"
  ],
  [
    "8fd5a1",
    "罱罽罾罿羀羋羍羏羐羑羖羗羜羡羢羦羪羭羴羼羿翀翃翈翎翏翛翟翣翥翨翬翮翯翲翺翽翾翿耇耈耊耍耎耏耑耓耔耖耝耞耟耠耤耦耬耮耰耴耵耷耹耺耼耾聀聄聠聤聦聭聱聵肁肈肎肜肞肦肧肫肸肹胈胍胏胒胔胕胗胘胠胭胮"
  ],
  [
    "8fd6a1",
    "胰胲胳胶胹胺胾脃脋脖脗脘脜脞脠脤脧脬脰脵脺脼腅腇腊腌腒腗腠腡腧腨腩腭腯腷膁膐膄膅膆膋膎膖膘膛膞膢膮膲膴膻臋臃臅臊臎臏臕臗臛臝臞臡臤臫臬臰臱臲臵臶臸臹臽臿舀舃舏舓舔舙舚舝舡舢舨舲舴舺艃艄艅艆"
  ],
  [
    "8fd7a1",
    "艋艎艏艑艖艜艠艣艧艭艴艻艽艿芀芁芃芄芇芉芊芎芑芔芖芘芚芛芠芡芣芤芧芨芩芪芮芰芲芴芷芺芼芾芿苆苐苕苚苠苢苤苨苪苭苯苶苷苽苾茀茁茇茈茊茋荔茛茝茞茟茡茢茬茭茮茰茳茷茺茼茽荂荃荄荇荍荎荑荕荖荗荰荸"
  ],
  [
    "8fd8a1",
    "荽荿莀莂莄莆莍莒莔莕莘莙莛莜莝莦莧莩莬莾莿菀菇菉菏菐菑菔菝荓菨菪菶菸菹菼萁萆萊萏萑萕萙莭萯萹葅葇葈葊葍葏葑葒葖葘葙葚葜葠葤葥葧葪葰葳葴葶葸葼葽蒁蒅蒒蒓蒕蒞蒦蒨蒩蒪蒯蒱蒴蒺蒽蒾蓀蓂蓇蓈蓌蓏蓓"
  ],
  [
    "8fd9a1",
    "蓜蓧蓪蓯蓰蓱蓲蓷蔲蓺蓻蓽蔂蔃蔇蔌蔎蔐蔜蔞蔢蔣蔤蔥蔧蔪蔫蔯蔳蔴蔶蔿蕆蕏",
    4,
    "蕖蕙蕜",
    6,
    "蕤蕫蕯蕹蕺蕻蕽蕿薁薅薆薉薋薌薏薓薘薝薟薠薢薥薧薴薶薷薸薼薽薾薿藂藇藊藋藎薭藘藚藟藠藦藨藭藳藶藼"
  ],
  [
    "8fdaa1",
    "藿蘀蘄蘅蘍蘎蘐蘑蘒蘘蘙蘛蘞蘡蘧蘩蘶蘸蘺蘼蘽虀虂虆虒虓虖虗虘虙虝虠",
    4,
    "虩虬虯虵虶虷虺蚍蚑蚖蚘蚚蚜蚡蚦蚧蚨蚭蚱蚳蚴蚵蚷蚸蚹蚿蛀蛁蛃蛅蛑蛒蛕蛗蛚蛜蛠蛣蛥蛧蚈蛺蛼蛽蜄蜅蜇蜋蜎蜏蜐蜓蜔蜙蜞蜟蜡蜣"
  ],
  [
    "8fdba1",
    "蜨蜮蜯蜱蜲蜹蜺蜼蜽蜾蝀蝃蝅蝍蝘蝝蝡蝤蝥蝯蝱蝲蝻螃",
    6,
    "螋螌螐螓螕螗螘螙螞螠螣螧螬螭螮螱螵螾螿蟁蟈蟉蟊蟎蟕蟖蟙蟚蟜蟟蟢蟣蟤蟪蟫蟭蟱蟳蟸蟺蟿蠁蠃蠆蠉蠊蠋蠐蠙蠒蠓蠔蠘蠚蠛蠜蠞蠟蠨蠭蠮蠰蠲蠵"
  ],
  [
    "8fdca1",
    "蠺蠼衁衃衅衈衉衊衋衎衑衕衖衘衚衜衟衠衤衩衱衹衻袀袘袚袛袜袟袠袨袪袺袽袾裀裊",
    4,
    "裑裒裓裛裞裧裯裰裱裵裷褁褆褍褎褏褕褖褘褙褚褜褠褦褧褨褰褱褲褵褹褺褾襀襂襅襆襉襏襒襗襚襛襜襡襢襣襫襮襰襳襵襺"
  ],
  [
    "8fdda1",
    "襻襼襽覉覍覐覔覕覛覜覟覠覥覰覴覵覶覷覼觔",
    4,
    "觥觩觫觭觱觳觶觹觽觿訄訅訇訏訑訒訔訕訞訠訢訤訦訫訬訯訵訷訽訾詀詃詅詇詉詍詎詓詖詗詘詜詝詡詥詧詵詶詷詹詺詻詾詿誀誃誆誋誏誐誒誖誗誙誟誧誩誮誯誳"
  ],
  [
    "8fdea1",
    "誶誷誻誾諃諆諈諉諊諑諓諔諕諗諝諟諬諰諴諵諶諼諿謅謆謋謑謜謞謟謊謭謰謷謼譂",
    4,
    "譈譒譓譔譙譍譞譣譭譶譸譹譼譾讁讄讅讋讍讏讔讕讜讞讟谸谹谽谾豅豇豉豋豏豑豓豔豗豘豛豝豙豣豤豦豨豩豭豳豵豶豻豾貆"
  ],
  [
    "8fdfa1",
    "貇貋貐貒貓貙貛貜貤貹貺賅賆賉賋賏賖賕賙賝賡賨賬賯賰賲賵賷賸賾賿贁贃贉贒贗贛赥赩赬赮赿趂趄趈趍趐趑趕趞趟趠趦趫趬趯趲趵趷趹趻跀跅跆跇跈跊跎跑跔跕跗跙跤跥跧跬跰趼跱跲跴跽踁踄踅踆踋踑踔踖踠踡踢"
  ],
  [
    "8fe0a1",
    "踣踦踧踱踳踶踷踸踹踽蹀蹁蹋蹍蹎蹏蹔蹛蹜蹝蹞蹡蹢蹩蹬蹭蹯蹰蹱蹹蹺蹻躂躃躉躐躒躕躚躛躝躞躢躧躩躭躮躳躵躺躻軀軁軃軄軇軏軑軔軜軨軮軰軱軷軹軺軭輀輂輇輈輏輐輖輗輘輞輠輡輣輥輧輨輬輭輮輴輵輶輷輺轀轁"
  ],
  [
    "8fe1a1",
    "轃轇轏轑",
    4,
    "轘轝轞轥辝辠辡辤辥辦辵辶辸达迀迁迆迊迋迍运迒迓迕迠迣迤迨迮迱迵迶迻迾适逄逈逌逘逛逨逩逯逪逬逭逳逴逷逿遃遄遌遛遝遢遦遧遬遰遴遹邅邈邋邌邎邐邕邗邘邙邛邠邡邢邥邰邲邳邴邶邽郌邾郃"
  ],
  [
    "8fe2a1",
    "郄郅郇郈郕郗郘郙郜郝郟郥郒郶郫郯郰郴郾郿鄀鄄鄅鄆鄈鄍鄐鄔鄖鄗鄘鄚鄜鄞鄠鄥鄢鄣鄧鄩鄮鄯鄱鄴鄶鄷鄹鄺鄼鄽酃酇酈酏酓酗酙酚酛酡酤酧酭酴酹酺酻醁醃醅醆醊醎醑醓醔醕醘醞醡醦醨醬醭醮醰醱醲醳醶醻醼醽醿"
  ],
  [
    "8fe3a1",
    "釂釃釅釓釔釗釙釚釞釤釥釩釪釬",
    5,
    "釷釹釻釽鈀鈁鈄鈅鈆鈇鈉鈊鈌鈐鈒鈓鈖鈘鈜鈝鈣鈤鈥鈦鈨鈮鈯鈰鈳鈵鈶鈸鈹鈺鈼鈾鉀鉂鉃鉆鉇鉊鉍鉎鉏鉑鉘鉙鉜鉝鉠鉡鉥鉧鉨鉩鉮鉯鉰鉵",
    4,
    "鉻鉼鉽鉿銈銉銊銍銎銒銗"
  ],
  [
    "8fe4a1",
    "銙銟銠銤銥銧銨銫銯銲銶銸銺銻銼銽銿",
    4,
    "鋅鋆鋇鋈鋋鋌鋍鋎鋐鋓鋕鋗鋘鋙鋜鋝鋟鋠鋡鋣鋥鋧鋨鋬鋮鋰鋹鋻鋿錀錂錈錍錑錔錕錜錝錞錟錡錤錥錧錩錪錳錴錶錷鍇鍈鍉鍐鍑鍒鍕鍗鍘鍚鍞鍤鍥鍧鍩鍪鍭鍯鍰鍱鍳鍴鍶"
  ],
  [
    "8fe5a1",
    "鍺鍽鍿鎀鎁鎂鎈鎊鎋鎍鎏鎒鎕鎘鎛鎞鎡鎣鎤鎦鎨鎫鎴鎵鎶鎺鎩鏁鏄鏅鏆鏇鏉",
    4,
    "鏓鏙鏜鏞鏟鏢鏦鏧鏹鏷鏸鏺鏻鏽鐁鐂鐄鐈鐉鐍鐎鐏鐕鐖鐗鐟鐮鐯鐱鐲鐳鐴鐻鐿鐽鑃鑅鑈鑊鑌鑕鑙鑜鑟鑡鑣鑨鑫鑭鑮鑯鑱鑲钄钃镸镹"
  ],
  [
    "8fe6a1",
    "镾閄閈閌閍閎閝閞閟閡閦閩閫閬閴閶閺閽閿闆闈闉闋闐闑闒闓闙闚闝闞闟闠闤闦阝阞阢阤阥阦阬阱阳阷阸阹阺阼阽陁陒陔陖陗陘陡陮陴陻陼陾陿隁隂隃隄隉隑隖隚隝隟隤隥隦隩隮隯隳隺雊雒嶲雘雚雝雞雟雩雯雱雺霂"
  ],
  [
    "8fe7a1",
    "霃霅霉霚霛霝霡霢霣霨霱霳靁靃靊靎靏靕靗靘靚靛靣靧靪靮靳靶靷靸靻靽靿鞀鞉鞕鞖鞗鞙鞚鞞鞟鞢鞬鞮鞱鞲鞵鞶鞸鞹鞺鞼鞾鞿韁韄韅韇韉韊韌韍韎韐韑韔韗韘韙韝韞韠韛韡韤韯韱韴韷韸韺頇頊頙頍頎頔頖頜頞頠頣頦"
  ],
  [
    "8fe8a1",
    "頫頮頯頰頲頳頵頥頾顄顇顊顑顒顓顖顗顙顚顢顣顥顦顪顬颫颭颮颰颴颷颸颺颻颿飂飅飈飌飡飣飥飦飧飪飳飶餂餇餈餑餕餖餗餚餛餜餟餢餦餧餫餱",
    4,
    "餹餺餻餼饀饁饆饇饈饍饎饔饘饙饛饜饞饟饠馛馝馟馦馰馱馲馵"
  ],
  [
    "8fe9a1",
    "馹馺馽馿駃駉駓駔駙駚駜駞駧駪駫駬駰駴駵駹駽駾騂騃騄騋騌騐騑騖騞騠騢騣騤騧騭騮騳騵騶騸驇驁驄驊驋驌驎驑驔驖驝骪骬骮骯骲骴骵骶骹骻骾骿髁髃髆髈髎髐髒髕髖髗髛髜髠髤髥髧髩髬髲髳髵髹髺髽髿",
    4
  ],
  [
    "8feaa1",
    "鬄鬅鬈鬉鬋鬌鬍鬎鬐鬒鬖鬙鬛鬜鬠鬦鬫鬭鬳鬴鬵鬷鬹鬺鬽魈魋魌魕魖魗魛魞魡魣魥魦魨魪",
    4,
    "魳魵魷魸魹魿鮀鮄鮅鮆鮇鮉鮊鮋鮍鮏鮐鮔鮚鮝鮞鮦鮧鮩鮬鮰鮱鮲鮷鮸鮻鮼鮾鮿鯁鯇鯈鯎鯐鯗鯘鯝鯟鯥鯧鯪鯫鯯鯳鯷鯸"
  ],
  [
    "8feba1",
    "鯹鯺鯽鯿鰀鰂鰋鰏鰑鰖鰘鰙鰚鰜鰞鰢鰣鰦",
    4,
    "鰱鰵鰶鰷鰽鱁鱃鱄鱅鱉鱊鱎鱏鱐鱓鱔鱖鱘鱛鱝鱞鱟鱣鱩鱪鱜鱫鱨鱮鱰鱲鱵鱷鱻鳦鳲鳷鳹鴋鴂鴑鴗鴘鴜鴝鴞鴯鴰鴲鴳鴴鴺鴼鵅鴽鵂鵃鵇鵊鵓鵔鵟鵣鵢鵥鵩鵪鵫鵰鵶鵷鵻"
  ],
  [
    "8feca1",
    "鵼鵾鶃鶄鶆鶊鶍鶎鶒鶓鶕鶖鶗鶘鶡鶪鶬鶮鶱鶵鶹鶼鶿鷃鷇鷉鷊鷔鷕鷖鷗鷚鷞鷟鷠鷥鷧鷩鷫鷮鷰鷳鷴鷾鸊鸂鸇鸎鸐鸑鸒鸕鸖鸙鸜鸝鹺鹻鹼麀麂麃麄麅麇麎麏麖麘麛麞麤麨麬麮麯麰麳麴麵黆黈黋黕黟黤黧黬黭黮黰黱黲黵"
  ],
  [
    "8feda1",
    "黸黿鼂鼃鼉鼏鼐鼑鼒鼔鼖鼗鼙鼚鼛鼟鼢鼦鼪鼫鼯鼱鼲鼴鼷鼹鼺鼼鼽鼿齁齃",
    4,
    "齓齕齖齗齘齚齝齞齨齩齭",
    4,
    "齳齵齺齽龏龐龑龒龔龖龗龞龡龢龣龥"
  ]
], S0 = [
  [
    "0",
    "\0",
    127,
    "€"
  ],
  [
    "8140",
    "丂丄丅丆丏丒丗丟丠両丣並丩丮丯丱丳丵丷丼乀乁乂乄乆乊乑乕乗乚乛乢乣乤乥乧乨乪",
    5,
    "乲乴",
    9,
    "乿",
    6,
    "亇亊"
  ],
  [
    "8180",
    "亐亖亗亙亜亝亞亣亪亯亰亱亴亶亷亸亹亼亽亾仈仌仏仐仒仚仛仜仠仢仦仧仩仭仮仯仱仴仸仹仺仼仾伀伂",
    6,
    "伋伌伒",
    4,
    "伜伝伡伣伨伩伬伭伮伱伳伵伷伹伻伾",
    4,
    "佄佅佇",
    5,
    "佒佔佖佡佢佦佨佪佫佭佮佱佲併佷佸佹佺佽侀侁侂侅來侇侊侌侎侐侒侓侕侖侘侙侚侜侞侟価侢"
  ],
  [
    "8240",
    "侤侫侭侰",
    4,
    "侶",
    8,
    "俀俁係俆俇俈俉俋俌俍俒",
    4,
    "俙俛俠俢俤俥俧俫俬俰俲俴俵俶俷俹俻俼俽俿",
    11
  ],
  [
    "8280",
    "個倎倐們倓倕倖倗倛倝倞倠倢倣値倧倫倯",
    10,
    "倻倽倿偀偁偂偄偅偆偉偊偋偍偐",
    4,
    "偖偗偘偙偛偝",
    7,
    "偦",
    5,
    "偭",
    8,
    "偸偹偺偼偽傁傂傃傄傆傇傉傊傋傌傎",
    20,
    "傤傦傪傫傭",
    4,
    "傳",
    6,
    "傼"
  ],
  [
    "8340",
    "傽",
    17,
    "僐",
    5,
    "僗僘僙僛",
    10,
    "僨僩僪僫僯僰僱僲僴僶",
    4,
    "僼",
    9,
    "儈"
  ],
  [
    "8380",
    "儉儊儌",
    5,
    "儓",
    13,
    "儢",
    28,
    "兂兇兊兌兎兏児兒兓兗兘兙兛兝",
    4,
    "兣兤兦內兩兪兯兲兺兾兿冃冄円冇冊冋冎冏冐冑冓冔冘冚冝冞冟冡冣冦",
    4,
    "冭冮冴冸冹冺冾冿凁凂凃凅凈凊凍凎凐凒",
    5
  ],
  [
    "8440",
    "凘凙凚凜凞凟凢凣凥",
    5,
    "凬凮凱凲凴凷凾刄刅刉刋刌刏刐刓刔刕刜刞刟刡刢刣別刦刧刪刬刯刱刲刴刵刼刾剄",
    5,
    "剋剎剏剒剓剕剗剘"
  ],
  [
    "8480",
    "剙剚剛剝剟剠剢剣剤剦剨剫剬剭剮剰剱剳",
    9,
    "剾劀劃",
    4,
    "劉",
    6,
    "劑劒劔",
    6,
    "劜劤劥劦劧劮劯劰労",
    9,
    "勀勁勂勄勅勆勈勊勌勍勎勏勑勓勔動勗務",
    5,
    "勠勡勢勣勥",
    10,
    "勱",
    7,
    "勻勼勽匁匂匃匄匇匉匊匋匌匎"
  ],
  [
    "8540",
    "匑匒匓匔匘匛匜匞匟匢匤匥匧匨匩匫匬匭匯",
    9,
    "匼匽區卂卄卆卋卌卍卐協単卙卛卝卥卨卪卬卭卲卶卹卻卼卽卾厀厁厃厇厈厊厎厏"
  ],
  [
    "8580",
    "厐",
    4,
    "厖厗厙厛厜厞厠厡厤厧厪厫厬厭厯",
    6,
    "厷厸厹厺厼厽厾叀參",
    4,
    "収叏叐叒叓叕叚叜叝叞叡叢叧叴叺叾叿吀吂吅吇吋吔吘吙吚吜吢吤吥吪吰吳吶吷吺吽吿呁呂呄呅呇呉呌呍呎呏呑呚呝",
    4,
    "呣呥呧呩",
    7,
    "呴呹呺呾呿咁咃咅咇咈咉咊咍咑咓咗咘咜咞咟咠咡"
  ],
  [
    "8640",
    "咢咥咮咰咲咵咶咷咹咺咼咾哃哅哊哋哖哘哛哠",
    4,
    "哫哬哯哰哱哴",
    5,
    "哻哾唀唂唃唄唅唈唊",
    4,
    "唒唓唕",
    5,
    "唜唝唞唟唡唥唦"
  ],
  [
    "8680",
    "唨唩唫唭唲唴唵唶唸唹唺唻唽啀啂啅啇啈啋",
    4,
    "啑啒啓啔啗",
    4,
    "啝啞啟啠啢啣啨啩啫啯",
    5,
    "啹啺啽啿喅喆喌喍喎喐喒喓喕喖喗喚喛喞喠",
    6,
    "喨",
    8,
    "喲喴営喸喺喼喿",
    4,
    "嗆嗇嗈嗊嗋嗎嗏嗐嗕嗗",
    4,
    "嗞嗠嗢嗧嗩嗭嗮嗰嗱嗴嗶嗸",
    4,
    "嗿嘂嘃嘄嘅"
  ],
  [
    "8740",
    "嘆嘇嘊嘋嘍嘐",
    7,
    "嘙嘚嘜嘝嘠嘡嘢嘥嘦嘨嘩嘪嘫嘮嘯嘰嘳嘵嘷嘸嘺嘼嘽嘾噀",
    11,
    "噏",
    4,
    "噕噖噚噛噝",
    4
  ],
  [
    "8780",
    "噣噥噦噧噭噮噯噰噲噳噴噵噷噸噹噺噽",
    7,
    "嚇",
    6,
    "嚐嚑嚒嚔",
    14,
    "嚤",
    10,
    "嚰",
    6,
    "嚸嚹嚺嚻嚽",
    12,
    "囋",
    8,
    "囕囖囘囙囜団囥",
    5,
    "囬囮囯囲図囶囷囸囻囼圀圁圂圅圇國",
    6
  ],
  [
    "8840",
    "園",
    9,
    "圝圞圠圡圢圤圥圦圧圫圱圲圴",
    4,
    "圼圽圿坁坃坄坅坆坈坉坋坒",
    4,
    "坘坙坢坣坥坧坬坮坰坱坲坴坵坸坹坺坽坾坿垀"
  ],
  [
    "8880",
    "垁垇垈垉垊垍",
    4,
    "垔",
    6,
    "垜垝垞垟垥垨垪垬垯垰垱垳垵垶垷垹",
    8,
    "埄",
    6,
    "埌埍埐埑埓埖埗埛埜埞埡埢埣埥",
    7,
    "埮埰埱埲埳埵埶執埻埼埾埿堁堃堄堅堈堉堊堌堎堏堐堒堓堔堖堗堘堚堛堜堝堟堢堣堥",
    4,
    "堫",
    4,
    "報堲堳場堶",
    7
  ],
  [
    "8940",
    "堾",
    5,
    "塅",
    6,
    "塎塏塐塒塓塕塖塗塙",
    4,
    "塟",
    5,
    "塦",
    4,
    "塭",
    16,
    "塿墂墄墆墇墈墊墋墌"
  ],
  [
    "8980",
    "墍",
    4,
    "墔",
    4,
    "墛墜墝墠",
    7,
    "墪",
    17,
    "墽墾墿壀壂壃壄壆",
    10,
    "壒壓壔壖",
    13,
    "壥",
    5,
    "壭壯壱売壴壵壷壸壺",
    7,
    "夃夅夆夈",
    4,
    "夎夐夑夒夓夗夘夛夝夞夠夡夢夣夦夨夬夰夲夳夵夶夻"
  ],
  [
    "8a40",
    "夽夾夿奀奃奅奆奊奌奍奐奒奓奙奛",
    4,
    "奡奣奤奦",
    12,
    "奵奷奺奻奼奾奿妀妅妉妋妌妎妏妐妑妔妕妘妚妛妜妝妟妠妡妢妦"
  ],
  [
    "8a80",
    "妧妬妭妰妱妳",
    5,
    "妺妼妽妿",
    6,
    "姇姈姉姌姍姎姏姕姖姙姛姞",
    4,
    "姤姦姧姩姪姫姭",
    11,
    "姺姼姽姾娀娂娊娋娍娎娏娐娒娔娕娖娗娙娚娛娝娞娡娢娤娦娧娨娪",
    6,
    "娳娵娷",
    4,
    "娽娾娿婁",
    4,
    "婇婈婋",
    9,
    "婖婗婘婙婛",
    5
  ],
  [
    "8b40",
    "婡婣婤婥婦婨婩婫",
    8,
    "婸婹婻婼婽婾媀",
    17,
    "媓",
    6,
    "媜",
    13,
    "媫媬"
  ],
  [
    "8b80",
    "媭",
    4,
    "媴媶媷媹",
    4,
    "媿嫀嫃",
    5,
    "嫊嫋嫍",
    4,
    "嫓嫕嫗嫙嫚嫛嫝嫞嫟嫢嫤嫥嫧嫨嫪嫬",
    4,
    "嫲",
    22,
    "嬊",
    11,
    "嬘",
    25,
    "嬳嬵嬶嬸",
    7,
    "孁",
    6
  ],
  [
    "8c40",
    "孈",
    7,
    "孒孖孞孠孡孧孨孫孭孮孯孲孴孶孷學孹孻孼孾孿宂宆宊宍宎宐宑宒宔宖実宧宨宩宬宭宮宯宱宲宷宺宻宼寀寁寃寈寉寊寋寍寎寏"
  ],
  [
    "8c80",
    "寑寔",
    8,
    "寠寢寣實寧審",
    4,
    "寯寱",
    6,
    "寽対尀専尃尅將專尋尌對導尐尒尓尗尙尛尞尟尠尡尣尦尨尩尪尫尭尮尯尰尲尳尵尶尷屃屄屆屇屌屍屒屓屔屖屗屘屚屛屜屝屟屢層屧",
    6,
    "屰屲",
    6,
    "屻屼屽屾岀岃",
    4,
    "岉岊岋岎岏岒岓岕岝",
    4,
    "岤",
    4
  ],
  [
    "8d40",
    "岪岮岯岰岲岴岶岹岺岻岼岾峀峂峃峅",
    5,
    "峌",
    5,
    "峓",
    5,
    "峚",
    6,
    "峢峣峧峩峫峬峮峯峱",
    9,
    "峼",
    4
  ],
  [
    "8d80",
    "崁崄崅崈",
    5,
    "崏",
    4,
    "崕崗崘崙崚崜崝崟",
    4,
    "崥崨崪崫崬崯",
    4,
    "崵",
    7,
    "崿",
    7,
    "嵈嵉嵍",
    10,
    "嵙嵚嵜嵞",
    10,
    "嵪嵭嵮嵰嵱嵲嵳嵵",
    12,
    "嶃",
    21,
    "嶚嶛嶜嶞嶟嶠"
  ],
  [
    "8e40",
    "嶡",
    21,
    "嶸",
    12,
    "巆",
    6,
    "巎",
    12,
    "巜巟巠巣巤巪巬巭"
  ],
  [
    "8e80",
    "巰巵巶巸",
    4,
    "巿帀帄帇帉帊帋帍帎帒帓帗帞",
    7,
    "帨",
    4,
    "帯帰帲",
    4,
    "帹帺帾帿幀幁幃幆",
    5,
    "幍",
    6,
    "幖",
    4,
    "幜幝幟幠幣",
    14,
    "幵幷幹幾庁庂広庅庈庉庌庍庎庒庘庛庝庡庢庣庤庨",
    4,
    "庮",
    4,
    "庴庺庻庼庽庿",
    6
  ],
  [
    "8f40",
    "廆廇廈廋",
    5,
    "廔廕廗廘廙廚廜",
    11,
    "廩廫",
    8,
    "廵廸廹廻廼廽弅弆弇弉弌弍弎弐弒弔弖弙弚弜弝弞弡弢弣弤"
  ],
  [
    "8f80",
    "弨弫弬弮弰弲",
    6,
    "弻弽弾弿彁",
    14,
    "彑彔彙彚彛彜彞彟彠彣彥彧彨彫彮彯彲彴彵彶彸彺彽彾彿徃徆徍徎徏徑従徔徖徚徛徝從徟徠徢",
    5,
    "復徫徬徯",
    5,
    "徶徸徹徺徻徾",
    4,
    "忇忈忊忋忎忓忔忕忚忛応忞忟忢忣忥忦忨忩忬忯忰忲忳忴忶忷忹忺忼怇"
  ],
  [
    "9040",
    "怈怉怋怌怐怑怓怗怘怚怞怟怢怣怤怬怭怮怰",
    4,
    "怶",
    4,
    "怽怾恀恄",
    6,
    "恌恎恏恑恓恔恖恗恘恛恜恞恟恠恡恥恦恮恱恲恴恵恷恾悀"
  ],
  [
    "9080",
    "悁悂悅悆悇悈悊悋悎悏悐悑悓悕悗悘悙悜悞悡悢悤悥悧悩悪悮悰悳悵悶悷悹悺悽",
    7,
    "惇惈惉惌",
    4,
    "惒惓惔惖惗惙惛惞惡",
    4,
    "惪惱惲惵惷惸惻",
    4,
    "愂愃愄愅愇愊愋愌愐",
    4,
    "愖愗愘愙愛愜愝愞愡愢愥愨愩愪愬",
    18,
    "慀",
    6
  ],
  [
    "9140",
    "慇慉態慍慏慐慒慓慔慖",
    6,
    "慞慟慠慡慣慤慥慦慩",
    6,
    "慱慲慳慴慶慸",
    18,
    "憌憍憏",
    4,
    "憕"
  ],
  [
    "9180",
    "憖",
    6,
    "憞",
    8,
    "憪憫憭",
    9,
    "憸",
    5,
    "憿懀懁懃",
    4,
    "應懌",
    4,
    "懓懕",
    16,
    "懧",
    13,
    "懶",
    8,
    "戀",
    5,
    "戇戉戓戔戙戜戝戞戠戣戦戧戨戩戫戭戯戰戱戲戵戶戸",
    4,
    "扂扄扅扆扊"
  ],
  [
    "9240",
    "扏扐払扖扗扙扚扜",
    6,
    "扤扥扨扱扲扴扵扷扸扺扻扽抁抂抃抅抆抇抈抋",
    5,
    "抔抙抜抝択抣抦抧抩抪抭抮抯抰抲抳抴抶抷抸抺抾拀拁"
  ],
  [
    "9280",
    "拃拋拏拑拕拝拞拠拡拤拪拫拰拲拵拸拹拺拻挀挃挄挅挆挊挋挌挍挏挐挒挓挔挕挗挘挙挜挦挧挩挬挭挮挰挱挳",
    5,
    "挻挼挾挿捀捁捄捇捈捊捑捒捓捔捖",
    7,
    "捠捤捥捦捨捪捫捬捯捰捲捳捴捵捸捹捼捽捾捿掁掃掄掅掆掋掍掑掓掔掕掗掙",
    6,
    "採掤掦掫掯掱掲掵掶掹掻掽掿揀"
  ],
  [
    "9340",
    "揁揂揃揅揇揈揊揋揌揑揓揔揕揗",
    6,
    "揟揢揤",
    4,
    "揫揬揮揯揰揱揳揵揷揹揺揻揼揾搃搄搆",
    4,
    "損搎搑搒搕",
    5,
    "搝搟搢搣搤"
  ],
  [
    "9380",
    "搥搧搨搩搫搮",
    5,
    "搵",
    4,
    "搻搼搾摀摂摃摉摋",
    6,
    "摓摕摖摗摙",
    4,
    "摟",
    7,
    "摨摪摫摬摮",
    9,
    "摻",
    6,
    "撃撆撈",
    8,
    "撓撔撗撘撚撛撜撝撟",
    4,
    "撥撦撧撨撪撫撯撱撲撳撴撶撹撻撽撾撿擁擃擄擆",
    6,
    "擏擑擓擔擕擖擙據"
  ],
  [
    "9440",
    "擛擜擝擟擠擡擣擥擧",
    24,
    "攁",
    7,
    "攊",
    7,
    "攓",
    4,
    "攙",
    8
  ],
  [
    "9480",
    "攢攣攤攦",
    4,
    "攬攭攰攱攲攳攷攺攼攽敀",
    4,
    "敆敇敊敋敍敎敐敒敓敔敗敘敚敜敟敠敡敤敥敧敨敩敪敭敮敯敱敳敵敶數",
    14,
    "斈斉斊斍斎斏斒斔斕斖斘斚斝斞斠斢斣斦斨斪斬斮斱",
    7,
    "斺斻斾斿旀旂旇旈旉旊旍旐旑旓旔旕旘",
    7,
    "旡旣旤旪旫"
  ],
  [
    "9540",
    "旲旳旴旵旸旹旻",
    4,
    "昁昄昅昇昈昉昋昍昐昑昒昖昗昘昚昛昜昞昡昢昣昤昦昩昪昫昬昮昰昲昳昷",
    4,
    "昽昿晀時晄",
    6,
    "晍晎晐晑晘"
  ],
  [
    "9580",
    "晙晛晜晝晞晠晢晣晥晧晩",
    4,
    "晱晲晳晵晸晹晻晼晽晿暀暁暃暅暆暈暉暊暋暍暎暏暐暒暓暔暕暘",
    4,
    "暞",
    8,
    "暩",
    4,
    "暯",
    4,
    "暵暶暷暸暺暻暼暽暿",
    25,
    "曚曞",
    7,
    "曧曨曪",
    5,
    "曱曵曶書曺曻曽朁朂會"
  ],
  [
    "9640",
    "朄朅朆朇朌朎朏朑朒朓朖朘朙朚朜朞朠",
    5,
    "朧朩朮朰朲朳朶朷朸朹朻朼朾朿杁杄杅杇杊杋杍杒杔杕杗",
    4,
    "杝杢杣杤杦杧杫杬杮東杴杶"
  ],
  [
    "9680",
    "杸杹杺杻杽枀枂枃枅枆枈枊枌枍枎枏枑枒枓枔枖枙枛枟枠枡枤枦枩枬枮枱枲枴枹",
    7,
    "柂柅",
    9,
    "柕柖柗柛柟柡柣柤柦柧柨柪柫柭柮柲柵",
    7,
    "柾栁栂栃栄栆栍栐栒栔栕栘",
    4,
    "栞栟栠栢",
    6,
    "栫",
    6,
    "栴栵栶栺栻栿桇桋桍桏桒桖",
    5
  ],
  [
    "9740",
    "桜桝桞桟桪桬",
    7,
    "桵桸",
    8,
    "梂梄梇",
    7,
    "梐梑梒梔梕梖梘",
    9,
    "梣梤梥梩梪梫梬梮梱梲梴梶梷梸"
  ],
  [
    "9780",
    "梹",
    6,
    "棁棃",
    5,
    "棊棌棎棏棐棑棓棔棖棗棙棛",
    4,
    "棡棢棤",
    9,
    "棯棲棳棴棶棷棸棻棽棾棿椀椂椃椄椆",
    4,
    "椌椏椑椓",
    11,
    "椡椢椣椥",
    7,
    "椮椯椱椲椳椵椶椷椸椺椻椼椾楀楁楃",
    16,
    "楕楖楘楙楛楜楟"
  ],
  [
    "9840",
    "楡楢楤楥楧楨楩楪楬業楯楰楲",
    4,
    "楺楻楽楾楿榁榃榅榊榋榌榎",
    5,
    "榖榗榙榚榝",
    9,
    "榩榪榬榮榯榰榲榳榵榶榸榹榺榼榽"
  ],
  [
    "9880",
    "榾榿槀槂",
    7,
    "構槍槏槑槒槓槕",
    5,
    "槜槝槞槡",
    11,
    "槮槯槰槱槳",
    9,
    "槾樀",
    9,
    "樋",
    11,
    "標",
    5,
    "樠樢",
    5,
    "権樫樬樭樮樰樲樳樴樶",
    6,
    "樿",
    4,
    "橅橆橈",
    7,
    "橑",
    6,
    "橚"
  ],
  [
    "9940",
    "橜",
    4,
    "橢橣橤橦",
    10,
    "橲",
    6,
    "橺橻橽橾橿檁檂檃檅",
    8,
    "檏檒",
    4,
    "檘",
    7,
    "檡",
    5
  ],
  [
    "9980",
    "檧檨檪檭",
    114,
    "欥欦欨",
    6
  ],
  [
    "9a40",
    "欯欰欱欳欴欵欶欸欻欼欽欿歀歁歂歄歅歈歊歋歍",
    11,
    "歚",
    7,
    "歨歩歫",
    13,
    "歺歽歾歿殀殅殈"
  ],
  [
    "9a80",
    "殌殎殏殐殑殔殕殗殘殙殜",
    4,
    "殢",
    7,
    "殫",
    7,
    "殶殸",
    6,
    "毀毃毄毆",
    4,
    "毌毎毐毑毘毚毜",
    4,
    "毢",
    7,
    "毬毭毮毰毱毲毴毶毷毸毺毻毼毾",
    6,
    "氈",
    4,
    "氎氒気氜氝氞氠氣氥氫氬氭氱氳氶氷氹氺氻氼氾氿汃汄汅汈汋",
    4,
    "汑汒汓汖汘"
  ],
  [
    "9b40",
    "汙汚汢汣汥汦汧汫",
    4,
    "汱汳汵汷汸決汻汼汿沀沄沇沊沋沍沎沑沒沕沖沗沘沚沜沝沞沠沢沨沬沯沰沴沵沶沷沺泀況泂泃泆泇泈泋泍泎泏泑泒泘"
  ],
  [
    "9b80",
    "泙泚泜泝泟泤泦泧泩泬泭泲泴泹泿洀洂洃洅洆洈洉洊洍洏洐洑洓洔洕洖洘洜洝洟",
    5,
    "洦洨洩洬洭洯洰洴洶洷洸洺洿浀浂浄浉浌浐浕浖浗浘浛浝浟浡浢浤浥浧浨浫浬浭浰浱浲浳浵浶浹浺浻浽",
    4,
    "涃涄涆涇涊涋涍涏涐涒涖",
    4,
    "涜涢涥涬涭涰涱涳涴涶涷涹",
    5,
    "淁淂淃淈淉淊"
  ],
  [
    "9c40",
    "淍淎淏淐淒淓淔淕淗淚淛淜淟淢淣淥淧淨淩淪淭淯淰淲淴淵淶淸淺淽",
    7,
    "渆渇済渉渋渏渒渓渕渘渙減渜渞渟渢渦渧渨渪測渮渰渱渳渵"
  ],
  [
    "9c80",
    "渶渷渹渻",
    7,
    "湅",
    7,
    "湏湐湑湒湕湗湙湚湜湝湞湠",
    10,
    "湬湭湯",
    14,
    "満溁溂溄溇溈溊",
    4,
    "溑",
    6,
    "溙溚溛溝溞溠溡溣溤溦溨溩溫溬溭溮溰溳溵溸溹溼溾溿滀滃滄滅滆滈滉滊滌滍滎滐滒滖滘滙滛滜滝滣滧滪",
    5
  ],
  [
    "9d40",
    "滰滱滲滳滵滶滷滸滺",
    7,
    "漃漄漅漇漈漊",
    4,
    "漐漑漒漖",
    9,
    "漡漢漣漥漦漧漨漬漮漰漲漴漵漷",
    6,
    "漿潀潁潂"
  ],
  [
    "9d80",
    "潃潄潅潈潉潊潌潎",
    9,
    "潙潚潛潝潟潠潡潣潤潥潧",
    5,
    "潯潰潱潳潵潶潷潹潻潽",
    6,
    "澅澆澇澊澋澏",
    12,
    "澝澞澟澠澢",
    4,
    "澨",
    10,
    "澴澵澷澸澺",
    5,
    "濁濃",
    5,
    "濊",
    6,
    "濓",
    10,
    "濟濢濣濤濥"
  ],
  [
    "9e40",
    "濦",
    7,
    "濰",
    32,
    "瀒",
    7,
    "瀜",
    6,
    "瀤",
    6
  ],
  [
    "9e80",
    "瀫",
    9,
    "瀶瀷瀸瀺",
    17,
    "灍灎灐",
    13,
    "灟",
    11,
    "灮灱灲灳灴灷灹灺灻災炁炂炃炄炆炇炈炋炌炍炏炐炑炓炗炘炚炛炞",
    12,
    "炰炲炴炵炶為炾炿烄烅烆烇烉烋",
    12,
    "烚"
  ],
  [
    "9f40",
    "烜烝烞烠烡烢烣烥烪烮烰",
    6,
    "烸烺烻烼烾",
    10,
    "焋",
    4,
    "焑焒焔焗焛",
    10,
    "焧",
    7,
    "焲焳焴"
  ],
  [
    "9f80",
    "焵焷",
    13,
    "煆煇煈煉煋煍煏",
    12,
    "煝煟",
    4,
    "煥煩",
    4,
    "煯煰煱煴煵煶煷煹煻煼煾",
    5,
    "熅",
    4,
    "熋熌熍熎熐熑熒熓熕熖熗熚",
    4,
    "熡",
    6,
    "熩熪熫熭",
    5,
    "熴熶熷熸熺",
    8,
    "燄",
    9,
    "燏",
    4
  ],
  [
    "a040",
    "燖",
    9,
    "燡燢燣燤燦燨",
    5,
    "燯",
    9,
    "燺",
    11,
    "爇",
    19
  ],
  [
    "a080",
    "爛爜爞",
    9,
    "爩爫爭爮爯爲爳爴爺爼爾牀",
    6,
    "牉牊牋牎牏牐牑牓牔牕牗牘牚牜牞牠牣牤牥牨牪牫牬牭牰牱牳牴牶牷牸牻牼牽犂犃犅",
    4,
    "犌犎犐犑犓",
    11,
    "犠",
    11,
    "犮犱犲犳犵犺",
    6,
    "狅狆狇狉狊狋狌狏狑狓狔狕狖狘狚狛"
  ],
  [
    "a1a1",
    "　、。·ˉˇ¨〃々—～‖…‘’“”〔〕〈",
    7,
    "〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓"
  ],
  [
    "a2a1",
    "ⅰ",
    9
  ],
  [
    "a2b1",
    "⒈",
    19,
    "⑴",
    19,
    "①",
    9
  ],
  [
    "a2e5",
    "㈠",
    9
  ],
  [
    "a2f1",
    "Ⅰ",
    11
  ],
  [
    "a3a1",
    "！＂＃￥％",
    88,
    "￣"
  ],
  [
    "a4a1",
    "ぁ",
    82
  ],
  [
    "a5a1",
    "ァ",
    85
  ],
  [
    "a6a1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a6c1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a6e0",
    "︵︶︹︺︿﹀︽︾﹁﹂﹃﹄"
  ],
  [
    "a6ee",
    "︻︼︷︸︱"
  ],
  [
    "a6f4",
    "︳︴"
  ],
  [
    "a7a1",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "a7d1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "a840",
    "ˊˋ˙–―‥‵℅℉↖↗↘↙∕∟∣≒≦≧⊿═",
    35,
    "▁",
    6
  ],
  [
    "a880",
    "█",
    7,
    "▓▔▕▼▽◢◣◤◥☉⊕〒〝〞"
  ],
  [
    "a8a1",
    "āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüêɑ"
  ],
  [
    "a8bd",
    "ńň"
  ],
  [
    "a8c0",
    "ɡ"
  ],
  [
    "a8c5",
    "ㄅ",
    36
  ],
  [
    "a940",
    "〡",
    8,
    "㊣㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕︰￢￤"
  ],
  [
    "a959",
    "℡㈱"
  ],
  [
    "a95c",
    "‐"
  ],
  [
    "a960",
    "ー゛゜ヽヾ〆ゝゞ﹉",
    9,
    "﹔﹕﹖﹗﹙",
    8
  ],
  [
    "a980",
    "﹢",
    4,
    "﹨﹩﹪﹫"
  ],
  [
    "a996",
    "〇"
  ],
  [
    "a9a4",
    "─",
    75
  ],
  [
    "aa40",
    "狜狝狟狢",
    5,
    "狪狫狵狶狹狽狾狿猀猂猄",
    5,
    "猋猌猍猏猐猑猒猔猘猙猚猟猠猣猤猦猧猨猭猯猰猲猳猵猶猺猻猼猽獀",
    8
  ],
  [
    "aa80",
    "獉獊獋獌獎獏獑獓獔獕獖獘",
    7,
    "獡",
    10,
    "獮獰獱"
  ],
  [
    "ab40",
    "獲",
    11,
    "獿",
    4,
    "玅玆玈玊玌玍玏玐玒玓玔玕玗玘玙玚玜玝玞玠玡玣",
    5,
    "玪玬玭玱玴玵玶玸玹玼玽玾玿珁珃",
    4
  ],
  [
    "ab80",
    "珋珌珎珒",
    6,
    "珚珛珜珝珟珡珢珣珤珦珨珪珫珬珮珯珰珱珳",
    4
  ],
  [
    "ac40",
    "珸",
    10,
    "琄琇琈琋琌琍琎琑",
    8,
    "琜",
    5,
    "琣琤琧琩琫琭琯琱琲琷",
    4,
    "琽琾琿瑀瑂",
    11
  ],
  [
    "ac80",
    "瑎",
    6,
    "瑖瑘瑝瑠",
    12,
    "瑮瑯瑱",
    4,
    "瑸瑹瑺"
  ],
  [
    "ad40",
    "瑻瑼瑽瑿璂璄璅璆璈璉璊璌璍璏璑",
    10,
    "璝璟",
    7,
    "璪",
    15,
    "璻",
    12
  ],
  [
    "ad80",
    "瓈",
    9,
    "瓓",
    8,
    "瓝瓟瓡瓥瓧",
    6,
    "瓰瓱瓲"
  ],
  [
    "ae40",
    "瓳瓵瓸",
    6,
    "甀甁甂甃甅",
    7,
    "甎甐甒甔甕甖甗甛甝甞甠",
    4,
    "甦甧甪甮甴甶甹甼甽甿畁畂畃畄畆畇畉畊畍畐畑畒畓畕畖畗畘"
  ],
  [
    "ae80",
    "畝",
    7,
    "畧畨畩畫",
    6,
    "畳畵當畷畺",
    4,
    "疀疁疂疄疅疇"
  ],
  [
    "af40",
    "疈疉疊疌疍疎疐疓疕疘疛疜疞疢疦",
    4,
    "疭疶疷疺疻疿痀痁痆痋痌痎痏痐痑痓痗痙痚痜痝痟痠痡痥痩痬痭痮痯痲痳痵痶痷痸痺痻痽痾瘂瘄瘆瘇"
  ],
  [
    "af80",
    "瘈瘉瘋瘍瘎瘏瘑瘒瘓瘔瘖瘚瘜瘝瘞瘡瘣瘧瘨瘬瘮瘯瘱瘲瘶瘷瘹瘺瘻瘽癁療癄"
  ],
  [
    "b040",
    "癅",
    6,
    "癎",
    5,
    "癕癗",
    4,
    "癝癟癠癡癢癤",
    6,
    "癬癭癮癰",
    7,
    "癹発發癿皀皁皃皅皉皊皌皍皏皐皒皔皕皗皘皚皛"
  ],
  [
    "b080",
    "皜",
    7,
    "皥",
    8,
    "皯皰皳皵",
    9,
    "盀盁盃啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥"
  ],
  [
    "b140",
    "盄盇盉盋盌盓盕盙盚盜盝盞盠",
    4,
    "盦",
    7,
    "盰盳盵盶盷盺盻盽盿眀眂眃眅眆眊県眎",
    10,
    "眛眜眝眞眡眣眤眥眧眪眫"
  ],
  [
    "b180",
    "眬眮眰",
    4,
    "眹眻眽眾眿睂睄睅睆睈",
    7,
    "睒",
    7,
    "睜薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳"
  ],
  [
    "b240",
    "睝睞睟睠睤睧睩睪睭",
    11,
    "睺睻睼瞁瞂瞃瞆",
    5,
    "瞏瞐瞓",
    11,
    "瞡瞣瞤瞦瞨瞫瞭瞮瞯瞱瞲瞴瞶",
    4
  ],
  [
    "b280",
    "瞼瞾矀",
    12,
    "矎",
    8,
    "矘矙矚矝",
    4,
    "矤病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖"
  ],
  [
    "b340",
    "矦矨矪矯矰矱矲矴矵矷矹矺矻矼砃",
    5,
    "砊砋砎砏砐砓砕砙砛砞砠砡砢砤砨砪砫砮砯砱砲砳砵砶砽砿硁硂硃硄硆硈硉硊硋硍硏硑硓硔硘硙硚"
  ],
  [
    "b380",
    "硛硜硞",
    11,
    "硯",
    7,
    "硸硹硺硻硽",
    6,
    "场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚"
  ],
  [
    "b440",
    "碄碅碆碈碊碋碏碐碒碔碕碖碙碝碞碠碢碤碦碨",
    7,
    "碵碶碷碸確碻碼碽碿磀磂磃磄磆磇磈磌磍磎磏磑磒磓磖磗磘磚",
    9
  ],
  [
    "b480",
    "磤磥磦磧磩磪磫磭",
    4,
    "磳磵磶磸磹磻",
    5,
    "礂礃礄礆",
    6,
    "础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮"
  ],
  [
    "b540",
    "礍",
    5,
    "礔",
    9,
    "礟",
    4,
    "礥",
    14,
    "礵",
    4,
    "礽礿祂祃祄祅祇祊",
    8,
    "祔祕祘祙祡祣"
  ],
  [
    "b580",
    "祤祦祩祪祫祬祮祰",
    6,
    "祹祻",
    4,
    "禂禃禆禇禈禉禋禌禍禎禐禑禒怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠"
  ],
  [
    "b640",
    "禓",
    6,
    "禛",
    11,
    "禨",
    10,
    "禴",
    4,
    "禼禿秂秄秅秇秈秊秌秎秏秐秓秔秖秗秙",
    5,
    "秠秡秢秥秨秪"
  ],
  [
    "b680",
    "秬秮秱",
    6,
    "秹秺秼秾秿稁稄稅稇稈稉稊稌稏",
    4,
    "稕稖稘稙稛稜丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二"
  ],
  [
    "b740",
    "稝稟稡稢稤",
    14,
    "稴稵稶稸稺稾穀",
    5,
    "穇",
    9,
    "穒",
    4,
    "穘",
    16
  ],
  [
    "b780",
    "穩",
    6,
    "穱穲穳穵穻穼穽穾窂窅窇窉窊窋窌窎窏窐窓窔窙窚窛窞窡窢贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服"
  ],
  [
    "b840",
    "窣窤窧窩窪窫窮",
    4,
    "窴",
    10,
    "竀",
    10,
    "竌",
    9,
    "竗竘竚竛竜竝竡竢竤竧",
    5,
    "竮竰竱竲竳"
  ],
  [
    "b880",
    "竴",
    4,
    "竻竼竾笀笁笂笅笇笉笌笍笎笐笒笓笖笗笘笚笜笝笟笡笢笣笧笩笭浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹"
  ],
  [
    "b940",
    "笯笰笲笴笵笶笷笹笻笽笿",
    5,
    "筆筈筊筍筎筓筕筗筙筜筞筟筡筣",
    10,
    "筯筰筳筴筶筸筺筼筽筿箁箂箃箄箆",
    6,
    "箎箏"
  ],
  [
    "b980",
    "箑箒箓箖箘箙箚箛箞箟箠箣箤箥箮箯箰箲箳箵箶箷箹",
    7,
    "篂篃範埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈"
  ],
  [
    "ba40",
    "篅篈築篊篋篍篎篏篐篒篔",
    4,
    "篛篜篞篟篠篢篣篤篧篨篩篫篬篭篯篰篲",
    4,
    "篸篹篺篻篽篿",
    7,
    "簈簉簊簍簎簐",
    5,
    "簗簘簙"
  ],
  [
    "ba80",
    "簚",
    4,
    "簠",
    5,
    "簨簩簫",
    12,
    "簹",
    5,
    "籂骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖"
  ],
  [
    "bb40",
    "籃",
    9,
    "籎",
    36,
    "籵",
    5,
    "籾",
    9
  ],
  [
    "bb80",
    "粈粊",
    6,
    "粓粔粖粙粚粛粠粡粣粦粧粨粩粫粬粭粯粰粴",
    4,
    "粺粻弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕"
  ],
  [
    "bc40",
    "粿糀糂糃糄糆糉糋糎",
    6,
    "糘糚糛糝糞糡",
    6,
    "糩",
    5,
    "糰",
    7,
    "糹糺糼",
    13,
    "紋",
    5
  ],
  [
    "bc80",
    "紑",
    14,
    "紡紣紤紥紦紨紩紪紬紭紮細",
    6,
    "肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件"
  ],
  [
    "bd40",
    "紷",
    54,
    "絯",
    7
  ],
  [
    "bd80",
    "絸",
    32,
    "健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸"
  ],
  [
    "be40",
    "継",
    12,
    "綧",
    6,
    "綯",
    42
  ],
  [
    "be80",
    "線",
    32,
    "尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻"
  ],
  [
    "bf40",
    "緻",
    62
  ],
  [
    "bf80",
    "縺縼",
    4,
    "繂",
    4,
    "繈",
    21,
    "俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀"
  ],
  [
    "c040",
    "繞",
    35,
    "纃",
    23,
    "纜纝纞"
  ],
  [
    "c080",
    "纮纴纻纼绖绤绬绹缊缐缞缷缹缻",
    6,
    "罃罆",
    9,
    "罒罓馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐"
  ],
  [
    "c140",
    "罖罙罛罜罝罞罠罣",
    4,
    "罫罬罭罯罰罳罵罶罷罸罺罻罼罽罿羀羂",
    7,
    "羋羍羏",
    4,
    "羕",
    4,
    "羛羜羠羢羣羥羦羨",
    6,
    "羱"
  ],
  [
    "c180",
    "羳",
    4,
    "羺羻羾翀翂翃翄翆翇翈翉翋翍翏",
    4,
    "翖翗翙",
    5,
    "翢翣痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿"
  ],
  [
    "c240",
    "翤翧翨翪翫翬翭翯翲翴",
    6,
    "翽翾翿耂耇耈耉耊耎耏耑耓耚耛耝耞耟耡耣耤耫",
    5,
    "耲耴耹耺耼耾聀聁聄聅聇聈聉聎聏聐聑聓聕聖聗"
  ],
  [
    "c280",
    "聙聛",
    13,
    "聫",
    5,
    "聲",
    11,
    "隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫"
  ],
  [
    "c340",
    "聾肁肂肅肈肊肍",
    5,
    "肔肕肗肙肞肣肦肧肨肬肰肳肵肶肸肹肻胅胇",
    4,
    "胏",
    6,
    "胘胟胠胢胣胦胮胵胷胹胻胾胿脀脁脃脄脅脇脈脋"
  ],
  [
    "c380",
    "脌脕脗脙脛脜脝脟",
    12,
    "脭脮脰脳脴脵脷脹",
    4,
    "脿谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸"
  ],
  [
    "c440",
    "腀",
    5,
    "腇腉腍腎腏腒腖腗腘腛",
    4,
    "腡腢腣腤腦腨腪腫腬腯腲腳腵腶腷腸膁膃",
    4,
    "膉膋膌膍膎膐膒",
    5,
    "膙膚膞",
    4,
    "膤膥"
  ],
  [
    "c480",
    "膧膩膫",
    7,
    "膴",
    5,
    "膼膽膾膿臄臅臇臈臉臋臍",
    6,
    "摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁"
  ],
  [
    "c540",
    "臔",
    14,
    "臤臥臦臨臩臫臮",
    4,
    "臵",
    5,
    "臽臿舃與",
    4,
    "舎舏舑舓舕",
    5,
    "舝舠舤舥舦舧舩舮舲舺舼舽舿"
  ],
  [
    "c580",
    "艀艁艂艃艅艆艈艊艌艍艎艐",
    7,
    "艙艛艜艝艞艠",
    7,
    "艩拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗"
  ],
  [
    "c640",
    "艪艫艬艭艱艵艶艷艸艻艼芀芁芃芅芆芇芉芌芐芓芔芕芖芚芛芞芠芢芣芧芲芵芶芺芻芼芿苀苂苃苅苆苉苐苖苙苚苝苢苧苨苩苪苬苭苮苰苲苳苵苶苸"
  ],
  [
    "c680",
    "苺苼",
    4,
    "茊茋茍茐茒茓茖茘茙茝",
    9,
    "茩茪茮茰茲茷茻茽啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐"
  ],
  [
    "c740",
    "茾茿荁荂荄荅荈荊",
    4,
    "荓荕",
    4,
    "荝荢荰",
    6,
    "荹荺荾",
    6,
    "莇莈莊莋莌莍莏莐莑莔莕莖莗莙莚莝莟莡",
    6,
    "莬莭莮"
  ],
  [
    "c780",
    "莯莵莻莾莿菂菃菄菆菈菉菋菍菎菐菑菒菓菕菗菙菚菛菞菢菣菤菦菧菨菫菬菭恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠"
  ],
  [
    "c840",
    "菮華菳",
    4,
    "菺菻菼菾菿萀萂萅萇萈萉萊萐萒",
    5,
    "萙萚萛萞",
    5,
    "萩",
    7,
    "萲",
    5,
    "萹萺萻萾",
    7,
    "葇葈葉"
  ],
  [
    "c880",
    "葊",
    6,
    "葒",
    4,
    "葘葝葞葟葠葢葤",
    4,
    "葪葮葯葰葲葴葷葹葻葼取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁"
  ],
  [
    "c940",
    "葽",
    4,
    "蒃蒄蒅蒆蒊蒍蒏",
    7,
    "蒘蒚蒛蒝蒞蒟蒠蒢",
    12,
    "蒰蒱蒳蒵蒶蒷蒻蒼蒾蓀蓂蓃蓅蓆蓇蓈蓋蓌蓎蓏蓒蓔蓕蓗"
  ],
  [
    "c980",
    "蓘",
    4,
    "蓞蓡蓢蓤蓧",
    4,
    "蓭蓮蓯蓱",
    10,
    "蓽蓾蔀蔁蔂伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳"
  ],
  [
    "ca40",
    "蔃",
    8,
    "蔍蔎蔏蔐蔒蔔蔕蔖蔘蔙蔛蔜蔝蔞蔠蔢",
    8,
    "蔭",
    9,
    "蔾",
    4,
    "蕄蕅蕆蕇蕋",
    10
  ],
  [
    "ca80",
    "蕗蕘蕚蕛蕜蕝蕟",
    4,
    "蕥蕦蕧蕩",
    8,
    "蕳蕵蕶蕷蕸蕼蕽蕿薀薁省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱"
  ],
  [
    "cb40",
    "薂薃薆薈",
    6,
    "薐",
    10,
    "薝",
    6,
    "薥薦薧薩薫薬薭薱",
    5,
    "薸薺",
    6,
    "藂",
    6,
    "藊",
    4,
    "藑藒"
  ],
  [
    "cb80",
    "藔藖",
    5,
    "藝",
    6,
    "藥藦藧藨藪",
    14,
    "恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔"
  ],
  [
    "cc40",
    "藹藺藼藽藾蘀",
    4,
    "蘆",
    10,
    "蘒蘓蘔蘕蘗",
    15,
    "蘨蘪",
    13,
    "蘹蘺蘻蘽蘾蘿虀"
  ],
  [
    "cc80",
    "虁",
    11,
    "虒虓處",
    4,
    "虛虜虝號虠虡虣",
    7,
    "獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃"
  ],
  [
    "cd40",
    "虭虯虰虲",
    6,
    "蚃",
    6,
    "蚎",
    4,
    "蚔蚖",
    5,
    "蚞",
    4,
    "蚥蚦蚫蚭蚮蚲蚳蚷蚸蚹蚻",
    4,
    "蛁蛂蛃蛅蛈蛌蛍蛒蛓蛕蛖蛗蛚蛜"
  ],
  [
    "cd80",
    "蛝蛠蛡蛢蛣蛥蛦蛧蛨蛪蛫蛬蛯蛵蛶蛷蛺蛻蛼蛽蛿蜁蜄蜅蜆蜋蜌蜎蜏蜐蜑蜔蜖汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威"
  ],
  [
    "ce40",
    "蜙蜛蜝蜟蜠蜤蜦蜧蜨蜪蜫蜬蜭蜯蜰蜲蜳蜵蜶蜸蜹蜺蜼蜽蝀",
    6,
    "蝊蝋蝍蝏蝐蝑蝒蝔蝕蝖蝘蝚",
    5,
    "蝡蝢蝦",
    7,
    "蝯蝱蝲蝳蝵"
  ],
  [
    "ce80",
    "蝷蝸蝹蝺蝿螀螁螄螆螇螉螊螌螎",
    4,
    "螔螕螖螘",
    6,
    "螠",
    4,
    "巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺"
  ],
  [
    "cf40",
    "螥螦螧螩螪螮螰螱螲螴螶螷螸螹螻螼螾螿蟁",
    4,
    "蟇蟈蟉蟌",
    4,
    "蟔",
    6,
    "蟜蟝蟞蟟蟡蟢蟣蟤蟦蟧蟨蟩蟫蟬蟭蟯",
    9
  ],
  [
    "cf80",
    "蟺蟻蟼蟽蟿蠀蠁蠂蠄",
    5,
    "蠋",
    7,
    "蠔蠗蠘蠙蠚蠜",
    4,
    "蠣稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓"
  ],
  [
    "d040",
    "蠤",
    13,
    "蠳",
    5,
    "蠺蠻蠽蠾蠿衁衂衃衆",
    5,
    "衎",
    5,
    "衕衖衘衚",
    6,
    "衦衧衪衭衯衱衳衴衵衶衸衹衺"
  ],
  [
    "d080",
    "衻衼袀袃袆袇袉袊袌袎袏袐袑袓袔袕袗",
    4,
    "袝",
    4,
    "袣袥",
    5,
    "小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄"
  ],
  [
    "d140",
    "袬袮袯袰袲",
    4,
    "袸袹袺袻袽袾袿裀裃裄裇裈裊裋裌裍裏裐裑裓裖裗裚",
    4,
    "裠裡裦裧裩",
    6,
    "裲裵裶裷裺裻製裿褀褁褃",
    5
  ],
  [
    "d180",
    "褉褋",
    4,
    "褑褔",
    4,
    "褜",
    4,
    "褢褣褤褦褧褨褩褬褭褮褯褱褲褳褵褷选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶"
  ],
  [
    "d240",
    "褸",
    8,
    "襂襃襅",
    24,
    "襠",
    5,
    "襧",
    19,
    "襼"
  ],
  [
    "d280",
    "襽襾覀覂覄覅覇",
    26,
    "摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐"
  ],
  [
    "d340",
    "覢",
    30,
    "觃觍觓觔觕觗觘觙觛觝觟觠觡觢觤觧觨觩觪觬觭觮觰觱觲觴",
    6
  ],
  [
    "d380",
    "觻",
    4,
    "訁",
    5,
    "計",
    21,
    "印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉"
  ],
  [
    "d440",
    "訞",
    31,
    "訿",
    8,
    "詉",
    21
  ],
  [
    "d480",
    "詟",
    25,
    "詺",
    6,
    "浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧"
  ],
  [
    "d540",
    "誁",
    7,
    "誋",
    7,
    "誔",
    46
  ],
  [
    "d580",
    "諃",
    32,
    "铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政"
  ],
  [
    "d640",
    "諤",
    34,
    "謈",
    27
  ],
  [
    "d680",
    "謤謥謧",
    30,
    "帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑"
  ],
  [
    "d740",
    "譆",
    31,
    "譧",
    4,
    "譭",
    25
  ],
  [
    "d780",
    "讇",
    24,
    "讬讱讻诇诐诪谉谞住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座"
  ],
  [
    "d840",
    "谸",
    8,
    "豂豃豄豅豈豊豋豍",
    7,
    "豖豗豘豙豛",
    5,
    "豣",
    6,
    "豬",
    6,
    "豴豵豶豷豻",
    6,
    "貃貄貆貇"
  ],
  [
    "d880",
    "貈貋貍",
    6,
    "貕貖貗貙",
    20,
    "亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝"
  ],
  [
    "d940",
    "貮",
    62
  ],
  [
    "d980",
    "賭",
    32,
    "佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼"
  ],
  [
    "da40",
    "贎",
    14,
    "贠赑赒赗赟赥赨赩赪赬赮赯赱赲赸",
    8,
    "趂趃趆趇趈趉趌",
    4,
    "趒趓趕",
    9,
    "趠趡"
  ],
  [
    "da80",
    "趢趤",
    12,
    "趲趶趷趹趻趽跀跁跂跅跇跈跉跊跍跐跒跓跔凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺"
  ],
  [
    "db40",
    "跕跘跙跜跠跡跢跥跦跧跩跭跮跰跱跲跴跶跼跾",
    6,
    "踆踇踈踋踍踎踐踑踒踓踕",
    7,
    "踠踡踤",
    4,
    "踫踭踰踲踳踴踶踷踸踻踼踾"
  ],
  [
    "db80",
    "踿蹃蹅蹆蹌",
    4,
    "蹓",
    5,
    "蹚",
    11,
    "蹧蹨蹪蹫蹮蹱邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝"
  ],
  [
    "dc40",
    "蹳蹵蹷",
    4,
    "蹽蹾躀躂躃躄躆躈",
    6,
    "躑躒躓躕",
    6,
    "躝躟",
    11,
    "躭躮躰躱躳",
    6,
    "躻",
    7
  ],
  [
    "dc80",
    "軃",
    10,
    "軏",
    21,
    "堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥"
  ],
  [
    "dd40",
    "軥",
    62
  ],
  [
    "dd80",
    "輤",
    32,
    "荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺"
  ],
  [
    "de40",
    "轅",
    32,
    "轪辀辌辒辝辠辡辢辤辥辦辧辪辬辭辮辯農辳辴辵辷辸辺辻込辿迀迃迆"
  ],
  [
    "de80",
    "迉",
    4,
    "迏迒迖迗迚迠迡迣迧迬迯迱迲迴迵迶迺迻迼迾迿逇逈逌逎逓逕逘蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖"
  ],
  [
    "df40",
    "這逜連逤逥逧",
    5,
    "逰",
    4,
    "逷逹逺逽逿遀遃遅遆遈",
    4,
    "過達違遖遙遚遜",
    5,
    "遤遦遧適遪遫遬遯",
    4,
    "遶",
    6,
    "遾邁"
  ],
  [
    "df80",
    "還邅邆邇邉邊邌",
    4,
    "邒邔邖邘邚邜邞邟邠邤邥邧邨邩邫邭邲邷邼邽邿郀摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼"
  ],
  [
    "e040",
    "郂郃郆郈郉郋郌郍郒郔郕郖郘郙郚郞郟郠郣郤郥郩郪郬郮郰郱郲郳郵郶郷郹郺郻郼郿鄀鄁鄃鄅",
    19,
    "鄚鄛鄜"
  ],
  [
    "e080",
    "鄝鄟鄠鄡鄤",
    10,
    "鄰鄲",
    6,
    "鄺",
    8,
    "酄唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼"
  ],
  [
    "e140",
    "酅酇酈酑酓酔酕酖酘酙酛酜酟酠酦酧酨酫酭酳酺酻酼醀",
    4,
    "醆醈醊醎醏醓",
    6,
    "醜",
    5,
    "醤",
    5,
    "醫醬醰醱醲醳醶醷醸醹醻"
  ],
  [
    "e180",
    "醼",
    10,
    "釈釋釐釒",
    9,
    "針",
    8,
    "帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺"
  ],
  [
    "e240",
    "釦",
    62
  ],
  [
    "e280",
    "鈥",
    32,
    "狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧",
    5,
    "饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂"
  ],
  [
    "e340",
    "鉆",
    45,
    "鉵",
    16
  ],
  [
    "e380",
    "銆",
    7,
    "銏",
    24,
    "恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾"
  ],
  [
    "e440",
    "銨",
    5,
    "銯",
    24,
    "鋉",
    31
  ],
  [
    "e480",
    "鋩",
    32,
    "洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑"
  ],
  [
    "e540",
    "錊",
    51,
    "錿",
    10
  ],
  [
    "e580",
    "鍊",
    31,
    "鍫濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣"
  ],
  [
    "e640",
    "鍬",
    34,
    "鎐",
    27
  ],
  [
    "e680",
    "鎬",
    29,
    "鏋鏌鏍妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩"
  ],
  [
    "e740",
    "鏎",
    7,
    "鏗",
    54
  ],
  [
    "e780",
    "鐎",
    32,
    "纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡",
    6,
    "缪缫缬缭缯",
    4,
    "缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬"
  ],
  [
    "e840",
    "鐯",
    14,
    "鐿",
    43,
    "鑬鑭鑮鑯"
  ],
  [
    "e880",
    "鑰",
    20,
    "钑钖钘铇铏铓铔铚铦铻锜锠琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹"
  ],
  [
    "e940",
    "锧锳锽镃镈镋镕镚镠镮镴镵長",
    7,
    "門",
    42
  ],
  [
    "e980",
    "閫",
    32,
    "椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋"
  ],
  [
    "ea40",
    "闌",
    27,
    "闬闿阇阓阘阛阞阠阣",
    6,
    "阫阬阭阯阰阷阸阹阺阾陁陃陊陎陏陑陒陓陖陗"
  ],
  [
    "ea80",
    "陘陙陚陜陝陞陠陣陥陦陫陭",
    4,
    "陳陸",
    12,
    "隇隉隊辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰"
  ],
  [
    "eb40",
    "隌階隑隒隓隕隖隚際隝",
    9,
    "隨",
    7,
    "隱隲隴隵隷隸隺隻隿雂雃雈雊雋雐雑雓雔雖",
    9,
    "雡",
    6,
    "雫"
  ],
  [
    "eb80",
    "雬雭雮雰雱雲雴雵雸雺電雼雽雿霂霃霅霊霋霌霐霑霒霔霕霗",
    4,
    "霝霟霠搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻"
  ],
  [
    "ec40",
    "霡",
    8,
    "霫霬霮霯霱霳",
    4,
    "霺霻霼霽霿",
    18,
    "靔靕靗靘靚靜靝靟靣靤靦靧靨靪",
    7
  ],
  [
    "ec80",
    "靲靵靷",
    4,
    "靽",
    7,
    "鞆",
    4,
    "鞌鞎鞏鞐鞓鞕鞖鞗鞙",
    4,
    "臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐"
  ],
  [
    "ed40",
    "鞞鞟鞡鞢鞤",
    6,
    "鞬鞮鞰鞱鞳鞵",
    46
  ],
  [
    "ed80",
    "韤韥韨韮",
    4,
    "韴韷",
    23,
    "怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨"
  ],
  [
    "ee40",
    "頏",
    62
  ],
  [
    "ee80",
    "顎",
    32,
    "睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶",
    4,
    "钼钽钿铄铈",
    6,
    "铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪"
  ],
  [
    "ef40",
    "顯",
    5,
    "颋颎颒颕颙颣風",
    37,
    "飏飐飔飖飗飛飜飝飠",
    4
  ],
  [
    "ef80",
    "飥飦飩",
    30,
    "铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒",
    4,
    "锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤",
    8,
    "镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔"
  ],
  [
    "f040",
    "餈",
    4,
    "餎餏餑",
    28,
    "餯",
    26
  ],
  [
    "f080",
    "饊",
    9,
    "饖",
    12,
    "饤饦饳饸饹饻饾馂馃馉稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨",
    4,
    "鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦",
    6,
    "鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙"
  ],
  [
    "f140",
    "馌馎馚",
    10,
    "馦馧馩",
    47
  ],
  [
    "f180",
    "駙",
    32,
    "瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃"
  ],
  [
    "f240",
    "駺",
    62
  ],
  [
    "f280",
    "騹",
    32,
    "颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒"
  ],
  [
    "f340",
    "驚",
    17,
    "驲骃骉骍骎骔骕骙骦骩",
    6,
    "骲骳骴骵骹骻骽骾骿髃髄髆",
    4,
    "髍髎髏髐髒體髕髖髗髙髚髛髜"
  ],
  [
    "f380",
    "髝髞髠髢髣髤髥髧髨髩髪髬髮髰",
    8,
    "髺髼",
    6,
    "鬄鬅鬆蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋"
  ],
  [
    "f440",
    "鬇鬉",
    5,
    "鬐鬑鬒鬔",
    10,
    "鬠鬡鬢鬤",
    10,
    "鬰鬱鬳",
    7,
    "鬽鬾鬿魀魆魊魋魌魎魐魒魓魕",
    5
  ],
  [
    "f480",
    "魛",
    32,
    "簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤"
  ],
  [
    "f540",
    "魼",
    62
  ],
  [
    "f580",
    "鮻",
    32,
    "酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜"
  ],
  [
    "f640",
    "鯜",
    62
  ],
  [
    "f680",
    "鰛",
    32,
    "觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅",
    5,
    "龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞",
    5,
    "鲥",
    4,
    "鲫鲭鲮鲰",
    7,
    "鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋"
  ],
  [
    "f740",
    "鰼",
    62
  ],
  [
    "f780",
    "鱻鱽鱾鲀鲃鲄鲉鲊鲌鲏鲓鲖鲗鲘鲙鲝鲪鲬鲯鲹鲾",
    4,
    "鳈鳉鳑鳒鳚鳛鳠鳡鳌",
    4,
    "鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄"
  ],
  [
    "f840",
    "鳣",
    62
  ],
  [
    "f880",
    "鴢",
    32
  ],
  [
    "f940",
    "鵃",
    62
  ],
  [
    "f980",
    "鶂",
    32
  ],
  [
    "fa40",
    "鶣",
    62
  ],
  [
    "fa80",
    "鷢",
    32
  ],
  [
    "fb40",
    "鸃",
    27,
    "鸤鸧鸮鸰鸴鸻鸼鹀鹍鹐鹒鹓鹔鹖鹙鹝鹟鹠鹡鹢鹥鹮鹯鹲鹴",
    9,
    "麀"
  ],
  [
    "fb80",
    "麁麃麄麅麆麉麊麌",
    5,
    "麔",
    8,
    "麞麠",
    5,
    "麧麨麩麪"
  ],
  [
    "fc40",
    "麫",
    8,
    "麵麶麷麹麺麼麿",
    4,
    "黅黆黇黈黊黋黌黐黒黓黕黖黗黙黚點黡黣黤黦黨黫黬黭黮黰",
    8,
    "黺黽黿",
    6
  ],
  [
    "fc80",
    "鼆",
    4,
    "鼌鼏鼑鼒鼔鼕鼖鼘鼚",
    5,
    "鼡鼣",
    8,
    "鼭鼮鼰鼱"
  ],
  [
    "fd40",
    "鼲",
    4,
    "鼸鼺鼼鼿",
    4,
    "齅",
    10,
    "齒",
    38
  ],
  [
    "fd80",
    "齹",
    5,
    "龁龂龍",
    11,
    "龜龝龞龡",
    4,
    "郎凉秊裏隣"
  ],
  [
    "fe40",
    "兀嗀﨎﨏﨑﨓﨔礼﨟蘒﨡﨣﨤﨧﨨﨩"
  ]
], Va = [
  [
    "a140",
    "",
    62
  ],
  [
    "a180",
    "",
    32
  ],
  [
    "a240",
    "",
    62
  ],
  [
    "a280",
    "",
    32
  ],
  [
    "a2ab",
    "",
    5
  ],
  [
    "a2e3",
    "€"
  ],
  [
    "a2ef",
    ""
  ],
  [
    "a2fd",
    ""
  ],
  [
    "a340",
    "",
    62
  ],
  [
    "a380",
    "",
    31,
    "　"
  ],
  [
    "a440",
    "",
    62
  ],
  [
    "a480",
    "",
    32
  ],
  [
    "a4f4",
    "",
    10
  ],
  [
    "a540",
    "",
    62
  ],
  [
    "a580",
    "",
    32
  ],
  [
    "a5f7",
    "",
    7
  ],
  [
    "a640",
    "",
    62
  ],
  [
    "a680",
    "",
    32
  ],
  [
    "a6b9",
    "",
    7
  ],
  [
    "a6d9",
    "",
    6
  ],
  [
    "a6ec",
    ""
  ],
  [
    "a6f3",
    ""
  ],
  [
    "a6f6",
    "",
    8
  ],
  [
    "a740",
    "",
    62
  ],
  [
    "a780",
    "",
    32
  ],
  [
    "a7c2",
    "",
    14
  ],
  [
    "a7f2",
    "",
    12
  ],
  [
    "a896",
    "",
    10
  ],
  [
    "a8bc",
    "ḿ"
  ],
  [
    "a8bf",
    "ǹ"
  ],
  [
    "a8c1",
    ""
  ],
  [
    "a8ea",
    "",
    20
  ],
  [
    "a958",
    ""
  ],
  [
    "a95b",
    ""
  ],
  [
    "a95d",
    ""
  ],
  [
    "a989",
    "〾⿰",
    11
  ],
  [
    "a997",
    "",
    12
  ],
  [
    "a9f0",
    "",
    14
  ],
  [
    "aaa1",
    "",
    93
  ],
  [
    "aba1",
    "",
    93
  ],
  [
    "aca1",
    "",
    93
  ],
  [
    "ada1",
    "",
    93
  ],
  [
    "aea1",
    "",
    93
  ],
  [
    "afa1",
    "",
    93
  ],
  [
    "d7fa",
    "",
    4
  ],
  [
    "f8a1",
    "",
    93
  ],
  [
    "f9a1",
    "",
    93
  ],
  [
    "faa1",
    "",
    93
  ],
  [
    "fba1",
    "",
    93
  ],
  [
    "fca1",
    "",
    93
  ],
  [
    "fda1",
    "",
    93
  ],
  [
    "fe50",
    "⺁⺄㑳㑇⺈⺋㖞㘚㘎⺌⺗㥮㤘㧏㧟㩳㧐㭎㱮㳠⺧⺪䁖䅟⺮䌷⺳⺶⺷䎱䎬⺻䏝䓖䙡䙌"
  ],
  [
    "fe80",
    "䜣䜩䝼䞍⻊䥇䥺䥽䦂䦃䦅䦆䦟䦛䦷䦶䲣䲟䲠䲡䱷䲢䴓",
    6,
    "䶮",
    93
  ],
  [
    "8135f437",
    ""
  ]
], uE = [
  128,
  165,
  169,
  178,
  184,
  216,
  226,
  235,
  238,
  244,
  248,
  251,
  253,
  258,
  276,
  284,
  300,
  325,
  329,
  334,
  364,
  463,
  465,
  467,
  469,
  471,
  473,
  475,
  477,
  506,
  594,
  610,
  712,
  716,
  730,
  930,
  938,
  962,
  970,
  1026,
  1104,
  1106,
  8209,
  8215,
  8218,
  8222,
  8231,
  8241,
  8244,
  8246,
  8252,
  8365,
  8452,
  8454,
  8458,
  8471,
  8482,
  8556,
  8570,
  8596,
  8602,
  8713,
  8720,
  8722,
  8726,
  8731,
  8737,
  8740,
  8742,
  8748,
  8751,
  8760,
  8766,
  8777,
  8781,
  8787,
  8802,
  8808,
  8816,
  8854,
  8858,
  8870,
  8896,
  8979,
  9322,
  9372,
  9548,
  9588,
  9616,
  9622,
  9634,
  9652,
  9662,
  9672,
  9676,
  9680,
  9702,
  9735,
  9738,
  9793,
  9795,
  11906,
  11909,
  11913,
  11917,
  11928,
  11944,
  11947,
  11951,
  11956,
  11960,
  11964,
  11979,
  12284,
  12292,
  12312,
  12319,
  12330,
  12351,
  12436,
  12447,
  12535,
  12543,
  12586,
  12842,
  12850,
  12964,
  13200,
  13215,
  13218,
  13253,
  13263,
  13267,
  13270,
  13384,
  13428,
  13727,
  13839,
  13851,
  14617,
  14703,
  14801,
  14816,
  14964,
  15183,
  15471,
  15585,
  16471,
  16736,
  17208,
  17325,
  17330,
  17374,
  17623,
  17997,
  18018,
  18212,
  18218,
  18301,
  18318,
  18760,
  18811,
  18814,
  18820,
  18823,
  18844,
  18848,
  18872,
  19576,
  19620,
  19738,
  19887,
  40870,
  59244,
  59336,
  59367,
  59413,
  59417,
  59423,
  59431,
  59437,
  59443,
  59452,
  59460,
  59478,
  59493,
  63789,
  63866,
  63894,
  63976,
  63986,
  64016,
  64018,
  64021,
  64025,
  64034,
  64037,
  64042,
  65074,
  65093,
  65107,
  65112,
  65127,
  65132,
  65375,
  65510,
  65536
], hE = [
  0,
  36,
  38,
  45,
  50,
  81,
  89,
  95,
  96,
  100,
  103,
  104,
  105,
  109,
  126,
  133,
  148,
  172,
  175,
  179,
  208,
  306,
  307,
  308,
  309,
  310,
  311,
  312,
  313,
  341,
  428,
  443,
  544,
  545,
  558,
  741,
  742,
  749,
  750,
  805,
  819,
  820,
  7922,
  7924,
  7925,
  7927,
  7934,
  7943,
  7944,
  7945,
  7950,
  8062,
  8148,
  8149,
  8152,
  8164,
  8174,
  8236,
  8240,
  8262,
  8264,
  8374,
  8380,
  8381,
  8384,
  8388,
  8390,
  8392,
  8393,
  8394,
  8396,
  8401,
  8406,
  8416,
  8419,
  8424,
  8437,
  8439,
  8445,
  8482,
  8485,
  8496,
  8521,
  8603,
  8936,
  8946,
  9046,
  9050,
  9063,
  9066,
  9076,
  9092,
  9100,
  9108,
  9111,
  9113,
  9131,
  9162,
  9164,
  9218,
  9219,
  11329,
  11331,
  11334,
  11336,
  11346,
  11361,
  11363,
  11366,
  11370,
  11372,
  11375,
  11389,
  11682,
  11686,
  11687,
  11692,
  11694,
  11714,
  11716,
  11723,
  11725,
  11730,
  11736,
  11982,
  11989,
  12102,
  12336,
  12348,
  12350,
  12384,
  12393,
  12395,
  12397,
  12510,
  12553,
  12851,
  12962,
  12973,
  13738,
  13823,
  13919,
  13933,
  14080,
  14298,
  14585,
  14698,
  15583,
  15847,
  16318,
  16434,
  16438,
  16481,
  16729,
  17102,
  17122,
  17315,
  17320,
  17402,
  17418,
  17859,
  17909,
  17911,
  17915,
  17916,
  17936,
  17939,
  17961,
  18664,
  18703,
  18814,
  18962,
  19043,
  33469,
  33470,
  33471,
  33484,
  33485,
  33490,
  33497,
  33501,
  33505,
  33513,
  33520,
  33536,
  33550,
  37845,
  37921,
  37948,
  38029,
  38038,
  38064,
  38065,
  38066,
  38069,
  38075,
  38076,
  38078,
  39108,
  39109,
  39113,
  39114,
  39115,
  39116,
  39265,
  39394,
  189e3
], dE = {
  uChars: uE,
  gbChars: hE
}, pE = [
  [
    "0",
    "\0",
    127
  ],
  [
    "8141",
    "갂갃갅갆갋",
    4,
    "갘갞갟갡갢갣갥",
    6,
    "갮갲갳갴"
  ],
  [
    "8161",
    "갵갶갷갺갻갽갾갿걁",
    9,
    "걌걎",
    5,
    "걕"
  ],
  [
    "8181",
    "걖걗걙걚걛걝",
    18,
    "걲걳걵걶걹걻",
    4,
    "겂겇겈겍겎겏겑겒겓겕",
    6,
    "겞겢",
    5,
    "겫겭겮겱",
    6,
    "겺겾겿곀곂곃곅곆곇곉곊곋곍",
    7,
    "곖곘",
    7,
    "곢곣곥곦곩곫곭곮곲곴곷",
    4,
    "곾곿괁괂괃괅괇",
    4,
    "괎괐괒괓"
  ],
  [
    "8241",
    "괔괕괖괗괙괚괛괝괞괟괡",
    7,
    "괪괫괮",
    5
  ],
  [
    "8261",
    "괶괷괹괺괻괽",
    6,
    "굆굈굊",
    5,
    "굑굒굓굕굖굗"
  ],
  [
    "8281",
    "굙",
    7,
    "굢굤",
    7,
    "굮굯굱굲굷굸굹굺굾궀궃",
    4,
    "궊궋궍궎궏궑",
    10,
    "궞",
    5,
    "궥",
    17,
    "궸",
    7,
    "귂귃귅귆귇귉",
    6,
    "귒귔",
    7,
    "귝귞귟귡귢귣귥",
    18
  ],
  [
    "8341",
    "귺귻귽귾긂",
    5,
    "긊긌긎",
    5,
    "긕",
    7
  ],
  [
    "8361",
    "긝",
    18,
    "긲긳긵긶긹긻긼"
  ],
  [
    "8381",
    "긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗",
    4,
    "깞깢깣깤깦깧깪깫깭깮깯깱",
    6,
    "깺깾",
    5,
    "꺆",
    5,
    "꺍",
    46,
    "꺿껁껂껃껅",
    6,
    "껎껒",
    5,
    "껚껛껝",
    8
  ],
  [
    "8441",
    "껦껧껩껪껬껮",
    5,
    "껵껶껷껹껺껻껽",
    8
  ],
  [
    "8461",
    "꼆꼉꼊꼋꼌꼎꼏꼑",
    18
  ],
  [
    "8481",
    "꼤",
    7,
    "꼮꼯꼱꼳꼵",
    6,
    "꼾꽀꽄꽅꽆꽇꽊",
    5,
    "꽑",
    10,
    "꽞",
    5,
    "꽦",
    18,
    "꽺",
    5,
    "꾁꾂꾃꾅꾆꾇꾉",
    6,
    "꾒꾓꾔꾖",
    5,
    "꾝",
    26,
    "꾺꾻꾽꾾"
  ],
  [
    "8541",
    "꾿꿁",
    5,
    "꿊꿌꿏",
    4,
    "꿕",
    6,
    "꿝",
    4
  ],
  [
    "8561",
    "꿢",
    5,
    "꿪",
    5,
    "꿲꿳꿵꿶꿷꿹",
    6,
    "뀂뀃"
  ],
  [
    "8581",
    "뀅",
    6,
    "뀍뀎뀏뀑뀒뀓뀕",
    6,
    "뀞",
    9,
    "뀩",
    26,
    "끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞",
    29,
    "끾끿낁낂낃낅",
    6,
    "낎낐낒",
    5,
    "낛낝낞낣낤"
  ],
  [
    "8641",
    "낥낦낧낪낰낲낶낷낹낺낻낽",
    6,
    "냆냊",
    5,
    "냒"
  ],
  [
    "8661",
    "냓냕냖냗냙",
    6,
    "냡냢냣냤냦",
    10
  ],
  [
    "8681",
    "냱",
    22,
    "넊넍넎넏넑넔넕넖넗넚넞",
    4,
    "넦넧넩넪넫넭",
    6,
    "넶넺",
    5,
    "녂녃녅녆녇녉",
    6,
    "녒녓녖녗녙녚녛녝녞녟녡",
    22,
    "녺녻녽녾녿놁놃",
    4,
    "놊놌놎놏놐놑놕놖놗놙놚놛놝"
  ],
  [
    "8741",
    "놞",
    9,
    "놩",
    15
  ],
  [
    "8761",
    "놹",
    18,
    "뇍뇎뇏뇑뇒뇓뇕"
  ],
  [
    "8781",
    "뇖",
    5,
    "뇞뇠",
    7,
    "뇪뇫뇭뇮뇯뇱",
    7,
    "뇺뇼뇾",
    5,
    "눆눇눉눊눍",
    6,
    "눖눘눚",
    5,
    "눡",
    18,
    "눵",
    6,
    "눽",
    26,
    "뉙뉚뉛뉝뉞뉟뉡",
    6,
    "뉪",
    4
  ],
  [
    "8841",
    "뉯",
    4,
    "뉶",
    5,
    "뉽",
    6,
    "늆늇늈늊",
    4
  ],
  [
    "8861",
    "늏늒늓늕늖늗늛",
    4,
    "늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷"
  ],
  [
    "8881",
    "늸",
    15,
    "닊닋닍닎닏닑닓",
    4,
    "닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉",
    6,
    "댒댖",
    5,
    "댝",
    54,
    "덗덙덚덝덠덡덢덣"
  ],
  [
    "8941",
    "덦덨덪덬덭덯덲덳덵덶덷덹",
    6,
    "뎂뎆",
    5,
    "뎍"
  ],
  [
    "8961",
    "뎎뎏뎑뎒뎓뎕",
    10,
    "뎢",
    5,
    "뎩뎪뎫뎭"
  ],
  [
    "8981",
    "뎮",
    21,
    "돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩",
    18,
    "돽",
    18,
    "됑",
    6,
    "됙됚됛됝됞됟됡",
    6,
    "됪됬",
    7,
    "됵",
    15
  ],
  [
    "8a41",
    "둅",
    10,
    "둒둓둕둖둗둙",
    6,
    "둢둤둦"
  ],
  [
    "8a61",
    "둧",
    4,
    "둭",
    18,
    "뒁뒂"
  ],
  [
    "8a81",
    "뒃",
    4,
    "뒉",
    19,
    "뒞",
    5,
    "뒥뒦뒧뒩뒪뒫뒭",
    7,
    "뒶뒸뒺",
    5,
    "듁듂듃듅듆듇듉",
    6,
    "듑듒듓듔듖",
    5,
    "듞듟듡듢듥듧",
    4,
    "듮듰듲",
    5,
    "듹",
    26,
    "딖딗딙딚딝"
  ],
  [
    "8b41",
    "딞",
    5,
    "딦딫",
    4,
    "딲딳딵딶딷딹",
    6,
    "땂땆"
  ],
  [
    "8b61",
    "땇땈땉땊땎땏땑땒땓땕",
    6,
    "땞땢",
    8
  ],
  [
    "8b81",
    "땫",
    52,
    "떢떣떥떦떧떩떬떭떮떯떲떶",
    4,
    "떾떿뗁뗂뗃뗅",
    6,
    "뗎뗒",
    5,
    "뗙",
    18,
    "뗭",
    18
  ],
  [
    "8c41",
    "똀",
    15,
    "똒똓똕똖똗똙",
    4
  ],
  [
    "8c61",
    "똞",
    6,
    "똦",
    5,
    "똭",
    6,
    "똵",
    5
  ],
  [
    "8c81",
    "똻",
    12,
    "뙉",
    26,
    "뙥뙦뙧뙩",
    50,
    "뚞뚟뚡뚢뚣뚥",
    5,
    "뚭뚮뚯뚰뚲",
    16
  ],
  [
    "8d41",
    "뛃",
    16,
    "뛕",
    8
  ],
  [
    "8d61",
    "뛞",
    17,
    "뛱뛲뛳뛵뛶뛷뛹뛺"
  ],
  [
    "8d81",
    "뛻",
    4,
    "뜂뜃뜄뜆",
    33,
    "뜪뜫뜭뜮뜱",
    6,
    "뜺뜼",
    7,
    "띅띆띇띉띊띋띍",
    6,
    "띖",
    9,
    "띡띢띣띥띦띧띩",
    6,
    "띲띴띶",
    5,
    "띾띿랁랂랃랅",
    6,
    "랎랓랔랕랚랛랝랞"
  ],
  [
    "8e41",
    "랟랡",
    6,
    "랪랮",
    5,
    "랶랷랹",
    8
  ],
  [
    "8e61",
    "럂",
    4,
    "럈럊",
    19
  ],
  [
    "8e81",
    "럞",
    13,
    "럮럯럱럲럳럵",
    6,
    "럾렂",
    4,
    "렊렋렍렎렏렑",
    6,
    "렚렜렞",
    5,
    "렦렧렩렪렫렭",
    6,
    "렶렺",
    5,
    "롁롂롃롅",
    11,
    "롒롔",
    7,
    "롞롟롡롢롣롥",
    6,
    "롮롰롲",
    5,
    "롹롺롻롽",
    7
  ],
  [
    "8f41",
    "뢅",
    7,
    "뢎",
    17
  ],
  [
    "8f61",
    "뢠",
    7,
    "뢩",
    6,
    "뢱뢲뢳뢵뢶뢷뢹",
    4
  ],
  [
    "8f81",
    "뢾뢿룂룄룆",
    5,
    "룍룎룏룑룒룓룕",
    7,
    "룞룠룢",
    5,
    "룪룫룭룮룯룱",
    6,
    "룺룼룾",
    5,
    "뤅",
    18,
    "뤙",
    6,
    "뤡",
    26,
    "뤾뤿륁륂륃륅",
    6,
    "륍륎륐륒",
    5
  ],
  [
    "9041",
    "륚륛륝륞륟륡",
    6,
    "륪륬륮",
    5,
    "륶륷륹륺륻륽"
  ],
  [
    "9061",
    "륾",
    5,
    "릆릈릋릌릏",
    15
  ],
  [
    "9081",
    "릟",
    12,
    "릮릯릱릲릳릵",
    6,
    "릾맀맂",
    5,
    "맊맋맍맓",
    4,
    "맚맜맟맠맢맦맧맩맪맫맭",
    6,
    "맶맻",
    4,
    "먂",
    5,
    "먉",
    11,
    "먖",
    33,
    "먺먻먽먾먿멁멃멄멅멆"
  ],
  [
    "9141",
    "멇멊멌멏멐멑멒멖멗멙멚멛멝",
    6,
    "멦멪",
    5
  ],
  [
    "9161",
    "멲멳멵멶멷멹",
    9,
    "몆몈몉몊몋몍",
    5
  ],
  [
    "9181",
    "몓",
    20,
    "몪몭몮몯몱몳",
    4,
    "몺몼몾",
    5,
    "뫅뫆뫇뫉",
    14,
    "뫚",
    33,
    "뫽뫾뫿묁묂묃묅",
    7,
    "묎묐묒",
    5,
    "묙묚묛묝묞묟묡",
    6
  ],
  [
    "9241",
    "묨묪묬",
    7,
    "묷묹묺묿",
    4,
    "뭆뭈뭊뭋뭌뭎뭑뭒"
  ],
  [
    "9261",
    "뭓뭕뭖뭗뭙",
    7,
    "뭢뭤",
    7,
    "뭭",
    4
  ],
  [
    "9281",
    "뭲",
    21,
    "뮉뮊뮋뮍뮎뮏뮑",
    18,
    "뮥뮦뮧뮩뮪뮫뮭",
    6,
    "뮵뮶뮸",
    7,
    "믁믂믃믅믆믇믉",
    6,
    "믑믒믔",
    35,
    "믺믻믽믾밁"
  ],
  [
    "9341",
    "밃",
    4,
    "밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵"
  ],
  [
    "9361",
    "밶밷밹",
    6,
    "뱂뱆뱇뱈뱊뱋뱎뱏뱑",
    8
  ],
  [
    "9381",
    "뱚뱛뱜뱞",
    37,
    "벆벇벉벊벍벏",
    4,
    "벖벘벛",
    4,
    "벢벣벥벦벩",
    6,
    "벲벶",
    5,
    "벾벿볁볂볃볅",
    7,
    "볎볒볓볔볖볗볙볚볛볝",
    22,
    "볷볹볺볻볽"
  ],
  [
    "9441",
    "볾",
    5,
    "봆봈봊",
    5,
    "봑봒봓봕",
    8
  ],
  [
    "9461",
    "봞",
    5,
    "봥",
    6,
    "봭",
    12
  ],
  [
    "9481",
    "봺",
    5,
    "뵁",
    6,
    "뵊뵋뵍뵎뵏뵑",
    6,
    "뵚",
    9,
    "뵥뵦뵧뵩",
    22,
    "붂붃붅붆붋",
    4,
    "붒붔붖붗붘붛붝",
    6,
    "붥",
    10,
    "붱",
    6,
    "붹",
    24
  ],
  [
    "9541",
    "뷒뷓뷖뷗뷙뷚뷛뷝",
    11,
    "뷪",
    5,
    "뷱"
  ],
  [
    "9561",
    "뷲뷳뷵뷶뷷뷹",
    6,
    "븁븂븄븆",
    5,
    "븎븏븑븒븓"
  ],
  [
    "9581",
    "븕",
    6,
    "븞븠",
    35,
    "빆빇빉빊빋빍빏",
    4,
    "빖빘빜빝빞빟빢빣빥빦빧빩빫",
    4,
    "빲빶",
    4,
    "빾빿뺁뺂뺃뺅",
    6,
    "뺎뺒",
    5,
    "뺚",
    13,
    "뺩",
    14
  ],
  [
    "9641",
    "뺸",
    23,
    "뻒뻓"
  ],
  [
    "9661",
    "뻕뻖뻙",
    6,
    "뻡뻢뻦",
    5,
    "뻭",
    8
  ],
  [
    "9681",
    "뻶",
    10,
    "뼂",
    5,
    "뼊",
    13,
    "뼚뼞",
    33,
    "뽂뽃뽅뽆뽇뽉",
    6,
    "뽒뽓뽔뽖",
    44
  ],
  [
    "9741",
    "뾃",
    16,
    "뾕",
    8
  ],
  [
    "9761",
    "뾞",
    17,
    "뾱",
    7
  ],
  [
    "9781",
    "뾹",
    11,
    "뿆",
    5,
    "뿎뿏뿑뿒뿓뿕",
    6,
    "뿝뿞뿠뿢",
    89,
    "쀽쀾쀿"
  ],
  [
    "9841",
    "쁀",
    16,
    "쁒",
    5,
    "쁙쁚쁛"
  ],
  [
    "9861",
    "쁝쁞쁟쁡",
    6,
    "쁪",
    15
  ],
  [
    "9881",
    "쁺",
    21,
    "삒삓삕삖삗삙",
    6,
    "삢삤삦",
    5,
    "삮삱삲삷",
    4,
    "삾샂샃샄샆샇샊샋샍샎샏샑",
    6,
    "샚샞",
    5,
    "샦샧샩샪샫샭",
    6,
    "샶샸샺",
    5,
    "섁섂섃섅섆섇섉",
    6,
    "섑섒섓섔섖",
    5,
    "섡섢섥섨섩섪섫섮"
  ],
  [
    "9941",
    "섲섳섴섵섷섺섻섽섾섿셁",
    6,
    "셊셎",
    5,
    "셖셗"
  ],
  [
    "9961",
    "셙셚셛셝",
    6,
    "셦셪",
    5,
    "셱셲셳셵셶셷셹셺셻"
  ],
  [
    "9981",
    "셼",
    8,
    "솆",
    5,
    "솏솑솒솓솕솗",
    4,
    "솞솠솢솣솤솦솧솪솫솭솮솯솱",
    11,
    "솾",
    5,
    "쇅쇆쇇쇉쇊쇋쇍",
    6,
    "쇕쇖쇙",
    6,
    "쇡쇢쇣쇥쇦쇧쇩",
    6,
    "쇲쇴",
    7,
    "쇾쇿숁숂숃숅",
    6,
    "숎숐숒",
    5,
    "숚숛숝숞숡숢숣"
  ],
  [
    "9a41",
    "숤숥숦숧숪숬숮숰숳숵",
    16
  ],
  [
    "9a61",
    "쉆쉇쉉",
    6,
    "쉒쉓쉕쉖쉗쉙",
    6,
    "쉡쉢쉣쉤쉦"
  ],
  [
    "9a81",
    "쉧",
    4,
    "쉮쉯쉱쉲쉳쉵",
    6,
    "쉾슀슂",
    5,
    "슊",
    5,
    "슑",
    6,
    "슙슚슜슞",
    5,
    "슦슧슩슪슫슮",
    5,
    "슶슸슺",
    33,
    "싞싟싡싢싥",
    5,
    "싮싰싲싳싴싵싷싺싽싾싿쌁",
    6,
    "쌊쌋쌎쌏"
  ],
  [
    "9b41",
    "쌐쌑쌒쌖쌗쌙쌚쌛쌝",
    6,
    "쌦쌧쌪",
    8
  ],
  [
    "9b61",
    "쌳",
    17,
    "썆",
    7
  ],
  [
    "9b81",
    "썎",
    25,
    "썪썫썭썮썯썱썳",
    4,
    "썺썻썾",
    5,
    "쎅쎆쎇쎉쎊쎋쎍",
    50,
    "쏁",
    22,
    "쏚"
  ],
  [
    "9c41",
    "쏛쏝쏞쏡쏣",
    4,
    "쏪쏫쏬쏮",
    5,
    "쏶쏷쏹",
    5
  ],
  [
    "9c61",
    "쏿",
    8,
    "쐉",
    6,
    "쐑",
    9
  ],
  [
    "9c81",
    "쐛",
    8,
    "쐥",
    6,
    "쐭쐮쐯쐱쐲쐳쐵",
    6,
    "쐾",
    9,
    "쑉",
    26,
    "쑦쑧쑩쑪쑫쑭",
    6,
    "쑶쑷쑸쑺",
    5,
    "쒁",
    18,
    "쒕",
    6,
    "쒝",
    12
  ],
  [
    "9d41",
    "쒪",
    13,
    "쒹쒺쒻쒽",
    8
  ],
  [
    "9d61",
    "쓆",
    25
  ],
  [
    "9d81",
    "쓠",
    8,
    "쓪",
    5,
    "쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂",
    9,
    "씍씎씏씑씒씓씕",
    6,
    "씝",
    10,
    "씪씫씭씮씯씱",
    6,
    "씺씼씾",
    5,
    "앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩",
    6,
    "앲앶",
    5,
    "앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔"
  ],
  [
    "9e41",
    "얖얙얚얛얝얞얟얡",
    7,
    "얪",
    9,
    "얶"
  ],
  [
    "9e61",
    "얷얺얿",
    4,
    "엋엍엏엒엓엕엖엗엙",
    6,
    "엢엤엦엧"
  ],
  [
    "9e81",
    "엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑",
    6,
    "옚옝",
    6,
    "옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉",
    6,
    "왒왖",
    5,
    "왞왟왡",
    10,
    "왭왮왰왲",
    5,
    "왺왻왽왾왿욁",
    6,
    "욊욌욎",
    5,
    "욖욗욙욚욛욝",
    6,
    "욦"
  ],
  [
    "9f41",
    "욨욪",
    5,
    "욲욳욵욶욷욻",
    4,
    "웂웄웆",
    5,
    "웎"
  ],
  [
    "9f61",
    "웏웑웒웓웕",
    6,
    "웞웟웢",
    5,
    "웪웫웭웮웯웱웲"
  ],
  [
    "9f81",
    "웳",
    4,
    "웺웻웼웾",
    5,
    "윆윇윉윊윋윍",
    6,
    "윖윘윚",
    5,
    "윢윣윥윦윧윩",
    6,
    "윲윴윶윸윹윺윻윾윿읁읂읃읅",
    4,
    "읋읎읐읙읚읛읝읞읟읡",
    6,
    "읩읪읬",
    7,
    "읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛",
    4,
    "잢잧",
    4,
    "잮잯잱잲잳잵잶잷"
  ],
  [
    "a041",
    "잸잹잺잻잾쟂",
    5,
    "쟊쟋쟍쟏쟑",
    6,
    "쟙쟚쟛쟜"
  ],
  [
    "a061",
    "쟞",
    5,
    "쟥쟦쟧쟩쟪쟫쟭",
    13
  ],
  [
    "a081",
    "쟻",
    4,
    "젂젃젅젆젇젉젋",
    4,
    "젒젔젗",
    4,
    "젞젟젡젢젣젥",
    6,
    "젮젰젲",
    5,
    "젹젺젻젽젾젿졁",
    6,
    "졊졋졎",
    5,
    "졕",
    26,
    "졲졳졵졶졷졹졻",
    4,
    "좂좄좈좉좊좎",
    5,
    "좕",
    7,
    "좞좠좢좣좤"
  ],
  [
    "a141",
    "좥좦좧좩",
    18,
    "좾좿죀죁"
  ],
  [
    "a161",
    "죂죃죅죆죇죉죊죋죍",
    6,
    "죖죘죚",
    5,
    "죢죣죥"
  ],
  [
    "a181",
    "죦",
    14,
    "죶",
    5,
    "죾죿줁줂줃줇",
    4,
    "줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈",
    9,
    "±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢"
  ],
  [
    "a241",
    "줐줒",
    5,
    "줙",
    18
  ],
  [
    "a261",
    "줭",
    6,
    "줵",
    18
  ],
  [
    "a281",
    "쥈",
    7,
    "쥒쥓쥕쥖쥗쥙",
    6,
    "쥢쥤",
    7,
    "쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®"
  ],
  [
    "a341",
    "쥱쥲쥳쥵",
    6,
    "쥽",
    10,
    "즊즋즍즎즏"
  ],
  [
    "a361",
    "즑",
    6,
    "즚즜즞",
    16
  ],
  [
    "a381",
    "즯",
    16,
    "짂짃짅짆짉짋",
    4,
    "짒짔짗짘짛！",
    58,
    "￦］",
    32,
    "￣"
  ],
  [
    "a441",
    "짞짟짡짣짥짦짨짩짪짫짮짲",
    5,
    "짺짻짽짾짿쨁쨂쨃쨄"
  ],
  [
    "a461",
    "쨅쨆쨇쨊쨎",
    5,
    "쨕쨖쨗쨙",
    12
  ],
  [
    "a481",
    "쨦쨧쨨쨪",
    28,
    "ㄱ",
    93
  ],
  [
    "a541",
    "쩇",
    4,
    "쩎쩏쩑쩒쩓쩕",
    6,
    "쩞쩢",
    5,
    "쩩쩪"
  ],
  [
    "a561",
    "쩫",
    17,
    "쩾",
    5,
    "쪅쪆"
  ],
  [
    "a581",
    "쪇",
    16,
    "쪙",
    14,
    "ⅰ",
    9
  ],
  [
    "a5b0",
    "Ⅰ",
    9
  ],
  [
    "a5c1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a5e1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a641",
    "쪨",
    19,
    "쪾쪿쫁쫂쫃쫅"
  ],
  [
    "a661",
    "쫆",
    5,
    "쫎쫐쫒쫔쫕쫖쫗쫚",
    5,
    "쫡",
    6
  ],
  [
    "a681",
    "쫨쫩쫪쫫쫭",
    6,
    "쫵",
    18,
    "쬉쬊─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃",
    7
  ],
  [
    "a741",
    "쬋",
    4,
    "쬑쬒쬓쬕쬖쬗쬙",
    6,
    "쬢",
    7
  ],
  [
    "a761",
    "쬪",
    22,
    "쭂쭃쭄"
  ],
  [
    "a781",
    "쭅쭆쭇쭊쭋쭍쭎쭏쭑",
    6,
    "쭚쭛쭜쭞",
    5,
    "쭥",
    7,
    "㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙",
    9,
    "㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰",
    9,
    "㎀",
    4,
    "㎺",
    5,
    "㎐",
    4,
    "Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆"
  ],
  [
    "a841",
    "쭭",
    10,
    "쭺",
    14
  ],
  [
    "a861",
    "쮉",
    18,
    "쮝",
    6
  ],
  [
    "a881",
    "쮤",
    19,
    "쮹",
    11,
    "ÆÐªĦ"
  ],
  [
    "a8a6",
    "Ĳ"
  ],
  [
    "a8a8",
    "ĿŁØŒºÞŦŊ"
  ],
  [
    "a8b1",
    "㉠",
    27,
    "ⓐ",
    25,
    "①",
    14,
    "½⅓⅔¼¾⅛⅜⅝⅞"
  ],
  [
    "a941",
    "쯅",
    14,
    "쯕",
    10
  ],
  [
    "a961",
    "쯠쯡쯢쯣쯥쯦쯨쯪",
    18
  ],
  [
    "a981",
    "쯽",
    14,
    "찎찏찑찒찓찕",
    6,
    "찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀",
    27,
    "⒜",
    25,
    "⑴",
    14,
    "¹²³⁴ⁿ₁₂₃₄"
  ],
  [
    "aa41",
    "찥찦찪찫찭찯찱",
    6,
    "찺찿",
    4,
    "챆챇챉챊챋챍챎"
  ],
  [
    "aa61",
    "챏",
    4,
    "챖챚",
    5,
    "챡챢챣챥챧챩",
    6,
    "챱챲"
  ],
  [
    "aa81",
    "챳챴챶",
    29,
    "ぁ",
    82
  ],
  [
    "ab41",
    "첔첕첖첗첚첛첝첞첟첡",
    6,
    "첪첮",
    5,
    "첶첷첹"
  ],
  [
    "ab61",
    "첺첻첽",
    6,
    "쳆쳈쳊",
    5,
    "쳑쳒쳓쳕",
    5
  ],
  [
    "ab81",
    "쳛",
    8,
    "쳥",
    6,
    "쳭쳮쳯쳱",
    12,
    "ァ",
    85
  ],
  [
    "ac41",
    "쳾쳿촀촂",
    5,
    "촊촋촍촎촏촑",
    6,
    "촚촜촞촟촠"
  ],
  [
    "ac61",
    "촡촢촣촥촦촧촩촪촫촭",
    11,
    "촺",
    4
  ],
  [
    "ac81",
    "촿",
    28,
    "쵝쵞쵟А",
    5,
    "ЁЖ",
    25
  ],
  [
    "acd1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "ad41",
    "쵡쵢쵣쵥",
    6,
    "쵮쵰쵲",
    5,
    "쵹",
    7
  ],
  [
    "ad61",
    "춁",
    6,
    "춉",
    10,
    "춖춗춙춚춛춝춞춟"
  ],
  [
    "ad81",
    "춠춡춢춣춦춨춪",
    5,
    "춱",
    18,
    "췅"
  ],
  [
    "ae41",
    "췆",
    5,
    "췍췎췏췑",
    16
  ],
  [
    "ae61",
    "췢",
    5,
    "췩췪췫췭췮췯췱",
    6,
    "췺췼췾",
    4
  ],
  [
    "ae81",
    "츃츅츆츇츉츊츋츍",
    6,
    "츕츖츗츘츚",
    5,
    "츢츣츥츦츧츩츪츫"
  ],
  [
    "af41",
    "츬츭츮츯츲츴츶",
    19
  ],
  [
    "af61",
    "칊",
    13,
    "칚칛칝칞칢",
    5,
    "칪칬"
  ],
  [
    "af81",
    "칮",
    5,
    "칶칷칹칺칻칽",
    6,
    "캆캈캊",
    5,
    "캒캓캕캖캗캙"
  ],
  [
    "b041",
    "캚",
    5,
    "캢캦",
    5,
    "캮",
    12
  ],
  [
    "b061",
    "캻",
    5,
    "컂",
    19
  ],
  [
    "b081",
    "컖",
    13,
    "컦컧컩컪컭",
    6,
    "컶컺",
    5,
    "가각간갇갈갉갊감",
    7,
    "같",
    4,
    "갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆"
  ],
  [
    "b141",
    "켂켃켅켆켇켉",
    6,
    "켒켔켖",
    5,
    "켝켞켟켡켢켣"
  ],
  [
    "b161",
    "켥",
    6,
    "켮켲",
    5,
    "켹",
    11
  ],
  [
    "b181",
    "콅",
    14,
    "콖콗콙콚콛콝",
    6,
    "콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸"
  ],
  [
    "b241",
    "콭콮콯콲콳콵콶콷콹",
    6,
    "쾁쾂쾃쾄쾆",
    5,
    "쾍"
  ],
  [
    "b261",
    "쾎",
    18,
    "쾢",
    5,
    "쾩"
  ],
  [
    "b281",
    "쾪",
    5,
    "쾱",
    18,
    "쿅",
    6,
    "깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙"
  ],
  [
    "b341",
    "쿌",
    19,
    "쿢쿣쿥쿦쿧쿩"
  ],
  [
    "b361",
    "쿪",
    5,
    "쿲쿴쿶",
    5,
    "쿽쿾쿿퀁퀂퀃퀅",
    5
  ],
  [
    "b381",
    "퀋",
    5,
    "퀒",
    5,
    "퀙",
    19,
    "끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫",
    4,
    "낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝"
  ],
  [
    "b441",
    "퀮",
    5,
    "퀶퀷퀹퀺퀻퀽",
    6,
    "큆큈큊",
    5
  ],
  [
    "b461",
    "큑큒큓큕큖큗큙",
    6,
    "큡",
    10,
    "큮큯"
  ],
  [
    "b481",
    "큱큲큳큵",
    6,
    "큾큿킀킂",
    18,
    "뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫",
    4,
    "닳담답닷",
    4,
    "닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥"
  ],
  [
    "b541",
    "킕",
    14,
    "킦킧킩킪킫킭",
    5
  ],
  [
    "b561",
    "킳킶킸킺",
    5,
    "탂탃탅탆탇탊",
    5,
    "탒탖",
    4
  ],
  [
    "b581",
    "탛탞탟탡탢탣탥",
    6,
    "탮탲",
    5,
    "탹",
    11,
    "덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸"
  ],
  [
    "b641",
    "턅",
    7,
    "턎",
    17
  ],
  [
    "b661",
    "턠",
    15,
    "턲턳턵턶턷턹턻턼턽턾"
  ],
  [
    "b681",
    "턿텂텆",
    5,
    "텎텏텑텒텓텕",
    6,
    "텞텠텢",
    5,
    "텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗"
  ],
  [
    "b741",
    "텮",
    13,
    "텽",
    6,
    "톅톆톇톉톊"
  ],
  [
    "b761",
    "톋",
    20,
    "톢톣톥톦톧"
  ],
  [
    "b781",
    "톩",
    6,
    "톲톴톶톷톸톹톻톽톾톿퇁",
    14,
    "래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩"
  ],
  [
    "b841",
    "퇐",
    7,
    "퇙",
    17
  ],
  [
    "b861",
    "퇫",
    8,
    "퇵퇶퇷퇹",
    13
  ],
  [
    "b881",
    "툈툊",
    5,
    "툑",
    24,
    "륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많",
    4,
    "맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼"
  ],
  [
    "b941",
    "툪툫툮툯툱툲툳툵",
    6,
    "툾퉀퉂",
    5,
    "퉉퉊퉋퉌"
  ],
  [
    "b961",
    "퉍",
    14,
    "퉝",
    6,
    "퉥퉦퉧퉨"
  ],
  [
    "b981",
    "퉩",
    22,
    "튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바",
    4,
    "받",
    4,
    "밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗"
  ],
  [
    "ba41",
    "튍튎튏튒튓튔튖",
    5,
    "튝튞튟튡튢튣튥",
    6,
    "튭"
  ],
  [
    "ba61",
    "튮튯튰튲",
    5,
    "튺튻튽튾틁틃",
    4,
    "틊틌",
    5
  ],
  [
    "ba81",
    "틒틓틕틖틗틙틚틛틝",
    6,
    "틦",
    9,
    "틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤"
  ],
  [
    "bb41",
    "틻",
    4,
    "팂팄팆",
    5,
    "팏팑팒팓팕팗",
    4,
    "팞팢팣"
  ],
  [
    "bb61",
    "팤팦팧팪팫팭팮팯팱",
    6,
    "팺팾",
    5,
    "퍆퍇퍈퍉"
  ],
  [
    "bb81",
    "퍊",
    31,
    "빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤"
  ],
  [
    "bc41",
    "퍪",
    17,
    "퍾퍿펁펂펃펅펆펇"
  ],
  [
    "bc61",
    "펈펉펊펋펎펒",
    5,
    "펚펛펝펞펟펡",
    6,
    "펪펬펮"
  ],
  [
    "bc81",
    "펯",
    4,
    "펵펶펷펹펺펻펽",
    6,
    "폆폇폊",
    5,
    "폑",
    5,
    "샥샨샬샴샵샷샹섀섄섈섐섕서",
    4,
    "섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭"
  ],
  [
    "bd41",
    "폗폙",
    7,
    "폢폤",
    7,
    "폮폯폱폲폳폵폶폷"
  ],
  [
    "bd61",
    "폸폹폺폻폾퐀퐂",
    5,
    "퐉",
    13
  ],
  [
    "bd81",
    "퐗",
    5,
    "퐞",
    25,
    "숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰"
  ],
  [
    "be41",
    "퐸",
    7,
    "푁푂푃푅",
    14
  ],
  [
    "be61",
    "푔",
    7,
    "푝푞푟푡푢푣푥",
    7,
    "푮푰푱푲"
  ],
  [
    "be81",
    "푳",
    4,
    "푺푻푽푾풁풃",
    4,
    "풊풌풎",
    5,
    "풕",
    8,
    "쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄",
    6,
    "엌엎"
  ],
  [
    "bf41",
    "풞",
    10,
    "풪",
    14
  ],
  [
    "bf61",
    "풹",
    18,
    "퓍퓎퓏퓑퓒퓓퓕"
  ],
  [
    "bf81",
    "퓖",
    5,
    "퓝퓞퓠",
    7,
    "퓩퓪퓫퓭퓮퓯퓱",
    6,
    "퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염",
    5,
    "옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨"
  ],
  [
    "c041",
    "퓾",
    5,
    "픅픆픇픉픊픋픍",
    6,
    "픖픘",
    5
  ],
  [
    "c061",
    "픞",
    25
  ],
  [
    "c081",
    "픸픹픺픻픾픿핁핂핃핅",
    6,
    "핎핐핒",
    5,
    "핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응",
    7,
    "읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊"
  ],
  [
    "c141",
    "핤핦핧핪핬핮",
    5,
    "핶핷핹핺핻핽",
    6,
    "햆햊햋"
  ],
  [
    "c161",
    "햌햍햎햏햑",
    19,
    "햦햧"
  ],
  [
    "c181",
    "햨",
    31,
    "점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓"
  ],
  [
    "c241",
    "헊헋헍헎헏헑헓",
    4,
    "헚헜헞",
    5,
    "헦헧헩헪헫헭헮"
  ],
  [
    "c261",
    "헯",
    4,
    "헶헸헺",
    5,
    "혂혃혅혆혇혉",
    6,
    "혒"
  ],
  [
    "c281",
    "혖",
    5,
    "혝혞혟혡혢혣혥",
    7,
    "혮",
    9,
    "혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻"
  ],
  [
    "c341",
    "혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝",
    4
  ],
  [
    "c361",
    "홢",
    4,
    "홨홪",
    5,
    "홲홳홵",
    11
  ],
  [
    "c381",
    "횁횂횄횆",
    5,
    "횎횏횑횒횓횕",
    7,
    "횞횠횢",
    5,
    "횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층"
  ],
  [
    "c441",
    "횫횭횮횯횱",
    7,
    "횺횼",
    7,
    "훆훇훉훊훋"
  ],
  [
    "c461",
    "훍훎훏훐훒훓훕훖훘훚",
    5,
    "훡훢훣훥훦훧훩",
    4
  ],
  [
    "c481",
    "훮훯훱훲훳훴훶",
    5,
    "훾훿휁휂휃휅",
    11,
    "휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼"
  ],
  [
    "c541",
    "휕휖휗휚휛휝휞휟휡",
    6,
    "휪휬휮",
    5,
    "휶휷휹"
  ],
  [
    "c561",
    "휺휻휽",
    6,
    "흅흆흈흊",
    5,
    "흒흓흕흚",
    4
  ],
  [
    "c581",
    "흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵",
    6,
    "흾흿힀힂",
    5,
    "힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜"
  ],
  [
    "c641",
    "힍힎힏힑",
    6,
    "힚힜힞",
    5
  ],
  [
    "c6a1",
    "퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁"
  ],
  [
    "c7a1",
    "퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠"
  ],
  [
    "c8a1",
    "혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝"
  ],
  [
    "caa1",
    "伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕"
  ],
  [
    "cba1",
    "匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢"
  ],
  [
    "cca1",
    "瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械"
  ],
  [
    "cda1",
    "棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜"
  ],
  [
    "cea1",
    "科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾"
  ],
  [
    "cfa1",
    "區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴"
  ],
  [
    "d0a1",
    "鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣"
  ],
  [
    "d1a1",
    "朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩",
    5,
    "那樂",
    4,
    "諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉"
  ],
  [
    "d2a1",
    "納臘蠟衲囊娘廊",
    4,
    "乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧",
    5,
    "駑魯",
    10,
    "濃籠聾膿農惱牢磊腦賂雷尿壘",
    7,
    "嫩訥杻紐勒",
    5,
    "能菱陵尼泥匿溺多茶"
  ],
  [
    "d3a1",
    "丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃"
  ],
  [
    "d4a1",
    "棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅"
  ],
  [
    "d5a1",
    "蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣"
  ],
  [
    "d6a1",
    "煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼"
  ],
  [
    "d7a1",
    "遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬"
  ],
  [
    "d8a1",
    "立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅"
  ],
  [
    "d9a1",
    "蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文"
  ],
  [
    "daa1",
    "汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑"
  ],
  [
    "dba1",
    "發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖"
  ],
  [
    "dca1",
    "碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦"
  ],
  [
    "dda1",
    "孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥"
  ],
  [
    "dea1",
    "脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索"
  ],
  [
    "dfa1",
    "傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署"
  ],
  [
    "e0a1",
    "胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬"
  ],
  [
    "e1a1",
    "聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁"
  ],
  [
    "e2a1",
    "戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧"
  ],
  [
    "e3a1",
    "嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁"
  ],
  [
    "e4a1",
    "沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額"
  ],
  [
    "e5a1",
    "櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬"
  ],
  [
    "e6a1",
    "旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒"
  ],
  [
    "e7a1",
    "簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳"
  ],
  [
    "e8a1",
    "烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療"
  ],
  [
    "e9a1",
    "窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓"
  ],
  [
    "eaa1",
    "運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜"
  ],
  [
    "eba1",
    "濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼"
  ],
  [
    "eca1",
    "議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄"
  ],
  [
    "eda1",
    "立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長"
  ],
  [
    "eea1",
    "障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱"
  ],
  [
    "efa1",
    "煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖"
  ],
  [
    "f0a1",
    "靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫"
  ],
  [
    "f1a1",
    "踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只"
  ],
  [
    "f2a1",
    "咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯"
  ],
  [
    "f3a1",
    "鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策"
  ],
  [
    "f4a1",
    "責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢"
  ],
  [
    "f5a1",
    "椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃"
  ],
  [
    "f6a1",
    "贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託"
  ],
  [
    "f7a1",
    "鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑"
  ],
  [
    "f8a1",
    "阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃"
  ],
  [
    "f9a1",
    "品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航"
  ],
  [
    "faa1",
    "行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型"
  ],
  [
    "fba1",
    "形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵"
  ],
  [
    "fca1",
    "禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆"
  ],
  [
    "fda1",
    "爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰"
  ]
], Ka = [
  [
    "0",
    "\0",
    127
  ],
  [
    "a140",
    "　，、。．‧；：？！︰…‥﹐﹑﹒·﹔﹕﹖﹗｜–︱—︳╴︴﹏（）︵︶｛｝︷︸〔〕︹︺【】︻︼《》︽︾〈〉︿﹀「」﹁﹂『』﹃﹄﹙﹚"
  ],
  [
    "a1a1",
    "﹛﹜﹝﹞‘’“”〝〞‵′＃＆＊※§〃○●△▲◎☆★◇◆□■▽▼㊣℅¯￣＿ˍ﹉﹊﹍﹎﹋﹌﹟﹠﹡＋－×÷±√＜＞＝≦≧≠∞≒≡﹢",
    4,
    "～∩∪⊥∠∟⊿㏒㏑∫∮∵∴♀♂⊕⊙↑↓←→↖↗↙↘∥∣／"
  ],
  [
    "a240",
    "＼∕﹨＄￥〒￠￡％＠℃℉﹩﹪﹫㏕㎜㎝㎞㏎㎡㎎㎏㏄°兙兛兞兝兡兣嗧瓩糎▁",
    7,
    "▏▎▍▌▋▊▉┼┴┬┤├▔─│▕┌┐└┘╭"
  ],
  [
    "a2a1",
    "╮╰╯═╞╪╡◢◣◥◤╱╲╳０",
    9,
    "Ⅰ",
    9,
    "〡",
    8,
    "十卄卅Ａ",
    25,
    "ａ",
    21
  ],
  [
    "a340",
    "ｗｘｙｚΑ",
    16,
    "Σ",
    6,
    "α",
    16,
    "σ",
    6,
    "ㄅ",
    10
  ],
  [
    "a3a1",
    "ㄐ",
    25,
    "˙ˉˊˇˋ"
  ],
  [
    "a3e1",
    "€"
  ],
  [
    "a440",
    "一乙丁七乃九了二人儿入八几刀刁力匕十卜又三下丈上丫丸凡久么也乞于亡兀刃勺千叉口土士夕大女子孑孓寸小尢尸山川工己已巳巾干廾弋弓才"
  ],
  [
    "a4a1",
    "丑丐不中丰丹之尹予云井互五亢仁什仃仆仇仍今介仄元允內六兮公冗凶分切刈勻勾勿化匹午升卅卞厄友及反壬天夫太夭孔少尤尺屯巴幻廿弔引心戈戶手扎支文斗斤方日曰月木欠止歹毋比毛氏水火爪父爻片牙牛犬王丙"
  ],
  [
    "a540",
    "世丕且丘主乍乏乎以付仔仕他仗代令仙仞充兄冉冊冬凹出凸刊加功包匆北匝仟半卉卡占卯卮去可古右召叮叩叨叼司叵叫另只史叱台句叭叻四囚外"
  ],
  [
    "a5a1",
    "央失奴奶孕它尼巨巧左市布平幼弁弘弗必戊打扔扒扑斥旦朮本未末札正母民氐永汁汀氾犯玄玉瓜瓦甘生用甩田由甲申疋白皮皿目矛矢石示禾穴立丞丟乒乓乩亙交亦亥仿伉伙伊伕伍伐休伏仲件任仰仳份企伋光兇兆先全"
  ],
  [
    "a640",
    "共再冰列刑划刎刖劣匈匡匠印危吉吏同吊吐吁吋各向名合吃后吆吒因回囝圳地在圭圬圯圩夙多夷夸妄奸妃好她如妁字存宇守宅安寺尖屹州帆并年"
  ],
  [
    "a6a1",
    "式弛忙忖戎戌戍成扣扛托收早旨旬旭曲曳有朽朴朱朵次此死氖汝汗汙江池汐汕污汛汍汎灰牟牝百竹米糸缶羊羽老考而耒耳聿肉肋肌臣自至臼舌舛舟艮色艾虫血行衣西阡串亨位住佇佗佞伴佛何估佐佑伽伺伸佃佔似但佣"
  ],
  [
    "a740",
    "作你伯低伶余佝佈佚兌克免兵冶冷別判利刪刨劫助努劬匣即卵吝吭吞吾否呎吧呆呃吳呈呂君吩告吹吻吸吮吵吶吠吼呀吱含吟听囪困囤囫坊坑址坍"
  ],
  [
    "a7a1",
    "均坎圾坐坏圻壯夾妝妒妨妞妣妙妖妍妤妓妊妥孝孜孚孛完宋宏尬局屁尿尾岐岑岔岌巫希序庇床廷弄弟彤形彷役忘忌志忍忱快忸忪戒我抄抗抖技扶抉扭把扼找批扳抒扯折扮投抓抑抆改攻攸旱更束李杏材村杜杖杞杉杆杠"
  ],
  [
    "a840",
    "杓杗步每求汞沙沁沈沉沅沛汪決沐汰沌汨沖沒汽沃汲汾汴沆汶沍沔沘沂灶灼災灸牢牡牠狄狂玖甬甫男甸皂盯矣私秀禿究系罕肖肓肝肘肛肚育良芒"
  ],
  [
    "a8a1",
    "芋芍見角言谷豆豕貝赤走足身車辛辰迂迆迅迄巡邑邢邪邦那酉釆里防阮阱阪阬並乖乳事些亞享京佯依侍佳使佬供例來侃佰併侈佩佻侖佾侏侑佺兔兒兕兩具其典冽函刻券刷刺到刮制剁劾劻卒協卓卑卦卷卸卹取叔受味呵"
  ],
  [
    "a940",
    "咖呸咕咀呻呷咄咒咆呼咐呱呶和咚呢周咋命咎固垃坷坪坩坡坦坤坼夜奉奇奈奄奔妾妻委妹妮姑姆姐姍始姓姊妯妳姒姅孟孤季宗定官宜宙宛尚屈居"
  ],
  [
    "a9a1",
    "屆岷岡岸岩岫岱岳帘帚帖帕帛帑幸庚店府底庖延弦弧弩往征彿彼忝忠忽念忿怏怔怯怵怖怪怕怡性怩怫怛或戕房戾所承拉拌拄抿拂抹拒招披拓拔拋拈抨抽押拐拙拇拍抵拚抱拘拖拗拆抬拎放斧於旺昔易昌昆昂明昀昏昕昊"
  ],
  [
    "aa40",
    "昇服朋杭枋枕東果杳杷枇枝林杯杰板枉松析杵枚枓杼杪杲欣武歧歿氓氛泣注泳沱泌泥河沽沾沼波沫法泓沸泄油況沮泗泅泱沿治泡泛泊沬泯泜泖泠"
  ],
  [
    "aaa1",
    "炕炎炒炊炙爬爭爸版牧物狀狎狙狗狐玩玨玟玫玥甽疝疙疚的盂盲直知矽社祀祁秉秈空穹竺糾罔羌羋者肺肥肢肱股肫肩肴肪肯臥臾舍芳芝芙芭芽芟芹花芬芥芯芸芣芰芾芷虎虱初表軋迎返近邵邸邱邶采金長門阜陀阿阻附"
  ],
  [
    "ab40",
    "陂隹雨青非亟亭亮信侵侯便俠俑俏保促侶俘俟俊俗侮俐俄係俚俎俞侷兗冒冑冠剎剃削前剌剋則勇勉勃勁匍南卻厚叛咬哀咨哎哉咸咦咳哇哂咽咪品"
  ],
  [
    "aba1",
    "哄哈咯咫咱咻咩咧咿囿垂型垠垣垢城垮垓奕契奏奎奐姜姘姿姣姨娃姥姪姚姦威姻孩宣宦室客宥封屎屏屍屋峙峒巷帝帥帟幽庠度建弈弭彥很待徊律徇後徉怒思怠急怎怨恍恰恨恢恆恃恬恫恪恤扁拜挖按拼拭持拮拽指拱拷"
  ],
  [
    "ac40",
    "拯括拾拴挑挂政故斫施既春昭映昧是星昨昱昤曷柿染柱柔某柬架枯柵柩柯柄柑枴柚查枸柏柞柳枰柙柢柝柒歪殃殆段毒毗氟泉洋洲洪流津洌洱洞洗"
  ],
  [
    "aca1",
    "活洽派洶洛泵洹洧洸洩洮洵洎洫炫為炳炬炯炭炸炮炤爰牲牯牴狩狠狡玷珊玻玲珍珀玳甚甭畏界畎畋疫疤疥疢疣癸皆皇皈盈盆盃盅省盹相眉看盾盼眇矜砂研砌砍祆祉祈祇禹禺科秒秋穿突竿竽籽紂紅紀紉紇約紆缸美羿耄"
  ],
  [
    "ad40",
    "耐耍耑耶胖胥胚胃胄背胡胛胎胞胤胝致舢苧范茅苣苛苦茄若茂茉苒苗英茁苜苔苑苞苓苟苯茆虐虹虻虺衍衫要觔計訂訃貞負赴赳趴軍軌述迦迢迪迥"
  ],
  [
    "ada1",
    "迭迫迤迨郊郎郁郃酋酊重閂限陋陌降面革韋韭音頁風飛食首香乘亳倌倍倣俯倦倥俸倩倖倆值借倚倒們俺倀倔倨俱倡個候倘俳修倭倪俾倫倉兼冤冥冢凍凌准凋剖剜剔剛剝匪卿原厝叟哨唐唁唷哼哥哲唆哺唔哩哭員唉哮哪"
  ],
  [
    "ae40",
    "哦唧唇哽唏圃圄埂埔埋埃堉夏套奘奚娑娘娜娟娛娓姬娠娣娩娥娌娉孫屘宰害家宴宮宵容宸射屑展屐峭峽峻峪峨峰島崁峴差席師庫庭座弱徒徑徐恙"
  ],
  [
    "aea1",
    "恣恥恐恕恭恩息悄悟悚悍悔悌悅悖扇拳挈拿捎挾振捕捂捆捏捉挺捐挽挪挫挨捍捌效敉料旁旅時晉晏晃晒晌晅晁書朔朕朗校核案框桓根桂桔栩梳栗桌桑栽柴桐桀格桃株桅栓栘桁殊殉殷氣氧氨氦氤泰浪涕消涇浦浸海浙涓"
  ],
  [
    "af40",
    "浬涉浮浚浴浩涌涊浹涅浥涔烊烘烤烙烈烏爹特狼狹狽狸狷玆班琉珮珠珪珞畔畝畜畚留疾病症疲疳疽疼疹痂疸皋皰益盍盎眩真眠眨矩砰砧砸砝破砷"
  ],
  [
    "afa1",
    "砥砭砠砟砲祕祐祠祟祖神祝祗祚秤秣秧租秦秩秘窄窈站笆笑粉紡紗紋紊素索純紐紕級紜納紙紛缺罟羔翅翁耆耘耕耙耗耽耿胱脂胰脅胭胴脆胸胳脈能脊胼胯臭臬舀舐航舫舨般芻茫荒荔荊茸荐草茵茴荏茲茹茶茗荀茱茨荃"
  ],
  [
    "b040",
    "虔蚊蚪蚓蚤蚩蚌蚣蚜衰衷袁袂衽衹記訐討訌訕訊託訓訖訏訑豈豺豹財貢起躬軒軔軏辱送逆迷退迺迴逃追逅迸邕郡郝郢酒配酌釘針釗釜釙閃院陣陡"
  ],
  [
    "b0a1",
    "陛陝除陘陞隻飢馬骨高鬥鬲鬼乾偺偽停假偃偌做偉健偶偎偕偵側偷偏倏偯偭兜冕凰剪副勒務勘動匐匏匙匿區匾參曼商啪啦啄啞啡啃啊唱啖問啕唯啤唸售啜唬啣唳啁啗圈國圉域堅堊堆埠埤基堂堵執培夠奢娶婁婉婦婪婀"
  ],
  [
    "b140",
    "娼婢婚婆婊孰寇寅寄寂宿密尉專將屠屜屝崇崆崎崛崖崢崑崩崔崙崤崧崗巢常帶帳帷康庸庶庵庾張強彗彬彩彫得徙從徘御徠徜恿患悉悠您惋悴惦悽"
  ],
  [
    "b1a1",
    "情悻悵惜悼惘惕惆惟悸惚惇戚戛扈掠控捲掖探接捷捧掘措捱掩掉掃掛捫推掄授掙採掬排掏掀捻捩捨捺敝敖救教敗啟敏敘敕敔斜斛斬族旋旌旎晝晚晤晨晦晞曹勗望梁梯梢梓梵桿桶梱梧梗械梃棄梭梆梅梔條梨梟梡梂欲殺"
  ],
  [
    "b240",
    "毫毬氫涎涼淳淙液淡淌淤添淺清淇淋涯淑涮淞淹涸混淵淅淒渚涵淚淫淘淪深淮淨淆淄涪淬涿淦烹焉焊烽烯爽牽犁猜猛猖猓猙率琅琊球理現琍瓠瓶"
  ],
  [
    "b2a1",
    "瓷甜產略畦畢異疏痔痕疵痊痍皎盔盒盛眷眾眼眶眸眺硫硃硎祥票祭移窒窕笠笨笛第符笙笞笮粒粗粕絆絃統紮紹紼絀細紳組累終紲紱缽羞羚翌翎習耜聊聆脯脖脣脫脩脰脤舂舵舷舶船莎莞莘荸莢莖莽莫莒莊莓莉莠荷荻荼"
  ],
  [
    "b340",
    "莆莧處彪蛇蛀蚶蛄蚵蛆蛋蚱蚯蛉術袞袈被袒袖袍袋覓規訪訝訣訥許設訟訛訢豉豚販責貫貨貪貧赧赦趾趺軛軟這逍通逗連速逝逐逕逞造透逢逖逛途"
  ],
  [
    "b3a1",
    "部郭都酗野釵釦釣釧釭釩閉陪陵陳陸陰陴陶陷陬雀雪雩章竟頂頃魚鳥鹵鹿麥麻傢傍傅備傑傀傖傘傚最凱割剴創剩勞勝勛博厥啻喀喧啼喊喝喘喂喜喪喔喇喋喃喳單喟唾喲喚喻喬喱啾喉喫喙圍堯堪場堤堰報堡堝堠壹壺奠"
  ],
  [
    "b440",
    "婷媚婿媒媛媧孳孱寒富寓寐尊尋就嵌嵐崴嵇巽幅帽幀幃幾廊廁廂廄弼彭復循徨惑惡悲悶惠愜愣惺愕惰惻惴慨惱愎惶愉愀愒戟扉掣掌描揀揩揉揆揍"
  ],
  [
    "b4a1",
    "插揣提握揖揭揮捶援揪換摒揚揹敞敦敢散斑斐斯普晰晴晶景暑智晾晷曾替期朝棺棕棠棘棗椅棟棵森棧棹棒棲棣棋棍植椒椎棉棚楮棻款欺欽殘殖殼毯氮氯氬港游湔渡渲湧湊渠渥渣減湛湘渤湖湮渭渦湯渴湍渺測湃渝渾滋"
  ],
  [
    "b540",
    "溉渙湎湣湄湲湩湟焙焚焦焰無然煮焜牌犄犀猶猥猴猩琺琪琳琢琥琵琶琴琯琛琦琨甥甦畫番痢痛痣痙痘痞痠登發皖皓皴盜睏短硝硬硯稍稈程稅稀窘"
  ],
  [
    "b5a1",
    "窗窖童竣等策筆筐筒答筍筋筏筑粟粥絞結絨絕紫絮絲絡給絢絰絳善翔翕耋聒肅腕腔腋腑腎脹腆脾腌腓腴舒舜菩萃菸萍菠菅萋菁華菱菴著萊菰萌菌菽菲菊萸萎萄菜萇菔菟虛蛟蛙蛭蛔蛛蛤蛐蛞街裁裂袱覃視註詠評詞証詁"
  ],
  [
    "b640",
    "詔詛詐詆訴診訶詖象貂貯貼貳貽賁費賀貴買貶貿貸越超趁跎距跋跚跑跌跛跆軻軸軼辜逮逵週逸進逶鄂郵鄉郾酣酥量鈔鈕鈣鈉鈞鈍鈐鈇鈑閔閏開閑"
  ],
  [
    "b6a1",
    "間閒閎隊階隋陽隅隆隍陲隄雁雅雄集雇雯雲韌項順須飧飪飯飩飲飭馮馭黃黍黑亂傭債傲傳僅傾催傷傻傯僇剿剷剽募勦勤勢勣匯嗟嗨嗓嗦嗎嗜嗇嗑嗣嗤嗯嗚嗡嗅嗆嗥嗉園圓塞塑塘塗塚塔填塌塭塊塢塒塋奧嫁嫉嫌媾媽媼"
  ],
  [
    "b740",
    "媳嫂媲嵩嵯幌幹廉廈弒彙徬微愚意慈感想愛惹愁愈慎慌慄慍愾愴愧愍愆愷戡戢搓搾搞搪搭搽搬搏搜搔損搶搖搗搆敬斟新暗暉暇暈暖暄暘暍會榔業"
  ],
  [
    "b7a1",
    "楚楷楠楔極椰概楊楨楫楞楓楹榆楝楣楛歇歲毀殿毓毽溢溯滓溶滂源溝滇滅溥溘溼溺溫滑準溜滄滔溪溧溴煎煙煩煤煉照煜煬煦煌煥煞煆煨煖爺牒猷獅猿猾瑯瑚瑕瑟瑞瑁琿瑙瑛瑜當畸瘀痰瘁痲痱痺痿痴痳盞盟睛睫睦睞督"
  ],
  [
    "b840",
    "睹睪睬睜睥睨睢矮碎碰碗碘碌碉硼碑碓硿祺祿禁萬禽稜稚稠稔稟稞窟窠筷節筠筮筧粱粳粵經絹綑綁綏絛置罩罪署義羨群聖聘肆肄腱腰腸腥腮腳腫"
  ],
  [
    "b8a1",
    "腹腺腦舅艇蒂葷落萱葵葦葫葉葬葛萼萵葡董葩葭葆虞虜號蛹蜓蜈蜇蜀蛾蛻蜂蜃蜆蜊衙裟裔裙補裘裝裡裊裕裒覜解詫該詳試詩詰誇詼詣誠話誅詭詢詮詬詹詻訾詨豢貊貉賊資賈賄貲賃賂賅跡跟跨路跳跺跪跤跦躲較載軾輊"
  ],
  [
    "b940",
    "辟農運遊道遂達逼違遐遇遏過遍遑逾遁鄒鄗酬酪酩釉鈷鉗鈸鈽鉀鈾鉛鉋鉤鉑鈴鉉鉍鉅鈹鈿鉚閘隘隔隕雍雋雉雊雷電雹零靖靴靶預頑頓頊頒頌飼飴"
  ],
  [
    "b9a1",
    "飽飾馳馱馴髡鳩麂鼎鼓鼠僧僮僥僖僭僚僕像僑僱僎僩兢凳劃劂匱厭嗾嘀嘛嘗嗽嘔嘆嘉嘍嘎嗷嘖嘟嘈嘐嗶團圖塵塾境墓墊塹墅塽壽夥夢夤奪奩嫡嫦嫩嫗嫖嫘嫣孵寞寧寡寥實寨寢寤察對屢嶄嶇幛幣幕幗幔廓廖弊彆彰徹慇"
  ],
  [
    "ba40",
    "愿態慷慢慣慟慚慘慵截撇摘摔撤摸摟摺摑摧搴摭摻敲斡旗旖暢暨暝榜榨榕槁榮槓構榛榷榻榫榴槐槍榭槌榦槃榣歉歌氳漳演滾漓滴漩漾漠漬漏漂漢"
  ],
  [
    "baa1",
    "滿滯漆漱漸漲漣漕漫漯澈漪滬漁滲滌滷熔熙煽熊熄熒爾犒犖獄獐瑤瑣瑪瑰瑭甄疑瘧瘍瘋瘉瘓盡監瞄睽睿睡磁碟碧碳碩碣禎福禍種稱窪窩竭端管箕箋筵算箝箔箏箸箇箄粹粽精綻綰綜綽綾綠緊綴網綱綺綢綿綵綸維緒緇綬"
  ],
  [
    "bb40",
    "罰翠翡翟聞聚肇腐膀膏膈膊腿膂臧臺與舔舞艋蓉蒿蓆蓄蒙蒞蒲蒜蓋蒸蓀蓓蒐蒼蓑蓊蜿蜜蜻蜢蜥蜴蜘蝕蜷蜩裳褂裴裹裸製裨褚裯誦誌語誣認誡誓誤"
  ],
  [
    "bba1",
    "說誥誨誘誑誚誧豪貍貌賓賑賒赫趙趕跼輔輒輕輓辣遠遘遜遣遙遞遢遝遛鄙鄘鄞酵酸酷酴鉸銀銅銘銖鉻銓銜銨鉼銑閡閨閩閣閥閤隙障際雌雒需靼鞅韶頗領颯颱餃餅餌餉駁骯骰髦魁魂鳴鳶鳳麼鼻齊億儀僻僵價儂儈儉儅凜"
  ],
  [
    "bc40",
    "劇劈劉劍劊勰厲嘮嘻嘹嘲嘿嘴嘩噓噎噗噴嘶嘯嘰墀墟增墳墜墮墩墦奭嬉嫻嬋嫵嬌嬈寮寬審寫層履嶝嶔幢幟幡廢廚廟廝廣廠彈影德徵慶慧慮慝慕憂"
  ],
  [
    "bca1",
    "慼慰慫慾憧憐憫憎憬憚憤憔憮戮摩摯摹撞撲撈撐撰撥撓撕撩撒撮播撫撚撬撙撢撳敵敷數暮暫暴暱樣樟槨樁樞標槽模樓樊槳樂樅槭樑歐歎殤毅毆漿潼澄潑潦潔澆潭潛潸潮澎潺潰潤澗潘滕潯潠潟熟熬熱熨牖犛獎獗瑩璋璃"
  ],
  [
    "bd40",
    "瑾璀畿瘠瘩瘟瘤瘦瘡瘢皚皺盤瞎瞇瞌瞑瞋磋磅確磊碾磕碼磐稿稼穀稽稷稻窯窮箭箱範箴篆篇篁箠篌糊締練緯緻緘緬緝編緣線緞緩綞緙緲緹罵罷羯"
  ],
  [
    "bda1",
    "翩耦膛膜膝膠膚膘蔗蔽蔚蓮蔬蔭蔓蔑蔣蔡蔔蓬蔥蓿蔆螂蝴蝶蝠蝦蝸蝨蝙蝗蝌蝓衛衝褐複褒褓褕褊誼諒談諄誕請諸課諉諂調誰論諍誶誹諛豌豎豬賠賞賦賤賬賭賢賣賜質賡赭趟趣踫踐踝踢踏踩踟踡踞躺輝輛輟輩輦輪輜輞"
  ],
  [
    "be40",
    "輥適遮遨遭遷鄰鄭鄧鄱醇醉醋醃鋅銻銷鋪銬鋤鋁銳銼鋒鋇鋰銲閭閱霄霆震霉靠鞍鞋鞏頡頫頜颳養餓餒餘駝駐駟駛駑駕駒駙骷髮髯鬧魅魄魷魯鴆鴉"
  ],
  [
    "bea1",
    "鴃麩麾黎墨齒儒儘儔儐儕冀冪凝劑劓勳噙噫噹噩噤噸噪器噥噱噯噬噢噶壁墾壇壅奮嬝嬴學寰導彊憲憑憩憊懍憶憾懊懈戰擅擁擋撻撼據擄擇擂操撿擒擔撾整曆曉暹曄曇暸樽樸樺橙橫橘樹橄橢橡橋橇樵機橈歙歷氅濂澱澡"
  ],
  [
    "bf40",
    "濃澤濁澧澳激澹澶澦澠澴熾燉燐燒燈燕熹燎燙燜燃燄獨璜璣璘璟璞瓢甌甍瘴瘸瘺盧盥瞠瞞瞟瞥磨磚磬磧禦積穎穆穌穋窺篙簑築篤篛篡篩篦糕糖縊"
  ],
  [
    "bfa1",
    "縑縈縛縣縞縝縉縐罹羲翰翱翮耨膳膩膨臻興艘艙蕊蕙蕈蕨蕩蕃蕉蕭蕪蕞螃螟螞螢融衡褪褲褥褫褡親覦諦諺諫諱謀諜諧諮諾謁謂諷諭諳諶諼豫豭貓賴蹄踱踴蹂踹踵輻輯輸輳辨辦遵遴選遲遼遺鄴醒錠錶鋸錳錯錢鋼錫錄錚"
  ],
  [
    "c040",
    "錐錦錡錕錮錙閻隧隨險雕霎霑霖霍霓霏靛靜靦鞘頰頸頻頷頭頹頤餐館餞餛餡餚駭駢駱骸骼髻髭鬨鮑鴕鴣鴦鴨鴒鴛默黔龍龜優償儡儲勵嚎嚀嚐嚅嚇"
  ],
  [
    "c0a1",
    "嚏壕壓壑壎嬰嬪嬤孺尷屨嶼嶺嶽嶸幫彌徽應懂懇懦懋戲戴擎擊擘擠擰擦擬擱擢擭斂斃曙曖檀檔檄檢檜櫛檣橾檗檐檠歜殮毚氈濘濱濟濠濛濤濫濯澀濬濡濩濕濮濰燧營燮燦燥燭燬燴燠爵牆獰獲璩環璦璨癆療癌盪瞳瞪瞰瞬"
  ],
  [
    "c140",
    "瞧瞭矯磷磺磴磯礁禧禪穗窿簇簍篾篷簌篠糠糜糞糢糟糙糝縮績繆縷縲繃縫總縱繅繁縴縹繈縵縿縯罄翳翼聱聲聰聯聳臆臃膺臂臀膿膽臉膾臨舉艱薪"
  ],
  [
    "c1a1",
    "薄蕾薜薑薔薯薛薇薨薊虧蟀蟑螳蟒蟆螫螻螺蟈蟋褻褶襄褸褽覬謎謗謙講謊謠謝謄謐豁谿豳賺賽購賸賻趨蹉蹋蹈蹊轄輾轂轅輿避遽還邁邂邀鄹醣醞醜鍍鎂錨鍵鍊鍥鍋錘鍾鍬鍛鍰鍚鍔闊闋闌闈闆隱隸雖霜霞鞠韓顆颶餵騁"
  ],
  [
    "c240",
    "駿鮮鮫鮪鮭鴻鴿麋黏點黜黝黛鼾齋叢嚕嚮壙壘嬸彝懣戳擴擲擾攆擺擻擷斷曜朦檳檬櫃檻檸櫂檮檯歟歸殯瀉瀋濾瀆濺瀑瀏燻燼燾燸獷獵璧璿甕癖癘"
  ],
  [
    "c2a1",
    "癒瞽瞿瞻瞼礎禮穡穢穠竄竅簫簧簪簞簣簡糧織繕繞繚繡繒繙罈翹翻職聶臍臏舊藏薩藍藐藉薰薺薹薦蟯蟬蟲蟠覆覲觴謨謹謬謫豐贅蹙蹣蹦蹤蹟蹕軀轉轍邇邃邈醫醬釐鎔鎊鎖鎢鎳鎮鎬鎰鎘鎚鎗闔闖闐闕離雜雙雛雞霤鞣鞦"
  ],
  [
    "c340",
    "鞭韹額顏題顎顓颺餾餿餽餮馥騎髁鬃鬆魏魎魍鯊鯉鯽鯈鯀鵑鵝鵠黠鼕鼬儳嚥壞壟壢寵龐廬懲懷懶懵攀攏曠曝櫥櫝櫚櫓瀛瀟瀨瀚瀝瀕瀘爆爍牘犢獸"
  ],
  [
    "c3a1",
    "獺璽瓊瓣疇疆癟癡矇礙禱穫穩簾簿簸簽簷籀繫繭繹繩繪羅繳羶羹羸臘藩藝藪藕藤藥藷蟻蠅蠍蟹蟾襠襟襖襞譁譜識證譚譎譏譆譙贈贊蹼蹲躇蹶蹬蹺蹴轔轎辭邊邋醱醮鏡鏑鏟鏃鏈鏜鏝鏖鏢鏍鏘鏤鏗鏨關隴難霪霧靡韜韻類"
  ],
  [
    "c440",
    "願顛颼饅饉騖騙鬍鯨鯧鯖鯛鶉鵡鵲鵪鵬麒麗麓麴勸嚨嚷嚶嚴嚼壤孀孃孽寶巉懸懺攘攔攙曦朧櫬瀾瀰瀲爐獻瓏癢癥礦礪礬礫竇競籌籃籍糯糰辮繽繼"
  ],
  [
    "c4a1",
    "纂罌耀臚艦藻藹蘑藺蘆蘋蘇蘊蠔蠕襤覺觸議譬警譯譟譫贏贍躉躁躅躂醴釋鐘鐃鏽闡霰飄饒饑馨騫騰騷騵鰓鰍鹹麵黨鼯齟齣齡儷儸囁囀囂夔屬巍懼懾攝攜斕曩櫻欄櫺殲灌爛犧瓖瓔癩矓籐纏續羼蘗蘭蘚蠣蠢蠡蠟襪襬覽譴"
  ],
  [
    "c540",
    "護譽贓躊躍躋轟辯醺鐮鐳鐵鐺鐸鐲鐫闢霸霹露響顧顥饗驅驃驀騾髏魔魑鰭鰥鶯鶴鷂鶸麝黯鼙齜齦齧儼儻囈囊囉孿巔巒彎懿攤權歡灑灘玀瓤疊癮癬"
  ],
  [
    "c5a1",
    "禳籠籟聾聽臟襲襯觼讀贖贗躑躓轡酈鑄鑑鑒霽霾韃韁顫饕驕驍髒鬚鱉鰱鰾鰻鷓鷗鼴齬齪龔囌巖戀攣攫攪曬欐瓚竊籤籣籥纓纖纔臢蘸蘿蠱變邐邏鑣鑠鑤靨顯饜驚驛驗髓體髑鱔鱗鱖鷥麟黴囑壩攬灞癱癲矗罐羈蠶蠹衢讓讒"
  ],
  [
    "c640",
    "讖艷贛釀鑪靂靈靄韆顰驟鬢魘鱟鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻觀躡釁鑲鑰顱饞髖鬣黌灤矚讚鑷韉驢驥纜讜躪釅鑽鑾鑼鱷鱸黷豔鑿鸚爨驪鬱鸛鸞籲"
  ],
  [
    "c940",
    "乂乜凵匚厂万丌乇亍囗兀屮彳丏冇与丮亓仂仉仈冘勼卬厹圠夃夬尐巿旡殳毌气爿丱丼仨仜仩仡仝仚刌匜卌圢圣夗夯宁宄尒尻屴屳帄庀庂忉戉扐氕"
  ],
  [
    "c9a1",
    "氶汃氿氻犮犰玊禸肊阞伎优伬仵伔仱伀价伈伝伂伅伢伓伄仴伒冱刓刉刐劦匢匟卍厊吇囡囟圮圪圴夼妀奼妅奻奾奷奿孖尕尥屼屺屻屾巟幵庄异弚彴忕忔忏扜扞扤扡扦扢扙扠扚扥旯旮朾朹朸朻机朿朼朳氘汆汒汜汏汊汔汋"
  ],
  [
    "ca40",
    "汌灱牞犴犵玎甪癿穵网艸艼芀艽艿虍襾邙邗邘邛邔阢阤阠阣佖伻佢佉体佤伾佧佒佟佁佘伭伳伿佡冏冹刜刞刡劭劮匉卣卲厎厏吰吷吪呔呅吙吜吥吘"
  ],
  [
    "caa1",
    "吽呏呁吨吤呇囮囧囥坁坅坌坉坋坒夆奀妦妘妠妗妎妢妐妏妧妡宎宒尨尪岍岏岈岋岉岒岊岆岓岕巠帊帎庋庉庌庈庍弅弝彸彶忒忑忐忭忨忮忳忡忤忣忺忯忷忻怀忴戺抃抌抎抏抔抇扱扻扺扰抁抈扷扽扲扴攷旰旴旳旲旵杅杇"
  ],
  [
    "cb40",
    "杙杕杌杈杝杍杚杋毐氙氚汸汧汫沄沋沏汱汯汩沚汭沇沕沜汦汳汥汻沎灴灺牣犿犽狃狆狁犺狅玕玗玓玔玒町甹疔疕皁礽耴肕肙肐肒肜芐芏芅芎芑芓"
  ],
  [
    "cba1",
    "芊芃芄豸迉辿邟邡邥邞邧邠阰阨阯阭丳侘佼侅佽侀侇佶佴侉侄佷佌侗佪侚佹侁佸侐侜侔侞侒侂侕佫佮冞冼冾刵刲刳剆刱劼匊匋匼厒厔咇呿咁咑咂咈呫呺呾呥呬呴呦咍呯呡呠咘呣呧呤囷囹坯坲坭坫坱坰坶垀坵坻坳坴坢"
  ],
  [
    "cc40",
    "坨坽夌奅妵妺姏姎妲姌姁妶妼姃姖妱妽姀姈妴姇孢孥宓宕屄屇岮岤岠岵岯岨岬岟岣岭岢岪岧岝岥岶岰岦帗帔帙弨弢弣弤彔徂彾彽忞忥怭怦怙怲怋"
  ],
  [
    "cca1",
    "怴怊怗怳怚怞怬怢怍怐怮怓怑怌怉怜戔戽抭抴拑抾抪抶拊抮抳抯抻抩抰抸攽斨斻昉旼昄昒昈旻昃昋昍昅旽昑昐曶朊枅杬枎枒杶杻枘枆构杴枍枌杺枟枑枙枃杽极杸杹枔欥殀歾毞氝沓泬泫泮泙沶泔沭泧沷泐泂沺泃泆泭泲"
  ],
  [
    "cd40",
    "泒泝沴沊沝沀泞泀洰泍泇沰泹泏泩泑炔炘炅炓炆炄炑炖炂炚炃牪狖狋狘狉狜狒狔狚狌狑玤玡玭玦玢玠玬玝瓝瓨甿畀甾疌疘皯盳盱盰盵矸矼矹矻矺"
  ],
  [
    "cda1",
    "矷祂礿秅穸穻竻籵糽耵肏肮肣肸肵肭舠芠苀芫芚芘芛芵芧芮芼芞芺芴芨芡芩苂芤苃芶芢虰虯虭虮豖迒迋迓迍迖迕迗邲邴邯邳邰阹阽阼阺陃俍俅俓侲俉俋俁俔俜俙侻侳俛俇俖侺俀侹俬剄剉勀勂匽卼厗厖厙厘咺咡咭咥哏"
  ],
  [
    "ce40",
    "哃茍咷咮哖咶哅哆咠呰咼咢咾呲哞咰垵垞垟垤垌垗垝垛垔垘垏垙垥垚垕壴复奓姡姞姮娀姱姝姺姽姼姶姤姲姷姛姩姳姵姠姾姴姭宨屌峐峘峌峗峋峛"
  ],
  [
    "cea1",
    "峞峚峉峇峊峖峓峔峏峈峆峎峟峸巹帡帢帣帠帤庰庤庢庛庣庥弇弮彖徆怷怹恔恲恞恅恓恇恉恛恌恀恂恟怤恄恘恦恮扂扃拏挍挋拵挎挃拫拹挏挌拸拶挀挓挔拺挕拻拰敁敃斪斿昶昡昲昵昜昦昢昳昫昺昝昴昹昮朏朐柁柲柈枺"
  ],
  [
    "cf40",
    "柜枻柸柘柀枷柅柫柤柟枵柍枳柷柶柮柣柂枹柎柧柰枲柼柆柭柌枮柦柛柺柉柊柃柪柋欨殂殄殶毖毘毠氠氡洨洴洭洟洼洿洒洊泚洳洄洙洺洚洑洀洝浂"
  ],
  [
    "cfa1",
    "洁洘洷洃洏浀洇洠洬洈洢洉洐炷炟炾炱炰炡炴炵炩牁牉牊牬牰牳牮狊狤狨狫狟狪狦狣玅珌珂珈珅玹玶玵玴珫玿珇玾珃珆玸珋瓬瓮甮畇畈疧疪癹盄眈眃眄眅眊盷盻盺矧矨砆砑砒砅砐砏砎砉砃砓祊祌祋祅祄秕种秏秖秎窀"
  ],
  [
    "d040",
    "穾竑笀笁籺籸籹籿粀粁紃紈紁罘羑羍羾耇耎耏耔耷胘胇胠胑胈胂胐胅胣胙胜胊胕胉胏胗胦胍臿舡芔苙苾苹茇苨茀苕茺苫苖苴苬苡苲苵茌苻苶苰苪"
  ],
  [
    "d0a1",
    "苤苠苺苳苭虷虴虼虳衁衎衧衪衩觓訄訇赲迣迡迮迠郱邽邿郕郅邾郇郋郈釔釓陔陏陑陓陊陎倞倅倇倓倢倰倛俵俴倳倷倬俶俷倗倜倠倧倵倯倱倎党冔冓凊凄凅凈凎剡剚剒剞剟剕剢勍匎厞唦哢唗唒哧哳哤唚哿唄唈哫唑唅哱"
  ],
  [
    "d140",
    "唊哻哷哸哠唎唃唋圁圂埌堲埕埒垺埆垽垼垸垶垿埇埐垹埁夎奊娙娖娭娮娕娏娗娊娞娳孬宧宭宬尃屖屔峬峿峮峱峷崀峹帩帨庨庮庪庬弳弰彧恝恚恧"
  ],
  [
    "d1a1",
    "恁悢悈悀悒悁悝悃悕悛悗悇悜悎戙扆拲挐捖挬捄捅挶捃揤挹捋捊挼挩捁挴捘捔捙挭捇挳捚捑挸捗捀捈敊敆旆旃旄旂晊晟晇晑朒朓栟栚桉栲栳栻桋桏栖栱栜栵栫栭栯桎桄栴栝栒栔栦栨栮桍栺栥栠欬欯欭欱欴歭肂殈毦毤"
  ],
  [
    "d240",
    "毨毣毢毧氥浺浣浤浶洍浡涒浘浢浭浯涑涍淯浿涆浞浧浠涗浰浼浟涂涘洯浨涋浾涀涄洖涃浻浽浵涐烜烓烑烝烋缹烢烗烒烞烠烔烍烅烆烇烚烎烡牂牸"
  ],
  [
    "d2a1",
    "牷牶猀狺狴狾狶狳狻猁珓珙珥珖玼珧珣珩珜珒珛珔珝珚珗珘珨瓞瓟瓴瓵甡畛畟疰痁疻痄痀疿疶疺皊盉眝眛眐眓眒眣眑眕眙眚眢眧砣砬砢砵砯砨砮砫砡砩砳砪砱祔祛祏祜祓祒祑秫秬秠秮秭秪秜秞秝窆窉窅窋窌窊窇竘笐"
  ],
  [
    "d340",
    "笄笓笅笏笈笊笎笉笒粄粑粊粌粈粍粅紞紝紑紎紘紖紓紟紒紏紌罜罡罞罠罝罛羖羒翃翂翀耖耾耹胺胲胹胵脁胻脀舁舯舥茳茭荄茙荑茥荖茿荁茦茜茢"
  ],
  [
    "d3a1",
    "荂荎茛茪茈茼荍茖茤茠茷茯茩荇荅荌荓茞茬荋茧荈虓虒蚢蚨蚖蚍蚑蚞蚇蚗蚆蚋蚚蚅蚥蚙蚡蚧蚕蚘蚎蚝蚐蚔衃衄衭衵衶衲袀衱衿衯袃衾衴衼訒豇豗豻貤貣赶赸趵趷趶軑軓迾迵适迿迻逄迼迶郖郠郙郚郣郟郥郘郛郗郜郤酐"
  ],
  [
    "d440",
    "酎酏釕釢釚陜陟隼飣髟鬯乿偰偪偡偞偠偓偋偝偲偈偍偁偛偊偢倕偅偟偩偫偣偤偆偀偮偳偗偑凐剫剭剬剮勖勓匭厜啵啶唼啍啐唴唪啑啢唶唵唰啒啅"
  ],
  [
    "d4a1",
    "唌唲啥啎唹啈唭唻啀啋圊圇埻堔埢埶埜埴堀埭埽堈埸堋埳埏堇埮埣埲埥埬埡堎埼堐埧堁堌埱埩埰堍堄奜婠婘婕婧婞娸娵婭婐婟婥婬婓婤婗婃婝婒婄婛婈媎娾婍娹婌婰婩婇婑婖婂婜孲孮寁寀屙崞崋崝崚崠崌崨崍崦崥崏"
  ],
  [
    "d540",
    "崰崒崣崟崮帾帴庱庴庹庲庳弶弸徛徖徟悊悐悆悾悰悺惓惔惏惤惙惝惈悱惛悷惊悿惃惍惀挲捥掊掂捽掽掞掭掝掗掫掎捯掇掐据掯捵掜捭掮捼掤挻掟"
  ],
  [
    "d5a1",
    "捸掅掁掑掍捰敓旍晥晡晛晙晜晢朘桹梇梐梜桭桮梮梫楖桯梣梬梩桵桴梲梏桷梒桼桫桲梪梀桱桾梛梖梋梠梉梤桸桻梑梌梊桽欶欳欷欸殑殏殍殎殌氪淀涫涴涳湴涬淩淢涷淶淔渀淈淠淟淖涾淥淜淝淛淴淊涽淭淰涺淕淂淏淉"
  ],
  [
    "d640",
    "淐淲淓淽淗淍淣涻烺焍烷焗烴焌烰焄烳焐烼烿焆焓焀烸烶焋焂焎牾牻牼牿猝猗猇猑猘猊猈狿猏猞玈珶珸珵琄琁珽琇琀珺珼珿琌琋珴琈畤畣痎痒痏"
  ],
  [
    "d6a1",
    "痋痌痑痐皏皉盓眹眯眭眱眲眴眳眽眥眻眵硈硒硉硍硊硌砦硅硐祤祧祩祪祣祫祡离秺秸秶秷窏窔窐笵筇笴笥笰笢笤笳笘笪笝笱笫笭笯笲笸笚笣粔粘粖粣紵紽紸紶紺絅紬紩絁絇紾紿絊紻紨罣羕羜羝羛翊翋翍翐翑翇翏翉耟"
  ],
  [
    "d740",
    "耞耛聇聃聈脘脥脙脛脭脟脬脞脡脕脧脝脢舑舸舳舺舴舲艴莐莣莨莍荺荳莤荴莏莁莕莙荵莔莩荽莃莌莝莛莪莋荾莥莯莈莗莰荿莦莇莮荶莚虙虖蚿蚷"
  ],
  [
    "d7a1",
    "蛂蛁蛅蚺蚰蛈蚹蚳蚸蛌蚴蚻蚼蛃蚽蚾衒袉袕袨袢袪袚袑袡袟袘袧袙袛袗袤袬袌袓袎覂觖觙觕訰訧訬訞谹谻豜豝豽貥赽赻赹趼跂趹趿跁軘軞軝軜軗軠軡逤逋逑逜逌逡郯郪郰郴郲郳郔郫郬郩酖酘酚酓酕釬釴釱釳釸釤釹釪"
  ],
  [
    "d840",
    "釫釷釨釮镺閆閈陼陭陫陱陯隿靪頄飥馗傛傕傔傞傋傣傃傌傎傝偨傜傒傂傇兟凔匒匑厤厧喑喨喥喭啷噅喢喓喈喏喵喁喣喒喤啽喌喦啿喕喡喎圌堩堷"
  ],
  [
    "d8a1",
    "堙堞堧堣堨埵塈堥堜堛堳堿堶堮堹堸堭堬堻奡媯媔媟婺媢媞婸媦婼媥媬媕媮娷媄媊媗媃媋媩婻婽媌媜媏媓媝寪寍寋寔寑寊寎尌尰崷嵃嵫嵁嵋崿崵嵑嵎嵕崳崺嵒崽崱嵙嵂崹嵉崸崼崲崶嵀嵅幄幁彘徦徥徫惉悹惌惢惎惄愔"
  ],
  [
    "d940",
    "惲愊愖愅惵愓惸惼惾惁愃愘愝愐惿愄愋扊掔掱掰揎揥揨揯揃撝揳揊揠揶揕揲揵摡揟掾揝揜揄揘揓揂揇揌揋揈揰揗揙攲敧敪敤敜敨敥斌斝斞斮旐旒"
  ],
  [
    "d9a1",
    "晼晬晻暀晱晹晪晲朁椌棓椄棜椪棬棪棱椏棖棷棫棤棶椓椐棳棡椇棌椈楰梴椑棯棆椔棸棐棽棼棨椋椊椗棎棈棝棞棦棴棑椆棔棩椕椥棇欹欻欿欼殔殗殙殕殽毰毲毳氰淼湆湇渟湉溈渼渽湅湢渫渿湁湝湳渜渳湋湀湑渻渃渮湞"
  ],
  [
    "da40",
    "湨湜湡渱渨湠湱湫渹渢渰湓湥渧湸湤湷湕湹湒湦渵渶湚焠焞焯烻焮焱焣焥焢焲焟焨焺焛牋牚犈犉犆犅犋猒猋猰猢猱猳猧猲猭猦猣猵猌琮琬琰琫琖"
  ],
  [
    "daa1",
    "琚琡琭琱琤琣琝琩琠琲瓻甯畯畬痧痚痡痦痝痟痤痗皕皒盚睆睇睄睍睅睊睎睋睌矞矬硠硤硥硜硭硱硪确硰硩硨硞硢祴祳祲祰稂稊稃稌稄窙竦竤筊笻筄筈筌筎筀筘筅粢粞粨粡絘絯絣絓絖絧絪絏絭絜絫絒絔絩絑絟絎缾缿罥"
  ],
  [
    "db40",
    "罦羢羠羡翗聑聏聐胾胔腃腊腒腏腇脽腍脺臦臮臷臸臹舄舼舽舿艵茻菏菹萣菀菨萒菧菤菼菶萐菆菈菫菣莿萁菝菥菘菿菡菋菎菖菵菉萉萏菞萑萆菂菳"
  ],
  [
    "dba1",
    "菕菺菇菑菪萓菃菬菮菄菻菗菢萛菛菾蛘蛢蛦蛓蛣蛚蛪蛝蛫蛜蛬蛩蛗蛨蛑衈衖衕袺裗袹袸裀袾袶袼袷袽袲褁裉覕覘覗觝觚觛詎詍訹詙詀詗詘詄詅詒詈詑詊詌詏豟貁貀貺貾貰貹貵趄趀趉跘跓跍跇跖跜跏跕跙跈跗跅軯軷軺"
  ],
  [
    "dc40",
    "軹軦軮軥軵軧軨軶軫軱軬軴軩逭逴逯鄆鄬鄄郿郼鄈郹郻鄁鄀鄇鄅鄃酡酤酟酢酠鈁鈊鈥鈃鈚鈦鈏鈌鈀鈒釿釽鈆鈄鈧鈂鈜鈤鈙鈗鈅鈖镻閍閌閐隇陾隈"
  ],
  [
    "dca1",
    "隉隃隀雂雈雃雱雰靬靰靮頇颩飫鳦黹亃亄亶傽傿僆傮僄僊傴僈僂傰僁傺傱僋僉傶傸凗剺剸剻剼嗃嗛嗌嗐嗋嗊嗝嗀嗔嗄嗩喿嗒喍嗏嗕嗢嗖嗈嗲嗍嗙嗂圔塓塨塤塏塍塉塯塕塎塝塙塥塛堽塣塱壼嫇嫄嫋媺媸媱媵媰媿嫈媻嫆"
  ],
  [
    "dd40",
    "媷嫀嫊媴媶嫍媹媐寖寘寙尟尳嵱嵣嵊嵥嵲嵬嵞嵨嵧嵢巰幏幎幊幍幋廅廌廆廋廇彀徯徭惷慉慊愫慅愶愲愮慆愯慏愩慀戠酨戣戥戤揅揱揫搐搒搉搠搤"
  ],
  [
    "dda1",
    "搳摃搟搕搘搹搷搢搣搌搦搰搨摁搵搯搊搚摀搥搧搋揧搛搮搡搎敯斒旓暆暌暕暐暋暊暙暔晸朠楦楟椸楎楢楱椿楅楪椹楂楗楙楺楈楉椵楬椳椽楥棰楸椴楩楀楯楄楶楘楁楴楌椻楋椷楜楏楑椲楒椯楻椼歆歅歃歂歈歁殛嗀毻毼"
  ],
  [
    "de40",
    "毹毷毸溛滖滈溏滀溟溓溔溠溱溹滆滒溽滁溞滉溷溰滍溦滏溲溾滃滜滘溙溒溎溍溤溡溿溳滐滊溗溮溣煇煔煒煣煠煁煝煢煲煸煪煡煂煘煃煋煰煟煐煓"
  ],
  [
    "dea1",
    "煄煍煚牏犍犌犑犐犎猼獂猻猺獀獊獉瑄瑊瑋瑒瑑瑗瑀瑏瑐瑎瑂瑆瑍瑔瓡瓿瓾瓽甝畹畷榃痯瘏瘃痷痾痼痹痸瘐痻痶痭痵痽皙皵盝睕睟睠睒睖睚睩睧睔睙睭矠碇碚碔碏碄碕碅碆碡碃硹碙碀碖硻祼禂祽祹稑稘稙稒稗稕稢稓"
  ],
  [
    "df40",
    "稛稐窣窢窞竫筦筤筭筴筩筲筥筳筱筰筡筸筶筣粲粴粯綈綆綀綍絿綅絺綎絻綃絼綌綔綄絽綒罭罫罧罨罬羦羥羧翛翜耡腤腠腷腜腩腛腢腲朡腞腶腧腯"
  ],
  [
    "dfa1",
    "腄腡舝艉艄艀艂艅蓱萿葖葶葹蒏蒍葥葑葀蒆葧萰葍葽葚葙葴葳葝蔇葞萷萺萴葺葃葸萲葅萩菙葋萯葂萭葟葰萹葎葌葒葯蓅蒎萻葇萶萳葨葾葄萫葠葔葮葐蜋蜄蛷蜌蛺蛖蛵蝍蛸蜎蜉蜁蛶蜍蜅裖裋裍裎裞裛裚裌裐覅覛觟觥觤"
  ],
  [
    "e040",
    "觡觠觢觜触詶誆詿詡訿詷誂誄詵誃誁詴詺谼豋豊豥豤豦貆貄貅賌赨赩趑趌趎趏趍趓趔趐趒跰跠跬跱跮跐跩跣跢跧跲跫跴輆軿輁輀輅輇輈輂輋遒逿"
  ],
  [
    "e0a1",
    "遄遉逽鄐鄍鄏鄑鄖鄔鄋鄎酮酯鉈鉒鈰鈺鉦鈳鉥鉞銃鈮鉊鉆鉭鉬鉏鉠鉧鉯鈶鉡鉰鈱鉔鉣鉐鉲鉎鉓鉌鉖鈲閟閜閞閛隒隓隑隗雎雺雽雸雵靳靷靸靲頏頍頎颬飶飹馯馲馰馵骭骫魛鳪鳭鳧麀黽僦僔僗僨僳僛僪僝僤僓僬僰僯僣僠"
  ],
  [
    "e140",
    "凘劀劁勩勫匰厬嘧嘕嘌嘒嗼嘏嘜嘁嘓嘂嗺嘝嘄嗿嗹墉塼墐墘墆墁塿塴墋塺墇墑墎塶墂墈塻墔墏壾奫嫜嫮嫥嫕嫪嫚嫭嫫嫳嫢嫠嫛嫬嫞嫝嫙嫨嫟孷寠"
  ],
  [
    "e1a1",
    "寣屣嶂嶀嵽嶆嵺嶁嵷嶊嶉嶈嵾嵼嶍嵹嵿幘幙幓廘廑廗廎廜廕廙廒廔彄彃彯徶愬愨慁慞慱慳慒慓慲慬憀慴慔慺慛慥愻慪慡慖戩戧戫搫摍摛摝摴摶摲摳摽摵摦撦摎撂摞摜摋摓摠摐摿搿摬摫摙摥摷敳斠暡暠暟朅朄朢榱榶槉"
  ],
  [
    "e240",
    "榠槎榖榰榬榼榑榙榎榧榍榩榾榯榿槄榽榤槔榹槊榚槏榳榓榪榡榞槙榗榐槂榵榥槆歊歍歋殞殟殠毃毄毾滎滵滱漃漥滸漷滻漮漉潎漙漚漧漘漻漒滭漊"
  ],
  [
    "e2a1",
    "漶潳滹滮漭潀漰漼漵滫漇漎潃漅滽滶漹漜滼漺漟漍漞漈漡熇熐熉熀熅熂熏煻熆熁熗牄牓犗犕犓獃獍獑獌瑢瑳瑱瑵瑲瑧瑮甀甂甃畽疐瘖瘈瘌瘕瘑瘊瘔皸瞁睼瞅瞂睮瞀睯睾瞃碲碪碴碭碨硾碫碞碥碠碬碢碤禘禊禋禖禕禔禓"
  ],
  [
    "e340",
    "禗禈禒禐稫穊稰稯稨稦窨窫窬竮箈箜箊箑箐箖箍箌箛箎箅箘劄箙箤箂粻粿粼粺綧綷緂綣綪緁緀緅綝緎緄緆緋緌綯綹綖綼綟綦綮綩綡緉罳翢翣翥翞"
  ],
  [
    "e3a1",
    "耤聝聜膉膆膃膇膍膌膋舕蒗蒤蒡蒟蒺蓎蓂蒬蒮蒫蒹蒴蓁蓍蒪蒚蒱蓐蒝蒧蒻蒢蒔蓇蓌蒛蒩蒯蒨蓖蒘蒶蓏蒠蓗蓔蓒蓛蒰蒑虡蜳蜣蜨蝫蝀蜮蜞蜡蜙蜛蝃蜬蝁蜾蝆蜠蜲蜪蜭蜼蜒蜺蜱蜵蝂蜦蜧蜸蜤蜚蜰蜑裷裧裱裲裺裾裮裼裶裻"
  ],
  [
    "e440",
    "裰裬裫覝覡覟覞觩觫觨誫誙誋誒誏誖谽豨豩賕賏賗趖踉踂跿踍跽踊踃踇踆踅跾踀踄輐輑輎輍鄣鄜鄠鄢鄟鄝鄚鄤鄡鄛酺酲酹酳銥銤鉶銛鉺銠銔銪銍"
  ],
  [
    "e4a1",
    "銦銚銫鉹銗鉿銣鋮銎銂銕銢鉽銈銡銊銆銌銙銧鉾銇銩銝銋鈭隞隡雿靘靽靺靾鞃鞀鞂靻鞄鞁靿韎韍頖颭颮餂餀餇馝馜駃馹馻馺駂馽駇骱髣髧鬾鬿魠魡魟鳱鳲鳵麧僿儃儰僸儆儇僶僾儋儌僽儊劋劌勱勯噈噂噌嘵噁噊噉噆噘"
  ],
  [
    "e540",
    "噚噀嘳嘽嘬嘾嘸嘪嘺圚墫墝墱墠墣墯墬墥墡壿嫿嫴嫽嫷嫶嬃嫸嬂嫹嬁嬇嬅嬏屧嶙嶗嶟嶒嶢嶓嶕嶠嶜嶡嶚嶞幩幝幠幜緳廛廞廡彉徲憋憃慹憱憰憢憉"
  ],
  [
    "e5a1",
    "憛憓憯憭憟憒憪憡憍慦憳戭摮摰撖撠撅撗撜撏撋撊撌撣撟摨撱撘敶敺敹敻斲斳暵暰暩暲暷暪暯樀樆樗槥槸樕槱槤樠槿槬槢樛樝槾樧槲槮樔槷槧橀樈槦槻樍槼槫樉樄樘樥樏槶樦樇槴樖歑殥殣殢殦氁氀毿氂潁漦潾澇濆澒"
  ],
  [
    "e640",
    "澍澉澌潢潏澅潚澖潶潬澂潕潲潒潐潗澔澓潝漀潡潫潽潧澐潓澋潩潿澕潣潷潪潻熲熯熛熰熠熚熩熵熝熥熞熤熡熪熜熧熳犘犚獘獒獞獟獠獝獛獡獚獙"
  ],
  [
    "e6a1",
    "獢璇璉璊璆璁瑽璅璈瑼瑹甈甇畾瘥瘞瘙瘝瘜瘣瘚瘨瘛皜皝皞皛瞍瞏瞉瞈磍碻磏磌磑磎磔磈磃磄磉禚禡禠禜禢禛歶稹窲窴窳箷篋箾箬篎箯箹篊箵糅糈糌糋緷緛緪緧緗緡縃緺緦緶緱緰緮緟罶羬羰羭翭翫翪翬翦翨聤聧膣膟"
  ],
  [
    "e740",
    "膞膕膢膙膗舖艏艓艒艐艎艑蔤蔻蔏蔀蔩蔎蔉蔍蔟蔊蔧蔜蓻蔫蓺蔈蔌蓴蔪蓲蔕蓷蓫蓳蓼蔒蓪蓩蔖蓾蔨蔝蔮蔂蓽蔞蓶蔱蔦蓧蓨蓰蓯蓹蔘蔠蔰蔋蔙蔯虢"
  ],
  [
    "e7a1",
    "蝖蝣蝤蝷蟡蝳蝘蝔蝛蝒蝡蝚蝑蝞蝭蝪蝐蝎蝟蝝蝯蝬蝺蝮蝜蝥蝏蝻蝵蝢蝧蝩衚褅褌褔褋褗褘褙褆褖褑褎褉覢覤覣觭觰觬諏諆誸諓諑諔諕誻諗誾諀諅諘諃誺誽諙谾豍貏賥賟賙賨賚賝賧趠趜趡趛踠踣踥踤踮踕踛踖踑踙踦踧"
  ],
  [
    "e840",
    "踔踒踘踓踜踗踚輬輤輘輚輠輣輖輗遳遰遯遧遫鄯鄫鄩鄪鄲鄦鄮醅醆醊醁醂醄醀鋐鋃鋄鋀鋙銶鋏鋱鋟鋘鋩鋗鋝鋌鋯鋂鋨鋊鋈鋎鋦鋍鋕鋉鋠鋞鋧鋑鋓"
  ],
  [
    "e8a1",
    "銵鋡鋆銴镼閬閫閮閰隤隢雓霅霈霂靚鞊鞎鞈韐韏頞頝頦頩頨頠頛頧颲餈飺餑餔餖餗餕駜駍駏駓駔駎駉駖駘駋駗駌骳髬髫髳髲髱魆魃魧魴魱魦魶魵魰魨魤魬鳼鳺鳽鳿鳷鴇鴀鳹鳻鴈鴅鴄麃黓鼏鼐儜儓儗儚儑凞匴叡噰噠噮"
  ],
  [
    "e940",
    "噳噦噣噭噲噞噷圜圛壈墽壉墿墺壂墼壆嬗嬙嬛嬡嬔嬓嬐嬖嬨嬚嬠嬞寯嶬嶱嶩嶧嶵嶰嶮嶪嶨嶲嶭嶯嶴幧幨幦幯廩廧廦廨廥彋徼憝憨憖懅憴懆懁懌憺"
  ],
  [
    "e9a1",
    "憿憸憌擗擖擐擏擉撽撉擃擛擳擙攳敿敼斢曈暾曀曊曋曏暽暻暺曌朣樴橦橉橧樲橨樾橝橭橶橛橑樨橚樻樿橁橪橤橐橏橔橯橩橠樼橞橖橕橍橎橆歕歔歖殧殪殫毈毇氄氃氆澭濋澣濇澼濎濈潞濄澽澞濊澨瀄澥澮澺澬澪濏澿澸"
  ],
  [
    "ea40",
    "澢濉澫濍澯澲澰燅燂熿熸燖燀燁燋燔燊燇燏熽燘熼燆燚燛犝犞獩獦獧獬獥獫獪瑿璚璠璔璒璕璡甋疀瘯瘭瘱瘽瘳瘼瘵瘲瘰皻盦瞚瞝瞡瞜瞛瞢瞣瞕瞙"
  ],
  [
    "eaa1",
    "瞗磝磩磥磪磞磣磛磡磢磭磟磠禤穄穈穇窶窸窵窱窷篞篣篧篝篕篥篚篨篹篔篪篢篜篫篘篟糒糔糗糐糑縒縡縗縌縟縠縓縎縜縕縚縢縋縏縖縍縔縥縤罃罻罼罺羱翯耪耩聬膱膦膮膹膵膫膰膬膴膲膷膧臲艕艖艗蕖蕅蕫蕍蕓蕡蕘"
  ],
  [
    "eb40",
    "蕀蕆蕤蕁蕢蕄蕑蕇蕣蔾蕛蕱蕎蕮蕵蕕蕧蕠薌蕦蕝蕔蕥蕬虣虥虤螛螏螗螓螒螈螁螖螘蝹螇螣螅螐螑螝螄螔螜螚螉褞褦褰褭褮褧褱褢褩褣褯褬褟觱諠"
  ],
  [
    "eba1",
    "諢諲諴諵諝謔諤諟諰諈諞諡諨諿諯諻貑貒貐賵賮賱賰賳赬赮趥趧踳踾踸蹀蹅踶踼踽蹁踰踿躽輶輮輵輲輹輷輴遶遹遻邆郺鄳鄵鄶醓醐醑醍醏錧錞錈錟錆錏鍺錸錼錛錣錒錁鍆錭錎錍鋋錝鋺錥錓鋹鋷錴錂錤鋿錩錹錵錪錔錌"
  ],
  [
    "ec40",
    "錋鋾錉錀鋻錖閼闍閾閹閺閶閿閵閽隩雔霋霒霐鞙鞗鞔韰韸頵頯頲餤餟餧餩馞駮駬駥駤駰駣駪駩駧骹骿骴骻髶髺髹髷鬳鮀鮅鮇魼魾魻鮂鮓鮒鮐魺鮕"
  ],
  [
    "eca1",
    "魽鮈鴥鴗鴠鴞鴔鴩鴝鴘鴢鴐鴙鴟麈麆麇麮麭黕黖黺鼒鼽儦儥儢儤儠儩勴嚓嚌嚍嚆嚄嚃噾嚂噿嚁壖壔壏壒嬭嬥嬲嬣嬬嬧嬦嬯嬮孻寱寲嶷幬幪徾徻懃憵憼懧懠懥懤懨懞擯擩擣擫擤擨斁斀斶旚曒檍檖檁檥檉檟檛檡檞檇檓檎"
  ],
  [
    "ed40",
    "檕檃檨檤檑橿檦檚檅檌檒歛殭氉濌澩濴濔濣濜濭濧濦濞濲濝濢濨燡燱燨燲燤燰燢獳獮獯璗璲璫璐璪璭璱璥璯甐甑甒甏疄癃癈癉癇皤盩瞵瞫瞲瞷瞶"
  ],
  [
    "eda1",
    "瞴瞱瞨矰磳磽礂磻磼磲礅磹磾礄禫禨穜穛穖穘穔穚窾竀竁簅簏篲簀篿篻簎篴簋篳簂簉簃簁篸篽簆篰篱簐簊糨縭縼繂縳顈縸縪繉繀繇縩繌縰縻縶繄縺罅罿罾罽翴翲耬膻臄臌臊臅臇膼臩艛艚艜薃薀薏薧薕薠薋薣蕻薤薚薞"
  ],
  [
    "ee40",
    "蕷蕼薉薡蕺蕸蕗薎薖薆薍薙薝薁薢薂薈薅蕹蕶薘薐薟虨螾螪螭蟅螰螬螹螵螼螮蟉蟃蟂蟌螷螯蟄蟊螴螶螿螸螽蟞螲褵褳褼褾襁襒褷襂覭覯覮觲觳謞"
  ],
  [
    "eea1",
    "謘謖謑謅謋謢謏謒謕謇謍謈謆謜謓謚豏豰豲豱豯貕貔賹赯蹎蹍蹓蹐蹌蹇轃轀邅遾鄸醚醢醛醙醟醡醝醠鎡鎃鎯鍤鍖鍇鍼鍘鍜鍶鍉鍐鍑鍠鍭鎏鍌鍪鍹鍗鍕鍒鍏鍱鍷鍻鍡鍞鍣鍧鎀鍎鍙闇闀闉闃闅閷隮隰隬霠霟霘霝霙鞚鞡鞜"
  ],
  [
    "ef40",
    "鞞鞝韕韔韱顁顄顊顉顅顃餥餫餬餪餳餲餯餭餱餰馘馣馡騂駺駴駷駹駸駶駻駽駾駼騃骾髾髽鬁髼魈鮚鮨鮞鮛鮦鮡鮥鮤鮆鮢鮠鮯鴳鵁鵧鴶鴮鴯鴱鴸鴰"
  ],
  [
    "efa1",
    "鵅鵂鵃鴾鴷鵀鴽翵鴭麊麉麍麰黈黚黻黿鼤鼣鼢齔龠儱儭儮嚘嚜嚗嚚嚝嚙奰嬼屩屪巀幭幮懘懟懭懮懱懪懰懫懖懩擿攄擽擸攁攃擼斔旛曚曛曘櫅檹檽櫡櫆檺檶檷櫇檴檭歞毉氋瀇瀌瀍瀁瀅瀔瀎濿瀀濻瀦濼濷瀊爁燿燹爃燽獶"
  ],
  [
    "f040",
    "璸瓀璵瓁璾璶璻瓂甔甓癜癤癙癐癓癗癚皦皽盬矂瞺磿礌礓礔礉礐礒礑禭禬穟簜簩簙簠簟簭簝簦簨簢簥簰繜繐繖繣繘繢繟繑繠繗繓羵羳翷翸聵臑臒"
  ],
  [
    "f0a1",
    "臐艟艞薴藆藀藃藂薳薵薽藇藄薿藋藎藈藅薱薶藒蘤薸薷薾虩蟧蟦蟢蟛蟫蟪蟥蟟蟳蟤蟔蟜蟓蟭蟘蟣螤蟗蟙蠁蟴蟨蟝襓襋襏襌襆襐襑襉謪謧謣謳謰謵譇謯謼謾謱謥謷謦謶謮謤謻謽謺豂豵貙貘貗賾贄贂贀蹜蹢蹠蹗蹖蹞蹥蹧"
  ],
  [
    "f140",
    "蹛蹚蹡蹝蹩蹔轆轇轈轋鄨鄺鄻鄾醨醥醧醯醪鎵鎌鎒鎷鎛鎝鎉鎧鎎鎪鎞鎦鎕鎈鎙鎟鎍鎱鎑鎲鎤鎨鎴鎣鎥闒闓闑隳雗雚巂雟雘雝霣霢霥鞬鞮鞨鞫鞤鞪"
  ],
  [
    "f1a1",
    "鞢鞥韗韙韖韘韺顐顑顒颸饁餼餺騏騋騉騍騄騑騊騅騇騆髀髜鬈鬄鬅鬩鬵魊魌魋鯇鯆鯃鮿鯁鮵鮸鯓鮶鯄鮹鮽鵜鵓鵏鵊鵛鵋鵙鵖鵌鵗鵒鵔鵟鵘鵚麎麌黟鼁鼀鼖鼥鼫鼪鼩鼨齌齕儴儵劖勷厴嚫嚭嚦嚧嚪嚬壚壝壛夒嬽嬾嬿巃幰"
  ],
  [
    "f240",
    "徿懻攇攐攍攉攌攎斄旞旝曞櫧櫠櫌櫑櫙櫋櫟櫜櫐櫫櫏櫍櫞歠殰氌瀙瀧瀠瀖瀫瀡瀢瀣瀩瀗瀤瀜瀪爌爊爇爂爅犥犦犤犣犡瓋瓅璷瓃甖癠矉矊矄矱礝礛"
  ],
  [
    "f2a1",
    "礡礜礗礞禰穧穨簳簼簹簬簻糬糪繶繵繸繰繷繯繺繲繴繨罋罊羃羆羷翽翾聸臗臕艤艡艣藫藱藭藙藡藨藚藗藬藲藸藘藟藣藜藑藰藦藯藞藢蠀蟺蠃蟶蟷蠉蠌蠋蠆蟼蠈蟿蠊蠂襢襚襛襗襡襜襘襝襙覈覷覶觶譐譈譊譀譓譖譔譋譕"
  ],
  [
    "f340",
    "譑譂譒譗豃豷豶貚贆贇贉趬趪趭趫蹭蹸蹳蹪蹯蹻軂轒轑轏轐轓辴酀鄿醰醭鏞鏇鏏鏂鏚鏐鏹鏬鏌鏙鎩鏦鏊鏔鏮鏣鏕鏄鏎鏀鏒鏧镽闚闛雡霩霫霬霨霦"
  ],
  [
    "f3a1",
    "鞳鞷鞶韝韞韟顜顙顝顗颿颽颻颾饈饇饃馦馧騚騕騥騝騤騛騢騠騧騣騞騜騔髂鬋鬊鬎鬌鬷鯪鯫鯠鯞鯤鯦鯢鯰鯔鯗鯬鯜鯙鯥鯕鯡鯚鵷鶁鶊鶄鶈鵱鶀鵸鶆鶋鶌鵽鵫鵴鵵鵰鵩鶅鵳鵻鶂鵯鵹鵿鶇鵨麔麑黀黼鼭齀齁齍齖齗齘匷嚲"
  ],
  [
    "f440",
    "嚵嚳壣孅巆巇廮廯忀忁懹攗攖攕攓旟曨曣曤櫳櫰櫪櫨櫹櫱櫮櫯瀼瀵瀯瀷瀴瀱灂瀸瀿瀺瀹灀瀻瀳灁爓爔犨獽獼璺皫皪皾盭矌矎矏矍矲礥礣礧礨礤礩"
  ],
  [
    "f4a1",
    "禲穮穬穭竷籉籈籊籇籅糮繻繾纁纀羺翿聹臛臙舋艨艩蘢藿蘁藾蘛蘀藶蘄蘉蘅蘌藽蠙蠐蠑蠗蠓蠖襣襦覹觷譠譪譝譨譣譥譧譭趮躆躈躄轙轖轗轕轘轚邍酃酁醷醵醲醳鐋鐓鏻鐠鐏鐔鏾鐕鐐鐨鐙鐍鏵鐀鏷鐇鐎鐖鐒鏺鐉鏸鐊鏿"
  ],
  [
    "f540",
    "鏼鐌鏶鐑鐆闞闠闟霮霯鞹鞻韽韾顠顢顣顟飁飂饐饎饙饌饋饓騲騴騱騬騪騶騩騮騸騭髇髊髆鬐鬒鬑鰋鰈鯷鰅鰒鯸鱀鰇鰎鰆鰗鰔鰉鶟鶙鶤鶝鶒鶘鶐鶛"
  ],
  [
    "f5a1",
    "鶠鶔鶜鶪鶗鶡鶚鶢鶨鶞鶣鶿鶩鶖鶦鶧麙麛麚黥黤黧黦鼰鼮齛齠齞齝齙龑儺儹劘劗囃嚽嚾孈孇巋巏廱懽攛欂櫼欃櫸欀灃灄灊灈灉灅灆爝爚爙獾甗癪矐礭礱礯籔籓糲纊纇纈纋纆纍罍羻耰臝蘘蘪蘦蘟蘣蘜蘙蘧蘮蘡蘠蘩蘞蘥"
  ],
  [
    "f640",
    "蠩蠝蠛蠠蠤蠜蠫衊襭襩襮襫觺譹譸譅譺譻贐贔趯躎躌轞轛轝酆酄酅醹鐿鐻鐶鐩鐽鐼鐰鐹鐪鐷鐬鑀鐱闥闤闣霵霺鞿韡顤飉飆飀饘饖騹騽驆驄驂驁騺"
  ],
  [
    "f6a1",
    "騿髍鬕鬗鬘鬖鬺魒鰫鰝鰜鰬鰣鰨鰩鰤鰡鶷鶶鶼鷁鷇鷊鷏鶾鷅鷃鶻鶵鷎鶹鶺鶬鷈鶱鶭鷌鶳鷍鶲鹺麜黫黮黭鼛鼘鼚鼱齎齥齤龒亹囆囅囋奱孋孌巕巑廲攡攠攦攢欋欈欉氍灕灖灗灒爞爟犩獿瓘瓕瓙瓗癭皭礵禴穰穱籗籜籙籛籚"
  ],
  [
    "f740",
    "糴糱纑罏羇臞艫蘴蘵蘳蘬蘲蘶蠬蠨蠦蠪蠥襱覿覾觻譾讄讂讆讅譿贕躕躔躚躒躐躖躗轠轢酇鑌鑐鑊鑋鑏鑇鑅鑈鑉鑆霿韣顪顩飋饔饛驎驓驔驌驏驈驊"
  ],
  [
    "f7a1",
    "驉驒驐髐鬙鬫鬻魖魕鱆鱈鰿鱄鰹鰳鱁鰼鰷鰴鰲鰽鰶鷛鷒鷞鷚鷋鷐鷜鷑鷟鷩鷙鷘鷖鷵鷕鷝麶黰鼵鼳鼲齂齫龕龢儽劙壨壧奲孍巘蠯彏戁戃戄攩攥斖曫欑欒欏毊灛灚爢玂玁玃癰矔籧籦纕艬蘺虀蘹蘼蘱蘻蘾蠰蠲蠮蠳襶襴襳觾"
  ],
  [
    "f840",
    "讌讎讋讈豅贙躘轤轣醼鑢鑕鑝鑗鑞韄韅頀驖驙鬞鬟鬠鱒鱘鱐鱊鱍鱋鱕鱙鱌鱎鷻鷷鷯鷣鷫鷸鷤鷶鷡鷮鷦鷲鷰鷢鷬鷴鷳鷨鷭黂黐黲黳鼆鼜鼸鼷鼶齃齏"
  ],
  [
    "f8a1",
    "齱齰齮齯囓囍孎屭攭曭曮欓灟灡灝灠爣瓛瓥矕礸禷禶籪纗羉艭虃蠸蠷蠵衋讔讕躞躟躠躝醾醽釂鑫鑨鑩雥靆靃靇韇韥驞髕魙鱣鱧鱦鱢鱞鱠鸂鷾鸇鸃鸆鸅鸀鸁鸉鷿鷽鸄麠鼞齆齴齵齶囔攮斸欘欙欗欚灢爦犪矘矙礹籩籫糶纚"
  ],
  [
    "f940",
    "纘纛纙臠臡虆虇虈襹襺襼襻觿讘讙躥躤躣鑮鑭鑯鑱鑳靉顲饟鱨鱮鱭鸋鸍鸐鸏鸒鸑麡黵鼉齇齸齻齺齹圞灦籯蠼趲躦釃鑴鑸鑶鑵驠鱴鱳鱱鱵鸔鸓黶鼊"
  ],
  [
    "f9a1",
    "龤灨灥糷虪蠾蠽蠿讞貜躩軉靋顳顴飌饡馫驤驦驧鬤鸕鸗齈戇欞爧虌躨钂钀钁驩驨鬮鸙爩虋讟钃鱹麷癵驫鱺鸝灩灪麤齾齉龘碁銹裏墻恒粧嫺╔╦╗╠╬╣╚╩╝╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜║═╭╮╰╯▓"
  ]
], mE = [
  [
    "8740",
    "䏰䰲䘃䖦䕸𧉧䵷䖳𧲱䳢𧳅㮕䜶䝄䱇䱀𤊿𣘗𧍒𦺋𧃒䱗𪍑䝏䗚䲅𧱬䴇䪤䚡𦬣爥𥩔𡩣𣸆𣽡晍囻"
  ],
  [
    "8767",
    "綕夝𨮹㷴霴𧯯寛𡵞媤㘥𩺰嫑宷峼杮薓𩥅瑡璝㡵𡵓𣚞𦀡㻬"
  ],
  [
    "87a1",
    "𥣞㫵竼龗𤅡𨤍𣇪𠪊𣉞䌊蒄龖鐯䤰蘓墖靊鈘秐稲晠権袝瑌篅枂稬剏遆㓦珄𥶹瓆鿇垳䤯呌䄱𣚎堘穲𧭥讏䚮𦺈䆁𥶙箮𢒼鿈𢓁𢓉𢓌鿉蔄𣖻䂴鿊䓡𪷿拁灮鿋"
  ],
  [
    "8840",
    "㇀",
    4,
    "𠄌㇅𠃑𠃍㇆㇇𠃋𡿨㇈𠃊㇉㇊㇋㇌𠄎㇍㇎ĀÁǍÀĒÉĚÈŌÓǑÒ࿿Ê̄Ế࿿Ê̌ỀÊāáǎàɑēéěèīíǐìōóǒòūúǔùǖǘǚ"
  ],
  [
    "88a1",
    "ǜü࿿ê̄ế࿿ê̌ềêɡ⏚⏛"
  ],
  [
    "8940",
    "𪎩𡅅"
  ],
  [
    "8943",
    "攊"
  ],
  [
    "8946",
    "丽滝鵎釟"
  ],
  [
    "894c",
    "𧜵撑会伨侨兖兴农凤务动医华发变团声处备夲头学实実岚庆总斉柾栄桥济炼电纤纬纺织经统缆缷艺苏药视设询车轧轮"
  ],
  [
    "89a1",
    "琑糼緍楆竉刧"
  ],
  [
    "89ab",
    "醌碸酞肼"
  ],
  [
    "89b0",
    "贋胶𠧧"
  ],
  [
    "89b5",
    "肟黇䳍鷉鸌䰾𩷶𧀎鸊𪄳㗁"
  ],
  [
    "89c1",
    "溚舾甙"
  ],
  [
    "89c5",
    "䤑马骏龙禇𨑬𡷊𠗐𢫦两亁亀亇亿仫伷㑌侽㹈倃傈㑽㒓㒥円夅凛凼刅争剹劐匧㗇厩㕑厰㕓参吣㕭㕲㚁咓咣咴咹哐哯唘唣唨㖘唿㖥㖿嗗㗅"
  ],
  [
    "8a40",
    "𧶄唥"
  ],
  [
    "8a43",
    "𠱂𠴕𥄫喐𢳆㧬𠍁蹆𤶸𩓥䁓𨂾睺𢰸㨴䟕𨅝𦧲𤷪擝𠵼𠾴𠳕𡃴撍蹾𠺖𠰋𠽤𢲩𨉖𤓓"
  ],
  [
    "8a64",
    "𠵆𩩍𨃩䟴𤺧𢳂骲㩧𩗴㿭㔆𥋇𩟔𧣈𢵄鵮頕"
  ],
  [
    "8a76",
    "䏙𦂥撴哣𢵌𢯊𡁷㧻𡁯"
  ],
  [
    "8aa1",
    "𦛚𦜖𧦠擪𥁒𠱃蹨𢆡𨭌𠜱"
  ],
  [
    "8aac",
    "䠋𠆩㿺塳𢶍"
  ],
  [
    "8ab2",
    "𤗈𠓼𦂗𠽌𠶖啹䂻䎺"
  ],
  [
    "8abb",
    "䪴𢩦𡂝膪飵𠶜捹㧾𢝵跀嚡摼㹃"
  ],
  [
    "8ac9",
    "𪘁𠸉𢫏𢳉"
  ],
  [
    "8ace",
    "𡃈𣧂㦒㨆𨊛㕸𥹉𢃇噒𠼱𢲲𩜠㒼氽𤸻"
  ],
  [
    "8adf",
    "𧕴𢺋𢈈𪙛𨳍𠹺𠰴𦠜羓𡃏𢠃𢤹㗻𥇣𠺌𠾍𠺪㾓𠼰𠵇𡅏𠹌"
  ],
  [
    "8af6",
    "𠺫𠮩𠵈𡃀𡄽㿹𢚖搲𠾭"
  ],
  [
    "8b40",
    "𣏴𧘹𢯎𠵾𠵿𢱑𢱕㨘𠺘𡃇𠼮𪘲𦭐𨳒𨶙𨳊閪哌苄喹"
  ],
  [
    "8b55",
    "𩻃鰦骶𧝞𢷮煀腭胬尜𦕲脴㞗卟𨂽醶𠻺𠸏𠹷𠻻㗝𤷫㘉𠳖嚯𢞵𡃉𠸐𠹸𡁸𡅈𨈇𡑕𠹹𤹐𢶤婔𡀝𡀞𡃵𡃶垜𠸑"
  ],
  [
    "8ba1",
    "𧚔𨋍𠾵𠹻𥅾㜃𠾶𡆀𥋘𪊽𤧚𡠺𤅷𨉼墙剨㘚𥜽箲孨䠀䬬鼧䧧鰟鮍𥭴𣄽嗻㗲嚉丨夂𡯁屮靑𠂆乛亻㔾尣彑忄㣺扌攵歺氵氺灬爫丬犭𤣩罒礻糹罓𦉪㓁"
  ],
  [
    "8bde",
    "𦍋耂肀𦘒𦥑卝衤见𧢲讠贝钅镸长门𨸏韦页风飞饣𩠐鱼鸟黄歯龜丷𠂇阝户钢"
  ],
  [
    "8c40",
    "倻淾𩱳龦㷉袏𤅎灷峵䬠𥇍㕙𥴰愢𨨲辧釶熑朙玺𣊁𪄇㲋𡦀䬐磤琂冮𨜏䀉橣𪊺䈣蘏𠩯稪𩥇𨫪靕灍匤𢁾鏴盙𨧣龧矝亣俰傼丯众龨吴綋墒壐𡶶庒庙忂𢜒斋"
  ],
  [
    "8ca1",
    "𣏹椙橃𣱣泿"
  ],
  [
    "8ca7",
    "爀𤔅玌㻛𤨓嬕璹讃𥲤𥚕窓篬糃繬苸薗龩袐龪躹龫迏蕟駠鈡龬𨶹𡐿䁱䊢娚"
  ],
  [
    "8cc9",
    "顨杫䉶圽"
  ],
  [
    "8cce",
    "藖𤥻芿𧄍䲁𦵴嵻𦬕𦾾龭龮宖龯曧繛湗秊㶈䓃𣉖𢞖䎚䔶"
  ],
  [
    "8ce6",
    "峕𣬚諹屸㴒𣕑嵸龲煗䕘𤃬𡸣䱷㥸㑊𠆤𦱁諌侴𠈹妿腬顖𩣺弻"
  ],
  [
    "8d40",
    "𠮟"
  ],
  [
    "8d42",
    "𢇁𨥭䄂䚻𩁹㼇龳𪆵䃸㟖䛷𦱆䅼𨚲𧏿䕭㣔𥒚䕡䔛䶉䱻䵶䗪㿈𤬏㙡䓞䒽䇭崾嵈嵖㷼㠏嶤嶹㠠㠸幂庽弥徃㤈㤔㤿㥍惗愽峥㦉憷憹懏㦸戬抐拥挘㧸嚱"
  ],
  [
    "8da1",
    "㨃揢揻搇摚㩋擀崕嘡龟㪗斆㪽旿晓㫲暒㬢朖㭂枤栀㭘桊梄㭲㭱㭻椉楃牜楤榟榅㮼槖㯝橥橴橱檂㯬檙㯲檫檵櫔櫶殁毁毪汵沪㳋洂洆洦涁㳯涤涱渕渘温溆𨧀溻滢滚齿滨滩漤漴㵆𣽁澁澾㵪㵵熷岙㶊瀬㶑灐灔灯灿炉𠌥䏁㗱𠻘"
  ],
  [
    "8e40",
    "𣻗垾𦻓焾𥟠㙎榢𨯩孴穉𥣡𩓙穥穽𥦬窻窰竂竃燑𦒍䇊竚竝竪䇯咲𥰁笋筕笩𥌎𥳾箢筯莜𥮴𦱿篐萡箒箸𥴠㶭𥱥蒒篺簆簵𥳁籄粃𤢂粦晽𤕸糉糇糦籴糳糵糎"
  ],
  [
    "8ea1",
    "繧䔝𦹄絝𦻖璍綉綫焵綳緒𤁗𦀩緤㴓緵𡟹緥𨍭縝𦄡𦅚繮纒䌫鑬縧罀罁罇礶𦋐駡羗𦍑羣𡙡𠁨䕜𣝦䔃𨌺翺𦒉者耈耝耨耯𪂇𦳃耻耼聡𢜔䦉𦘦𣷣𦛨朥肧𨩈脇脚墰𢛶汿𦒘𤾸擧𡒊舘𡡞橓𤩥𤪕䑺舩𠬍𦩒𣵾俹𡓽蓢荢𦬊𤦧𣔰𡝳𣷸芪椛芳䇛"
  ],
  [
    "8f40",
    "蕋苐茚𠸖𡞴㛁𣅽𣕚艻苢茘𣺋𦶣𦬅𦮗𣗎㶿茝嗬莅䔋𦶥莬菁菓㑾𦻔橗蕚㒖𦹂𢻯葘𥯤葱㷓䓤檧葊𣲵祘蒨𦮖𦹷𦹃蓞萏莑䒠蒓蓤𥲑䉀𥳀䕃蔴嫲𦺙䔧蕳䔖枿蘖"
  ],
  [
    "8fa1",
    "𨘥𨘻藁𧂈蘂𡖂𧃍䕫䕪蘨㙈𡢢号𧎚虾蝱𪃸蟮𢰧螱蟚蠏噡虬桖䘏衅衆𧗠𣶹𧗤衞袜䙛袴袵揁装睷𧜏覇覊覦覩覧覼𨨥觧𧤤𧪽誜瞓釾誐𧩙竩𧬺𣾏䜓𧬸煼謌謟𥐰𥕥謿譌譍誩𤩺讐讛誯𡛟䘕衏貛𧵔𧶏貫㜥𧵓賖𧶘𧶽贒贃𡤐賛灜贑𤳉㻐起"
  ],
  [
    "9040",
    "趩𨀂𡀔𤦊㭼𨆼𧄌竧躭躶軃鋔輙輭𨍥𨐒辥錃𪊟𠩐辳䤪𨧞𨔽𣶻廸𣉢迹𪀔𨚼𨔁𢌥㦀𦻗逷𨔼𧪾遡𨕬𨘋邨𨜓郄𨛦邮都酧㫰醩釄粬𨤳𡺉鈎沟鉁鉢𥖹銹𨫆𣲛𨬌𥗛"
  ],
  [
    "90a1",
    "𠴱錬鍫𨫡𨯫炏嫃𨫢𨫥䥥鉄𨯬𨰹𨯿鍳鑛躼閅閦鐦閠濶䊹𢙺𨛘𡉼𣸮䧟氜陻隖䅬隣𦻕懚隶磵𨫠隽双䦡𦲸𠉴𦐐𩂯𩃥𤫑𡤕𣌊霱虂霶䨏䔽䖅𤫩灵孁霛靜𩇕靗孊𩇫靟鐥僐𣂷𣂼鞉鞟鞱鞾韀韒韠𥑬韮琜𩐳響韵𩐝𧥺䫑頴頳顋顦㬎𧅵㵑𠘰𤅜"
  ],
  [
    "9140",
    "𥜆飊颷飈飇䫿𦴧𡛓喰飡飦飬鍸餹𤨩䭲𩡗𩤅駵騌騻騐驘𥜥㛄𩂱𩯕髠髢𩬅髴䰎鬔鬭𨘀倴鬴𦦨㣃𣁽魐魀𩴾婅𡡣鮎𤉋鰂鯿鰌𩹨鷔𩾷𪆒𪆫𪃡𪄣𪇟鵾鶃𪄴鸎梈"
  ],
  [
    "91a1",
    "鷄𢅛𪆓𪈠𡤻𪈳鴹𪂹𪊴麐麕麞麢䴴麪麯𤍤黁㭠㧥㴝伲㞾𨰫鼂鼈䮖鐤𦶢鼗鼖鼹嚟嚊齅馸𩂋韲葿齢齩竜龎爖䮾𤥵𤦻煷𤧸𤍈𤩑玞𨯚𡣺禟𨥾𨸶鍩鏳𨩄鋬鎁鏋𨥬𤒹爗㻫睲穃烐𤑳𤏸煾𡟯炣𡢾𣖙㻇𡢅𥐯𡟸㜢𡛻𡠹㛡𡝴𡣑𥽋㜣𡛀坛𤨥𡏾𡊨"
  ],
  [
    "9240",
    "𡏆𡒶蔃𣚦蔃葕𤦔𧅥𣸱𥕜𣻻𧁒䓴𣛮𩦝𦼦柹㜳㰕㷧塬𡤢栐䁗𣜿𤃡𤂋𤄏𦰡哋嚞𦚱嚒𠿟𠮨𠸍鏆𨬓鎜仸儫㠙𤐶亼𠑥𠍿佋侊𥙑婨𠆫𠏋㦙𠌊𠐔㐵伩𠋀𨺳𠉵諚𠈌亘"
  ],
  [
    "92a1",
    "働儍侢伃𤨎𣺊佂倮偬傁俌俥偘僼兙兛兝兞湶𣖕𣸹𣺿浲𡢄𣺉冨凃𠗠䓝𠒣𠒒𠒑赺𨪜𠜎剙劤𠡳勡鍮䙺熌𤎌𠰠𤦬𡃤槑𠸝瑹㻞璙琔瑖玘䮎𤪼𤂍叐㖄爏𤃉喴𠍅响𠯆圝鉝雴鍦埝垍坿㘾壋媙𨩆𡛺𡝯𡜐娬妸銏婾嫏娒𥥆𡧳𡡡𤊕㛵洅瑃娡𥺃"
  ],
  [
    "9340",
    "媁𨯗𠐓鏠璌𡌃焅䥲鐈𨧻鎽㞠尞岞幞幈𡦖𡥼𣫮廍孏𡤃𡤄㜁𡢠㛝𡛾㛓脪𨩇𡶺𣑲𨦨弌弎𡤧𡞫婫𡜻孄蘔𧗽衠恾𢡠𢘫忛㺸𢖯𢖾𩂈𦽳懀𠀾𠁆𢘛憙憘恵𢲛𢴇𤛔𩅍"
  ],
  [
    "93a1",
    "摱𤙥𢭪㨩𢬢𣑐𩣪𢹸挷𪑛撶挱揑𤧣𢵧护𢲡搻敫楲㯴𣂎𣊭𤦉𣊫唍𣋠𡣙𩐿曎𣊉𣆳㫠䆐𥖄𨬢𥖏𡛼𥕛𥐥磮𣄃𡠪𣈴㑤𣈏𣆂𤋉暎𦴤晫䮓昰𧡰𡷫晣𣋒𣋡昞𥡲㣑𣠺𣞼㮙𣞢𣏾瓐㮖枏𤘪梶栞㯄檾㡣𣟕𤒇樳橒櫉欅𡤒攑梘橌㯗橺歗𣿀𣲚鎠鋲𨯪𨫋"
  ],
  [
    "9440",
    "銉𨀞𨧜鑧涥漋𤧬浧𣽿㶏渄𤀼娽渊塇洤硂焻𤌚𤉶烱牐犇犔𤞏𤜥兹𤪤𠗫瑺𣻸𣙟𤩊𤤗𥿡㼆㺱𤫟𨰣𣼵悧㻳瓌琼鎇琷䒟𦷪䕑疃㽣𤳙𤴆㽘畕癳𪗆㬙瑨𨫌𤦫𤦎㫻"
  ],
  [
    "94a1",
    "㷍𤩎㻿𤧅𤣳釺圲鍂𨫣𡡤僟𥈡𥇧睸𣈲眎眏睻𤚗𣞁㩞𤣰琸璛㺿𤪺𤫇䃈𤪖𦆮錇𥖁砞碍碈磒珐祙𧝁𥛣䄎禛蒖禥樭𣻺稺秴䅮𡛦䄲鈵秱𠵌𤦌𠊙𣶺𡝮㖗啫㕰㚪𠇔𠰍竢婙𢛵𥪯𥪜娍𠉛磰娪𥯆竾䇹籝籭䈑𥮳𥺼𥺦糍𤧹𡞰粎籼粮檲緜縇緓罎𦉡"
  ],
  [
    "9540",
    "𦅜𧭈綗𥺂䉪𦭵𠤖柖𠁎𣗏埄𦐒𦏸𤥢翝笧𠠬𥫩𥵃笌𥸎駦虅驣樜𣐿㧢𤧷𦖭騟𦖠蒀𧄧𦳑䓪脷䐂胆脉腂𦞴飃𦩂艢艥𦩑葓𦶧蘐𧈛媆䅿𡡀嬫𡢡嫤𡣘蚠蜨𣶏蠭𧐢娂"
  ],
  [
    "95a1",
    "衮佅袇袿裦襥襍𥚃襔𧞅𧞄𨯵𨯙𨮜𨧹㺭蒣䛵䛏㟲訽訜𩑈彍鈫𤊄旔焩烄𡡅鵭貟賩𧷜妚矃姰䍮㛔踪躧𤰉輰轊䋴汘澻𢌡䢛潹溋𡟚鯩㚵𤤯邻邗啱䤆醻鐄𨩋䁢𨫼鐧𨰝𨰻蓥訫閙閧閗閖𨴴瑅㻂𤣿𤩂𤏪㻧𣈥随𨻧𨹦𨹥㻌𤧭𤩸𣿮琒瑫㻼靁𩂰"
  ],
  [
    "9640",
    "桇䨝𩂓𥟟靝鍨𨦉𨰦𨬯𦎾銺嬑譩䤼珹𤈛鞛靱餸𠼦巁𨯅𤪲頟𩓚鋶𩗗釥䓀𨭐𤩧𨭤飜𨩅㼀鈪䤥萔餻饍𧬆㷽馛䭯馪驜𨭥𥣈檏騡嫾騯𩣱䮐𩥈馼䮽䮗鍽塲𡌂堢𤦸"
  ],
  [
    "96a1",
    "𡓨硄𢜟𣶸棅㵽鑘㤧慐𢞁𢥫愇鱏鱓鱻鰵鰐魿鯏𩸭鮟𪇵𪃾鴡䲮𤄄鸘䲰鴌𪆴𪃭𪃳𩤯鶥蒽𦸒𦿟𦮂藼䔳𦶤𦺄𦷰萠藮𦸀𣟗𦁤秢𣖜𣙀䤭𤧞㵢鏛銾鍈𠊿碹鉷鑍俤㑀遤𥕝砽硔碶硋𡝗𣇉𤥁㚚佲濚濙瀞瀞吔𤆵垻壳垊鴖埗焴㒯𤆬燫𦱀𤾗嬨𡞵𨩉"
  ],
  [
    "9740",
    "愌嫎娋䊼𤒈㜬䭻𨧼鎻鎸𡣖𠼝葲𦳀𡐓𤋺𢰦𤏁妔𣶷𦝁綨𦅛𦂤𤦹𤦋𨧺鋥珢㻩璴𨭣𡢟㻡𤪳櫘珳珻㻖𤨾𤪔𡟙𤩦𠎧𡐤𤧥瑈𤤖炥𤥶銄珦鍟𠓾錱𨫎𨨖鎆𨯧𥗕䤵𨪂煫"
  ],
  [
    "97a1",
    "𤥃𠳿嚤𠘚𠯫𠲸唂秄𡟺緾𡛂𤩐𡡒䔮鐁㜊𨫀𤦭妰𡢿𡢃𧒄媡㛢𣵛㚰鉟婹𨪁𡡢鍴㳍𠪴䪖㦊僴㵩㵌𡎜煵䋻𨈘渏𩃤䓫浗𧹏灧沯㳖𣿭𣸭渂漌㵯𠏵畑㚼㓈䚀㻚䡱姄鉮䤾轁𨰜𦯀堒埈㛖𡑒烾𤍢𤩱𢿣𡊰𢎽梹楧𡎘𣓥𧯴𣛟𨪃𣟖𣏺𤲟樚𣚭𦲷萾䓟䓎"
  ],
  [
    "9840",
    "𦴦𦵑𦲂𦿞漗𧄉茽𡜺菭𦲀𧁓𡟛妉媂𡞳婡婱𡤅𤇼㜭姯𡜼㛇熎鎐暚𤊥婮娫𤊓樫𣻹𧜶𤑛𤋊焝𤉙𨧡侰𦴨峂𤓎𧹍𤎽樌𤉖𡌄炦焳𤏩㶥泟勇𤩏繥姫崯㷳彜𤩝𡟟綤萦"
  ],
  [
    "98a1",
    "咅𣫺𣌀𠈔坾𠣕𠘙㿥𡾞𪊶瀃𩅛嵰玏糓𨩙𩐠俈翧狍猐𧫴猸猹𥛶獁獈㺩𧬘遬燵𤣲珡臶㻊県㻑沢国琙琞琟㻢㻰㻴㻺瓓㼎㽓畂畭畲疍㽼痈痜㿀癍㿗癴㿜発𤽜熈嘣覀塩䀝睃䀹条䁅㗛瞘䁪䁯属瞾矋売砘点砜䂨砹硇硑硦葈𥔵礳栃礲䄃"
  ],
  [
    "9940",
    "䄉禑禙辻稆込䅧窑䆲窼艹䇄竏竛䇏両筢筬筻簒簛䉠䉺类粜䊌粸䊔糭输烀𠳏総緔緐緽羮羴犟䎗耠耥笹耮耱联㷌垴炠肷胩䏭脌猪脎脒畠脔䐁㬹腖腙腚"
  ],
  [
    "99a1",
    "䐓堺腼膄䐥膓䐭膥埯臁臤艔䒏芦艶苊苘苿䒰荗险榊萅烵葤惣蒈䔄蒾蓡蓸蔐蔸蕒䔻蕯蕰藠䕷虲蚒蚲蛯际螋䘆䘗袮裿褤襇覑𧥧訩訸誔誴豑賔賲贜䞘塟跃䟭仮踺嗘坔蹱嗵躰䠷軎転軤軭軲辷迁迊迌逳駄䢭飠鈓䤞鈨鉘鉫銱銮銿"
  ],
  [
    "9a40",
    "鋣鋫鋳鋴鋽鍃鎄鎭䥅䥑麿鐗匁鐝鐭鐾䥪鑔鑹锭関䦧间阳䧥枠䨤靀䨵鞲韂噔䫤惨颹䬙飱塄餎餙冴餜餷饂饝饢䭰駅䮝騼鬏窃魩鮁鯝鯱鯴䱭鰠㝯𡯂鵉鰺"
  ],
  [
    "9aa1",
    "黾噐鶓鶽鷀鷼银辶鹻麬麱麽黆铜黢黱黸竈齄𠂔𠊷𠎠椚铃妬𠓗塀铁㞹𠗕𠘕𠙶𡚺块煳𠫂𠫍𠮿呪吆𠯋咞𠯻𠰻𠱓𠱥𠱼惧𠲍噺𠲵𠳝𠳭𠵯𠶲𠷈楕鰯螥𠸄𠸎𠻗𠾐𠼭𠹳尠𠾼帋𡁜𡁏𡁶朞𡁻𡂈𡂖㙇𡂿𡃓𡄯𡄻卤蒭𡋣𡍵𡌶讁𡕷𡘙𡟃𡟇乸炻𡠭𡥪"
  ],
  [
    "9b40",
    "𡨭𡩅𡰪𡱰𡲬𡻈拃𡻕𡼕熘桕𢁅槩㛈𢉼𢏗𢏺𢜪𢡱𢥏苽𢥧𢦓𢫕覥𢫨辠𢬎鞸𢬿顇骽𢱌"
  ],
  [
    "9b62",
    "𢲈𢲷𥯨𢴈𢴒𢶷𢶕𢹂𢽴𢿌𣀳𣁦𣌟𣏞徱晈暿𧩹𣕧𣗳爁𤦺矗𣘚𣜖纇𠍆墵朎"
  ],
  [
    "9ba1",
    "椘𣪧𧙗𥿢𣸑𣺹𧗾𢂚䣐䪸𤄙𨪚𤋮𤌍𤀻𤌴𤎖𤩅𠗊凒𠘑妟𡺨㮾𣳿𤐄𤓖垈𤙴㦛𤜯𨗨𩧉㝢𢇃譞𨭎駖𤠒𤣻𤨕爉𤫀𠱸奥𤺥𤾆𠝹軚𥀬劏圿煱𥊙𥐙𣽊𤪧喼𥑆𥑮𦭒釔㑳𥔿𧘲𥕞䜘𥕢𥕦𥟇𤤿𥡝偦㓻𣏌惞𥤃䝼𨥈𥪮𥮉𥰆𡶐垡煑澶𦄂𧰒遖𦆲𤾚譢𦐂𦑊"
  ],
  [
    "9c40",
    "嵛𦯷輶𦒄𡤜諪𤧶𦒈𣿯𦔒䯀𦖿𦚵𢜛鑥𥟡憕娧晉侻嚹𤔡𦛼乪𤤴陖涏𦲽㘘襷𦞙𦡮𦐑𦡞營𦣇筂𩃀𠨑𦤦鄄𦤹穅鷰𦧺騦𦨭㙟𦑩𠀡禃𦨴𦭛崬𣔙菏𦮝䛐𦲤画补𦶮墶"
  ],
  [
    "9ca1",
    "㜜𢖍𧁋𧇍㱔𧊀𧊅銁𢅺𧊋錰𧋦𤧐氹钟𧑐𠻸蠧裵𢤦𨑳𡞱溸𤨪𡠠㦤㚹尐秣䔿暶𩲭𩢤襃𧟌𧡘囖䃟𡘊㦡𣜯𨃨𡏅熭荦𧧝𩆨婧䲷𧂯𨦫𧧽𧨊𧬋𧵦𤅺筃祾𨀉澵𪋟樃𨌘厢𦸇鎿栶靝𨅯𨀣𦦵𡏭𣈯𨁈嶅𨰰𨂃圕頣𨥉嶫𤦈斾槕叒𤪥𣾁㰑朶𨂐𨃴𨄮𡾡𨅏"
  ],
  [
    "9d40",
    "𨆉𨆯𨈚𨌆𨌯𨎊㗊𨑨𨚪䣺揦𨥖砈鉕𨦸䏲𨧧䏟𨧨𨭆𨯔姸𨰉輋𨿅𩃬筑𩄐𩄼㷷𩅞𤫊运犏嚋𩓧𩗩𩖰𩖸𩜲𩣑𩥉𩥪𩧃𩨨𩬎𩵚𩶛纟𩻸𩼣䲤镇𪊓熢𪋿䶑递𪗋䶜𠲜达嗁"
  ],
  [
    "9da1",
    "辺𢒰边𤪓䔉繿潖檱仪㓤𨬬𧢝㜺躀𡟵𨀤𨭬𨮙𧨾𦚯㷫𧙕𣲷𥘵𥥖亚𥺁𦉘嚿𠹭踎孭𣺈𤲞揞拐𡟶𡡻攰嘭𥱊吚𥌑㷆𩶘䱽嘢嘞罉𥻘奵𣵀蝰东𠿪𠵉𣚺脗鵞贘瘻鱅癎瞹鍅吲腈苷嘥脲萘肽嗪祢噃吖𠺝㗎嘅嗱曱𨋢㘭甴嗰喺咗啲𠱁𠲖廐𥅈𠹶𢱢"
  ],
  [
    "9e40",
    "𠺢麫絚嗞𡁵抝靭咔賍燶酶揼掹揾啩𢭃鱲𢺳冚㓟𠶧冧呍唞唓癦踭𦢊疱肶蠄螆裇膶萜𡃁䓬猄𤜆宐茋𦢓噻𢛴𧴯𤆣𧵳𦻐𧊶酰𡇙鈈𣳼𪚩𠺬𠻹牦𡲢䝎𤿂𧿹𠿫䃺"
  ],
  [
    "9ea1",
    "鱝攟𢶠䣳𤟠𩵼𠿬𠸊恢𧖣𠿭"
  ],
  [
    "9ead",
    "𦁈𡆇熣纎鵐业丄㕷嬍沲卧㚬㧜卽㚥𤘘墚𤭮舭呋垪𥪕𠥹"
  ],
  [
    "9ec5",
    "㩒𢑥獴𩺬䴉鯭𣳾𩼰䱛𤾩𩖞𩿞葜𣶶𧊲𦞳𣜠挮紥𣻷𣸬㨪逈勌㹴㙺䗩𠒎癀嫰𠺶硺𧼮墧䂿噼鮋嵴癔𪐴麅䳡痹㟻愙𣃚𤏲"
  ],
  [
    "9ef5",
    "噝𡊩垧𤥣𩸆刴𧂮㖭汊鵼"
  ],
  [
    "9f40",
    "籖鬹埞𡝬屓擓𩓐𦌵𧅤蚭𠴨𦴢𤫢𠵱"
  ],
  [
    "9f4f",
    "凾𡼏嶎霃𡷑麁遌笟鬂峑箣扨挵髿篏鬪籾鬮籂粆鰕篼鬉鼗鰛𤤾齚啳寃俽麘俲剠㸆勑坧偖妷帒韈鶫轜呩鞴饀鞺匬愰"
  ],
  [
    "9fa1",
    "椬叚鰊鴂䰻陁榀傦畆𡝭駚剳"
  ],
  [
    "9fae",
    "酙隁酜"
  ],
  [
    "9fb2",
    "酑𨺗捿𦴣櫊嘑醎畺抅𠏼獏籰𥰡𣳽"
  ],
  [
    "9fc1",
    "𤤙盖鮝个𠳔莾衂"
  ],
  [
    "9fc9",
    "届槀僭坺刟巵从氱𠇲伹咜哚劚趂㗾弌㗳"
  ],
  [
    "9fdb",
    "歒酼龥鮗頮颴骺麨麄煺笔"
  ],
  [
    "9fe7",
    "毺蠘罸"
  ],
  [
    "9feb",
    "嘠𪙊蹷齓"
  ],
  [
    "9ff0",
    "跔蹏鸜踁抂𨍽踨蹵竓𤩷稾磘泪詧瘇"
  ],
  [
    "a040",
    "𨩚鼦泎蟖痃𪊲硓咢贌狢獱謭猂瓱賫𤪻蘯徺袠䒷"
  ],
  [
    "a055",
    "𡠻𦸅"
  ],
  [
    "a058",
    "詾𢔛"
  ],
  [
    "a05b",
    "惽癧髗鵄鍮鮏蟵"
  ],
  [
    "a063",
    "蠏賷猬霡鮰㗖犲䰇籑饊𦅙慙䰄麖慽"
  ],
  [
    "a073",
    "坟慯抦戹拎㩜懢厪𣏵捤栂㗒"
  ],
  [
    "a0a1",
    "嵗𨯂迚𨸹"
  ],
  [
    "a0a6",
    "僙𡵆礆匲阸𠼻䁥"
  ],
  [
    "a0ae",
    "矾"
  ],
  [
    "a0b0",
    "糂𥼚糚稭聦聣絍甅瓲覔舚朌聢𧒆聛瓰脃眤覉𦟌畓𦻑螩蟎臈螌詉貭譃眫瓸蓚㘵榲趦"
  ],
  [
    "a0d4",
    "覩瑨涹蟁𤀑瓧㷛煶悤憜㳑煢恷"
  ],
  [
    "a0e2",
    "罱𨬭牐惩䭾删㰘𣳇𥻗𧙖𥔱𡥄𡋾𩤃𦷜𧂭峁𦆭𨨏𣙷𠃮𦡆𤼎䕢嬟𦍌齐麦𦉫"
  ],
  [
    "a3c0",
    "␀",
    31,
    "␡"
  ],
  [
    "c6a1",
    "①",
    9,
    "⑴",
    9,
    "ⅰ",
    9,
    "丶丿亅亠冂冖冫勹匸卩厶夊宀巛⼳广廴彐彡攴无疒癶辵隶¨ˆヽヾゝゞ〃仝々〆〇ー［］✽ぁ",
    23
  ],
  [
    "c740",
    "す",
    58,
    "ァアィイ"
  ],
  [
    "c7a1",
    "ゥ",
    81,
    "А",
    5,
    "ЁЖ",
    4
  ],
  [
    "c840",
    "Л",
    26,
    "ёж",
    25,
    "⇧↸↹㇏𠃌乚𠂊刂䒑"
  ],
  [
    "c8a1",
    "龰冈龱𧘇"
  ],
  [
    "c8cd",
    "￢￤＇＂㈱№℡゛゜⺀⺄⺆⺇⺈⺊⺌⺍⺕⺜⺝⺥⺧⺪⺬⺮⺶⺼⺾⻆⻊⻌⻍⻏⻖⻗⻞⻣"
  ],
  [
    "c8f5",
    "ʃɐɛɔɵœøŋʊɪ"
  ],
  [
    "f9fe",
    "￭"
  ],
  [
    "fa40",
    "𠕇鋛𠗟𣿅蕌䊵珯况㙉𤥂𨧤鍄𡧛苮𣳈砼杄拟𤤳𨦪𠊠𦮳𡌅侫𢓭倈𦴩𧪄𣘀𤪱𢔓倩𠍾徤𠎀𠍇滛𠐟偽儁㑺儎顬㝃萖𤦤𠒇兠𣎴兪𠯿𢃼𠋥𢔰𠖎𣈳𡦃宂蝽𠖳𣲙冲冸"
  ],
  [
    "faa1",
    "鴴凉减凑㳜凓𤪦决凢卂凭菍椾𣜭彻刋刦刼劵剗劔効勅簕蕂勠蘍𦬓包𨫞啉滙𣾀𠥔𣿬匳卄𠯢泋𡜦栛珕恊㺪㣌𡛨燝䒢卭却𨚫卾卿𡖖𡘓矦厓𨪛厠厫厮玧𥝲㽙玜叁叅汉义埾叙㪫𠮏叠𣿫𢶣叶𠱷吓灹唫晗浛呭𦭓𠵴啝咏咤䞦𡜍𠻝㶴𠵍"
  ],
  [
    "fb40",
    "𨦼𢚘啇䳭启琗喆喩嘅𡣗𤀺䕒𤐵暳𡂴嘷曍𣊊暤暭噍噏磱囱鞇叾圀囯园𨭦㘣𡉏坆𤆥汮炋坂㚱𦱾埦𡐖堃𡑔𤍣堦𤯵塜墪㕡壠壜𡈼壻寿坃𪅐𤉸鏓㖡够梦㛃湙"
  ],
  [
    "fba1",
    "𡘾娤啓𡚒蔅姉𠵎𦲁𦴪𡟜姙𡟻𡞲𦶦浱𡠨𡛕姹𦹅媫婣㛦𤦩婷㜈媖瑥嫓𦾡𢕔㶅𡤑㜲𡚸広勐孶斈孼𧨎䀄䡝𠈄寕慠𡨴𥧌𠖥寳宝䴐尅𡭄尓珎尔𡲥𦬨屉䣝岅峩峯嶋𡷹𡸷崐崘嵆𡺤岺巗苼㠭𤤁𢁉𢅳芇㠶㯂帮檊幵幺𤒼𠳓厦亷廐厨𡝱帉廴𨒂"
  ],
  [
    "fc40",
    "廹廻㢠廼栾鐛弍𠇁弢㫞䢮𡌺强𦢈𢏐彘𢑱彣鞽𦹮彲鍀𨨶徧嶶㵟𥉐𡽪𧃸𢙨釖𠊞𨨩怱暅𡡷㥣㷇㘹垐𢞴祱㹀悞悤悳𤦂𤦏𧩓璤僡媠慤萤慂慈𦻒憁凴𠙖憇宪𣾷"
  ],
  [
    "fca1",
    "𢡟懓𨮝𩥝懐㤲𢦀𢣁怣慜攞掋𠄘担𡝰拕𢸍捬𤧟㨗搸揸𡎎𡟼撐澊𢸶頔𤂌𥜝擡擥鑻㩦携㩗敍漖𤨨𤨣斅敭敟𣁾斵𤥀䬷旑䃘𡠩无旣忟𣐀昘𣇷𣇸晄𣆤𣆥晋𠹵晧𥇦晳晴𡸽𣈱𨗴𣇈𥌓矅𢣷馤朂𤎜𤨡㬫槺𣟂杞杧杢𤇍𩃭柗䓩栢湐鈼栁𣏦𦶠桝"
  ],
  [
    "fd40",
    "𣑯槡樋𨫟楳棃𣗍椁椀㴲㨁𣘼㮀枬楡𨩊䋼椶榘㮡𠏉荣傐槹𣙙𢄪橅𣜃檝㯳枱櫈𩆜㰍欝𠤣惞欵歴𢟍溵𣫛𠎵𡥘㝀吡𣭚毡𣻼毜氷𢒋𤣱𦭑汚舦汹𣶼䓅𣶽𤆤𤤌𤤀"
  ],
  [
    "fda1",
    "𣳉㛥㳫𠴲鮃𣇹𢒑羏样𦴥𦶡𦷫涖浜湼漄𤥿𤂅𦹲蔳𦽴凇沜渝萮𨬡港𣸯瑓𣾂秌湏媑𣁋濸㜍澝𣸰滺𡒗𤀽䕕鏰潄潜㵎潴𩅰㴻澟𤅄濓𤂑𤅕𤀹𣿰𣾴𤄿凟𤅖𤅗𤅀𦇝灋灾炧炁烌烕烖烟䄄㷨熴熖𤉷焫煅媈煊煮岜𤍥煏鍢𤋁焬𤑚𤨧𤨢熺𨯨炽爎"
  ],
  [
    "fe40",
    "鑂爕夑鑃爤鍁𥘅爮牀𤥴梽牕牗㹕𣁄栍漽犂猪猫𤠣𨠫䣭𨠄猨献珏玪𠰺𦨮珉瑉𤇢𡛧𤨤昣㛅𤦷𤦍𤧻珷琕椃𤨦琹𠗃㻗瑜𢢭瑠𨺲瑇珤瑶莹瑬㜰瑴鏱樬璂䥓𤪌"
  ],
  [
    "fea1",
    "𤅟𤩹𨮏孆𨰃𡢞瓈𡦈甎瓩甞𨻙𡩋寗𨺬鎅畍畊畧畮𤾂㼄𤴓疎瑝疞疴瘂瘬癑癏癯癶𦏵皐臯㟸𦤑𦤎皡皥皷盌𦾟葢𥂝𥅽𡸜眞眦着撯𥈠睘𣊬瞯𨥤𨥨𡛁矴砉𡍶𤨒棊碯磇磓隥礮𥗠磗礴碱𧘌辸袄𨬫𦂃𢘜禆褀椂禀𥡗禝𧬹礼禩渪𧄦㺨秆𩄍秔"
  ]
];
var O0, Xa;
function _E() {
  return Xa || (Xa = 1, O0 = {
    // == Japanese/ShiftJIS ====================================================
    // All japanese encodings are based on JIS X set of standards:
    // JIS X 0201 - Single-byte encoding of ASCII + ¥ + Kana chars at 0xA1-0xDF.
    // JIS X 0208 - Main set of 6879 characters, placed in 94x94 plane, to be encoded by 2 bytes. 
    //              Has several variations in 1978, 1983, 1990 and 1997.
    // JIS X 0212 - Supplementary plane of 6067 chars in 94x94 plane. 1990. Effectively dead.
    // JIS X 0213 - Extension and modern replacement of 0208 and 0212. Total chars: 11233.
    //              2 planes, first is superset of 0208, second - revised 0212.
    //              Introduced in 2000, revised 2004. Some characters are in Unicode Plane 2 (0x2xxxx)
    // Byte encodings are:
    //  * Shift_JIS: Compatible with 0201, uses not defined chars in top half as lead bytes for double-byte
    //               encoding of 0208. Lead byte ranges: 0x81-0x9F, 0xE0-0xEF; Trail byte ranges: 0x40-0x7E, 0x80-0x9E, 0x9F-0xFC.
    //               Windows CP932 is a superset of Shift_JIS. Some companies added more chars, notably KDDI.
    //  * EUC-JP:    Up to 3 bytes per character. Used mostly on *nixes.
    //               0x00-0x7F       - lower part of 0201
    //               0x8E, 0xA1-0xDF - upper part of 0201
    //               (0xA1-0xFE)x2   - 0208 plane (94x94).
    //               0x8F, (0xA1-0xFE)x2 - 0212 plane (94x94).
    //  * JIS X 208: 7-bit, direct encoding of 0208. Byte ranges: 0x21-0x7E (94 values). Uncommon.
    //               Used as-is in ISO2022 family.
    //  * ISO2022-JP: Stateful encoding, with escape sequences to switch between ASCII, 
    //                0201-1976 Roman, 0208-1978, 0208-1983.
    //  * ISO2022-JP-1: Adds esc seq for 0212-1990.
    //  * ISO2022-JP-2: Adds esc seq for GB2313-1980, KSX1001-1992, ISO8859-1, ISO8859-7.
    //  * ISO2022-JP-3: Adds esc seq for 0201-1976 Kana set, 0213-2000 Planes 1, 2.
    //  * ISO2022-JP-2004: Adds 0213-2004 Plane 1.
    //
    // After JIS X 0213 appeared, Shift_JIS-2004, EUC-JISX0213 and ISO2022-JP-2004 followed, with just changing the planes.
    //
    // Overall, it seems that it's a mess :( http://www8.plala.or.jp/tkubota1/unicode-symbols-map2.html
    shiftjis: {
      type: "_dbcs",
      table: function() {
        return lE;
      },
      encodeAdd: { "¥": 92, "‾": 126 },
      encodeSkipVals: [{ from: 60736, to: 63808 }]
    },
    csshiftjis: "shiftjis",
    mskanji: "shiftjis",
    sjis: "shiftjis",
    windows31j: "shiftjis",
    ms31j: "shiftjis",
    xsjis: "shiftjis",
    windows932: "shiftjis",
    ms932: "shiftjis",
    932: "shiftjis",
    cp932: "shiftjis",
    eucjp: {
      type: "_dbcs",
      table: function() {
        return cE;
      },
      encodeAdd: { "¥": 92, "‾": 126 }
    },
    // TODO: KDDI extension to Shift_JIS
    // TODO: IBM CCSID 942 = CP932, but F0-F9 custom chars and other char changes.
    // TODO: IBM CCSID 943 = Shift_JIS = CP932 with original Shift_JIS lower 128 chars.
    // == Chinese/GBK ==========================================================
    // http://en.wikipedia.org/wiki/GBK
    // We mostly implement W3C recommendation: https://www.w3.org/TR/encoding/#gbk-encoder
    // Oldest GB2312 (1981, ~7600 chars) is a subset of CP936
    gb2312: "cp936",
    gb231280: "cp936",
    gb23121980: "cp936",
    csgb2312: "cp936",
    csiso58gb231280: "cp936",
    euccn: "cp936",
    // Microsoft's CP936 is a subset and approximation of GBK.
    windows936: "cp936",
    ms936: "cp936",
    936: "cp936",
    cp936: {
      type: "_dbcs",
      table: function() {
        return S0;
      }
    },
    // GBK (~22000 chars) is an extension of CP936 that added user-mapped chars and some other.
    gbk: {
      type: "_dbcs",
      table: function() {
        return S0.concat(Va);
      }
    },
    xgbk: "gbk",
    isoir58: "gbk",
    // GB18030 is an algorithmic extension of GBK.
    // Main source: https://www.w3.org/TR/encoding/#gbk-encoder
    // http://icu-project.org/docs/papers/gb18030.html
    // http://source.icu-project.org/repos/icu/data/trunk/charset/data/xml/gb-18030-2000.xml
    // http://www.khngai.com/chinese/charmap/tblgbk.php?page=0
    gb18030: {
      type: "_dbcs",
      table: function() {
        return S0.concat(Va);
      },
      gb18030: function() {
        return dE;
      },
      encodeSkipVals: [128],
      encodeAdd: { "€": 41699 }
    },
    chinese: "gb18030",
    // == Korean ===============================================================
    // EUC-KR, KS_C_5601 and KS X 1001 are exactly the same.
    windows949: "cp949",
    ms949: "cp949",
    949: "cp949",
    cp949: {
      type: "_dbcs",
      table: function() {
        return pE;
      }
    },
    cseuckr: "cp949",
    csksc56011987: "cp949",
    euckr: "cp949",
    isoir149: "cp949",
    korean: "cp949",
    ksc56011987: "cp949",
    ksc56011989: "cp949",
    ksc5601: "cp949",
    // == Big5/Taiwan/Hong Kong ================================================
    // There are lots of tables for Big5 and cp950. Please see the following links for history:
    // http://moztw.org/docs/big5/  http://www.haible.de/bruno/charsets/conversion-tables/Big5.html
    // Variations, in roughly number of defined chars:
    //  * Windows CP 950: Microsoft variant of Big5. Canonical: http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP950.TXT
    //  * Windows CP 951: Microsoft variant of Big5-HKSCS-2001. Seems to be never public. http://me.abelcheung.org/articles/research/what-is-cp951/
    //  * Big5-2003 (Taiwan standard) almost superset of cp950.
    //  * Unicode-at-on (UAO) / Mozilla 1.8. Falling out of use on the Web. Not supported by other browsers.
    //  * Big5-HKSCS (-2001, -2004, -2008). Hong Kong standard. 
    //    many unicode code points moved from PUA to Supplementary plane (U+2XXXX) over the years.
    //    Plus, it has 4 combining sequences.
    //    Seems that Mozilla refused to support it for 10 yrs. https://bugzilla.mozilla.org/show_bug.cgi?id=162431 https://bugzilla.mozilla.org/show_bug.cgi?id=310299
    //    because big5-hkscs is the only encoding to include astral characters in non-algorithmic way.
    //    Implementations are not consistent within browsers; sometimes labeled as just big5.
    //    MS Internet Explorer switches from big5 to big5-hkscs when a patch applied.
    //    Great discussion & recap of what's going on https://bugzilla.mozilla.org/show_bug.cgi?id=912470#c31
    //    In the encoder, it might make sense to support encoding old PUA mappings to Big5 bytes seq-s.
    //    Official spec: http://www.ogcio.gov.hk/en/business/tech_promotion/ccli/terms/doc/2003cmp_2008.txt
    //                   http://www.ogcio.gov.hk/tc/business/tech_promotion/ccli/terms/doc/hkscs-2008-big5-iso.txt
    // 
    // Current understanding of how to deal with Big5(-HKSCS) is in the Encoding Standard, http://encoding.spec.whatwg.org/#big5-encoder
    // Unicode mapping (http://www.unicode.org/Public/MAPPINGS/OBSOLETE/EASTASIA/OTHER/BIG5.TXT) is said to be wrong.
    windows950: "cp950",
    ms950: "cp950",
    950: "cp950",
    cp950: {
      type: "_dbcs",
      table: function() {
        return Ka;
      }
    },
    // Big5 has many variations and is an extension of cp950. We use Encoding Standard's as a consensus.
    big5: "big5hkscs",
    big5hkscs: {
      type: "_dbcs",
      table: function() {
        return Ka.concat(mE);
      },
      encodeSkipVals: [
        // Although Encoding Standard says we should avoid encoding to HKSCS area (See Step 1 of
        // https://encoding.spec.whatwg.org/#index-big5-pointer), we still do it to increase compatibility with ICU.
        // But if a single unicode point can be encoded both as HKSCS and regular Big5, we prefer the latter.
        36457,
        36463,
        36478,
        36523,
        36532,
        36557,
        36560,
        36695,
        36713,
        36718,
        36811,
        36862,
        36973,
        36986,
        37060,
        37084,
        37105,
        37311,
        37551,
        37552,
        37553,
        37554,
        37585,
        37959,
        38090,
        38361,
        38652,
        39285,
        39798,
        39800,
        39803,
        39878,
        39902,
        39916,
        39926,
        40002,
        40019,
        40034,
        40040,
        40043,
        40055,
        40124,
        40125,
        40144,
        40279,
        40282,
        40388,
        40431,
        40443,
        40617,
        40687,
        40701,
        40800,
        40907,
        41079,
        41180,
        41183,
        36812,
        37576,
        38468,
        38637,
        // Step 2 of https://encoding.spec.whatwg.org/#index-big5-pointer: Use last pointer for U+2550, U+255E, U+2561, U+256A, U+5341, or U+5345
        41636,
        41637,
        41639,
        41638,
        41676,
        41678
      ]
    },
    cnbig5: "big5hkscs",
    csbig5: "big5hkscs",
    xxbig5: "big5hkscs"
  }), O0;
}
var Ya;
function xE() {
  return Ya || (Ya = 1, function(e) {
    for (var t = [
      tE(),
      rE(),
      nE(),
      iE(),
      oE(),
      sE(),
      aE(),
      fE(),
      _E()
    ], r = 0; r < t.length; r++) {
      var n = t[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
  }(y0)), y0;
}
var I0, za;
function EE() {
  if (za) return I0;
  za = 1;
  var e = zt.Buffer;
  return I0 = function(t) {
    var r = t.Transform;
    function n(o, s) {
      this.conv = o, s = s || {}, s.decodeStrings = !1, r.call(this, s);
    }
    n.prototype = Object.create(r.prototype, {
      constructor: { value: n }
    }), n.prototype._transform = function(o, s, a) {
      if (typeof o != "string")
        return a(new Error("Iconv encoding stream needs strings as its input."));
      try {
        var f = this.conv.write(o);
        f && f.length && this.push(f), a();
      } catch (c) {
        a(c);
      }
    }, n.prototype._flush = function(o) {
      try {
        var s = this.conv.end();
        s && s.length && this.push(s), o();
      } catch (a) {
        o(a);
      }
    }, n.prototype.collect = function(o) {
      var s = [];
      return this.on("error", o), this.on("data", function(a) {
        s.push(a);
      }), this.on("end", function() {
        o(null, e.concat(s));
      }), this;
    };
    function i(o, s) {
      this.conv = o, s = s || {}, s.encoding = this.encoding = "utf8", r.call(this, s);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: { value: i }
    }), i.prototype._transform = function(o, s, a) {
      if (!e.isBuffer(o) && !(o instanceof Uint8Array))
        return a(new Error("Iconv decoding stream needs buffers as its input."));
      try {
        var f = this.conv.write(o);
        f && f.length && this.push(f, this.encoding), a();
      } catch (c) {
        a(c);
      }
    }, i.prototype._flush = function(o) {
      try {
        var s = this.conv.end();
        s && s.length && this.push(s, this.encoding), o();
      } catch (a) {
        o(a);
      }
    }, i.prototype.collect = function(o) {
      var s = "";
      return this.on("error", o), this.on("data", function(a) {
        s += a;
      }), this.on("end", function() {
        o(null, s);
      }), this;
    }, {
      IconvLiteEncoderStream: n,
      IconvLiteDecoderStream: i
    };
  }, I0;
}
(function(e) {
  var t = zt.Buffer, r = xo, n = e.exports;
  n.encodings = null, n.defaultCharUnicode = "�", n.defaultCharSingleByte = "?", n.encode = function(s, a, f) {
    s = "" + (s || "");
    var c = n.getEncoder(a, f), l = c.write(s), u = c.end();
    return u && u.length > 0 ? t.concat([l, u]) : l;
  }, n.decode = function(s, a, f) {
    typeof s == "string" && (n.skipDecodeWarning || (console.error("Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding"), n.skipDecodeWarning = !0), s = t.from("" + (s || ""), "binary"));
    var c = n.getDecoder(a, f), l = c.write(s), u = c.end();
    return u ? l + u : l;
  }, n.encodingExists = function(s) {
    try {
      return n.getCodec(s), !0;
    } catch {
      return !1;
    }
  }, n.toEncoding = n.encode, n.fromEncoding = n.decode, n._codecDataCache = {}, n.getCodec = function(s) {
    n.encodings || (n.encodings = xE());
    for (var a = n._canonicalizeEncoding(s), f = {}; ; ) {
      var c = n._codecDataCache[a];
      if (c)
        return c;
      var l = n.encodings[a];
      switch (typeof l) {
        case "string":
          a = l;
          break;
        case "object":
          for (var u in l)
            f[u] = l[u];
          f.encodingName || (f.encodingName = a), a = l.type;
          break;
        case "function":
          return f.encodingName || (f.encodingName = a), c = new l(f, n), n._codecDataCache[f.encodingName] = c, c;
        default:
          throw new Error("Encoding not recognized: '" + s + "' (searched as: '" + a + "')");
      }
    }
  }, n._canonicalizeEncoding = function(o) {
    return ("" + o).toLowerCase().replace(/:\d{4}$|[^0-9a-z]/g, "");
  }, n.getEncoder = function(s, a) {
    var f = n.getCodec(s), c = new f.encoder(a, f);
    return f.bomAware && a && a.addBOM && (c = new r.PrependBOM(c, a)), c;
  }, n.getDecoder = function(s, a) {
    var f = n.getCodec(s), c = new f.decoder(a, f);
    return f.bomAware && !(a && a.stripBOM === !1) && (c = new r.StripBOM(c, a)), c;
  }, n.enableStreamingAPI = function(s) {
    if (!n.supportsStreams) {
      var a = EE()(s);
      n.IconvLiteEncoderStream = a.IconvLiteEncoderStream, n.IconvLiteDecoderStream = a.IconvLiteDecoderStream, n.encodeStream = function(c, l) {
        return new n.IconvLiteEncoderStream(n.getEncoder(c, l), l);
      }, n.decodeStream = function(c, l) {
        return new n.IconvLiteDecoderStream(n.getDecoder(c, l), l);
      }, n.supportsStreams = !0;
    }
  };
  var i;
  try {
    i = require("stream");
  } catch {
  }
  i && i.Transform ? n.enableStreamingAPI(i) : n.encodeStream = n.decodeStream = function() {
    throw new Error("iconv-lite Streaming API is not enabled. Use iconv.enableStreamingAPI(require('stream')); to enable it.");
  };
})(Wl);
var gE = Wl.exports, R0, Qa;
function Co() {
  if (Qa) return R0;
  Qa = 1;
  class e {
    getPrinterName() {
      throw new Error("'getPrinterName' function not implemented.");
    }
    async isPrinterConnected() {
      throw new Error("'isPrinterConnected' function not implemented.");
    }
    async execute() {
      throw new Error("'execute' function not implemented.");
    }
  }
  return R0 = e, R0;
}
var B0, Za;
function CE() {
  if (Za) return B0;
  Za = 1;
  const e = i5, t = Co();
  class r extends t {
    constructor(i, o, s) {
      super(), s = s || {}, this.debug = s.debug || !1, this.timeout = s.timeout || 3e3, this.host = i, this.port = o || 9100;
    }
    async isPrinterConnected() {
      return new Promise((i) => {
        const o = e.connect(
          {
            host: this.host,
            port: this.port,
            timeout: this.timeout
          },
          () => {
            i(!0), o.destroy();
          }
        );
        o.on("error", (s) => {
          this.debug && console.error("Printer network connection error:", s), i(!1), o.destroy();
        }), o.on("timeout", () => {
          this.debug && console.error("Printer network connection timeout."), i(!1), o.destroy();
        });
      });
    }
    async execute(i, o = { waitForResponse: !1 }) {
      return new Promise((s, a) => {
        const f = `${this.host}:${this.port}`, c = e.connect(
          {
            host: this.host,
            port: this.port,
            timeout: this.timeout
          },
          () => {
            c.write(i, null, () => {
              this.debug && console.log(`Data sent to printer: ${f}`, i), o.waitForResponse || (c.destroy(), s());
            });
          }
        );
        c.on("data", function(l) {
          o.waitForResponse && (this.debug && console.log("Received data:", l.toString("hex")), s(l), c.destroy());
        }), c.on("error", (l) => {
          a(l), c.destroy();
        }), c.on("timeout", () => {
          a(new Error("Socket timeout")), c.destroy();
        });
      });
    }
  }
  return B0 = r, B0;
}
var D0, Ja;
function bE() {
  if (Ja) return D0;
  Ja = 1;
  const e = Co();
  class t extends e {
    constructor(n, i) {
      if (super(), this.name = n, i && typeof i == "object")
        this.driver = i;
      else
        throw new Error("No driver set!");
    }
    getPrinterName() {
      let { name: n } = this;
      if (!n || n === "auto") {
        const i = this.driver.getPrinters().filter((o) => o.attributes.indexOf("RAW-ONLY") > -1);
        i.length > 0 && (n = i[0].name);
      }
      if (!n || n === "auto")
        throw new Error("A RAW-ONLY Printer could not be detected. Please configure a Printer-Name");
      return n;
    }
    async isPrinterConnected() {
      const n = this.driver.getPrinter(this.getPrinterName());
      if (n && n.status.indexOf("NOT-AVAILABLE") === -1)
        return !0;
      throw !1;
    }
    async execute(n, i = {}) {
      return new Promise((o, s) => {
        this.driver.printDirect({
          data: n,
          printer: this.getPrinterName(),
          type: "RAW",
          docname: i.docname !== void 0 ? i.docname : !1,
          success(a) {
            o(`Printed with job id: ${a}`);
          },
          error(a) {
            s(a);
          }
        });
      });
    }
  }
  return D0 = t, D0;
}
var N0, e6;
function yE() {
  return e6 || (e6 = 1, N0 = function(t, r, n) {
    var i = 0, o = !1;
    n = n || 1;
    for (var s = 0; s < n; s++)
      a(t);
    function a(f) {
      setImmediate(function() {
        i += 1, f(function(c) {
          i -= 1, c || (o = !0), o ? o && i === 0 && r() : a(f);
        });
      });
    }
  }), N0;
}
var L0, t6;
function TE() {
  if (t6) return L0;
  t6 = 1;
  var e = Ie, t = yE();
  L0 = function(n) {
    var i = new r(n);
    return i.write.bind(i);
  };
  function r(n) {
    var i = this;
    i.options = n || {}, i.queue = [], i.running = !1, i.index = 0, i.options.retries = i.options.retries || 1e3, i.options.waitTime = i.options.waitTime || 1e3, i.options.debug = i.options.debug || !1;
  }
  return r.prototype.write = function(n, i, o) {
    var s = this;
    s.queue.push([n, i, o, 0, s.index++]), s.process();
  }, r.prototype.process = function() {
    var n = this;
    !n.queue.length || n.running || (n.running = !0, t(function(i) {
      var o = n.queue[0], s = o[0], a = o[1], f = o[2], c = o[4];
      n.options.debug && n.options.debug(
        "Attempting to write to file #%s @ %s",
        c,
        (/* @__PURE__ */ new Date()).getTime()
      ), e.writeFile(s, a, function(l) {
        if (n.options.debug && n.options.debug(
          "Callback from writeFile for file #%s @ %s",
          c,
          (/* @__PURE__ */ new Date()).getTime()
        ), l) {
          if (n.options.debug && n.options.debug(
            "Error occurred for writeFile for file #%s @ %s",
            c,
            (/* @__PURE__ */ new Date()).getTime()
          ), n.options.debug && n.options.debug(l), o[3] += 1, o[3] > n.options.retries) {
            n.queue.shift(), f(l, o), setTimeout(function() {
              i(n.queue.length);
            }, n.options.waitTime);
            return;
          }
          setTimeout(function() {
            i(n.queue.length);
          }, n.options.waitTime);
        } else {
          n.queue.shift(), f(null, !0), setTimeout(function() {
            i(n.queue.length);
          }, n.options.waitTime);
          return;
        }
      });
    }, function() {
      n.running = !1;
    }));
  }, L0;
}
var F0, r6;
function vE() {
  if (r6) return F0;
  r6 = 1;
  const e = Ie, t = Co();
  class r extends t {
    constructor(i) {
      super(), this.path = i, this.writeFile = TE()({
        retries: 1e3,
        // number of write attempts before failing
        waitTime: 200
        // number of milliseconds to wait between write attempts
      });
    }
    async isPrinterConnected() {
      try {
        return e.existsSync(this.path);
      } catch (i) {
        throw i;
      }
    }
    async execute(i, o = {}) {
      return new Promise((s, a) => {
        const f = setTimeout(() => {
          a("Printer Error");
        }, 5e3);
        this.writeFile(this.path, i, (c) => {
          clearTimeout(f), c ? a(c) : s("Print done");
        });
      });
    }
  }
  return F0 = r, F0;
}
var $0, n6;
function AE() {
  if (n6) return $0;
  n6 = 1;
  function e(t, r, n) {
    const i = /^tcp:\/\/([^/:]+)(?::(\d+))?\/?$/i, o = /^printer:([^/]+)(?:\/([\w-]*))?$/i, s = i.exec(t), a = o.exec(t);
    if (typeof t == "object")
      return t;
    if (s) {
      const c = CE();
      return new c(s[1], s[2], r);
    }
    if (a) {
      const c = bE();
      return new c(a[1], n);
    }
    const f = vE();
    return new f(t);
  }
  return $0 = e, $0;
}
var U0, i6;
function en() {
  if (i6) return U0;
  i6 = 1;
  class e {
    constructor() {
    }
    beep() {
      return console.error(new Error("'beep' not implemented yet")), null;
    }
    printQR(r, n) {
      return console.error(new Error("'printQR' not implemented yet")), null;
    }
    pdf417(r, n) {
      return console.error(new Error("'pdf417' not implemented yet")), null;
    }
    code128(r, n) {
      return console.error(new Error("'code128' not implemented yet")), null;
    }
    maxiCode(r, n) {
      return console.error(new Error("'maxiCode' not implemented yet")), null;
    }
    printBarcode(r, n, i) {
      return console.error(new Error("'printBarcode' not implemented yet")), null;
    }
    async printImage(r) {
      return console.error(new Error("'printImage' not implemented yet")), null;
    }
    printImageBuffer(r, n, i) {
      return console.error(new Error("'printImageBuffer' not implemented yet")), null;
    }
  }
  return U0 = e, U0;
}
var k0, o6;
function wE() {
  return o6 || (o6 = 1, k0 = {
    // Feed control sequences
    CTL_LF: Buffer.from([10]),
    // Print and line feed
    CTL_FF: Buffer.from([12]),
    // Form feed
    CTL_CR: Buffer.from([13]),
    // Carriage return
    CTL_HT: Buffer.from([9]),
    // Horizontal tab
    CTL_SET_HT: Buffer.from([27, 68]),
    // Set horizontal tab positions
    CTL_VT: Buffer.from([27, 100, 4]),
    // Vertical tab
    // Printer hardware
    HW_INIT: Buffer.from([27, 64]),
    // Clear data in buffer and reset modes
    HW_SELECT: Buffer.from([27, 61, 1]),
    // Printer select
    HW_RESET: Buffer.from([27, 63, 10, 0]),
    // Reset printer hardware
    TRANSMIT_PAPER_STATUS: Buffer.from([29, 114, 1]),
    // Transmit printer paper status
    BEEP: Buffer.from([27, 66]),
    // Sounds built-in buzzer (if equipped)
    UPSIDE_DOWN_ON: Buffer.from([27, 123, 1]),
    // Upside down printing ON (rotated 180 degrees).
    UPSIDE_DOWN_OFF: Buffer.from([27, 123, 0]),
    // Upside down printing OFF (default).
    // Cash Drawer
    CD_KICK_2: Buffer.from([27, 112, 0]),
    // Sends a pulse to pin 2 []
    CD_KICK_5: Buffer.from([27, 112, 1]),
    // Sends a pulse to pin 5 []
    // Paper
    PAPER_FULL_CUT: Buffer.from([29, 86, 0]),
    // Full cut paper
    PAPER_PART_CUT: Buffer.from([29, 86, 1]),
    // Partial cut paper
    // Text format
    TXT_NORMAL: Buffer.from([27, 33, 0]),
    // Normal text
    TXT_2HEIGHT: Buffer.from([27, 33, 16]),
    // Double height text
    TXT_2WIDTH: Buffer.from([27, 33, 32]),
    // Double width text
    TXT_4SQUARE: Buffer.from([27, 33, 48]),
    // Quad area text
    TXT_UNDERL_OFF: Buffer.from([27, 45, 0]),
    // Underline font OFF
    TXT_UNDERL_ON: Buffer.from([27, 45, 1]),
    // Underline font 1-dot ON
    TXT_UNDERL2_ON: Buffer.from([27, 45, 2]),
    // Underline font 2-dot ON
    TXT_BOLD_OFF: Buffer.from([27, 69, 0]),
    // Bold font OFF
    TXT_BOLD_ON: Buffer.from([27, 69, 1]),
    // Bold font ON
    TXT_INVERT_OFF: Buffer.from([29, 66, 0]),
    // Invert font OFF (eg. white background)
    TXT_INVERT_ON: Buffer.from([29, 66, 1]),
    // Invert font ON (eg. black background)
    TXT_FONT_A: Buffer.from([27, 77, 0]),
    // Font type A
    TXT_FONT_B: Buffer.from([27, 77, 1]),
    // Font type B
    TXT_ALIGN_LT: Buffer.from([27, 97, 0]),
    // Left justification
    TXT_ALIGN_CT: Buffer.from([27, 97, 1]),
    // Centering
    TXT_ALIGN_RT: Buffer.from([27, 97, 2]),
    // Right justification
    // All code pages supported by printer.
    CODE_PAGE_PC437_USA: Buffer.from([27, 116, 0]),
    CODE_PAGE_KATAKANA: Buffer.from([27, 116, 1]),
    CODE_PAGE_PC850_MULTILINGUAL: Buffer.from([27, 116, 2]),
    CODE_PAGE_PC860_PORTUGUESE: Buffer.from([27, 116, 3]),
    CODE_PAGE_PC863_CANADIAN_FRENCH: Buffer.from([27, 116, 4]),
    CODE_PAGE_PC865_NORDIC: Buffer.from([27, 116, 5]),
    CODE_PAGE_PC851_GREEK: Buffer.from([27, 116, 11]),
    CODE_PAGE_PC853_TURKISH: Buffer.from([27, 116, 12]),
    CODE_PAGE_PC857_TURKISH: Buffer.from([27, 116, 13]),
    CODE_PAGE_PC737_GREEK: Buffer.from([27, 116, 14]),
    CODE_PAGE_ISO8859_7_GREEK: Buffer.from([27, 116, 15]),
    CODE_PAGE_WPC1252: Buffer.from([27, 116, 16]),
    CODE_PAGE_PC866_CYRILLIC2: Buffer.from([27, 116, 17]),
    CODE_PAGE_PC852_LATIN2: Buffer.from([27, 116, 18]),
    CODE_PAGE_SLOVENIA: Buffer.from([27, 116, 18]),
    CODE_PAGE_PC858_EURO: Buffer.from([27, 116, 19]),
    CODE_PAGE_KU42_THAI: Buffer.from([27, 116, 20]),
    CODE_PAGE_TIS11_THAI: Buffer.from([27, 116, 21]),
    CODE_PAGE_TIS18_THAI: Buffer.from([27, 116, 26]),
    CODE_PAGE_TCVN3_VIETNAMESE_L: Buffer.from([27, 116, 30]),
    CODE_PAGE_TCVN3_VIETNAMESE_U: Buffer.from([27, 116, 31]),
    CODE_PAGE_PC720_ARABIC: Buffer.from([27, 116, 32]),
    CODE_PAGE_WPC775_BALTIC_RIM: Buffer.from([27, 116, 33]),
    CODE_PAGE_PC855_CYRILLIC: Buffer.from([27, 116, 34]),
    CODE_PAGE_PC861_ICELANDIC: Buffer.from([27, 116, 35]),
    CODE_PAGE_PC862_HEBREW: Buffer.from([27, 116, 36]),
    CODE_PAGE_PC864_ARABIC: Buffer.from([27, 116, 37]),
    CODE_PAGE_PC869_GREEK: Buffer.from([27, 116, 38]),
    CODE_PAGE_ISO8859_2_LATIN2: Buffer.from([27, 116, 39]),
    CODE_PAGE_ISO8859_15_LATIN9: Buffer.from([27, 116, 40]),
    CODE_PAGE_PC1098_FARCI: Buffer.from([27, 116, 41]),
    CODE_PAGE_PC1118_LITHUANIAN: Buffer.from([27, 116, 42]),
    CODE_PAGE_PC1119_LITHUANIAN: Buffer.from([27, 116, 43]),
    CODE_PAGE_PC1125_UKRANIAN: Buffer.from([27, 116, 44]),
    CODE_PAGE_WPC1250_LATIN2: Buffer.from([27, 116, 45]),
    CODE_PAGE_WPC1251_CYRILLIC: Buffer.from([27, 116, 46]),
    CODE_PAGE_WPC1253_GREEK: Buffer.from([27, 116, 47]),
    CODE_PAGE_WPC1254_TURKISH: Buffer.from([27, 116, 48]),
    CODE_PAGE_WPC1255_HEBREW: Buffer.from([27, 116, 49]),
    CODE_PAGE_WPC1256_ARABIC: Buffer.from([27, 116, 50]),
    CODE_PAGE_WPC1257_BALTIC_RIM: Buffer.from([27, 116, 51]),
    CODE_PAGE_WPC1258_VIETNAMESE: Buffer.from([27, 116, 52]),
    CODE_PAGE_KZ1048_KAZAKHSTAN: Buffer.from([27, 116, 53]),
    CODE_PAGE_JAPAN: Buffer.from([27, 82, 8]),
    CODE_PAGE_KOREA: Buffer.from([27, 82, 13]),
    CODE_PAGE_CHINA: Buffer.from([27, 82, 15]),
    CODE_PAGE_HK_TW: Buffer.from([27, 82, 0]),
    CODE_PAGE_TCVN_VIETNAMESE: Buffer.from([27, 116, 52]),
    // Character code pages / iconv name of code table.
    // Only code pages supported by iconv-lite:
    // https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
    CODE_PAGES: {
      PC437_USA: "CP437",
      PC850_MULTILINGUAL: "CP850",
      PC860_PORTUGUESE: "CP860",
      PC863_CANADIAN_FRENCH: "CP863",
      PC865_NORDIC: "CP865",
      PC851_GREEK: "CP860",
      PC857_TURKISH: "CP857",
      PC737_GREEK: "CP737",
      ISO8859_7_GREEK: "ISO-8859-7",
      WPC1252: "CP1252",
      PC866_CYRILLIC2: "CP866",
      PC852_LATIN2: "CP852",
      SLOVENIA: "CP852",
      PC858_EURO: "CP858",
      WPC775_BALTIC_RIM: "CP775",
      PC855_CYRILLIC: "CP855",
      PC861_ICELANDIC: "CP861",
      PC862_HEBREW: "CP862",
      PC864_ARABIC: "CP864",
      PC869_GREEK: "CP869",
      ISO8859_2_LATIN2: "ISO-8859-2",
      ISO8859_15_LATIN9: "ISO-8859-15",
      PC1125_UKRANIAN: "CP1125",
      WPC1250_LATIN2: "WIN1250",
      WPC1251_CYRILLIC: "WIN1251",
      WPC1253_GREEK: "WIN1253",
      WPC1254_TURKISH: "WIN1254",
      WPC1255_HEBREW: "WIN1255",
      WPC1256_ARABIC: "WIN1256",
      WPC1257_BALTIC_RIM: "WIN1257",
      WPC1258_VIETNAMESE: "WIN1258",
      KZ1048_KAZAKHSTAN: "RK1048",
      JAPAN: "EUC-JP",
      KOREA: "EUC-KR",
      CHINA: "EUC-CN",
      HK_TW: "Big5-HKSCS",
      TCVN_VIETNAMESE: "tcvn",
      TIS11_THAI: "TIS-620",
      TIS18_THAI: "TIS-620"
    },
    // Barcode format
    BARCODE_TXT_OFF: Buffer.from([29, 72, 0]),
    // HRI barcode chars OFF
    BARCODE_TXT_ABV: Buffer.from([29, 72, 1]),
    // HRI barcode chars above
    BARCODE_TXT_BLW: Buffer.from([29, 72, 2]),
    // HRI barcode chars below
    BARCODE_TXT_BTH: Buffer.from([29, 72, 3]),
    // HRI barcode chars both above and below
    BARCODE_FONT_A: Buffer.from([29, 102, 0]),
    // Font type A for HRI barcode chars
    BARCODE_FONT_B: Buffer.from([29, 102, 1]),
    // Font type B for HRI barcode chars
    BARCODE_HEIGHT: Buffer.from([29, 104, 100]),
    // Barcode Height [1-255]
    BARCODE_WIDTH: Buffer.from([29, 119, 3]),
    // Barcode Width  [2-6]
    BARCODE_UPC_A: Buffer.from([29, 107, 0]),
    // Barcode type UPC-A
    BARCODE_UPC_E: Buffer.from([29, 107, 1]),
    // Barcode type UPC-E
    BARCODE_EAN13: Buffer.from([29, 107, 2]),
    // Barcode type EAN13
    BARCODE_EAN8: Buffer.from([29, 107, 3]),
    // Barcode type EAN8
    BARCODE_CODE39: Buffer.from([29, 107, 4]),
    // Barcode type CODE39
    BARCODE_CODE128: Buffer.from([29, 107, 73]),
    // Barcode type CODE128
    BARCODE_ITF: Buffer.from([29, 107, 5]),
    // Barcode type ITF
    BARCODE_NW7: Buffer.from([29, 107, 6]),
    // Barcode type NW7
    // QR Code
    QRCODE_MODEL1: Buffer.from([29, 40, 107, 4, 0, 49, 65, 49, 0]),
    // Model 1
    QRCODE_MODEL2: Buffer.from([29, 40, 107, 4, 0, 49, 65, 50, 0]),
    // Model 2
    QRCODE_MODEL3: Buffer.from([29, 40, 107, 4, 0, 49, 65, 51, 0]),
    // Model 3
    QRCODE_CORRECTION_L: Buffer.from([29, 40, 107, 3, 0, 49, 69, 48]),
    // Correction level: L - 7%
    QRCODE_CORRECTION_M: Buffer.from([29, 40, 107, 3, 0, 49, 69, 49]),
    // Correction level: M - 15%
    QRCODE_CORRECTION_Q: Buffer.from([29, 40, 107, 3, 0, 49, 69, 50]),
    // Correction level: Q - 25%
    QRCODE_CORRECTION_H: Buffer.from([29, 40, 107, 3, 0, 49, 69, 51]),
    // Correction level: H - 30%
    QRCODE_CELLSIZE_1: Buffer.from([29, 40, 107, 3, 0, 49, 67, 1]),
    // Cell size 1
    QRCODE_CELLSIZE_2: Buffer.from([29, 40, 107, 3, 0, 49, 67, 2]),
    // Cell size 2
    QRCODE_CELLSIZE_3: Buffer.from([29, 40, 107, 3, 0, 49, 67, 3]),
    // Cell size 3
    QRCODE_CELLSIZE_4: Buffer.from([29, 40, 107, 3, 0, 49, 67, 4]),
    // Cell size 4
    QRCODE_CELLSIZE_5: Buffer.from([29, 40, 107, 3, 0, 49, 67, 5]),
    // Cell size 5
    QRCODE_CELLSIZE_6: Buffer.from([29, 40, 107, 3, 0, 49, 67, 6]),
    // Cell size 6
    QRCODE_CELLSIZE_7: Buffer.from([29, 40, 107, 3, 0, 49, 67, 7]),
    // Cell size 7
    QRCODE_CELLSIZE_8: Buffer.from([29, 40, 107, 3, 0, 49, 67, 8]),
    // Cell size 8
    QRCODE_PRINT: Buffer.from([29, 40, 107, 3, 0, 49, 81, 48]),
    // Print QR code
    // PDF417
    PDF417_CORRECTION: Buffer.from([29, 40, 107, 4, 0, 48, 69, 49]),
    // Append 1-40 for ratio
    PDF417_ROW_HEIGHT: Buffer.from([29, 40, 107, 3, 0, 48, 68]),
    // Append 2-8 for height
    PDF417_WIDTH: Buffer.from([29, 40, 107, 3, 0, 48, 67]),
    // Append 2-8 for width
    PDF417_COLUMNS: Buffer.from([29, 40, 107, 3, 0, 48, 65]),
    PDF417_OPTION_STANDARD: Buffer.from([29, 40, 107, 3, 0, 48, 70, 0]),
    // Standard barcode
    PDF417_OPTION_TRUNCATED: Buffer.from([29, 40, 107, 3, 0, 48, 70, 1]),
    // Truncated barcode
    PDF417_PRINT: Buffer.from([29, 40, 107, 3, 0, 48, 81, 48]),
    // MaxiCode
    // Formatted data containing a structured Carrier Message with a numeric postal code. (US)
    MAXI_MODE2: Buffer.from([29, 40, 107, 3, 0, 50, 65, 50]),
    // Formatted data containing a structured Carrier Message with an alphanumeric postal code. (International)
    MAXI_MODE3: Buffer.from([29, 40, 107, 3, 0, 50, 65, 51]),
    MAXI_MODE4: Buffer.from([29, 40, 107, 3, 0, 50, 65, 52]),
    // Unformatted data with Standard Error Correction.
    MAXI_MODE5: Buffer.from([29, 40, 107, 3, 0, 50, 65, 53]),
    // Unformatted data with Enhanced Error Correction.
    MAXI_MODE6: Buffer.from([29, 40, 107, 3, 0, 50, 65, 54]),
    // For programming hardware devices.
    MAXI_PRINT: Buffer.from([29, 40, 107, 3, 0, 50, 81, 48]),
    // Image format
    S_RASTER_N: Buffer.from([29, 118, 48, 0]),
    // Set raster image normal size
    S_RASTER_2W: Buffer.from([29, 118, 48, 1]),
    // Set raster image double width
    S_RASTER_2H: Buffer.from([29, 118, 48, 2]),
    // Set raster image double height
    S_RASTER_Q: Buffer.from([29, 118, 48, 3]),
    // Set raster image quadruple
    // Printing Density
    PD_N50: Buffer.from([29, 124, 0]),
    // Printing Density -50%
    PD_N37: Buffer.from([29, 124, 1]),
    // Printing Density -37.5%
    PD_N25: Buffer.from([29, 124, 2]),
    // Printing Density -25%
    PD_N12: Buffer.from([29, 124, 3]),
    // Printing Density -12.5%
    PD_0: Buffer.from([29, 124, 4]),
    // Printing Density  0%
    PD_P50: Buffer.from([29, 124, 8]),
    // Printing Density +50%
    PD_P37: Buffer.from([29, 124, 7]),
    // Printing Density +37.5%
    PD_P25: Buffer.from([29, 124, 6])
    // Printing Density +25%
  }), k0;
}
var M0, s6;
function PE() {
  if (s6) return M0;
  s6 = 1;
  const e = en();
  class t extends e {
    constructor() {
      super(), this.config = wE();
    }
    // ------------------------------ Get paper status ------------------------------
    getStatus() {
      return this.config.TRANSMIT_PAPER_STATUS;
    }
    // ------------------------------ Append ------------------------------
    append(n) {
      this.buffer ? this.buffer = Buffer.concat([this.buffer, n]) : this.buffer = n;
    }
    // ------------------------------ Beep ------------------------------
    // "numberOfBeeps" is the number of beeps from 1 to 9
    // "lengthOfTheSound" is the length of the sound from 1 to 9 (it's not in seconds, it's just the preset value)
    beep(n = 1, i = 1) {
      if (n < 1 || n > 9) throw new Error("numberOfBeeps: Value must be between 1 and 9");
      if (i < 1 || i > 9) throw new Error("lengthOfTheSound: Value must be between 1 and 9");
      return this.buffer = null, this.append(this.config.BEEP), this.append(Buffer.from([n, i])), this.buffer;
    }
    // ------------------------------ Set text size ------------------------------
    setTextSize(n, i) {
      if (this.buffer = null, n > 7 || n < 0) throw new Error("setTextSize: Height must be between 0 and 7");
      if (i > 7 || i < 0) throw new Error("setTextSize: Width must be between 0 and 7");
      const o = Buffer.from(`${n}${i}`, "hex");
      return this.append(Buffer.from([29, 33])), this.append(o), this.buffer;
    }
    // ------------------------------ CODE 128 ------------------------------
    code128(n, i) {
      return this.buffer = null, i = {
        hriPos: 0,
        hriFont: 0,
        width: 3,
        height: 162,
        ...i
      }, this.append(Buffer.from([29, 72])), this.append(Buffer.from([i.hriPos])), this.append(Buffer.from([29, 102])), this.append(Buffer.from([i.hriFont])), this.append(Buffer.from([29, 119])), this.append(Buffer.from([i.width])), this.append(Buffer.from([29, 104])), this.append(Buffer.from([i.height])), this.append(this.config.BARCODE_CODE128), this.append(Buffer.from([n.length + 2])), this.append(Buffer.from([123, 66])), this.append(Buffer.from(n)), this.buffer;
    }
    // ------------------------------ QR ------------------------------
    printQR(n, i) {
      this.buffer = null, i = {
        model: 2,
        cellSize: 3,
        correction: "M",
        ...i
      }, i.model === 1 ? this.append(this.config.QRCODE_MODEL1) : i.model === 3 ? this.append(this.config.QRCODE_MODEL3) : this.append(this.config.QRCODE_MODEL2);
      const o = "QRCODE_CELLSIZE_".concat(i.cellSize.toString());
      this.append(this.config[o]);
      const s = "QRCODE_CORRECTION_".concat(i.correction.toUpperCase());
      this.append(this.config[s]);
      const a = n.length + 3, f = parseInt(a % 256), c = parseInt(a / 256);
      return this.append(Buffer.from([29, 40, 107, f, c, 49, 80, 48])), this.append(Buffer.from(n)), this.append(this.config.QRCODE_PRINT), this.buffer;
    }
    // ------------------------------ PDF417 ------------------------------
    pdf417(n, i) {
      this.buffer = null, i = {
        correction: 1,
        rowHeight: 3,
        width: 3,
        columns: 0,
        truncated: !1,
        ...i
      }, this.append(this.config.PDF417_CORRECTION), this.append(Buffer.from([i.correction])), this.append(this.config.PDF417_ROW_HEIGHT), this.append(Buffer.from([i.rowHeight])), this.append(this.config.PDF417_WIDTH), this.append(Buffer.from([i.width])), this.append(this.config.PDF417_COLUMNS), this.append(Buffer.from([i.columns])), i.truncated ? this.append(this.config.PDF417_OPTION_TRUNCATED) : this.append(this.config.PDF417_OPTION_STANDARD);
      const o = n.length + 3, s = parseInt(o % 256), a = parseInt(o / 256);
      return this.append(Buffer.from([29, 40, 107, s, a, 48, 80, 48])), this.append(Buffer.from(n.toString())), this.append(Buffer.from(this.config.PDF417_PRINT)), this.buffer;
    }
    // ------------------------------ MAXI CODE ------------------------------
    maxiCode(n, i) {
      this.buffer = null, i = {
        mode: 4,
        ...i
      }, i.mode == 2 ? this.append(this.config.MAXI_MODE2) : i.mode == 3 ? this.append(this.config.MAXI_MODE3) : i.mode == 5 ? this.append(this.config.MAXI_MODE5) : i.mode == 6 ? this.append(this.config.MAXI_MODE6) : this.append(this.config.MAXI_MODE4);
      const o = n.length + 3, s = parseInt(o % 256), a = parseInt(o / 256);
      return this.append(Buffer.from([29, 40, 107, s, a, 50, 80, 48])), this.append(Buffer.from(n.toString())), this.append(this.config.MAXI_PRINT), this.buffer;
    }
    // ------------------------------ BARCODE ------------------------------
    printBarcode(n, i, o) {
      return this.buffer = null, o = {
        hriPos: 0,
        hriFont: 0,
        width: 3,
        height: 162,
        ...o
      }, this.append(Buffer.from([29, 72])), this.append(Buffer.from([o.hriPos])), this.append(Buffer.from([29, 102])), this.append(Buffer.from([o.hriFont])), this.append(Buffer.from([29, 119])), this.append(Buffer.from([o.width])), this.append(Buffer.from([29, 104])), this.append(Buffer.from([o.height])), this.append(Buffer.from([29, 107])), i == 73 ? (this.append(Buffer.from([i, n.length + 2])), this.append(Buffer.from([123, 66]))) : this.append(Buffer.from([i, n.length])), this.append(Buffer.from(n)), this.buffer;
    }
    // ----------------------------------------------------- PRINT IMAGE -----------------------------------------------------
    // https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=88
    async printImage(n) {
      const i = Ie, { PNG: o } = br;
      try {
        const s = i.readFileSync(n), a = o.sync.read(s);
        return this.printImageBuffer(a.width, a.height, a.data);
      } catch (s) {
        throw s;
      }
    }
    printImageBuffer(n, i, o) {
      this.buffer = null;
      const s = [];
      for (let c = 0; c < i; c++) {
        const l = [];
        for (let u = 0; u < n; u++) {
          const h = n * c + u << 2;
          l.push({
            r: o[h],
            g: o[h + 1],
            b: o[h + 2],
            a: o[h + 3]
          });
        }
        s.push(l);
      }
      const a = [];
      for (let c = 0; c < i; c++)
        for (let l = 0; l < Math.ceil(n / 8); l++) {
          let u = 0;
          for (let h = 0; h < 8; h++) {
            let d = s[c][l * 8 + h];
            if (d === void 0 && (d = {
              a: 0,
              r: 0,
              g: 0,
              b: 0
            }), d.a > 126 && parseInt(0.2126 * d.r + 0.7152 * d.g + 0.0722 * d.b) < 128) {
              const p = 1 << 7 - h;
              u |= p;
            }
          }
          a.push(u);
        }
      const f = Buffer.from(a);
      return n % 8 != 0 && (n += 8), this.append(Buffer.from([29, 118, 48, 48])), this.append(Buffer.from([n >> 3 & 255])), this.append(Buffer.from([0])), this.append(Buffer.from([i & 255])), this.append(Buffer.from([i >> 8 & 255])), this.append(f), this.buffer;
    }
  }
  return M0 = t, M0;
}
var G0, a6;
function SE() {
  return a6 || (a6 = 1, G0 = {
    // Feed control sequences
    CTL_LF: Buffer.from([10]),
    // Print and line feed
    CTL_FF: Buffer.from([12]),
    // Form feed
    CTL_CR: Buffer.from([13]),
    // Carriage return
    CTL_HT: Buffer.from([9]),
    // Horizontal tab
    CTL_VT: Buffer.from([11]),
    // Vertical tab
    CTL_SET_HT: Buffer.from([27, 68]),
    // Set horizontal tab positions
    CTL_SET_VT: Buffer.from([27, 66]),
    // Set vertical tab positions
    // Printer hardware
    HW_INIT: Buffer.from([27, 64]),
    // Clear data in buffer and reset modes
    HW_SELECT: Buffer.from([27, 61, 1]),
    // Printer select
    HW_RESET: Buffer.from([27, 63, 10, 0]),
    // Reset printer hardware
    UPSIDE_DOWN_ON: Buffer.from([15]),
    // Upside down printing ON (rotated 180 degrees).
    UPSIDE_DOWN_OFF: Buffer.from([18]),
    // Upside down printing OFF (default).
    // Cash Drawer
    CD_KICK_2: Buffer.from([27, 112, 0]),
    // Sends a pulse to pin 2 []
    CD_KICK_5: Buffer.from([27, 112, 1]),
    // Sends a pulse to pin 5 []
    CD_KICK: Buffer.from([27, 7, 11, 55, 7]),
    // Kick the cash drawer
    // Paper
    PAPER_FULL_CUT: Buffer.from([27, 100, 2]),
    // Full cut paper
    PAPER_PART_CUT: Buffer.from([27, 100, 3]),
    // Partial cut paper
    // Text format
    TXT_NORMAL: Buffer.from([27, 105, 0, 0]),
    // Normal text
    TXT_2HEIGHT: Buffer.from([27, 105, 1, 0]),
    // Double height text
    TXT_2WIDTH: Buffer.from([27, 105, 0, 1]),
    // Double width text
    TXT_4SQUARE: Buffer.from([27, 105, 1, 1]),
    // Quad area text
    TXT_UNDERL_OFF: Buffer.from([27, 45, 0]),
    // Underline font OFF
    TXT_UNDERL_ON: Buffer.from([27, 45, 1]),
    // Underline font 1-dot ON
    TXT_UNDERL2_ON: Buffer.from([27, 45, 2]),
    // Underline font 2-dot ON
    TXT_BOLD_OFF: Buffer.from([27, 70]),
    // Bold font OFF
    TXT_BOLD_ON: Buffer.from([27, 69]),
    // Bold font ON
    TXT_INVERT_OFF: Buffer.from([27, 53]),
    // Invert font OFF (eg. white background)
    TXT_INVERT_ON: Buffer.from([27, 52]),
    // Invert font ON (eg. black background)
    TXT_FONT_A: Buffer.from([27, 30, 70, 0]),
    // Font type A
    TXT_FONT_B: Buffer.from([27, 30, 70, 1]),
    // Font type B
    TXT_ALIGN_LT: Buffer.from([27, 29, 97, 0]),
    // Left justification
    TXT_ALIGN_CT: Buffer.from([27, 29, 97, 1]),
    // Centering
    TXT_ALIGN_RT: Buffer.from([27, 29, 97, 2]),
    // Right justification
    // All code pages supported by printer.
    CODE_PAGE_NORMAL: Buffer.from([27, 29, 116, 0]),
    CODE_PAGE_PC850_MULTILINGUAL: Buffer.from([27, 29, 116, 0]),
    // UNKNOWN
    CODE_PAGE_ISO8859_2_LATIN2: Buffer.from([27, 29, 116, 0]),
    // UNKNOWN
    CODE_PAGE_ISO8859_15_LATIN9: Buffer.from([27, 29, 116, 0]),
    // UNKNOWN
    CODE_PAGE_PC437_USA: Buffer.from([27, 29, 116, 1]),
    CODE_PAGE_KATAKANA: Buffer.from([27, 29, 116, 2]),
    CODE_PAGE_CP437: Buffer.from([27, 29, 116, 3]),
    CODE_PAGE_PC858_EURO: Buffer.from([27, 29, 116, 4]),
    CODE_PAGE_PC852_LATIN2: Buffer.from([27, 29, 116, 5]),
    CODE_PAGE_PC860_PORTUGUESE: Buffer.from([27, 29, 116, 6]),
    CODE_PAGE_PC861_ICELANDIC: Buffer.from([27, 29, 116, 7]),
    CODE_PAGE_PC863_CANADIAN_FRENCH: Buffer.from([27, 29, 116, 8]),
    CODE_PAGE_PC865_NORDIC: Buffer.from([27, 29, 116, 9]),
    CODE_PAGE_PC866_CYRILLIC2: Buffer.from([27, 29, 116, 10]),
    CODE_PAGE_PC855_CYRILLIC: Buffer.from([27, 29, 116, 11]),
    CODE_PAGE_PC857_TURKISH: Buffer.from([27, 29, 116, 12]),
    CODE_PAGE_PC862_HEBREW: Buffer.from([27, 29, 116, 13]),
    CODE_PAGE_PC864_ARABIC: Buffer.from([27, 29, 116, 14]),
    CODE_PAGE_PC737_GREEK: Buffer.from([27, 29, 116, 15]),
    CODE_PAGE_PC851_GREEK: Buffer.from([27, 29, 116, 16]),
    CODE_PAGE_PC869_GREEK: Buffer.from([27, 29, 116, 17]),
    CODE_PAGE_PC928_GREEK: Buffer.from([27, 29, 116, 18]),
    CODE_PAGE_PC772_LITHUANIAN: Buffer.from([27, 29, 116, 19]),
    CODE_PAGE_PC774_LITHUANIAN: Buffer.from([27, 29, 116, 20]),
    CODE_PAGE_PC874_THAI: Buffer.from([27, 29, 116, 21]),
    CODE_PAGE_WPC1252: Buffer.from([27, 29, 116, 32]),
    CODE_PAGE_WPC1250_LATIN2: Buffer.from([27, 29, 116, 33]),
    CODE_PAGE_WPC1251_CYRILLIC: Buffer.from([27, 29, 116, 34]),
    CODE_PAGE_3840_IBM_Russian: Buffer.from([27, 29, 116, 64]),
    CODE_PAGE_3841_Gost: Buffer.from([27, 29, 116, 65]),
    CODE_PAGE_3843_POLISH: Buffer.from([27, 29, 116, 66]),
    CODE_PAGE_3844_CS2: Buffer.from([27, 29, 116, 67]),
    CODE_PAGE_3845_HUNGARIAN: Buffer.from([27, 29, 116, 68]),
    CODE_PAGE_3846_TURKISH: Buffer.from([27, 29, 116, 69]),
    CODE_PAGE_3847_BRAZIL_ABNT: Buffer.from([27, 29, 116, 70]),
    CODE_PAGE_3848_RAZIL_ABICOMP: Buffer.from([27, 29, 116, 71]),
    CODE_PAGE_1001_ARABIC: Buffer.from([27, 29, 116, 72]),
    CODE_PAGE_2001_LITHUANIAN_KBL: Buffer.from([27, 29, 116, 73]),
    CODE_PAGE_3001_ESTONIAN1: Buffer.from([27, 29, 116, 74]),
    CODE_PAGE_3002_ESTONIAN2: Buffer.from([27, 29, 116, 75]),
    CODE_PAGE_3011_LATVIAN1: Buffer.from([27, 29, 116, 76]),
    CODE_PAGE_3012_LATVIAN2: Buffer.from([27, 29, 116, 77]),
    CODE_PAGE_3021_BULGARIAN: Buffer.from([27, 29, 116, 78]),
    CODE_PAGE_3041_MALTESE: Buffer.from([27, 29, 116, 79]),
    CODE_PAGE_42_MALTESE: Buffer.from([27, 29, 116, 96]),
    CODE_PAGE_11_MALTESE: Buffer.from([27, 29, 116, 97]),
    CODE_PAGE_13_MALTESE: Buffer.from([27, 29, 116, 98]),
    CODE_PAGE_14_MALTESE: Buffer.from([27, 29, 116, 99]),
    CODE_PAGE_16_MALTESE: Buffer.from([27, 29, 116, 100]),
    CODE_PAGE_17_MALTESE: Buffer.from([27, 29, 116, 101]),
    CODE_PAGE_18_MALTESE: Buffer.from([27, 29, 116, 102]),
    // Character code pages / iconv name of code table.
    // Only code pages supported by iconv-lite:
    // https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
    CODE_PAGES: {
      PC437_USA: "CP437",
      PC850_MULTILINGUAL: "CP850",
      PC860_PORTUGUESE: "CP860",
      PC863_CANADIAN_FRENCH: "CP863",
      PC865_NORDIC: "CP865",
      PC851_GREEK: "CP860",
      PC857_TURKISH: "CP857",
      PC737_GREEK: "CP737",
      ISO8859_7_GREEK: "ISO-8859-7",
      WPC1252: "CP1252",
      PC866_CYRILLIC2: "CP866",
      PC852_LATIN2: "CP852",
      SLOVENIA: "CP852",
      PC858_EURO: "CP858",
      WPC775_BALTIC_RIM: "CP775",
      PC855_CYRILLIC: "CP855",
      PC861_ICELANDIC: "CP861",
      PC862_HEBREW: "CP862",
      PC864_ARABIC: "CP864",
      PC869_GREEK: "CP869",
      ISO8859_2_LATIN2: "ISO-8859-2",
      ISO8859_15_LATIN9: "ISO-8859-15",
      PC1125_UKRANIAN: "CP1125",
      WPC1250_LATIN2: "WIN1250",
      WPC1251_CYRILLIC: "WIN1251",
      WPC1253_GREEK: "WIN1253",
      WPC1254_TURKISH: "WIN1254",
      WPC1255_HEBREW: "WIN1255",
      WPC1256_ARABIC: "WIN1256",
      WPC1257_BALTIC_RIM: "WIN1257",
      WPC1258_VIETNAMESE: "WIN1258",
      KZ1048_KAZAKHSTAN: "RK1048",
      JAPAN: "EUC-JP",
      KOREA: "EUC-KR",
      CHINA: "EUC-CN"
    },
    // Barcode format
    BARCODE_TXT_OFF: Buffer.from([29, 72, 0]),
    // HRI barcode chars OFF
    BARCODE_TXT_ABV: Buffer.from([29, 72, 1]),
    // HRI barcode chars above
    BARCODE_TXT_BLW: Buffer.from([29, 72, 2]),
    // HRI barcode chars below
    BARCODE_TXT_BTH: Buffer.from([29, 72, 3]),
    // HRI barcode chars both above and below
    BARCODE_FONT_A: Buffer.from([29, 102, 0]),
    // Font type A for HRI barcode chars
    BARCODE_FONT_B: Buffer.from([29, 102, 1]),
    // Font type B for HRI barcode chars
    BARCODE_HEIGHT: Buffer.from([29, 104, 100]),
    // Barcode Height [1-255]
    BARCODE_WIDTH: Buffer.from([29, 119, 3]),
    // Barcode Width  [2-6]
    BARCODE_UPC_A: Buffer.from([29, 107, 0]),
    // Barcode type UPC-A
    BARCODE_UPC_E: Buffer.from([29, 107, 1]),
    // Barcode type UPC-E
    BARCODE_EAN13: Buffer.from([29, 107, 2]),
    // Barcode type EAN13
    BARCODE_EAN8: Buffer.from([29, 107, 3]),
    // Barcode type EAN8
    BARCODE_CODE39: Buffer.from([29, 107, 4]),
    // Barcode type CODE39
    BARCODE_ITF: Buffer.from([29, 107, 5]),
    // Barcode type ITF
    BARCODE_NW7: Buffer.from([29, 107, 6]),
    // Barcode type NW7
    BARCODE_CODE128: Buffer.from([27, 98, 54]),
    // Barcode type CODE128
    BARCODE_CODE128_TEXT_1: Buffer.from([1]),
    // No text
    BARCODE_CODE128_TEXT_2: Buffer.from([2]),
    // Text on bottom
    BARCODE_CODE128_TEXT_3: Buffer.from([3]),
    // No text inline
    BARCODE_CODE128_TEXT_4: Buffer.from([4]),
    // Text on bottom inline
    BARCODE_CODE128_WIDTH_SMALL: Buffer.from([49]),
    // Small
    BARCODE_CODE128_WIDTH_MEDIUM: Buffer.from([50]),
    // Medium
    BARCODE_CODE128_WIDTH_LARGE: Buffer.from([51]),
    // Large
    // QR Code
    QRCODE_MODEL1: Buffer.from([27, 29, 121, 83, 48, 1]),
    // Model 1
    QRCODE_MODEL2: Buffer.from([27, 29, 121, 83, 48, 2]),
    // Model 2
    QRCODE_CORRECTION_L: Buffer.from([27, 29, 121, 83, 49, 0]),
    // Correction level: L - 7%
    QRCODE_CORRECTION_M: Buffer.from([27, 29, 121, 83, 49, 1]),
    // Correction level: M - 15%
    QRCODE_CORRECTION_Q: Buffer.from([27, 29, 121, 83, 49, 2]),
    // Correction level: Q - 25%
    QRCODE_CORRECTION_H: Buffer.from([27, 29, 121, 83, 49, 3]),
    // Correction level: H - 30%
    QRCODE_CELLSIZE_1: Buffer.from([27, 29, 121, 83, 50, 1]),
    // Cell size 1
    QRCODE_CELLSIZE_2: Buffer.from([27, 29, 121, 83, 50, 2]),
    // Cell size 2
    QRCODE_CELLSIZE_3: Buffer.from([27, 29, 121, 83, 50, 3]),
    // Cell size 3
    QRCODE_CELLSIZE_4: Buffer.from([27, 29, 121, 83, 50, 4]),
    // Cell size 4
    QRCODE_CELLSIZE_5: Buffer.from([27, 29, 121, 83, 50, 5]),
    // Cell size 5
    QRCODE_CELLSIZE_6: Buffer.from([27, 29, 121, 83, 50, 6]),
    // Cell size 6
    QRCODE_CELLSIZE_7: Buffer.from([27, 29, 121, 83, 50, 7]),
    // Cell size 7
    QRCODE_CELLSIZE_8: Buffer.from([27, 29, 121, 83, 50, 8]),
    // Cell size 8
    QRCODE_CELLSIZE: Buffer.from([27, 29, 121, 68, 49, 0]),
    // Cell size nL nH dk
    QRCODE_PRINT: Buffer.from([27, 29, 121, 80]),
    // Print QR code
    // Image format
    S_RASTER_N: Buffer.from([29, 118, 48, 0]),
    // Set raster image normal size
    S_RASTER_2W: Buffer.from([29, 118, 48, 1]),
    // Set raster image double width
    S_RASTER_2H: Buffer.from([29, 118, 48, 2]),
    // Set raster image double height
    S_RASTER_Q: Buffer.from([29, 118, 48, 3]),
    // Set raster image quadruple
    // Printing Density
    PD_N50: Buffer.from([29, 124, 0]),
    // Printing Density -50%
    PD_N37: Buffer.from([29, 124, 1]),
    // Printing Density -37.5%
    PD_N25: Buffer.from([29, 124, 2]),
    // Printing Density -25%
    PD_N12: Buffer.from([29, 124, 3]),
    // Printing Density -12.5%
    PD_0: Buffer.from([29, 124, 4]),
    // Printing Density  0%
    PD_P50: Buffer.from([29, 124, 8]),
    // Printing Density +50%
    PD_P37: Buffer.from([29, 124, 7]),
    // Printing Density +37.5%
    PD_P25: Buffer.from([29, 124, 6])
    // Printing Density +25%
  }), G0;
}
var H0, f6;
function OE() {
  if (f6) return H0;
  f6 = 1;
  const e = en();
  class t extends e {
    constructor() {
      super(), this.config = SE();
    }
    // ------------------------------ Append ------------------------------
    append(n) {
      this.buffer ? this.buffer = Buffer.concat([this.buffer, n]) : this.buffer = n;
    }
    // ------------------------------ QR ------------------------------
    printQR(n, i) {
      this.buffer = null, i || (i = {});
      const o = {
        model: this.config.QRCODE_MODEL1,
        correctionLevel: this.config.QRCODE_CORRECTION_M,
        cellSize: this.config.QRCODE_CELLSIZE_4
      }, s = {
        1: this.config.QRCODE_MODEL1,
        2: this.config.QRCODE_MODEL2
      }, a = {
        L: this.config.QRCODE_CORRECTION_L,
        // Correction level: L - 7%
        M: this.config.QRCODE_CORRECTION_M,
        // Correction level: M - 15%
        Q: this.config.QRCODE_CORRECTION_Q,
        // Correction level: Q - 25%
        H: this.config.QRCODE_CORRECTION_H
        // Correction level: H - 30%
      }, f = {
        1: this.config.QRCODE_CELLSIZE_1,
        // Cell size 1
        2: this.config.QRCODE_CELLSIZE_2,
        // Cell size 2
        3: this.config.QRCODE_CELLSIZE_3,
        // Cell size 3
        4: this.config.QRCODE_CELLSIZE_4,
        // Cell size 4
        5: this.config.QRCODE_CELLSIZE_5,
        // Cell size 5
        6: this.config.QRCODE_CELLSIZE_6,
        // Cell size 6
        7: this.config.QRCODE_CELLSIZE_7,
        // Cell size 7
        8: this.config.QRCODE_CELLSIZE_8
        // Cell size 8
      };
      s[i.model] && (o.model = s[i.model]), a[i.correctionLevel] && (o.correctionLevel = a[i.correctionLevel]), f[i.cellSize] && (o.cellSize = f[i.cellSize]), this.append(o.model), this.append(o.correctionLevel), this.append(o.cellSize);
      const c = n.length, l = parseInt(c % 256), u = parseInt(c / 256);
      return this.append(Buffer.from([l, u])), this.append(Buffer.from(n.toString())), this.append(Buffer.from([10])), this.append(this.config.QRCODE_PRINT), this.buffer;
    }
    // ------------------------------ PDF417 ------------------------------
    pdf417(n, i) {
      if (this.buffer = null, i)
        throw new Error("PDF417 settings not yet available for star printers!");
      this.append(Buffer.from([27, 29, 120, 83, 48, 0, 1, 2])), this.append(Buffer.from([27, 29, 120, 83, 49, 2])), this.append(Buffer.from([27, 29, 120, 83, 50, 2])), this.append(Buffer.from([27, 29, 120, 83, 51, 3]));
      const o = n.length, s = parseInt(o % 256), a = parseInt(o / 256);
      return this.append(Buffer.from([27, 29, 120, 68])), this.append(Buffer.from([s, a])), this.append(Buffer.from(n.toString())), this.append(Buffer.from([10])), this.append(Buffer.from([27, 29, 120, 80])), this.buffer;
    }
    // ------------------------------ CODE128 ------------------------------
    code128(n, i) {
      return this.buffer = null, this.append(this.config.BARCODE_CODE128), i ? i.text == 1 ? this.append(this.config.BARCODE_CODE128_TEXT_1) : i.text == 2 ? this.append(this.config.BARCODE_CODE128_TEXT_2) : i.text == 3 ? this.append(this.config.BARCODE_CODE128_TEXT_3) : i.text == 4 && this.append(this.config.BARCODE_CODE128_TEXT_4) : this.append(this.config.BARCODE_CODE128_TEXT_2), i ? i.width == "SMALL" ? this.append(this.config.BARCODE_CODE128_WIDTH_SMALL) : i.width == "MEDIUM" ? this.append(this.config.BARCODE_CODE128_WIDTH_MEDIUM) : i.width == "LARGE" && this.append(this.config.BARCODE_CODE128_WIDTH_LARGE) : this.append(this.config.BARCODE_CODE128_WIDTH_LARGE), i && i.height ? this.append(Buffer.from([i.height])) : this.append(Buffer.from([80])), this.append(Buffer.from(n.toString())), this.append(Buffer.from([30])), this.buffer;
    }
    // ----------------------------------------------------- PRINT IMAGE -----------------------------------------------------
    async printImage(n) {
      const i = Ie, { PNG: o } = br;
      try {
        const s = i.readFileSync(n), a = o.sync.read(s);
        return this.printImageBuffer(a.width, a.height, a.data);
      } catch (s) {
        throw s;
      }
    }
    printImageBuffer(n, i, o) {
      this.buffer = null;
      const s = [];
      for (let a = 0; a < i; a++) {
        const f = [];
        for (let c = 0; c < n; c++) {
          const l = n * a + c << 2;
          f.push({
            r: o[l],
            g: o[l + 1],
            b: o[l + 2],
            a: o[l + 3]
          });
        }
        s.push(f);
      }
      this.append(Buffer.from([27, 48]));
      for (let a = 0; a < Math.ceil(i / 24); a++) {
        let f = Buffer.from([]);
        for (let c = 0; c < 24; c++)
          for (let l = 0; l < Math.ceil(n / 8); l++) {
            let u = 0;
            for (let h = 0; h < 8; h++)
              if (a * 24 + c < s.length && l * 8 + h < s[a * 24 + c].length) {
                const d = s[a * 24 + c][l * 8 + h];
                if (d.a > 126 && parseInt(0.2126 * d.r + 0.7152 * d.g + 0.0722 * d.b) < 128) {
                  const p = 1 << 7 - h;
                  u |= p;
                }
              }
            f = Buffer.concat([f, Buffer.from([u])]);
          }
        this.append(Buffer.from([27, 107, parseInt(f.length / 24), 0])), this.append(f), this.append(Buffer.from(`
`));
      }
      return this.append(Buffer.from([27, 122, 1])), this.buffer;
    }
    // ------------------------------ BARCODE ------------------------------
    printBarcode(n, i, o) {
      return this.buffer = null, o || (o = {}), this.append(Buffer.from([27, 98])), this.append(Buffer.from([i || 7])), this.append(Buffer.from([o.characters || 1])), this.append(Buffer.from([o.mode || 2])), this.append(Buffer.from([o.height || 150])), this.append(Buffer.from(n)), this.append(Buffer.from([30])), this.buffer;
    }
  }
  return H0 = t, H0;
}
var W0, l6;
function IE() {
  return l6 || (l6 = 1, W0 = {
    // Feed control sequences
    CTL_LF: Buffer.from([10]),
    // Print and line feed
    CTL_FF: Buffer.from([12]),
    // Form feed
    CTL_CR: Buffer.from([13]),
    // Carriage return
    CTL_HT: Buffer.from([9]),
    // Horizontal tab
    CTL_SET_HT: Buffer.from([27, 68]),
    // Set horizontal tab positions
    CTL_VT: Buffer.from([27, 100, 4]),
    // Vertical tab
    // Printer hardware
    HW_INIT: Buffer.from([27, 64]),
    // Clear data in buffer and reset modes
    HW_SELECT: Buffer.from([27, 61, 1]),
    // Printer select
    HW_RESET: Buffer.from([27, 63, 10, 0]),
    // Reset printer hardware
    BEEP: Buffer.from([27, 66, 5, 1]),
    // Sounds built-in buzzer (if equipped)
    UPSIDE_DOWN_ON: Buffer.from([27, 123, 1]),
    // Upside down printing ON (rotated 180 degrees).
    UPSIDE_DOWN_OFF: Buffer.from([27, 123, 0]),
    // Upside down printing OFF (default).
    // Cash Drawer
    CD_KICK_2: Buffer.from([27, 112, 0]),
    // Sends a pulse to pin 2 []
    CD_KICK_5: Buffer.from([27, 112, 1]),
    // Sends a pulse to pin 5 []
    // Paper
    PAPER_FULL_CUT: Buffer.from([29, 86, 0]),
    // Full cut paper
    PAPER_PART_CUT: Buffer.from([29, 86, 1]),
    // Partial cut paper
    // Text format
    TXT_NORMAL: Buffer.from([27, 33, 0]),
    // Normal text
    TXT_2HEIGHT: Buffer.from([27, 33, 16]),
    // Double height text
    TXT_2WIDTH: Buffer.from([27, 33, 32]),
    // Double width text
    TXT_4SQUARE: Buffer.from([27, 33, 48]),
    // Quad area text
    TXT_UNDERL_OFF: Buffer.from([27, 45, 0]),
    // Underline font OFF
    TXT_UNDERL_ON: Buffer.from([27, 45, 1]),
    // Underline font 1-dot ON
    TXT_UNDERL2_ON: Buffer.from([27, 45, 2]),
    // Underline font 2-dot ON
    TXT_BOLD_OFF: Buffer.from([27, 69, 0]),
    // Bold font OFF
    TXT_BOLD_ON: Buffer.from([27, 69, 1]),
    // Bold font ON
    TXT_INVERT_OFF: Buffer.from([29, 66, 0]),
    // Invert font OFF (eg. white background)
    TXT_INVERT_ON: Buffer.from([29, 66, 1]),
    // Invert font ON (eg. black background)
    TXT_FONT_A: Buffer.from([27, 77, 0]),
    // Font type A
    TXT_FONT_B: Buffer.from([27, 77, 1]),
    // Font type B
    TXT_ALIGN_LT: Buffer.from([27, 97, 0]),
    // Left justification
    TXT_ALIGN_CT: Buffer.from([27, 97, 1]),
    // Centering
    TXT_ALIGN_RT: Buffer.from([27, 97, 2]),
    // Right justification
    // All code pages supported by printer.
    CODE_PAGE_PC437_USA: Buffer.from([27, 116, 0]),
    CODE_PAGE_KATAKANA: Buffer.from([27, 116, 1]),
    CODE_PAGE_PC850_MULTILINGUAL: Buffer.from([27, 116, 2]),
    CODE_PAGE_PC860_PORTUGUESE: Buffer.from([27, 116, 3]),
    CODE_PAGE_PC863_CANADIAN_FRENCH: Buffer.from([27, 116, 4]),
    CODE_PAGE_PC865_NORDIC: Buffer.from([27, 116, 5]),
    CODE_PAGE_PC851_GREEK: Buffer.from([27, 116, 11]),
    CODE_PAGE_PC853_TURKISH: Buffer.from([27, 116, 12]),
    CODE_PAGE_PC857_TURKISH: Buffer.from([27, 116, 13]),
    CODE_PAGE_PC737_GREEK: Buffer.from([27, 116, 14]),
    CODE_PAGE_ISO8859_7_GREEK: Buffer.from([27, 116, 15]),
    CODE_PAGE_WPC1252: Buffer.from([27, 116, 16]),
    CODE_PAGE_PC866_CYRILLIC2: Buffer.from([27, 116, 17]),
    CODE_PAGE_PC852_LATIN2: Buffer.from([27, 116, 18]),
    CODE_PAGE_SLOVENIA: Buffer.from([27, 116, 18]),
    CODE_PAGE_PC858_EURO: Buffer.from([27, 116, 19]),
    CODE_PAGE_KU42_THAI: Buffer.from([27, 116, 20]),
    CODE_PAGE_TIS11_THAI: Buffer.from([27, 116, 21]),
    CODE_PAGE_TIS18_THAI: Buffer.from([27, 116, 26]),
    CODE_PAGE_TCVN3_VIETNAMESE_L: Buffer.from([27, 116, 30]),
    CODE_PAGE_TCVN3_VIETNAMESE_U: Buffer.from([27, 116, 31]),
    CODE_PAGE_PC720_ARABIC: Buffer.from([27, 116, 32]),
    CODE_PAGE_WPC775_BALTIC_RIM: Buffer.from([27, 116, 33]),
    CODE_PAGE_PC855_CYRILLIC: Buffer.from([27, 116, 34]),
    CODE_PAGE_PC861_ICELANDIC: Buffer.from([27, 116, 35]),
    CODE_PAGE_PC862_HEBREW: Buffer.from([27, 116, 36]),
    CODE_PAGE_PC864_ARABIC: Buffer.from([27, 116, 37]),
    CODE_PAGE_PC869_GREEK: Buffer.from([27, 116, 38]),
    CODE_PAGE_ISO8859_2_LATIN2: Buffer.from([27, 116, 39]),
    CODE_PAGE_ISO8859_15_LATIN9: Buffer.from([27, 116, 40]),
    CODE_PAGE_PC1098_FARCI: Buffer.from([27, 116, 41]),
    CODE_PAGE_PC1118_LITHUANIAN: Buffer.from([27, 116, 42]),
    CODE_PAGE_PC1119_LITHUANIAN: Buffer.from([27, 116, 43]),
    CODE_PAGE_PC1125_UKRANIAN: Buffer.from([27, 116, 44]),
    CODE_PAGE_WPC1250_LATIN2: Buffer.from([27, 116, 45]),
    CODE_PAGE_WPC1251_CYRILLIC: Buffer.from([27, 116, 46]),
    CODE_PAGE_WPC1253_GREEK: Buffer.from([27, 116, 47]),
    CODE_PAGE_WPC1254_TURKISH: Buffer.from([27, 116, 48]),
    CODE_PAGE_WPC1255_HEBREW: Buffer.from([27, 116, 49]),
    CODE_PAGE_WPC1256_ARABIC: Buffer.from([27, 116, 50]),
    CODE_PAGE_WPC1257_BALTIC_RIM: Buffer.from([27, 116, 51]),
    CODE_PAGE_WPC1258_VIETNAMESE: Buffer.from([27, 116, 52]),
    CODE_PAGE_KZ1048_KAZAKHSTAN: Buffer.from([27, 116, 53]),
    CODE_PAGE_JAPAN: Buffer.from([27, 82, 8]),
    CODE_PAGE_KOREA: Buffer.from([27, 82, 13]),
    CODE_PAGE_CHINA: Buffer.from([27, 82, 15]),
    CODE_PAGE_HK_TW: Buffer.from([27, 82, 0]),
    // Character code pages / iconv name of code table.
    // Only code pages supported by iconv-lite:
    // https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
    CODE_PAGES: {
      PC437_USA: "CP437",
      PC850_MULTILINGUAL: "CP850",
      PC860_PORTUGUESE: "CP860",
      PC863_CANADIAN_FRENCH: "CP863",
      PC865_NORDIC: "CP865",
      PC851_GREEK: "CP860",
      PC857_TURKISH: "CP857",
      PC737_GREEK: "CP737",
      ISO8859_7_GREEK: "ISO-8859-7",
      WPC1252: "CP1252",
      PC866_CYRILLIC2: "CP866",
      PC852_LATIN2: "CP852",
      SLOVENIA: "CP852",
      PC858_EURO: "CP858",
      WPC775_BALTIC_RIM: "CP775",
      PC855_CYRILLIC: "CP855",
      PC861_ICELANDIC: "CP861",
      PC862_HEBREW: "CP862",
      PC864_ARABIC: "CP864",
      PC869_GREEK: "CP869",
      ISO8859_2_LATIN2: "ISO-8859-2",
      ISO8859_15_LATIN9: "ISO-8859-15",
      PC1125_UKRANIAN: "CP1125",
      WPC1250_LATIN2: "WIN1250",
      WPC1251_CYRILLIC: "WIN1251",
      WPC1253_GREEK: "WIN1253",
      WPC1254_TURKISH: "WIN1254",
      WPC1255_HEBREW: "WIN1255",
      WPC1256_ARABIC: "WIN1256",
      WPC1257_BALTIC_RIM: "WIN1257",
      WPC1258_VIETNAMESE: "WIN1258",
      KZ1048_KAZAKHSTAN: "RK1048",
      JAPAN: "EUC-JP",
      KOREA: "EUC-KR",
      CHINA: "EUC-CN",
      HK_TW: "Big5-HKSCS"
    },
    // Barcode format
    BARCODE_TXT_OFF: Buffer.from([29, 72, 0]),
    // HRI barcode chars OFF
    BARCODE_TXT_ABV: Buffer.from([29, 72, 1]),
    // HRI barcode chars above
    BARCODE_TXT_BLW: Buffer.from([29, 72, 2]),
    // HRI barcode chars below
    BARCODE_TXT_BTH: Buffer.from([29, 72, 3]),
    // HRI barcode chars both above and below
    BARCODE_FONT_A: Buffer.from([29, 102, 0]),
    // Font type A for HRI barcode chars
    BARCODE_FONT_B: Buffer.from([29, 102, 1]),
    // Font type B for HRI barcode chars
    BARCODE_HEIGHT: Buffer.from([29, 104, 100]),
    // Barcode Height [1-255]
    BARCODE_WIDTH: Buffer.from([29, 119, 3]),
    // Barcode Width  [2-6]
    BARCODE_UPC_A: Buffer.from([29, 107, 0]),
    // Barcode type UPC-A
    BARCODE_UPC_E: Buffer.from([29, 107, 1]),
    // Barcode type UPC-E
    BARCODE_EAN13: Buffer.from([29, 107, 2]),
    // Barcode type EAN13
    BARCODE_EAN8: Buffer.from([29, 107, 3]),
    // Barcode type EAN8
    BARCODE_CODE39: Buffer.from([29, 107, 4]),
    // Barcode type CODE39
    BARCODE_ITF: Buffer.from([29, 107, 5]),
    // Barcode type ITF
    BARCODE_NW7: Buffer.from([29, 107, 6]),
    // Barcode type NW7
    // QR Code
    QRCODE_MODEL1: Buffer.from([29, 40, 107, 4, 0, 49, 65, 49, 0]),
    // Model 1
    QRCODE_MODEL2: Buffer.from([29, 40, 107, 4, 0, 49, 65, 50, 0]),
    // Model 2
    QRCODE_MODEL3: Buffer.from([29, 40, 107, 4, 0, 49, 65, 51, 0]),
    // Model 3
    QRCODE_CORRECTION_L: Buffer.from([29, 40, 107, 3, 0, 49, 69, 48]),
    // Correction level: L - 7%
    QRCODE_CORRECTION_M: Buffer.from([29, 40, 107, 3, 0, 49, 69, 49]),
    // Correction level: M - 15%
    QRCODE_CORRECTION_Q: Buffer.from([29, 40, 107, 3, 0, 49, 69, 50]),
    // Correction level: Q - 25%
    QRCODE_CORRECTION_H: Buffer.from([29, 40, 107, 3, 0, 49, 69, 51]),
    // Correction level: H - 30%
    QRCODE_CELLSIZE_1: Buffer.from([29, 40, 107, 3, 0, 49, 67, 1]),
    // Cell size 1
    QRCODE_CELLSIZE_2: Buffer.from([29, 40, 107, 3, 0, 49, 67, 2]),
    // Cell size 2
    QRCODE_CELLSIZE_3: Buffer.from([29, 40, 107, 3, 0, 49, 67, 3]),
    // Cell size 3
    QRCODE_CELLSIZE_4: Buffer.from([29, 40, 107, 3, 0, 49, 67, 4]),
    // Cell size 4
    QRCODE_CELLSIZE_5: Buffer.from([29, 40, 107, 3, 0, 49, 67, 5]),
    // Cell size 5
    QRCODE_CELLSIZE_6: Buffer.from([29, 40, 107, 3, 0, 49, 67, 6]),
    // Cell size 6
    QRCODE_CELLSIZE_7: Buffer.from([29, 40, 107, 3, 0, 49, 67, 7]),
    // Cell size 7
    QRCODE_CELLSIZE_8: Buffer.from([29, 40, 107, 3, 0, 49, 67, 8]),
    // Cell size 8
    QRCODE_PRINT: Buffer.from([29, 40, 107, 3, 0, 49, 81, 48]),
    // Print QR code
    // PDF417
    PDF417_CORRECTION: Buffer.from([29, 40, 107, 4, 0, 48, 69, 49]),
    // Append 1-40 for ratio
    PDF417_ROW_HEIGHT: Buffer.from([29, 40, 107, 3, 0, 48, 68]),
    // Append 2-8 for height
    PDF417_WIDTH: Buffer.from([29, 40, 107, 3, 0, 48, 67]),
    // Append 2-8 for width
    PDF417_COLUMNS: Buffer.from([29, 40, 107, 3, 0, 48, 65]),
    PDF417_OPTION_STANDARD: Buffer.from([29, 40, 107, 3, 0, 48, 70, 0]),
    // Standard barcode
    PDF417_OPTION_TRUNCATED: Buffer.from([29, 40, 107, 3, 0, 48, 70, 1]),
    // Truncated barcode
    PDF417_PRINT: Buffer.from([29, 40, 107, 3, 0, 48, 81, 48]),
    // MaxiCode
    // Formatted data containing a structured Carrier Message with a numeric postal code. (US)
    MAXI_MODE2: Buffer.from([29, 40, 107, 3, 0, 50, 65, 50]),
    // Formatted data containing a structured Carrier Message with an alphanumeric postal code. (International)
    MAXI_MODE3: Buffer.from([29, 40, 107, 3, 0, 50, 65, 51]),
    MAXI_MODE4: Buffer.from([29, 40, 107, 3, 0, 50, 65, 52]),
    // Unformatted data with Standard Error Correction.
    MAXI_MODE5: Buffer.from([29, 40, 107, 3, 0, 50, 65, 53]),
    // Unformatted data with Enhanced Error Correction.
    MAXI_MODE6: Buffer.from([29, 40, 107, 3, 0, 50, 65, 54]),
    // For programming hardware devices.
    MAXI_PRINT: Buffer.from([29, 40, 107, 3, 0, 50, 81, 48]),
    // Image format
    S_RASTER_N: Buffer.from([29, 118, 48, 0]),
    // Set raster image normal size
    S_RASTER_2W: Buffer.from([29, 118, 48, 1]),
    // Set raster image double width
    S_RASTER_2H: Buffer.from([29, 118, 48, 2]),
    // Set raster image double height
    S_RASTER_Q: Buffer.from([29, 118, 48, 3]),
    // Set raster image quadruple
    // Printing Density
    PD_N50: Buffer.from([29, 124, 0]),
    // Printing Density -50%
    PD_N37: Buffer.from([29, 124, 1]),
    // Printing Density -37.5%
    PD_N25: Buffer.from([29, 124, 2]),
    // Printing Density -25%
    PD_N12: Buffer.from([29, 124, 3]),
    // Printing Density -12.5%
    PD_0: Buffer.from([29, 124, 4]),
    // Printing Density  0%
    PD_P50: Buffer.from([29, 124, 8]),
    // Printing Density +50%
    PD_P37: Buffer.from([29, 124, 7]),
    // Printing Density +37.5%
    PD_P25: Buffer.from([29, 124, 6])
    // Printing Density +25%
  }), W0;
}
var q0, c6;
function RE() {
  if (c6) return q0;
  c6 = 1;
  const e = en();
  class t extends e {
    constructor() {
      super(), this.config = IE();
    }
    // ------------------------------ Append ------------------------------
    append(n) {
      this.buffer ? this.buffer = Buffer.concat([this.buffer, n]) : this.buffer = n;
    }
    // ------------------------------ Beep ------------------------------
    beep() {
      return this.config.BEEP;
    }
    // ------------------------------ Set text size ------------------------------
    setTextSize(n, i) {
      if (this.buffer = null, n > 7 || n < 0) throw new Error("setTextSize: Height must be between 0 and 7");
      if (i > 7 || i < 0) throw new Error("setTextSize: Width must be between 0 and 7");
      const o = Buffer.from(`${n}${i}`, "hex");
      return this.append(Buffer.from([29, 33])), this.append(o), this.buffer;
    }
    // ------------------------------ QR ------------------------------
    printQR(n, i) {
      if (this.buffer = null, i = i || {}, i.model ? i.model === 1 ? this.append(this.config.QRCODE_MODEL1) : i.model === 3 ? this.append(this.config.QRCODE_MODEL3) : this.append(this.config.QRCODE_MODEL2) : this.append(this.config.QRCODE_MODEL2), i.cellSize) {
        const f = "QRCODE_CELLSIZE_".concat(i.cellSize.toString());
        this.append(this.config[f]);
      } else
        this.append(this.config.QRCODE_CELLSIZE_3);
      if (i.correction) {
        const f = "QRCODE_CORRECTION_".concat(i.correction.toUpperCase());
        this.append(this.config[f]);
      } else
        this.append(this.config.QRCODE_CORRECTION_M);
      const o = n.length + 3, s = parseInt(o % 256), a = parseInt(o / 256);
      return this.append(Buffer.from([29, 40, 107, s, a, 49, 80, 48])), this.append(Buffer.from(n)), this.append(this.config.QRCODE_PRINT), this.buffer;
    }
    // ------------------------------ PDF417 ------------------------------
    pdf417(n, i) {
      this.buffer = null, i = i || {}, i.correction ? (this.append(this.config.PDF417_CORRECTION), this.append(Buffer.from([i.correction]))) : (this.append(this.config.PDF417_CORRECTION), this.append(Buffer.from([1]))), i.rowHeight ? (this.append(this.config.PDF417_ROW_HEIGHT), this.append(Buffer.from([i.rowHeight]))) : (this.append(this.config.PDF417_ROW_HEIGHT), this.append(Buffer.from([3]))), i.width ? (this.append(this.config.PDF417_WIDTH), this.append(Buffer.from([i.width]))) : (this.append(this.config.PDF417_WIDTH), this.append(Buffer.from([3]))), i.columns ? (this.append(this.config.PDF417_COLUMNS), this.append(Buffer.from([i.columns]))) : (this.append(this.config.PDF417_COLUMNS), this.append(Buffer.from([0]))), i.truncated ? this.append(this.config.PDF417_OPTION_TRUNCATED) : this.append(this.config.PDF417_OPTION_STANDARD);
      const o = n.length + 3, s = parseInt(o % 256), a = parseInt(o / 256);
      return this.append(Buffer.from([29, 40, 107, s, a, 48, 80, 48])), this.append(Buffer.from(n.toString())), this.append(Buffer.from(this.config.PDF417_PRINT)), this.buffer;
    }
    // ------------------------------ MAXI CODE ------------------------------
    maxiCode(n, i) {
      this.buffer = null, i = i || {}, i.mode ? i.mode == 2 ? this.append(this.config.MAXI_MODE2) : i.mode == 3 ? this.append(this.config.MAXI_MODE3) : i.mode == 5 ? this.append(this.config.MAXI_MODE5) : i.mode == 6 ? this.append(this.config.MAXI_MODE6) : this.append(this.config.MAXI_MODE4) : this.append(this.config.MAXI_MODE4);
      const o = n.length + 3, s = parseInt(o % 256), a = parseInt(o / 256);
      return this.append(Buffer.from([29, 40, 107, s, a, 50, 80, 48])), this.append(Buffer.from(n.toString())), this.append(this.config.MAXI_PRINT), this.buffer;
    }
    // ------------------------------ BARCODE ------------------------------
    printBarcode(n, i, o) {
      return this.buffer = null, o = o || {}, o.hriPos ? (this.append(Buffer.from([29, 72])), this.append(Buffer.from([o.hriPos]))) : this.append(Buffer.from([29, 72, 0])), o.hriFont ? (this.append(Buffer.from([29, 102])), this.append(Buffer.from([o.hriFont]))) : this.append(Buffer.from([29, 102, 0])), o.width ? (this.append(Buffer.from([29, 119])), this.append(Buffer.from([o.width]))) : this.append(Buffer.from([29, 119, 3])), o.height ? (this.append(Buffer.from([29, 104])), this.append(Buffer.from([o.height]))) : this.append(Buffer.from([29, 104, 162])), this.append(Buffer.from([29, 107])), this.append(Buffer.from([i, n.length])), this.append(Buffer.from(n)), this.buffer;
    }
    // ----------------------------------------------------- PRINT IMAGE -----------------------------------------------------
    // https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=88
    async printImage(n) {
      const i = Ie, { PNG: o } = br;
      try {
        const s = i.readFileSync(n), a = o.sync.read(s);
        return this.printImageBuffer(a.width, a.height, a.data);
      } catch (s) {
        throw s;
      }
    }
    printImageBuffer(n, i, o) {
      this.buffer = null;
      const s = [];
      for (let c = 0; c < i; c++) {
        const l = [];
        for (let u = 0; u < n; u++) {
          const h = n * c + u << 2;
          l.push({
            r: o[h],
            g: o[h + 1],
            b: o[h + 2],
            a: o[h + 3]
          });
        }
        s.push(l);
      }
      const a = [];
      for (let c = 0; c < i; c++)
        for (let l = 0; l < Math.ceil(n / 8); l++) {
          let u = 0;
          for (let h = 0; h < 8; h++) {
            let d = s[c][l * 8 + h];
            if (d === void 0 && (d = {
              a: 0,
              r: 0,
              g: 0,
              b: 0
            }), d.a > 126 && parseInt(0.2126 * d.r + 0.7152 * d.g + 0.0722 * d.b) < 128) {
              const p = 1 << 7 - h;
              u |= p;
            }
          }
          a.push(u);
        }
      const f = Buffer.from(a);
      return n % 8 != 0 && (n += 8), this.append(Buffer.from([29, 118, 48, 48])), this.append(Buffer.from([n >> 3 & 255])), this.append(Buffer.from([0])), this.append(Buffer.from([i & 255])), this.append(Buffer.from([i >> 8 & 255])), this.append(f), this.buffer;
    }
  }
  return q0 = t, q0;
}
var j0, u6;
function BE() {
  return u6 || (u6 = 1, j0 = {
    // Feed control sequences
    CTL_LF: Buffer.from([10]),
    // Print and line feed
    CTL_FF: Buffer.from([12]),
    // Form feed
    CTL_CR: Buffer.from([13]),
    // Carriage return
    CTL_HT: Buffer.from([9]),
    // Horizontal tab
    CTL_SET_HT: Buffer.from([27, 68]),
    // Set horizontal tab positions
    CTL_VT: Buffer.from([11]),
    // Vertical tab
    // Printer hardware
    HW_INIT: Buffer.from([27, 64]),
    // Clear data in buffer and reset modes
    HW_SELECT: Buffer.from([27, 61, 1]),
    // Printer select
    HW_RESET: Buffer.from([27, 63, 10, 0]),
    // Reset printer hardware
    BEEP: Buffer.from([7]),
    // Sounds built-in buzzer (if equipped)
    // Cash Drawer
    CD_KICK_2: Buffer.from([27, 112, 0]),
    // Sends a pulse to pin 2 []
    CD_KICK_5: Buffer.from([27, 112, 1]),
    // Sends a pulse to pin 5 []
    // Paper
    PAPER_FULL_CUT: Buffer.from([27, 109]),
    // Full cut paper
    PAPER_PART_CUT: Buffer.from([27, 109]),
    // Partial cut paper
    // Text format
    TXT_NORMAL: Buffer.from([27, 33, 0, 18]),
    // Normal text
    TXT_2HEIGHT: Buffer.from([27, 119, 1]),
    // Double height text
    TXT_2WIDTH: Buffer.from([27, 14, 0]),
    // Double width text
    TXT_UNDERL_OFF: Buffer.from([27, 45, 0]),
    // Underline font OFF
    TXT_UNDERL_ON: Buffer.from([27, 45, 1]),
    // Underline font 1-dot ON
    TXT_BOLD_OFF: Buffer.from([27, 70]),
    // Bold font OFF
    TXT_BOLD_ON: Buffer.from([27, 69]),
    // Bold font ON
    TXT_FONT_A: Buffer.from([20]),
    // Font type A
    TXT_FONT_B: Buffer.from([27, 15]),
    // Font type B
    TXT_ALIGN_LT: Buffer.from([27, 106, 0]),
    // Left justification
    TXT_ALIGN_CT: Buffer.from([27, 106, 1]),
    // Centering
    TXT_ALIGN_RT: Buffer.from([27, 106, 2]),
    // Right justification
    // All code pages supported by printer.
    CODE_PAGE_PC437_USA: Buffer.from([27, 116, 0]),
    CODE_PAGE_KATAKANA: Buffer.from([27, 116, 1]),
    CODE_PAGE_PC850_MULTILINGUAL: Buffer.from([27, 116, 2]),
    CODE_PAGE_PC860_PORTUGUESE: Buffer.from([27, 116, 3]),
    CODE_PAGE_PC863_CANADIAN_FRENCH: Buffer.from([27, 116, 4]),
    CODE_PAGE_PC865_NORDIC: Buffer.from([27, 116, 5]),
    CODE_PAGE_PC851_GREEK: Buffer.from([27, 116, 11]),
    CODE_PAGE_PC853_TURKISH: Buffer.from([27, 116, 12]),
    CODE_PAGE_PC857_TURKISH: Buffer.from([27, 116, 13]),
    CODE_PAGE_PC737_GREEK: Buffer.from([27, 116, 14]),
    CODE_PAGE_ISO8859_7_GREEK: Buffer.from([27, 116, 15]),
    CODE_PAGE_WPC1252: Buffer.from([27, 116, 16]),
    CODE_PAGE_PC866_CYRILLIC2: Buffer.from([27, 116, 17]),
    CODE_PAGE_PC852_LATIN2: Buffer.from([27, 116, 18]),
    CODE_PAGE_SLOVENIA: Buffer.from([27, 116, 18]),
    CODE_PAGE_PC858_EURO: Buffer.from([27, 116, 19]),
    CODE_PAGE_KU42_THAI: Buffer.from([27, 116, 20]),
    CODE_PAGE_TIS11_THAI: Buffer.from([27, 116, 21]),
    CODE_PAGE_TIS18_THAI: Buffer.from([27, 116, 26]),
    CODE_PAGE_TCVN3_VIETNAMESE_L: Buffer.from([27, 116, 30]),
    CODE_PAGE_TCVN3_VIETNAMESE_U: Buffer.from([27, 116, 31]),
    CODE_PAGE_PC720_ARABIC: Buffer.from([27, 116, 32]),
    CODE_PAGE_WPC775_BALTIC_RIM: Buffer.from([27, 116, 33]),
    CODE_PAGE_PC855_CYRILLIC: Buffer.from([27, 116, 34]),
    CODE_PAGE_PC861_ICELANDIC: Buffer.from([27, 116, 35]),
    CODE_PAGE_PC862_HEBREW: Buffer.from([27, 116, 36]),
    CODE_PAGE_PC864_ARABIC: Buffer.from([27, 116, 37]),
    CODE_PAGE_PC869_GREEK: Buffer.from([27, 116, 38]),
    CODE_PAGE_ISO8859_2_LATIN2: Buffer.from([27, 116, 39]),
    CODE_PAGE_ISO8859_15_LATIN9: Buffer.from([27, 116, 40]),
    CODE_PAGE_PC1098_FARCI: Buffer.from([27, 116, 41]),
    CODE_PAGE_PC1118_LITHUANIAN: Buffer.from([27, 116, 42]),
    CODE_PAGE_PC1119_LITHUANIAN: Buffer.from([27, 116, 43]),
    CODE_PAGE_PC1125_UKRANIAN: Buffer.from([27, 116, 44]),
    CODE_PAGE_WPC1250_LATIN2: Buffer.from([27, 116, 45]),
    CODE_PAGE_WPC1251_CYRILLIC: Buffer.from([27, 116, 46]),
    CODE_PAGE_WPC1253_GREEK: Buffer.from([27, 116, 47]),
    CODE_PAGE_WPC1254_TURKISH: Buffer.from([27, 116, 48]),
    CODE_PAGE_WPC1255_HEBREW: Buffer.from([27, 116, 49]),
    CODE_PAGE_WPC1256_ARABIC: Buffer.from([27, 116, 50]),
    CODE_PAGE_WPC1257_BALTIC_RIM: Buffer.from([27, 116, 51]),
    CODE_PAGE_WPC1258_VIETNAMESE: Buffer.from([27, 116, 52]),
    CODE_PAGE_KZ1048_KAZAKHSTAN: Buffer.from([27, 116, 53]),
    CODE_PAGE_JAPAN: Buffer.from([27, 82, 8]),
    CODE_PAGE_KOREA: Buffer.from([27, 82, 13]),
    CODE_PAGE_CHINA: Buffer.from([27, 82, 15]),
    CODE_PAGE_HK_TW: Buffer.from([27, 82, 0]),
    CODE_PAGE_TCVN_VIETNAMESE: Buffer.from([27, 116, 52]),
    // Character code pages / iconv name of code table.
    // Only code pages supported by iconv-lite:
    // https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
    CODE_PAGES: {
      PC437_USA: "CP437",
      PC850_MULTILINGUAL: "CP850",
      PC860_PORTUGUESE: "CP860",
      PC863_CANADIAN_FRENCH: "CP863",
      PC865_NORDIC: "CP865",
      PC851_GREEK: "CP860",
      PC857_TURKISH: "CP857",
      PC737_GREEK: "CP737",
      ISO8859_7_GREEK: "ISO-8859-7",
      WPC1252: "CP1252",
      PC866_CYRILLIC2: "CP866",
      PC852_LATIN2: "CP852",
      SLOVENIA: "CP852",
      PC858_EURO: "CP858",
      WPC775_BALTIC_RIM: "CP775",
      PC855_CYRILLIC: "CP855",
      PC861_ICELANDIC: "CP861",
      PC862_HEBREW: "CP862",
      PC864_ARABIC: "CP864",
      PC869_GREEK: "CP869",
      ISO8859_2_LATIN2: "ISO-8859-2",
      ISO8859_15_LATIN9: "ISO-8859-15",
      PC1125_UKRANIAN: "CP1125",
      WPC1250_LATIN2: "WIN1250",
      WPC1251_CYRILLIC: "WIN1251",
      WPC1253_GREEK: "WIN1253",
      WPC1254_TURKISH: "WIN1254",
      WPC1255_HEBREW: "WIN1255",
      WPC1256_ARABIC: "WIN1256",
      WPC1257_BALTIC_RIM: "WIN1257",
      WPC1258_VIETNAMESE: "WIN1258",
      KZ1048_KAZAKHSTAN: "RK1048",
      JAPAN: "EUC-JP",
      KOREA: "EUC-KR",
      CHINA: "EUC-CN",
      HK_TW: "Big5-HKSCS",
      TCVN_VIETNAMESE: "tcvn"
    }
  }), j0;
}
var V0, h6;
function DE() {
  if (h6) return V0;
  h6 = 1;
  const e = en();
  class t extends e {
    constructor() {
      super(), this.config = BE();
    }
    // ------------------------------ Append ------------------------------
    append(n) {
      this.buffer ? this.buffer = Buffer.concat([this.buffer, n]) : this.buffer = n;
    }
    // ------------------------------ Beep ------------------------------
    beep() {
      return this.config.BEEP;
    }
  }
  return V0 = t, V0;
}
var K0, d6;
function NE() {
  return d6 || (d6 = 1, K0 = {
    // Feed control sequences
    CTL_LF: Buffer.from([10]),
    // Print and line feed
    CTL_FF: Buffer.from([12]),
    // Form feed
    CTL_CR: Buffer.from([13]),
    // Carriage return
    CTL_HT: Buffer.from([9]),
    // Horizontal tab
    CTL_SET_HT: Buffer.from([27, 68]),
    // Set horizontal tab positions
    CTL_VT: Buffer.from([11]),
    // Perform vertical tab    
    // Printer hardware
    HW_INIT: Buffer.from([27, 105, 97, 0, 27, 64]),
    // Clear data in buffer and reset modes
    HW_INITSOFT: Buffer.from([27, 64]),
    // Paper
    PAPER_FULL_CUT: Buffer.from([27, 105, 67, 1]),
    // Full cut paper
    PAPER_PART_CUT: Buffer.from([27, 105, 67, 2]),
    // Cancels cutting
    // Text format
    // TXT_NORMAL      : Buffer.from([0x1b, 0x21, 0x00]), // Normal text
    // TXT_2HEIGHT     : Buffer.from([0x1b, 0x21, 0x10]), // Double height text
    TXT_2WIDTH: Buffer.from([27, 87, 1]),
    // Double width text
    TXT_2WIDTH_OFF: Buffer.from([27, 87, 0]),
    // Cancel Double width text
    // TXT_4SQUARE     : Buffer.from([0x1b, 0x21, 0x30]), // Quad area text
    TXT_UNDERL_OFF: Buffer.from([27, 45, 0]),
    // Underline font OFF
    TXT_UNDERL_ON: Buffer.from([27, 45, 1]),
    // Underline font 1-dot ON
    TXT_UNDERL2_ON: Buffer.from([27, 45, 2]),
    // Underline font 2-dot ON
    TXT_BOLD_OFF: Buffer.from([27, 70]),
    // Bold font OFF
    TXT_BOLD_ON: Buffer.from([27, 69]),
    // Bold font ON
    // TXT_INVERT_OFF  : Buffer.from([0x1d, 0x42, 0x00]), // Invert font OFF (eg. white background)
    // TXT_INVERT_ON   : Buffer.from([0x1d, 0x42, 0x01]), // Invert font ON (eg. black background)
    TXT_FONT_A: Buffer.from([27, 107, 11]),
    // Font type A
    // TXT_FONT_B      : Buffer.from([0x1b, 0x4d, 0x01]), // Font type B
    TXT_ALIGN_LT: Buffer.from([27, 97, 0]),
    // Left justification
    TXT_ALIGN_CT: Buffer.from([27, 97, 1]),
    // Centering
    TXT_ALIGN_RT: Buffer.from([27, 97, 2]),
    // Right justification
    // All code pages supported by printer.
    CODE_PAGE_STANDARD: Buffer.from([27, 116, 0]),
    CODE_PAGE_EASTERN_EUROPEAN: Buffer.from([27, 116, 1]),
    CODE_PAGE_WESTERN_EUROPEAN: Buffer.from([27, 116, 2]),
    CODE_PAGE_RESERVED: Buffer.from([27, 116, 3]),
    CODE_PAGE_JAPANESE: Buffer.from([27, 116, 4]),
    // Character code pages / iconv name of code table.
    // Only code pages supported by iconv-lite:
    // https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
    CODE_PAGES: {
      STANDARD: "CP437",
      WESTERN_EUROPEAN: "CP1252",
      EASTERN_EUROPEAN: "WIN1250",
      JAPANESE: "EUC-JP"
    },
    // Character / style selection commands
    ESCR: Buffer.from([27, 82]),
    //Select international character set
    ESCq: Buffer.from([27, 113]),
    //Select character style
    ESCk: Buffer.from([27, 107]),
    //Select font
    ESCt: Buffer.from([27, 116]),
    //Select character code set
    // Text printing commands
    ESC4: Buffer.from([27, 52]),
    //	Apply italic style
    ESC5: Buffer.from([27, 53, 0]),
    //	Cancel italic style
    ESCE: Buffer.from([27, 69, 0]),
    //Apply bold style
    ESCF: Buffer.from([27, 70, 0]),
    //	Cancel bold style
    ESCG: Buffer.from([27, 71, 0]),
    //	Apply double-strike printing
    ESCH: Buffer.from([27, 72, 0]),
    //	Cancel double-strike printing
    ESCP: Buffer.from([27, 80, 0]),
    //	Apply pica pitch (10 cpi)
    ESCM: Buffer.from([27, 77, 0]),
    //	Apply elite pitch (12 cpi)
    ESCq: Buffer.from([27, 103, 0]),
    //	Apply micron pitch (15 cpi)
    ESCp: Buffer.from([27, 112, 0]),
    //	Specify proportional characters
    ESCW: Buffer.from([27, 87, 0]),
    //	Specify double-width characters
    SO: Buffer.from([14]),
    //	"Specify  auto-canceling   stretched characters"
    ESCSO: Buffer.from([27, 14, 0]),
    //	"Specify  auto-canceling   stretched characters"
    SI: Buffer.from([15]),
    //	Specify compressed characters
    ESCSI: Buffer.from([27, 15]),
    //	Specify compressed characters
    DC2: Buffer.from([18]),
    //	Cancel compressed characters
    DC4: Buffer.from([20]),
    //Cancel auto-canceling double-width characters
    ESC_UNDER: Buffer.from([27, 45]),
    //Apply/cancel underlining
    ESC_GFOR: Buffer.from([27, 33]),
    //	Global formatting
    ESCSP: Buffer.from([27, 32]),
    //	Specify character spacing
    ESCX: Buffer.from([27, 88]),
    //Specify character size
    // Line feed commands
    ESC0: Buffer.from([27, 48]),
    //Specify line feed of 1/8 inch
    ESC2: Buffer.from([27, 50]),
    //Specify line feed of 1/6 inch
    ESC3: Buffer.from([27, 51]),
    //	Specify minimum line feed
    ESCA: Buffer.from([27, 65]),
    //Specify line feed of n/60 inch
    // Horizontal movement commands
    ESCl: Buffer.from([27, 108]),
    //Specify left margin
    ESCQ: Buffer.from([27, 81]),
    //Specify right margin
    CR: Buffer.from([13]),
    //	Carriage return
    ESCD: Buffer.from([27, 68]),
    //	Specify horizontal tab position
    HT: Buffer.from([9]),
    //	Perform horizontal tab
    ESC$: Buffer.from([27, 36]),
    //	"Specify absolutehorizontal position"
    ESC_RHP: Buffer.from([27, 92]),
    //	Specify relative horizontal position
    ESCa: Buffer.from([27, 97]),
    //Specify alignment
    // Vertical movement commands
    LF: Buffer.from([10]),
    //	Line feed
    FF: Buffer.from([12]),
    //	Page feed
    ESCJ: Buffer.from([27, 74]),
    //Forward paper feed
    ESCB: Buffer.from([27, 66]),
    //	Specify vertical tab position
    VT: Buffer.from([11]),
    //	Perform vertical tab
    ESC_ABSV: Buffer.from([27, 40, 86]),
    //	Specify absolute vertical position
    ESC_RELV: Buffer.from([27, 40, 118]),
    //Specify relative vertical position
    // Paper formatting commands
    ESC_PF: Buffer.from([27, 40, 99]),
    //Specify page format
    ESC_PL: Buffer.from([27, 40, 67]),
    //Specify page length
    // Printer control commands
    ESC_INIT: Buffer.from([27, 64]),
    //Initialize (defaults)
    // Graphics commands
    ESC_BIT_IMG: Buffer.from([27, 42]),
    //Select bit image.
    ESCK: Buffer.from([27, 75]),
    //8-dot single-density bit image
    ESCL: Buffer.from([27, 76]),
    //8-dot double-density bit image
    ESCY: Buffer.from([27, 89]),
    //"8-dot double-speeddouble-density bit image"
    ESCZ: Buffer.from([27, 90]),
    //8-dot quadruple-density bit image
    // Advanced commands
    ESCiB: Buffer.from([27, 105, 66]),
    //Barcode
    ESCiQ: Buffer.from([27, 105, 81]),
    //2D barcode (QR Code)
    ESCiP: Buffer.from([27, 105, 80]),
    //Specify QR Code version
    ESCiV: Buffer.from([27, 105, 86]),
    //	2D barcode (PDF417)
    ESCiD: Buffer.from([27, 105, 68]),
    //2D barcode (DataMatrix)
    ESCiM: Buffer.from([27, 105, 77]),
    //2D barcode (MaxiCode)
    ESCiJ: Buffer.from([27, 105, 106]),
    //2D barcode (Aztec)
    ESCiG: Buffer.from([27, 105, 71]),
    //Specify font setting
    ESCiFP: Buffer.from([27, 105, 70, 80]),
    //Print downloaded data
    ESCia: Buffer.from([27, 105, 97]),
    //Switch command mode
    ESCiS: Buffer.from([27, 105, 83]),
    //Status information request
    ESCiL: Buffer.from([27, 105, 76]),
    //Specify landscape orientation
    ESCiC: Buffer.from([27, 105, 67]),
    //Specify cutting
    ESCiH: Buffer.from([27, 124, 72]),
    //Specify recovery setting
    // Advanced static commands
    ESCiXQ2: Buffer.from([27, 105, 88, 81, 50]),
    //Select default character style
    ESCiXQ1: Buffer.from([27, 105, 88, 81, 49]),
    //Retrieve default character style
    ESCiXk2: Buffer.from([27, 105, 88, 107, 50]),
    //Select default font
    ESCiXk1: Buffer.from([27, 105, 88, 107, 49]),
    //Retrieve default font
    ESCiXX2: Buffer.from([27, 105, 88, 88, 50]),
    //Specify default character size
    ESCiXX1: Buffer.from([27, 105, 88, 88, 49]),
    //Retrieve default character size
    ESCiX32: Buffer.from([27, 105, 88, 51, 50]),
    //Specify default line feed
    ESCiX31: Buffer.from([27, 105, 88, 51, 49]),
    //Retrieve default line feed
    ESCiXA2: Buffer.from([27, 105, 88, 65, 50]),
    //Select default alignment
    ESCiXA1: Buffer.from([27, 105, 88, 65, 49]),
    //Retrieve default alignment
    ESCiXL2: Buffer.from([27, 105, 88, 76, 50]),
    //"Select default landscape orientation"
    ESCiXL1: Buffer.from([27, 105, 88, 76, 49]),
    //"Retrieve default landscapeorientation"
    ESCiXj2: Buffer.from([27, 105, 88, 106, 50]),
    //Select default international character set
    ESCiXj1: Buffer.from([27, 105, 88, 106, 49]),
    //"Retrieve default internationalcharacter set"
    ESCiXm2: Buffer.from([27, 105, 88, 109, 50]),
    //Select default character code set
    ESCiXm1: Buffer.from([27, 105, 88, 109, 49]),
    //"Retrieve   default   character   codeset"
    ESCiXd2: Buffer.from([27, 105, 88, 100, 50]),
    //Specify recovery setting
    ESCiXd1: Buffer.from([27, 105, 88, 100, 49]),
    //Retrieve recovery setting
    ESCiXE2: Buffer.from([27, 105, 88, 69, 50]),
    //Specify barcode margin setting
    ESCiXE1: Buffer.from([27, 105, 88, 69, 49])
    //Retrieve barcode margin setting
  }), K0;
}
var X0, p6;
function LE() {
  if (p6) return X0;
  p6 = 1;
  const e = en();
  class t extends e {
    constructor() {
      super(), this.config = NE();
    }
    // ------------------------------ Append ------------------------------
    append(n) {
      this.buffer ? this.buffer = Buffer.concat([this.buffer, n]) : this.buffer = n;
    }
    // ------------------------------ Set text size ------------------------------
    setTextSize(n, i) {
      if (this.buffer = null, n > 144 || n < 0)
        throw new Error("setTextSize: Height must be between 0 and 7");
      let o = Buffer.from([n]);
      return this.append(Buffer.from([27, 88, 0])), this.append(o), this.append(Buffer.from([0])), this.buffer;
    }
    // ------------------------------ BARCODE ------------------------------
    printBarcode(n, i, o) {
      if (this.buffer = null, o = o || {}, this.append(Buffer.from([27, 105])), this.append(Buffer.from(i)), this.append(Buffer.from(o.hri)), this.append(Buffer.from(o.width)), this.append(Buffer.from("h")), o.height < 255)
        this.append(
          Buffer.from(
            (o.height.toString(16) + "").length < 2 ? "0" + o.height.toString(16) : o.height.toString(16),
            "hex"
          )
        ), this.append(Buffer.from([0]));
      else {
        const s = o.height - 256;
        this.append(
          Buffer.from(
            (s.toString(16) + "").length < 2 ? "0" + s.toString(16) : s.toString(16),
            "hex"
          )
        ), this.append(Buffer.from([1]));
      }
      return (i === "tb" || i === "tc") && (this.append(Buffer.from(o.o)), this.append(Buffer.from(o.c))), this.append(Buffer.from(o.e)), this.append(Buffer.from(o.z)), this.append(Buffer.from(o.f)), this.append(Buffer.from([66])), this.append(Buffer.from(n)), this.append(Buffer.from([92])), this.buffer;
    }
    printQR(n, i) {
      return this.buffer = null, i = i || {}, this.append(Buffer.from([27, 105, 81])), this.append(
        Buffer.from(
          (i.cellSize.toString(16) + "").length < 2 ? "0" + i.cellSize.toString(16) : i.cellSize.toString(16),
          "hex"
        )
      ), this.append(Buffer.from([2])), this.append(Buffer.from([0])), this.append(Buffer.from([0])), this.append(Buffer.from([0])), this.append(Buffer.from([0])), this.append(Buffer.from([2])), this.append(Buffer.from([0])), this.append(Buffer.from(n)), this.append(Buffer.from([92, 92, 92])), this.buffer;
    }
    // ----------------------------------------------------- PRINT IMAGE -----------------------------------------------------
    // https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=88
    async printImage(n) {
      let i = Ie, o = br.PNG;
      try {
        let s = i.readFileSync(n), a = o.sync.read(s);
        return this.printImageBuffer(a.width, a.height, a.data);
      } catch (s) {
        throw s;
      }
    }
    printImageBuffer(n, i, o) {
      this.buffer = null, this.append(Buffer.from([27, 33, 16]));
      let s = [];
      for (let a = 0; a < n; a++) {
        let f = [];
        for (let c = 0; c < i; c++) {
          let l = n * c + a << 2;
          f.push({
            r: o[l],
            g: o[l + 1],
            b: o[l + 2],
            a: o[l + 3]
          });
        }
        s.push(f);
      }
      for (let a = 0; a < Math.ceil(i / 48); a++) {
        let f = [];
        for (let l = 0; l < n; l++)
          for (let u = 0; u < 6; u++) {
            let h = 0;
            for (let d = 0; d < 8; d++) {
              let _ = s[l][a * 48 + u * 8 + d];
              if (_ === void 0 && (_ = {
                a: 0,
                r: 0,
                g: 0,
                b: 0
              }), _.a > 126 && parseInt(
                0.2126 * _.r + 0.7152 * _.g + 0.0722 * _.b
              ) < 128) {
                let x = 1 << 7 - d;
                h |= x;
              }
            }
            f.push(h);
          }
        this.append(Buffer.from([27, 42, 72, n, 0]));
        let c = Buffer.from(f);
        this.append(c), this.append(Buffer.from([10]));
      }
      return n % 8 != 0 && (n += 8), this.buffer;
    }
    SetInternationalCharacterSet(n) {
      return this.append(Buffer.from([27, 82, n])), this.buffer;
    }
    // Methods to be implemented
    /*
    setLandscape() {}
    setPageLength() {}
    setPageFormat() {}
    SetLeftRightMargin() {}
    SetLineFeedAmount() {}
    SetHTabPosition() {}
    SetVtabPosition() {}
    SetVPrintingPosition() {}
    SetHPrintingPosition() {}
    SetFont() {}
    SetCharacterCode() {}
    SetCharacterSpacing() {}
    SetCharacterStyle() {}
    SetBitimage() {}
    SetBarcode() {}
    Set2DBarcode() {}
    */
  }
  return X0 = t, X0;
}
var Y0, m6;
function FE() {
  return m6 || (m6 = 1, Y0 = {
    // Feed control sequences
    CTL_LF: Buffer.from([10]),
    // Print and line feed
    CTL_FF: Buffer.from([12]),
    // Form feed
    CTL_CR: Buffer.from([13]),
    // Carriage return
    CTL_HT: Buffer.from([9]),
    // Horizontal tab
    CTL_SET_HT: Buffer.from([27, 68]),
    // Set horizontal tab positions
    CTL_VT: Buffer.from([27, 100, 4]),
    // Vertical tab
    // Printer hardware
    HW_INIT: Buffer.from([27, 64]),
    // Clear data in buffer and reset modes
    HW_SELECT: Buffer.from([27, 61, 1]),
    // Printer select
    HW_RESET: Buffer.from([27, 63, 10, 0]),
    // Reset printer hardware
    TRANSMIT_PAPER_STATUS: Buffer.from([29, 114, 1]),
    // Transmit printer paper status
    BEEP: Buffer.from([27, 66]),
    // Sounds built-in buzzer (if equipped)
    UPSIDE_DOWN_ON: Buffer.from([27, 123, 1]),
    // Upside down printing ON (rotated 180 degrees).
    UPSIDE_DOWN_OFF: Buffer.from([27, 123, 0]),
    // Upside down printing OFF (default).
    // Cash Drawer
    CD_KICK_2: Buffer.from([27, 112, 0]),
    // Sends a pulse to pin 2 []
    CD_KICK_5: Buffer.from([27, 112, 1]),
    // Sends a pulse to pin 5 []
    // Paper
    PAPER_FULL_CUT: Buffer.from([27, 105]),
    // Full cut paper
    PAPER_PART_CUT: Buffer.from([27, 105]),
    // Partial cut paper
    // Text format
    TXT_NORMAL: Buffer.from([27, 33, 0]),
    // Normal text
    TXT_2HEIGHT: Buffer.from([27, 33, 16]),
    // Double height text
    TXT_2WIDTH: Buffer.from([27, 33, 32]),
    // Double width text
    TXT_4SQUARE: Buffer.from([27, 33, 48]),
    // Quad area text
    TXT_UNDERL_OFF: Buffer.from([27, 45, 0]),
    // Underline font OFF
    TXT_UNDERL_ON: Buffer.from([27, 45, 1]),
    // Underline font 1-dot ON
    TXT_UNDERL2_ON: Buffer.from([27, 45, 2]),
    // Underline font 2-dot ON
    TXT_BOLD_OFF: Buffer.from([27, 69, 0]),
    // Bold font OFF
    TXT_BOLD_ON: Buffer.from([27, 69, 1]),
    // Bold font ON
    TXT_INVERT_OFF: Buffer.from([29, 66, 0]),
    // Invert font OFF (eg. white background)
    TXT_INVERT_ON: Buffer.from([29, 66, 1]),
    // Invert font ON (eg. black background)
    TXT_FONT_A: Buffer.from([27, 77, 0]),
    // Font type A
    TXT_FONT_B: Buffer.from([27, 77, 1]),
    // Font type B
    TXT_ALIGN_LT: Buffer.from([27, 97, 0]),
    // Left justification
    TXT_ALIGN_CT: Buffer.from([27, 97, 1]),
    // Centering
    TXT_ALIGN_RT: Buffer.from([27, 97, 2]),
    // Right justification
    // All code pages supported by printer.
    CODE_PAGE_PC437_USA: Buffer.from([27, 116, 0]),
    CODE_PAGE_KATAKANA: Buffer.from([27, 116, 1]),
    CODE_PAGE_PC850_MULTILINGUAL: Buffer.from([27, 116, 2]),
    CODE_PAGE_PC860_PORTUGUESE: Buffer.from([27, 116, 3]),
    CODE_PAGE_PC863_CANADIAN_FRENCH: Buffer.from([27, 116, 4]),
    CODE_PAGE_PC865_NORDIC: Buffer.from([27, 116, 5]),
    CODE_PAGE_PC851_GREEK: Buffer.from([27, 116, 11]),
    CODE_PAGE_PC853_TURKISH: Buffer.from([27, 116, 12]),
    CODE_PAGE_PC857_TURKISH: Buffer.from([27, 116, 13]),
    CODE_PAGE_PC737_GREEK: Buffer.from([27, 116, 14]),
    CODE_PAGE_ISO8859_7_GREEK: Buffer.from([27, 116, 15]),
    CODE_PAGE_WPC1252: Buffer.from([27, 116, 16]),
    CODE_PAGE_PC866_CYRILLIC2: Buffer.from([27, 116, 17]),
    CODE_PAGE_PC852_LATIN2: Buffer.from([27, 116, 18]),
    CODE_PAGE_SLOVENIA: Buffer.from([27, 116, 18]),
    CODE_PAGE_PC858_EURO: Buffer.from([27, 116, 19]),
    CODE_PAGE_KU42_THAI: Buffer.from([27, 116, 20]),
    CODE_PAGE_TIS11_THAI: Buffer.from([27, 116, 21]),
    CODE_PAGE_TIS18_THAI: Buffer.from([27, 116, 26]),
    CODE_PAGE_TCVN3_VIETNAMESE_L: Buffer.from([27, 116, 30]),
    CODE_PAGE_TCVN3_VIETNAMESE_U: Buffer.from([27, 116, 31]),
    CODE_PAGE_PC720_ARABIC: Buffer.from([27, 116, 32]),
    CODE_PAGE_WPC775_BALTIC_RIM: Buffer.from([27, 116, 33]),
    CODE_PAGE_PC855_CYRILLIC: Buffer.from([27, 116, 34]),
    CODE_PAGE_PC861_ICELANDIC: Buffer.from([27, 116, 35]),
    CODE_PAGE_PC862_HEBREW: Buffer.from([27, 116, 36]),
    CODE_PAGE_PC864_ARABIC: Buffer.from([27, 116, 37]),
    CODE_PAGE_PC869_GREEK: Buffer.from([27, 116, 38]),
    CODE_PAGE_ISO8859_2_LATIN2: Buffer.from([27, 116, 39]),
    CODE_PAGE_ISO8859_15_LATIN9: Buffer.from([27, 116, 40]),
    CODE_PAGE_PC1098_FARCI: Buffer.from([27, 116, 41]),
    CODE_PAGE_PC1118_LITHUANIAN: Buffer.from([27, 116, 42]),
    CODE_PAGE_PC1119_LITHUANIAN: Buffer.from([27, 116, 43]),
    CODE_PAGE_PC1125_UKRANIAN: Buffer.from([27, 116, 44]),
    CODE_PAGE_WPC1250_LATIN2: Buffer.from([27, 116, 45]),
    CODE_PAGE_WPC1251_CYRILLIC: Buffer.from([27, 116, 46]),
    CODE_PAGE_WPC1253_GREEK: Buffer.from([27, 116, 47]),
    CODE_PAGE_WPC1254_TURKISH: Buffer.from([27, 116, 48]),
    CODE_PAGE_WPC1255_HEBREW: Buffer.from([27, 116, 49]),
    CODE_PAGE_WPC1256_ARABIC: Buffer.from([27, 116, 50]),
    CODE_PAGE_WPC1257_BALTIC_RIM: Buffer.from([27, 116, 51]),
    CODE_PAGE_WPC1258_VIETNAMESE: Buffer.from([27, 116, 52]),
    CODE_PAGE_KZ1048_KAZAKHSTAN: Buffer.from([27, 116, 53]),
    CODE_PAGE_JAPAN: Buffer.from([27, 82, 8]),
    CODE_PAGE_KOREA: Buffer.from([27, 82, 13]),
    CODE_PAGE_CHINA: Buffer.from([27, 82, 15]),
    CODE_PAGE_HK_TW: Buffer.from([27, 82, 0]),
    CODE_PAGE_TCVN_VIETNAMESE: Buffer.from([27, 116, 52]),
    // Character code pages / iconv name of code table.
    // Only code pages supported by iconv-lite:
    // https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
    CODE_PAGES: {
      PC437_USA: "CP437",
      PC850_MULTILINGUAL: "CP850",
      PC860_PORTUGUESE: "CP860",
      PC863_CANADIAN_FRENCH: "CP863",
      PC865_NORDIC: "CP865",
      PC851_GREEK: "CP860",
      PC857_TURKISH: "CP857",
      PC737_GREEK: "CP737",
      ISO8859_7_GREEK: "ISO-8859-7",
      WPC1252: "CP1252",
      PC866_CYRILLIC2: "CP866",
      PC852_LATIN2: "CP852",
      SLOVENIA: "CP852",
      PC858_EURO: "CP858",
      WPC775_BALTIC_RIM: "CP775",
      PC855_CYRILLIC: "CP855",
      PC861_ICELANDIC: "CP861",
      PC862_HEBREW: "CP862",
      PC864_ARABIC: "CP864",
      PC869_GREEK: "CP869",
      ISO8859_2_LATIN2: "ISO-8859-2",
      ISO8859_15_LATIN9: "ISO-8859-15",
      PC1125_UKRANIAN: "CP1125",
      WPC1250_LATIN2: "WIN1250",
      WPC1251_CYRILLIC: "WIN1251",
      WPC1253_GREEK: "WIN1253",
      WPC1254_TURKISH: "WIN1254",
      WPC1255_HEBREW: "WIN1255",
      WPC1256_ARABIC: "WIN1256",
      WPC1257_BALTIC_RIM: "WIN1257",
      WPC1258_VIETNAMESE: "WIN1258",
      KZ1048_KAZAKHSTAN: "RK1048",
      JAPAN: "EUC-JP",
      KOREA: "EUC-KR",
      CHINA: "EUC-CN",
      HK_TW: "Big5-HKSCS",
      TCVN_VIETNAMESE: "tcvn",
      TIS11_THAI: "TIS-620",
      TIS18_THAI: "TIS-620"
    },
    // Barcode format
    BARCODE_TXT_OFF: Buffer.from([29, 72, 0]),
    // HRI barcode chars OFF
    BARCODE_TXT_ABV: Buffer.from([29, 72, 1]),
    // HRI barcode chars above
    BARCODE_TXT_BLW: Buffer.from([29, 72, 2]),
    // HRI barcode chars below
    BARCODE_TXT_BTH: Buffer.from([29, 72, 3]),
    // HRI barcode chars both above and below
    BARCODE_FONT_A: Buffer.from([29, 102, 0]),
    // Font type A for HRI barcode chars
    BARCODE_FONT_B: Buffer.from([29, 102, 1]),
    // Font type B for HRI barcode chars
    BARCODE_HEIGHT: Buffer.from([29, 104, 100]),
    // Barcode Height [1-255]
    BARCODE_WIDTH: Buffer.from([29, 119, 3]),
    // Barcode Width  [2-6]
    BARCODE_UPC_A: Buffer.from([29, 107, 0]),
    // Barcode type UPC-A
    BARCODE_UPC_E: Buffer.from([29, 107, 1]),
    // Barcode type UPC-E
    BARCODE_EAN13: Buffer.from([29, 107, 2]),
    // Barcode type EAN13
    BARCODE_EAN8: Buffer.from([29, 107, 3]),
    // Barcode type EAN8
    BARCODE_CODE39: Buffer.from([29, 107, 4]),
    // Barcode type CODE39
    BARCODE_CODE128: Buffer.from([29, 107, 73]),
    // Barcode type CODE128
    BARCODE_ITF: Buffer.from([29, 107, 5]),
    // Barcode type ITF
    BARCODE_NW7: Buffer.from([29, 107, 6]),
    // Barcode type NW7
    // QR Code
    QRCODE_MODEL1: Buffer.from([29, 40, 107, 4, 0, 49, 65, 49, 0]),
    // Model 1
    QRCODE_MODEL2: Buffer.from([29, 40, 107, 4, 0, 49, 65, 50, 0]),
    // Model 2
    QRCODE_MODEL3: Buffer.from([29, 40, 107, 4, 0, 49, 65, 51, 0]),
    // Model 3
    QRCODE_CORRECTION_L: Buffer.from([29, 40, 107, 3, 0, 49, 69, 48]),
    // Correction level: L - 7%
    QRCODE_CORRECTION_M: Buffer.from([29, 40, 107, 3, 0, 49, 69, 49]),
    // Correction level: M - 15%
    QRCODE_CORRECTION_Q: Buffer.from([29, 40, 107, 3, 0, 49, 69, 50]),
    // Correction level: Q - 25%
    QRCODE_CORRECTION_H: Buffer.from([29, 40, 107, 3, 0, 49, 69, 51]),
    // Correction level: H - 30%
    QRCODE_CELLSIZE_1: Buffer.from([29, 40, 107, 3, 0, 49, 67, 1]),
    // Cell size 1
    QRCODE_CELLSIZE_2: Buffer.from([29, 40, 107, 3, 0, 49, 67, 2]),
    // Cell size 2
    QRCODE_CELLSIZE_3: Buffer.from([29, 40, 107, 3, 0, 49, 67, 3]),
    // Cell size 3
    QRCODE_CELLSIZE_4: Buffer.from([29, 40, 107, 3, 0, 49, 67, 4]),
    // Cell size 4
    QRCODE_CELLSIZE_5: Buffer.from([29, 40, 107, 3, 0, 49, 67, 5]),
    // Cell size 5
    QRCODE_CELLSIZE_6: Buffer.from([29, 40, 107, 3, 0, 49, 67, 6]),
    // Cell size 6
    QRCODE_CELLSIZE_7: Buffer.from([29, 40, 107, 3, 0, 49, 67, 7]),
    // Cell size 7
    QRCODE_CELLSIZE_8: Buffer.from([29, 40, 107, 3, 0, 49, 67, 8]),
    // Cell size 8
    QRCODE_PRINT: Buffer.from([29, 40, 107, 3, 0, 49, 81, 48]),
    // Print QR code
    // PDF417
    PDF417_CORRECTION: Buffer.from([29, 40, 107, 4, 0, 48, 69, 49]),
    // Append 1-40 for ratio
    PDF417_ROW_HEIGHT: Buffer.from([29, 40, 107, 3, 0, 48, 68]),
    // Append 2-8 for height
    PDF417_WIDTH: Buffer.from([29, 40, 107, 3, 0, 48, 67]),
    // Append 2-8 for width
    PDF417_COLUMNS: Buffer.from([29, 40, 107, 3, 0, 48, 65]),
    PDF417_OPTION_STANDARD: Buffer.from([29, 40, 107, 3, 0, 48, 70, 0]),
    // Standard barcode
    PDF417_OPTION_TRUNCATED: Buffer.from([29, 40, 107, 3, 0, 48, 70, 1]),
    // Truncated barcode
    PDF417_PRINT: Buffer.from([29, 40, 107, 3, 0, 48, 81, 48]),
    // MaxiCode
    // Formatted data containing a structured Carrier Message with a numeric postal code. (US)
    MAXI_MODE2: Buffer.from([29, 40, 107, 3, 0, 50, 65, 50]),
    // Formatted data containing a structured Carrier Message with an alphanumeric postal code. (International)
    MAXI_MODE3: Buffer.from([29, 40, 107, 3, 0, 50, 65, 51]),
    MAXI_MODE4: Buffer.from([29, 40, 107, 3, 0, 50, 65, 52]),
    // Unformatted data with Standard Error Correction.
    MAXI_MODE5: Buffer.from([29, 40, 107, 3, 0, 50, 65, 53]),
    // Unformatted data with Enhanced Error Correction.
    MAXI_MODE6: Buffer.from([29, 40, 107, 3, 0, 50, 65, 54]),
    // For programming hardware devices.
    MAXI_PRINT: Buffer.from([29, 40, 107, 3, 0, 50, 81, 48]),
    // Image format
    S_RASTER_N: Buffer.from([29, 118, 48, 0]),
    // Set raster image normal size
    S_RASTER_2W: Buffer.from([29, 118, 48, 1]),
    // Set raster image double width
    S_RASTER_2H: Buffer.from([29, 118, 48, 2]),
    // Set raster image double height
    S_RASTER_Q: Buffer.from([29, 118, 48, 3]),
    // Set raster image quadruple
    // Printing Density
    PD_N50: Buffer.from([29, 124, 0]),
    // Printing Density -50%
    PD_N37: Buffer.from([29, 124, 1]),
    // Printing Density -37.5%
    PD_N25: Buffer.from([29, 124, 2]),
    // Printing Density -25%
    PD_N12: Buffer.from([29, 124, 3]),
    // Printing Density -12.5%
    PD_0: Buffer.from([29, 124, 4]),
    // Printing Density  0%
    PD_P50: Buffer.from([29, 124, 8]),
    // Printing Density +50%
    PD_P37: Buffer.from([29, 124, 7]),
    // Printing Density +37.5%
    PD_P25: Buffer.from([29, 124, 6])
    // Printing Density +25%
  }), Y0;
}
var z0, _6;
function $E() {
  if (_6) return z0;
  _6 = 1;
  const e = en();
  class t extends e {
    constructor() {
      super(), this.config = FE();
    }
    // ------------------------------ Get paper status ------------------------------
    getStatus() {
      return this.config.TRANSMIT_PAPER_STATUS;
    }
    // ------------------------------ Append ------------------------------
    append(n) {
      this.buffer ? this.buffer = Buffer.concat([this.buffer, n]) : this.buffer = n;
    }
    // ------------------------------ Beep ------------------------------
    // "numberOfBeeps" is the number of beeps from 1 to 9
    // "lengthOfTheSound" is the length of the sound from 1 to 9 (it's not in seconds, it's just the preset value)
    beep(n = 1, i = 1) {
      if (n < 1 || n > 9) throw new Error("numberOfBeeps: Value must be between 1 and 9");
      if (i < 1 || i > 9) throw new Error("lengthOfTheSound: Value must be between 1 and 9");
      return this.buffer = null, this.append(this.config.BEEP), this.append(Buffer.from([n, i])), this.buffer;
    }
    // ------------------------------ Set text size ------------------------------
    setTextSize(n, i) {
      if (this.buffer = null, n > 7 || n < 0) throw new Error("setTextSize: Height must be between 0 and 7");
      if (i > 7 || i < 0) throw new Error("setTextSize: Width must be between 0 and 7");
      const o = Buffer.from(`${n}${i}`, "hex");
      return this.append(Buffer.from([29, 33])), this.append(o), this.buffer;
    }
    // ------------------------------ CODE 128 ------------------------------
    code128(n, i) {
      return this.buffer = null, i = {
        hriPos: 0,
        hriFont: 0,
        width: 3,
        height: 162,
        ...i
      }, this.append(Buffer.from([29, 72])), this.append(Buffer.from([i.hriPos])), this.append(Buffer.from([29, 102])), this.append(Buffer.from([i.hriFont])), this.append(Buffer.from([29, 119])), this.append(Buffer.from([i.width])), this.append(Buffer.from([29, 104])), this.append(Buffer.from([i.height])), this.append(this.config.BARCODE_CODE128), this.append(Buffer.from([n.length + 2])), this.append(Buffer.from([123, 66])), this.append(Buffer.from(n)), this.buffer;
    }
    // ------------------------------ QR ------------------------------
    printQR(n, i) {
      this.buffer = null, i = {
        model: 2,
        cellSize: 3,
        correction: "M",
        ...i
      }, i.model === 1 ? this.append(this.config.QRCODE_MODEL1) : i.model === 3 ? this.append(this.config.QRCODE_MODEL3) : this.append(this.config.QRCODE_MODEL2);
      const o = "QRCODE_CELLSIZE_".concat(i.cellSize.toString());
      this.append(this.config[o]);
      const s = "QRCODE_CORRECTION_".concat(i.correction.toUpperCase());
      this.append(this.config[s]);
      const a = n.length + 3, f = parseInt(a % 256), c = parseInt(a / 256);
      return this.append(Buffer.from([29, 40, 107, f, c, 49, 80, 48])), this.append(Buffer.from(n)), this.append(this.config.QRCODE_PRINT), this.buffer;
    }
    // ------------------------------ PDF417 ------------------------------
    pdf417(n, i) {
      this.buffer = null, i = {
        correction: 1,
        rowHeight: 3,
        width: 3,
        columns: 0,
        truncated: !1,
        ...i
      }, this.append(this.config.PDF417_CORRECTION), this.append(Buffer.from([i.correction])), this.append(this.config.PDF417_ROW_HEIGHT), this.append(Buffer.from([i.rowHeight])), this.append(this.config.PDF417_WIDTH), this.append(Buffer.from([i.width])), this.append(this.config.PDF417_COLUMNS), this.append(Buffer.from([i.columns])), i.truncated ? this.append(this.config.PDF417_OPTION_TRUNCATED) : this.append(this.config.PDF417_OPTION_STANDARD);
      const o = n.length + 3, s = parseInt(o % 256), a = parseInt(o / 256);
      return this.append(Buffer.from([29, 40, 107, s, a, 48, 80, 48])), this.append(Buffer.from(n.toString())), this.append(Buffer.from(this.config.PDF417_PRINT)), this.buffer;
    }
    // ------------------------------ MAXI CODE ------------------------------
    maxiCode(n, i) {
      this.buffer = null, i = {
        mode: 4,
        ...i
      }, i.mode == 2 ? this.append(this.config.MAXI_MODE2) : i.mode == 3 ? this.append(this.config.MAXI_MODE3) : i.mode == 5 ? this.append(this.config.MAXI_MODE5) : i.mode == 6 ? this.append(this.config.MAXI_MODE6) : this.append(this.config.MAXI_MODE4);
      const o = n.length + 3, s = parseInt(o % 256), a = parseInt(o / 256);
      return this.append(Buffer.from([29, 40, 107, s, a, 50, 80, 48])), this.append(Buffer.from(n.toString())), this.append(this.config.MAXI_PRINT), this.buffer;
    }
    // ------------------------------ BARCODE ------------------------------
    printBarcode(n, i, o) {
      return this.buffer = null, o = {
        hriPos: 0,
        hriFont: 0,
        width: 3,
        height: 162,
        ...o
      }, this.append(Buffer.from([29, 72])), this.append(Buffer.from([o.hriPos])), this.append(Buffer.from([29, 102])), this.append(Buffer.from([o.hriFont])), this.append(Buffer.from([29, 119])), this.append(Buffer.from([o.width])), this.append(Buffer.from([29, 104])), this.append(Buffer.from([o.height])), this.append(Buffer.from([29, 107])), i == 73 ? (this.append(Buffer.from([i, n.length + 2])), this.append(Buffer.from([123, 66]))) : this.append(Buffer.from([i, n.length])), this.append(Buffer.from(n)), this.buffer;
    }
    // ----------------------------------------------------- PRINT IMAGE -----------------------------------------------------
    // https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=88
    async printImage(n) {
      const i = Ie, { PNG: o } = br;
      try {
        const s = i.readFileSync(n), a = o.sync.read(s);
        return this.printImageBuffer(a.width, a.height, a.data);
      } catch (s) {
        throw s;
      }
    }
    printImageBuffer(n, i, o) {
      this.buffer = null;
      const s = 33;
      n % 8 !== 0 && (n += 8 - n % 8);
      const a = n % 256, f = Math.floor(n / 256);
      for (let c = 0; c < i; c += 24) {
        const l = [];
        l.push(27, 42, s, a, f);
        for (let u = 0; u < n; u++)
          for (let h = 0; h < 3; h++) {
            let d = 0;
            for (let _ = 0; _ < 8; _++) {
              const p = c + h * 8 + _;
              if (p >= i) continue;
              const x = n * p + u << 2, y = o[x], b = o[x + 1], w = o[x + 2];
              if (o[x + 3] > 126 && parseInt(0.2126 * y + 0.7152 * b + 0.0722 * w) < 128) {
                const G = 1 << 7 - _;
                d |= G;
              }
            }
            l.push(d);
          }
        l.push(27, 51, 0, 10), this.append(Buffer.from(l));
      }
      return this.append(Buffer.from([27, 50])), this.buffer;
    }
  }
  return z0 = t, z0;
}
var Q0 = { exports: {} }, x6;
function UE() {
  return x6 || (x6 = 1, function(e) {
    (function(t) {
      for (var r = [null, 0, {}], n = 10, i = 44032, o = 4352, s = 4449, a = 4519, f = 19, c = 21, l = 28, u = c * l, h = f * u, d = function(S, P) {
        this.codepoint = S, this.feature = P;
      }, _ = {}, p = [], x = 0; x <= 255; ++x)
        p[x] = 0;
      function y(S, P, U) {
        var k = _[P];
        return k || (k = S(P, U), k.feature && ++p[P >> 8 & 255] > n && (_[P] = k)), k;
      }
      function b(S, P, U) {
        var k = P & 65280, j = d.udata[k] || {}, z = j[P];
        return z ? new d(P, z) : new d(P, r);
      }
      function w(S, P, U) {
        return U ? S(P, U) : new d(P, null);
      }
      function T(S, P, U) {
        var k;
        if (P < o || o + f <= P && P < i || i + h < P)
          return S(P, U);
        if (o <= P && P < o + f) {
          var j = {}, z = (P - o) * c;
          for (k = 0; k < c; ++k)
            j[s + k] = i + l * (k + z);
          return new d(P, [, , j]);
        }
        var ee = P - i, V = ee % l, Ae = [];
        if (V !== 0)
          Ae[0] = [i + ee - V, a + V];
        else
          for (Ae[0] = [o + Math.floor(ee / u), s + Math.floor(ee % u / l)], Ae[2] = {}, k = 1; k < l; ++k)
            Ae[2][a + k] = P + k;
        return new d(P, Ae);
      }
      function L(S, P, U) {
        return P < 60 || 13311 < P && P < 42607 ? new d(P, r) : S(P, U);
      }
      var G = [L, y, w, T, b];
      d.fromCharCode = G.reduceRight(function(S, P) {
        return function(U, k) {
          return P(S, U, k);
        };
      }, null), d.isHighSurrogate = function(S) {
        return S >= 55296 && S <= 56319;
      }, d.isLowSurrogate = function(S) {
        return S >= 56320 && S <= 57343;
      }, d.prototype.prepFeature = function() {
        this.feature || (this.feature = d.fromCharCode(this.codepoint, !0).feature);
      }, d.prototype.toString = function() {
        if (this.codepoint < 65536)
          return String.fromCharCode(this.codepoint);
        var S = this.codepoint - 65536;
        return String.fromCharCode(Math.floor(S / 1024) + 55296, S % 1024 + 56320);
      }, d.prototype.getDecomp = function() {
        return this.prepFeature(), this.feature[0] || null;
      }, d.prototype.isCompatibility = function() {
        return this.prepFeature(), !!this.feature[1] && this.feature[1] & 256;
      }, d.prototype.isExclude = function() {
        return this.prepFeature(), !!this.feature[1] && this.feature[1] & 512;
      }, d.prototype.getCanonicalClass = function() {
        return this.prepFeature(), this.feature[1] ? this.feature[1] & 255 : 0;
      }, d.prototype.getComposite = function(S) {
        if (this.prepFeature(), !this.feature[2])
          return null;
        var P = this.feature[2][S.codepoint];
        return P ? d.fromCharCode(P) : null;
      };
      var H = function(S) {
        this.str = S, this.cursor = 0;
      };
      H.prototype.next = function() {
        if (this.str && this.cursor < this.str.length) {
          var S = this.str.charCodeAt(this.cursor++), P;
          return d.isHighSurrogate(S) && this.cursor < this.str.length && d.isLowSurrogate(P = this.str.charCodeAt(this.cursor)) && (S = (S - 55296) * 1024 + (P - 56320) + 65536, ++this.cursor), d.fromCharCode(S);
        } else
          return this.str = null, null;
      };
      var Q = function(S, P) {
        this.it = S, this.canonical = P, this.resBuf = [];
      };
      Q.prototype.next = function() {
        function S(U, k) {
          var j = k.getDecomp();
          if (j && !(U && k.isCompatibility())) {
            for (var z = [], ee = 0; ee < j.length; ++ee) {
              var V = S(U, d.fromCharCode(j[ee]));
              z = z.concat(V);
            }
            return z;
          } else
            return [k];
        }
        if (this.resBuf.length === 0) {
          var P = this.it.next();
          if (!P)
            return null;
          this.resBuf = S(this.canonical, P);
        }
        return this.resBuf.shift();
      };
      var C = function(S) {
        this.it = S, this.resBuf = [];
      };
      C.prototype.next = function() {
        var S;
        if (this.resBuf.length === 0)
          do {
            var P = this.it.next();
            if (!P)
              break;
            S = P.getCanonicalClass();
            var U = this.resBuf.length;
            if (S !== 0)
              for (; U > 0; --U) {
                var k = this.resBuf[U - 1], j = k.getCanonicalClass();
                if (j <= S)
                  break;
              }
            this.resBuf.splice(U, 0, P);
          } while (S !== 0);
        return this.resBuf.shift();
      };
      var q = function(S) {
        this.it = S, this.procBuf = [], this.resBuf = [], this.lastClass = null;
      };
      q.prototype.next = function() {
        for (; this.resBuf.length === 0; ) {
          var S = this.it.next();
          if (!S) {
            this.resBuf = this.procBuf, this.procBuf = [];
            break;
          }
          if (this.procBuf.length === 0)
            this.lastClass = S.getCanonicalClass(), this.procBuf.push(S);
          else {
            var P = this.procBuf[0], U = P.getComposite(S), k = S.getCanonicalClass();
            U && (this.lastClass < k || this.lastClass === 0) ? this.procBuf[0] = U : (k === 0 && (this.resBuf = this.procBuf, this.procBuf = []), this.lastClass = k, this.procBuf.push(S));
          }
        }
        return this.resBuf.shift();
      };
      var F = function(S, P) {
        switch (S) {
          case "NFD":
            return new C(new Q(new H(P), !0));
          case "NFKD":
            return new C(new Q(new H(P), !1));
          case "NFC":
            return new q(new C(new Q(new H(P), !0)));
          case "NFKC":
            return new q(new C(new Q(new H(P), !1)));
        }
        throw S + " is invalid";
      }, $ = function(S, P) {
        for (var U = F(S, P), k = "", j; j = U.next(); )
          k += j.toString();
        return k;
      };
      function W(S) {
        return $("NFD", S);
      }
      function D(S) {
        return $("NFKD", S);
      }
      function I(S) {
        return $("NFC", S);
      }
      function N(S) {
        return $("NFKC", S);
      }
      d.udata = {
        0: { 60: [, , { 824: 8814 }], 61: [, , { 824: 8800 }], 62: [, , { 824: 8815 }], 65: [, , { 768: 192, 769: 193, 770: 194, 771: 195, 772: 256, 774: 258, 775: 550, 776: 196, 777: 7842, 778: 197, 780: 461, 783: 512, 785: 514, 803: 7840, 805: 7680, 808: 260 }], 66: [, , { 775: 7682, 803: 7684, 817: 7686 }], 67: [, , { 769: 262, 770: 264, 775: 266, 780: 268, 807: 199 }], 68: [, , { 775: 7690, 780: 270, 803: 7692, 807: 7696, 813: 7698, 817: 7694 }], 69: [, , { 768: 200, 769: 201, 770: 202, 771: 7868, 772: 274, 774: 276, 775: 278, 776: 203, 777: 7866, 780: 282, 783: 516, 785: 518, 803: 7864, 807: 552, 808: 280, 813: 7704, 816: 7706 }], 70: [, , { 775: 7710 }], 71: [, , { 769: 500, 770: 284, 772: 7712, 774: 286, 775: 288, 780: 486, 807: 290 }], 72: [, , { 770: 292, 775: 7714, 776: 7718, 780: 542, 803: 7716, 807: 7720, 814: 7722 }], 73: [, , { 768: 204, 769: 205, 770: 206, 771: 296, 772: 298, 774: 300, 775: 304, 776: 207, 777: 7880, 780: 463, 783: 520, 785: 522, 803: 7882, 808: 302, 816: 7724 }], 74: [, , { 770: 308 }], 75: [, , { 769: 7728, 780: 488, 803: 7730, 807: 310, 817: 7732 }], 76: [, , { 769: 313, 780: 317, 803: 7734, 807: 315, 813: 7740, 817: 7738 }], 77: [, , { 769: 7742, 775: 7744, 803: 7746 }], 78: [, , { 768: 504, 769: 323, 771: 209, 775: 7748, 780: 327, 803: 7750, 807: 325, 813: 7754, 817: 7752 }], 79: [, , { 768: 210, 769: 211, 770: 212, 771: 213, 772: 332, 774: 334, 775: 558, 776: 214, 777: 7886, 779: 336, 780: 465, 783: 524, 785: 526, 795: 416, 803: 7884, 808: 490 }], 80: [, , { 769: 7764, 775: 7766 }], 82: [, , { 769: 340, 775: 7768, 780: 344, 783: 528, 785: 530, 803: 7770, 807: 342, 817: 7774 }], 83: [, , { 769: 346, 770: 348, 775: 7776, 780: 352, 803: 7778, 806: 536, 807: 350 }], 84: [, , { 775: 7786, 780: 356, 803: 7788, 806: 538, 807: 354, 813: 7792, 817: 7790 }], 85: [, , { 768: 217, 769: 218, 770: 219, 771: 360, 772: 362, 774: 364, 776: 220, 777: 7910, 778: 366, 779: 368, 780: 467, 783: 532, 785: 534, 795: 431, 803: 7908, 804: 7794, 808: 370, 813: 7798, 816: 7796 }], 86: [, , { 771: 7804, 803: 7806 }], 87: [, , { 768: 7808, 769: 7810, 770: 372, 775: 7814, 776: 7812, 803: 7816 }], 88: [, , { 775: 7818, 776: 7820 }], 89: [, , { 768: 7922, 769: 221, 770: 374, 771: 7928, 772: 562, 775: 7822, 776: 376, 777: 7926, 803: 7924 }], 90: [, , { 769: 377, 770: 7824, 775: 379, 780: 381, 803: 7826, 817: 7828 }], 97: [, , { 768: 224, 769: 225, 770: 226, 771: 227, 772: 257, 774: 259, 775: 551, 776: 228, 777: 7843, 778: 229, 780: 462, 783: 513, 785: 515, 803: 7841, 805: 7681, 808: 261 }], 98: [, , { 775: 7683, 803: 7685, 817: 7687 }], 99: [, , { 769: 263, 770: 265, 775: 267, 780: 269, 807: 231 }], 100: [, , { 775: 7691, 780: 271, 803: 7693, 807: 7697, 813: 7699, 817: 7695 }], 101: [, , { 768: 232, 769: 233, 770: 234, 771: 7869, 772: 275, 774: 277, 775: 279, 776: 235, 777: 7867, 780: 283, 783: 517, 785: 519, 803: 7865, 807: 553, 808: 281, 813: 7705, 816: 7707 }], 102: [, , { 775: 7711 }], 103: [, , { 769: 501, 770: 285, 772: 7713, 774: 287, 775: 289, 780: 487, 807: 291 }], 104: [, , { 770: 293, 775: 7715, 776: 7719, 780: 543, 803: 7717, 807: 7721, 814: 7723, 817: 7830 }], 105: [, , { 768: 236, 769: 237, 770: 238, 771: 297, 772: 299, 774: 301, 776: 239, 777: 7881, 780: 464, 783: 521, 785: 523, 803: 7883, 808: 303, 816: 7725 }], 106: [, , { 770: 309, 780: 496 }], 107: [, , { 769: 7729, 780: 489, 803: 7731, 807: 311, 817: 7733 }], 108: [, , { 769: 314, 780: 318, 803: 7735, 807: 316, 813: 7741, 817: 7739 }], 109: [, , { 769: 7743, 775: 7745, 803: 7747 }], 110: [, , { 768: 505, 769: 324, 771: 241, 775: 7749, 780: 328, 803: 7751, 807: 326, 813: 7755, 817: 7753 }], 111: [, , { 768: 242, 769: 243, 770: 244, 771: 245, 772: 333, 774: 335, 775: 559, 776: 246, 777: 7887, 779: 337, 780: 466, 783: 525, 785: 527, 795: 417, 803: 7885, 808: 491 }], 112: [, , { 769: 7765, 775: 7767 }], 114: [, , { 769: 341, 775: 7769, 780: 345, 783: 529, 785: 531, 803: 7771, 807: 343, 817: 7775 }], 115: [, , { 769: 347, 770: 349, 775: 7777, 780: 353, 803: 7779, 806: 537, 807: 351 }], 116: [, , { 775: 7787, 776: 7831, 780: 357, 803: 7789, 806: 539, 807: 355, 813: 7793, 817: 7791 }], 117: [, , { 768: 249, 769: 250, 770: 251, 771: 361, 772: 363, 774: 365, 776: 252, 777: 7911, 778: 367, 779: 369, 780: 468, 783: 533, 785: 535, 795: 432, 803: 7909, 804: 7795, 808: 371, 813: 7799, 816: 7797 }], 118: [, , { 771: 7805, 803: 7807 }], 119: [, , { 768: 7809, 769: 7811, 770: 373, 775: 7815, 776: 7813, 778: 7832, 803: 7817 }], 120: [, , { 775: 7819, 776: 7821 }], 121: [, , { 768: 7923, 769: 253, 770: 375, 771: 7929, 772: 563, 775: 7823, 776: 255, 777: 7927, 778: 7833, 803: 7925 }], 122: [, , { 769: 378, 770: 7825, 775: 380, 780: 382, 803: 7827, 817: 7829 }], 160: [[32], 256], 168: [[32, 776], 256, { 768: 8173, 769: 901, 834: 8129 }], 170: [[97], 256], 175: [[32, 772], 256], 178: [[50], 256], 179: [[51], 256], 180: [[32, 769], 256], 181: [[956], 256], 184: [[32, 807], 256], 185: [[49], 256], 186: [[111], 256], 188: [[49, 8260, 52], 256], 189: [[49, 8260, 50], 256], 190: [[51, 8260, 52], 256], 192: [[65, 768]], 193: [[65, 769]], 194: [[65, 770], , { 768: 7846, 769: 7844, 771: 7850, 777: 7848 }], 195: [[65, 771]], 196: [[65, 776], , { 772: 478 }], 197: [[65, 778], , { 769: 506 }], 198: [, , { 769: 508, 772: 482 }], 199: [[67, 807], , { 769: 7688 }], 200: [[69, 768]], 201: [[69, 769]], 202: [[69, 770], , { 768: 7872, 769: 7870, 771: 7876, 777: 7874 }], 203: [[69, 776]], 204: [[73, 768]], 205: [[73, 769]], 206: [[73, 770]], 207: [[73, 776], , { 769: 7726 }], 209: [[78, 771]], 210: [[79, 768]], 211: [[79, 769]], 212: [[79, 770], , { 768: 7890, 769: 7888, 771: 7894, 777: 7892 }], 213: [[79, 771], , { 769: 7756, 772: 556, 776: 7758 }], 214: [[79, 776], , { 772: 554 }], 216: [, , { 769: 510 }], 217: [[85, 768]], 218: [[85, 769]], 219: [[85, 770]], 220: [[85, 776], , { 768: 475, 769: 471, 772: 469, 780: 473 }], 221: [[89, 769]], 224: [[97, 768]], 225: [[97, 769]], 226: [[97, 770], , { 768: 7847, 769: 7845, 771: 7851, 777: 7849 }], 227: [[97, 771]], 228: [[97, 776], , { 772: 479 }], 229: [[97, 778], , { 769: 507 }], 230: [, , { 769: 509, 772: 483 }], 231: [[99, 807], , { 769: 7689 }], 232: [[101, 768]], 233: [[101, 769]], 234: [[101, 770], , { 768: 7873, 769: 7871, 771: 7877, 777: 7875 }], 235: [[101, 776]], 236: [[105, 768]], 237: [[105, 769]], 238: [[105, 770]], 239: [[105, 776], , { 769: 7727 }], 241: [[110, 771]], 242: [[111, 768]], 243: [[111, 769]], 244: [[111, 770], , { 768: 7891, 769: 7889, 771: 7895, 777: 7893 }], 245: [[111, 771], , { 769: 7757, 772: 557, 776: 7759 }], 246: [[111, 776], , { 772: 555 }], 248: [, , { 769: 511 }], 249: [[117, 768]], 250: [[117, 769]], 251: [[117, 770]], 252: [[117, 776], , { 768: 476, 769: 472, 772: 470, 780: 474 }], 253: [[121, 769]], 255: [[121, 776]] },
        256: { 256: [[65, 772]], 257: [[97, 772]], 258: [[65, 774], , { 768: 7856, 769: 7854, 771: 7860, 777: 7858 }], 259: [[97, 774], , { 768: 7857, 769: 7855, 771: 7861, 777: 7859 }], 260: [[65, 808]], 261: [[97, 808]], 262: [[67, 769]], 263: [[99, 769]], 264: [[67, 770]], 265: [[99, 770]], 266: [[67, 775]], 267: [[99, 775]], 268: [[67, 780]], 269: [[99, 780]], 270: [[68, 780]], 271: [[100, 780]], 274: [[69, 772], , { 768: 7700, 769: 7702 }], 275: [[101, 772], , { 768: 7701, 769: 7703 }], 276: [[69, 774]], 277: [[101, 774]], 278: [[69, 775]], 279: [[101, 775]], 280: [[69, 808]], 281: [[101, 808]], 282: [[69, 780]], 283: [[101, 780]], 284: [[71, 770]], 285: [[103, 770]], 286: [[71, 774]], 287: [[103, 774]], 288: [[71, 775]], 289: [[103, 775]], 290: [[71, 807]], 291: [[103, 807]], 292: [[72, 770]], 293: [[104, 770]], 296: [[73, 771]], 297: [[105, 771]], 298: [[73, 772]], 299: [[105, 772]], 300: [[73, 774]], 301: [[105, 774]], 302: [[73, 808]], 303: [[105, 808]], 304: [[73, 775]], 306: [[73, 74], 256], 307: [[105, 106], 256], 308: [[74, 770]], 309: [[106, 770]], 310: [[75, 807]], 311: [[107, 807]], 313: [[76, 769]], 314: [[108, 769]], 315: [[76, 807]], 316: [[108, 807]], 317: [[76, 780]], 318: [[108, 780]], 319: [[76, 183], 256], 320: [[108, 183], 256], 323: [[78, 769]], 324: [[110, 769]], 325: [[78, 807]], 326: [[110, 807]], 327: [[78, 780]], 328: [[110, 780]], 329: [[700, 110], 256], 332: [[79, 772], , { 768: 7760, 769: 7762 }], 333: [[111, 772], , { 768: 7761, 769: 7763 }], 334: [[79, 774]], 335: [[111, 774]], 336: [[79, 779]], 337: [[111, 779]], 340: [[82, 769]], 341: [[114, 769]], 342: [[82, 807]], 343: [[114, 807]], 344: [[82, 780]], 345: [[114, 780]], 346: [[83, 769], , { 775: 7780 }], 347: [[115, 769], , { 775: 7781 }], 348: [[83, 770]], 349: [[115, 770]], 350: [[83, 807]], 351: [[115, 807]], 352: [[83, 780], , { 775: 7782 }], 353: [[115, 780], , { 775: 7783 }], 354: [[84, 807]], 355: [[116, 807]], 356: [[84, 780]], 357: [[116, 780]], 360: [[85, 771], , { 769: 7800 }], 361: [[117, 771], , { 769: 7801 }], 362: [[85, 772], , { 776: 7802 }], 363: [[117, 772], , { 776: 7803 }], 364: [[85, 774]], 365: [[117, 774]], 366: [[85, 778]], 367: [[117, 778]], 368: [[85, 779]], 369: [[117, 779]], 370: [[85, 808]], 371: [[117, 808]], 372: [[87, 770]], 373: [[119, 770]], 374: [[89, 770]], 375: [[121, 770]], 376: [[89, 776]], 377: [[90, 769]], 378: [[122, 769]], 379: [[90, 775]], 380: [[122, 775]], 381: [[90, 780]], 382: [[122, 780]], 383: [[115], 256, { 775: 7835 }], 416: [[79, 795], , { 768: 7900, 769: 7898, 771: 7904, 777: 7902, 803: 7906 }], 417: [[111, 795], , { 768: 7901, 769: 7899, 771: 7905, 777: 7903, 803: 7907 }], 431: [[85, 795], , { 768: 7914, 769: 7912, 771: 7918, 777: 7916, 803: 7920 }], 432: [[117, 795], , { 768: 7915, 769: 7913, 771: 7919, 777: 7917, 803: 7921 }], 439: [, , { 780: 494 }], 452: [[68, 381], 256], 453: [[68, 382], 256], 454: [[100, 382], 256], 455: [[76, 74], 256], 456: [[76, 106], 256], 457: [[108, 106], 256], 458: [[78, 74], 256], 459: [[78, 106], 256], 460: [[110, 106], 256], 461: [[65, 780]], 462: [[97, 780]], 463: [[73, 780]], 464: [[105, 780]], 465: [[79, 780]], 466: [[111, 780]], 467: [[85, 780]], 468: [[117, 780]], 469: [[220, 772]], 470: [[252, 772]], 471: [[220, 769]], 472: [[252, 769]], 473: [[220, 780]], 474: [[252, 780]], 475: [[220, 768]], 476: [[252, 768]], 478: [[196, 772]], 479: [[228, 772]], 480: [[550, 772]], 481: [[551, 772]], 482: [[198, 772]], 483: [[230, 772]], 486: [[71, 780]], 487: [[103, 780]], 488: [[75, 780]], 489: [[107, 780]], 490: [[79, 808], , { 772: 492 }], 491: [[111, 808], , { 772: 493 }], 492: [[490, 772]], 493: [[491, 772]], 494: [[439, 780]], 495: [[658, 780]], 496: [[106, 780]], 497: [[68, 90], 256], 498: [[68, 122], 256], 499: [[100, 122], 256], 500: [[71, 769]], 501: [[103, 769]], 504: [[78, 768]], 505: [[110, 768]], 506: [[197, 769]], 507: [[229, 769]], 508: [[198, 769]], 509: [[230, 769]], 510: [[216, 769]], 511: [[248, 769]], 66045: [, 220] },
        512: { 512: [[65, 783]], 513: [[97, 783]], 514: [[65, 785]], 515: [[97, 785]], 516: [[69, 783]], 517: [[101, 783]], 518: [[69, 785]], 519: [[101, 785]], 520: [[73, 783]], 521: [[105, 783]], 522: [[73, 785]], 523: [[105, 785]], 524: [[79, 783]], 525: [[111, 783]], 526: [[79, 785]], 527: [[111, 785]], 528: [[82, 783]], 529: [[114, 783]], 530: [[82, 785]], 531: [[114, 785]], 532: [[85, 783]], 533: [[117, 783]], 534: [[85, 785]], 535: [[117, 785]], 536: [[83, 806]], 537: [[115, 806]], 538: [[84, 806]], 539: [[116, 806]], 542: [[72, 780]], 543: [[104, 780]], 550: [[65, 775], , { 772: 480 }], 551: [[97, 775], , { 772: 481 }], 552: [[69, 807], , { 774: 7708 }], 553: [[101, 807], , { 774: 7709 }], 554: [[214, 772]], 555: [[246, 772]], 556: [[213, 772]], 557: [[245, 772]], 558: [[79, 775], , { 772: 560 }], 559: [[111, 775], , { 772: 561 }], 560: [[558, 772]], 561: [[559, 772]], 562: [[89, 772]], 563: [[121, 772]], 658: [, , { 780: 495 }], 688: [[104], 256], 689: [[614], 256], 690: [[106], 256], 691: [[114], 256], 692: [[633], 256], 693: [[635], 256], 694: [[641], 256], 695: [[119], 256], 696: [[121], 256], 728: [[32, 774], 256], 729: [[32, 775], 256], 730: [[32, 778], 256], 731: [[32, 808], 256], 732: [[32, 771], 256], 733: [[32, 779], 256], 736: [[611], 256], 737: [[108], 256], 738: [[115], 256], 739: [[120], 256], 740: [[661], 256], 66272: [, 220] },
        768: { 768: [, 230], 769: [, 230], 770: [, 230], 771: [, 230], 772: [, 230], 773: [, 230], 774: [, 230], 775: [, 230], 776: [, 230, { 769: 836 }], 777: [, 230], 778: [, 230], 779: [, 230], 780: [, 230], 781: [, 230], 782: [, 230], 783: [, 230], 784: [, 230], 785: [, 230], 786: [, 230], 787: [, 230], 788: [, 230], 789: [, 232], 790: [, 220], 791: [, 220], 792: [, 220], 793: [, 220], 794: [, 232], 795: [, 216], 796: [, 220], 797: [, 220], 798: [, 220], 799: [, 220], 800: [, 220], 801: [, 202], 802: [, 202], 803: [, 220], 804: [, 220], 805: [, 220], 806: [, 220], 807: [, 202], 808: [, 202], 809: [, 220], 810: [, 220], 811: [, 220], 812: [, 220], 813: [, 220], 814: [, 220], 815: [, 220], 816: [, 220], 817: [, 220], 818: [, 220], 819: [, 220], 820: [, 1], 821: [, 1], 822: [, 1], 823: [, 1], 824: [, 1], 825: [, 220], 826: [, 220], 827: [, 220], 828: [, 220], 829: [, 230], 830: [, 230], 831: [, 230], 832: [[768], 230], 833: [[769], 230], 834: [, 230], 835: [[787], 230], 836: [[776, 769], 230], 837: [, 240], 838: [, 230], 839: [, 220], 840: [, 220], 841: [, 220], 842: [, 230], 843: [, 230], 844: [, 230], 845: [, 220], 846: [, 220], 848: [, 230], 849: [, 230], 850: [, 230], 851: [, 220], 852: [, 220], 853: [, 220], 854: [, 220], 855: [, 230], 856: [, 232], 857: [, 220], 858: [, 220], 859: [, 230], 860: [, 233], 861: [, 234], 862: [, 234], 863: [, 233], 864: [, 234], 865: [, 234], 866: [, 233], 867: [, 230], 868: [, 230], 869: [, 230], 870: [, 230], 871: [, 230], 872: [, 230], 873: [, 230], 874: [, 230], 875: [, 230], 876: [, 230], 877: [, 230], 878: [, 230], 879: [, 230], 884: [[697]], 890: [[32, 837], 256], 894: [[59]], 900: [[32, 769], 256], 901: [[168, 769]], 902: [[913, 769]], 903: [[183]], 904: [[917, 769]], 905: [[919, 769]], 906: [[921, 769]], 908: [[927, 769]], 910: [[933, 769]], 911: [[937, 769]], 912: [[970, 769]], 913: [, , { 768: 8122, 769: 902, 772: 8121, 774: 8120, 787: 7944, 788: 7945, 837: 8124 }], 917: [, , { 768: 8136, 769: 904, 787: 7960, 788: 7961 }], 919: [, , { 768: 8138, 769: 905, 787: 7976, 788: 7977, 837: 8140 }], 921: [, , { 768: 8154, 769: 906, 772: 8153, 774: 8152, 776: 938, 787: 7992, 788: 7993 }], 927: [, , { 768: 8184, 769: 908, 787: 8008, 788: 8009 }], 929: [, , { 788: 8172 }], 933: [, , { 768: 8170, 769: 910, 772: 8169, 774: 8168, 776: 939, 788: 8025 }], 937: [, , { 768: 8186, 769: 911, 787: 8040, 788: 8041, 837: 8188 }], 938: [[921, 776]], 939: [[933, 776]], 940: [[945, 769], , { 837: 8116 }], 941: [[949, 769]], 942: [[951, 769], , { 837: 8132 }], 943: [[953, 769]], 944: [[971, 769]], 945: [, , { 768: 8048, 769: 940, 772: 8113, 774: 8112, 787: 7936, 788: 7937, 834: 8118, 837: 8115 }], 949: [, , { 768: 8050, 769: 941, 787: 7952, 788: 7953 }], 951: [, , { 768: 8052, 769: 942, 787: 7968, 788: 7969, 834: 8134, 837: 8131 }], 953: [, , { 768: 8054, 769: 943, 772: 8145, 774: 8144, 776: 970, 787: 7984, 788: 7985, 834: 8150 }], 959: [, , { 768: 8056, 769: 972, 787: 8e3, 788: 8001 }], 961: [, , { 787: 8164, 788: 8165 }], 965: [, , { 768: 8058, 769: 973, 772: 8161, 774: 8160, 776: 971, 787: 8016, 788: 8017, 834: 8166 }], 969: [, , { 768: 8060, 769: 974, 787: 8032, 788: 8033, 834: 8182, 837: 8179 }], 970: [[953, 776], , { 768: 8146, 769: 912, 834: 8151 }], 971: [[965, 776], , { 768: 8162, 769: 944, 834: 8167 }], 972: [[959, 769]], 973: [[965, 769]], 974: [[969, 769], , { 837: 8180 }], 976: [[946], 256], 977: [[952], 256], 978: [[933], 256, { 769: 979, 776: 980 }], 979: [[978, 769]], 980: [[978, 776]], 981: [[966], 256], 982: [[960], 256], 1008: [[954], 256], 1009: [[961], 256], 1010: [[962], 256], 1012: [[920], 256], 1013: [[949], 256], 1017: [[931], 256], 66422: [, 230], 66423: [, 230], 66424: [, 230], 66425: [, 230], 66426: [, 230] },
        1024: { 1024: [[1045, 768]], 1025: [[1045, 776]], 1027: [[1043, 769]], 1030: [, , { 776: 1031 }], 1031: [[1030, 776]], 1036: [[1050, 769]], 1037: [[1048, 768]], 1038: [[1059, 774]], 1040: [, , { 774: 1232, 776: 1234 }], 1043: [, , { 769: 1027 }], 1045: [, , { 768: 1024, 774: 1238, 776: 1025 }], 1046: [, , { 774: 1217, 776: 1244 }], 1047: [, , { 776: 1246 }], 1048: [, , { 768: 1037, 772: 1250, 774: 1049, 776: 1252 }], 1049: [[1048, 774]], 1050: [, , { 769: 1036 }], 1054: [, , { 776: 1254 }], 1059: [, , { 772: 1262, 774: 1038, 776: 1264, 779: 1266 }], 1063: [, , { 776: 1268 }], 1067: [, , { 776: 1272 }], 1069: [, , { 776: 1260 }], 1072: [, , { 774: 1233, 776: 1235 }], 1075: [, , { 769: 1107 }], 1077: [, , { 768: 1104, 774: 1239, 776: 1105 }], 1078: [, , { 774: 1218, 776: 1245 }], 1079: [, , { 776: 1247 }], 1080: [, , { 768: 1117, 772: 1251, 774: 1081, 776: 1253 }], 1081: [[1080, 774]], 1082: [, , { 769: 1116 }], 1086: [, , { 776: 1255 }], 1091: [, , { 772: 1263, 774: 1118, 776: 1265, 779: 1267 }], 1095: [, , { 776: 1269 }], 1099: [, , { 776: 1273 }], 1101: [, , { 776: 1261 }], 1104: [[1077, 768]], 1105: [[1077, 776]], 1107: [[1075, 769]], 1110: [, , { 776: 1111 }], 1111: [[1110, 776]], 1116: [[1082, 769]], 1117: [[1080, 768]], 1118: [[1091, 774]], 1140: [, , { 783: 1142 }], 1141: [, , { 783: 1143 }], 1142: [[1140, 783]], 1143: [[1141, 783]], 1155: [, 230], 1156: [, 230], 1157: [, 230], 1158: [, 230], 1159: [, 230], 1217: [[1046, 774]], 1218: [[1078, 774]], 1232: [[1040, 774]], 1233: [[1072, 774]], 1234: [[1040, 776]], 1235: [[1072, 776]], 1238: [[1045, 774]], 1239: [[1077, 774]], 1240: [, , { 776: 1242 }], 1241: [, , { 776: 1243 }], 1242: [[1240, 776]], 1243: [[1241, 776]], 1244: [[1046, 776]], 1245: [[1078, 776]], 1246: [[1047, 776]], 1247: [[1079, 776]], 1250: [[1048, 772]], 1251: [[1080, 772]], 1252: [[1048, 776]], 1253: [[1080, 776]], 1254: [[1054, 776]], 1255: [[1086, 776]], 1256: [, , { 776: 1258 }], 1257: [, , { 776: 1259 }], 1258: [[1256, 776]], 1259: [[1257, 776]], 1260: [[1069, 776]], 1261: [[1101, 776]], 1262: [[1059, 772]], 1263: [[1091, 772]], 1264: [[1059, 776]], 1265: [[1091, 776]], 1266: [[1059, 779]], 1267: [[1091, 779]], 1268: [[1063, 776]], 1269: [[1095, 776]], 1272: [[1067, 776]], 1273: [[1099, 776]] },
        1280: { 1415: [[1381, 1410], 256], 1425: [, 220], 1426: [, 230], 1427: [, 230], 1428: [, 230], 1429: [, 230], 1430: [, 220], 1431: [, 230], 1432: [, 230], 1433: [, 230], 1434: [, 222], 1435: [, 220], 1436: [, 230], 1437: [, 230], 1438: [, 230], 1439: [, 230], 1440: [, 230], 1441: [, 230], 1442: [, 220], 1443: [, 220], 1444: [, 220], 1445: [, 220], 1446: [, 220], 1447: [, 220], 1448: [, 230], 1449: [, 230], 1450: [, 220], 1451: [, 230], 1452: [, 230], 1453: [, 222], 1454: [, 228], 1455: [, 230], 1456: [, 10], 1457: [, 11], 1458: [, 12], 1459: [, 13], 1460: [, 14], 1461: [, 15], 1462: [, 16], 1463: [, 17], 1464: [, 18], 1465: [, 19], 1466: [, 19], 1467: [, 20], 1468: [, 21], 1469: [, 22], 1471: [, 23], 1473: [, 24], 1474: [, 25], 1476: [, 230], 1477: [, 220], 1479: [, 18] },
        1536: { 1552: [, 230], 1553: [, 230], 1554: [, 230], 1555: [, 230], 1556: [, 230], 1557: [, 230], 1558: [, 230], 1559: [, 230], 1560: [, 30], 1561: [, 31], 1562: [, 32], 1570: [[1575, 1619]], 1571: [[1575, 1620]], 1572: [[1608, 1620]], 1573: [[1575, 1621]], 1574: [[1610, 1620]], 1575: [, , { 1619: 1570, 1620: 1571, 1621: 1573 }], 1608: [, , { 1620: 1572 }], 1610: [, , { 1620: 1574 }], 1611: [, 27], 1612: [, 28], 1613: [, 29], 1614: [, 30], 1615: [, 31], 1616: [, 32], 1617: [, 33], 1618: [, 34], 1619: [, 230], 1620: [, 230], 1621: [, 220], 1622: [, 220], 1623: [, 230], 1624: [, 230], 1625: [, 230], 1626: [, 230], 1627: [, 230], 1628: [, 220], 1629: [, 230], 1630: [, 230], 1631: [, 220], 1648: [, 35], 1653: [[1575, 1652], 256], 1654: [[1608, 1652], 256], 1655: [[1735, 1652], 256], 1656: [[1610, 1652], 256], 1728: [[1749, 1620]], 1729: [, , { 1620: 1730 }], 1730: [[1729, 1620]], 1746: [, , { 1620: 1747 }], 1747: [[1746, 1620]], 1749: [, , { 1620: 1728 }], 1750: [, 230], 1751: [, 230], 1752: [, 230], 1753: [, 230], 1754: [, 230], 1755: [, 230], 1756: [, 230], 1759: [, 230], 1760: [, 230], 1761: [, 230], 1762: [, 230], 1763: [, 220], 1764: [, 230], 1767: [, 230], 1768: [, 230], 1770: [, 220], 1771: [, 230], 1772: [, 230], 1773: [, 220] },
        1792: { 1809: [, 36], 1840: [, 230], 1841: [, 220], 1842: [, 230], 1843: [, 230], 1844: [, 220], 1845: [, 230], 1846: [, 230], 1847: [, 220], 1848: [, 220], 1849: [, 220], 1850: [, 230], 1851: [, 220], 1852: [, 220], 1853: [, 230], 1854: [, 220], 1855: [, 230], 1856: [, 230], 1857: [, 230], 1858: [, 220], 1859: [, 230], 1860: [, 220], 1861: [, 230], 1862: [, 220], 1863: [, 230], 1864: [, 220], 1865: [, 230], 1866: [, 230], 2027: [, 230], 2028: [, 230], 2029: [, 230], 2030: [, 230], 2031: [, 230], 2032: [, 230], 2033: [, 230], 2034: [, 220], 2035: [, 230] },
        2048: { 2070: [, 230], 2071: [, 230], 2072: [, 230], 2073: [, 230], 2075: [, 230], 2076: [, 230], 2077: [, 230], 2078: [, 230], 2079: [, 230], 2080: [, 230], 2081: [, 230], 2082: [, 230], 2083: [, 230], 2085: [, 230], 2086: [, 230], 2087: [, 230], 2089: [, 230], 2090: [, 230], 2091: [, 230], 2092: [, 230], 2093: [, 230], 2137: [, 220], 2138: [, 220], 2139: [, 220], 2276: [, 230], 2277: [, 230], 2278: [, 220], 2279: [, 230], 2280: [, 230], 2281: [, 220], 2282: [, 230], 2283: [, 230], 2284: [, 230], 2285: [, 220], 2286: [, 220], 2287: [, 220], 2288: [, 27], 2289: [, 28], 2290: [, 29], 2291: [, 230], 2292: [, 230], 2293: [, 230], 2294: [, 220], 2295: [, 230], 2296: [, 230], 2297: [, 220], 2298: [, 220], 2299: [, 230], 2300: [, 230], 2301: [, 230], 2302: [, 230], 2303: [, 230] },
        2304: { 2344: [, , { 2364: 2345 }], 2345: [[2344, 2364]], 2352: [, , { 2364: 2353 }], 2353: [[2352, 2364]], 2355: [, , { 2364: 2356 }], 2356: [[2355, 2364]], 2364: [, 7], 2381: [, 9], 2385: [, 230], 2386: [, 220], 2387: [, 230], 2388: [, 230], 2392: [[2325, 2364], 512], 2393: [[2326, 2364], 512], 2394: [[2327, 2364], 512], 2395: [[2332, 2364], 512], 2396: [[2337, 2364], 512], 2397: [[2338, 2364], 512], 2398: [[2347, 2364], 512], 2399: [[2351, 2364], 512], 2492: [, 7], 2503: [, , { 2494: 2507, 2519: 2508 }], 2507: [[2503, 2494]], 2508: [[2503, 2519]], 2509: [, 9], 2524: [[2465, 2492], 512], 2525: [[2466, 2492], 512], 2527: [[2479, 2492], 512] },
        2560: { 2611: [[2610, 2620], 512], 2614: [[2616, 2620], 512], 2620: [, 7], 2637: [, 9], 2649: [[2582, 2620], 512], 2650: [[2583, 2620], 512], 2651: [[2588, 2620], 512], 2654: [[2603, 2620], 512], 2748: [, 7], 2765: [, 9], 68109: [, 220], 68111: [, 230], 68152: [, 230], 68153: [, 1], 68154: [, 220], 68159: [, 9], 68325: [, 230], 68326: [, 220] },
        2816: { 2876: [, 7], 2887: [, , { 2878: 2891, 2902: 2888, 2903: 2892 }], 2888: [[2887, 2902]], 2891: [[2887, 2878]], 2892: [[2887, 2903]], 2893: [, 9], 2908: [[2849, 2876], 512], 2909: [[2850, 2876], 512], 2962: [, , { 3031: 2964 }], 2964: [[2962, 3031]], 3014: [, , { 3006: 3018, 3031: 3020 }], 3015: [, , { 3006: 3019 }], 3018: [[3014, 3006]], 3019: [[3015, 3006]], 3020: [[3014, 3031]], 3021: [, 9] },
        3072: { 3142: [, , { 3158: 3144 }], 3144: [[3142, 3158]], 3149: [, 9], 3157: [, 84], 3158: [, 91], 3260: [, 7], 3263: [, , { 3285: 3264 }], 3264: [[3263, 3285]], 3270: [, , { 3266: 3274, 3285: 3271, 3286: 3272 }], 3271: [[3270, 3285]], 3272: [[3270, 3286]], 3274: [[3270, 3266], , { 3285: 3275 }], 3275: [[3274, 3285]], 3277: [, 9] },
        3328: { 3398: [, , { 3390: 3402, 3415: 3404 }], 3399: [, , { 3390: 3403 }], 3402: [[3398, 3390]], 3403: [[3399, 3390]], 3404: [[3398, 3415]], 3405: [, 9], 3530: [, 9], 3545: [, , { 3530: 3546, 3535: 3548, 3551: 3550 }], 3546: [[3545, 3530]], 3548: [[3545, 3535], , { 3530: 3549 }], 3549: [[3548, 3530]], 3550: [[3545, 3551]] },
        3584: { 3635: [[3661, 3634], 256], 3640: [, 103], 3641: [, 103], 3642: [, 9], 3656: [, 107], 3657: [, 107], 3658: [, 107], 3659: [, 107], 3763: [[3789, 3762], 256], 3768: [, 118], 3769: [, 118], 3784: [, 122], 3785: [, 122], 3786: [, 122], 3787: [, 122], 3804: [[3755, 3737], 256], 3805: [[3755, 3745], 256] },
        3840: { 3852: [[3851], 256], 3864: [, 220], 3865: [, 220], 3893: [, 220], 3895: [, 220], 3897: [, 216], 3907: [[3906, 4023], 512], 3917: [[3916, 4023], 512], 3922: [[3921, 4023], 512], 3927: [[3926, 4023], 512], 3932: [[3931, 4023], 512], 3945: [[3904, 4021], 512], 3953: [, 129], 3954: [, 130], 3955: [[3953, 3954], 512], 3956: [, 132], 3957: [[3953, 3956], 512], 3958: [[4018, 3968], 512], 3959: [[4018, 3969], 256], 3960: [[4019, 3968], 512], 3961: [[4019, 3969], 256], 3962: [, 130], 3963: [, 130], 3964: [, 130], 3965: [, 130], 3968: [, 130], 3969: [[3953, 3968], 512], 3970: [, 230], 3971: [, 230], 3972: [, 9], 3974: [, 230], 3975: [, 230], 3987: [[3986, 4023], 512], 3997: [[3996, 4023], 512], 4002: [[4001, 4023], 512], 4007: [[4006, 4023], 512], 4012: [[4011, 4023], 512], 4025: [[3984, 4021], 512], 4038: [, 220] },
        4096: { 4133: [, , { 4142: 4134 }], 4134: [[4133, 4142]], 4151: [, 7], 4153: [, 9], 4154: [, 9], 4237: [, 220], 4348: [[4316], 256], 69702: [, 9], 69759: [, 9], 69785: [, , { 69818: 69786 }], 69786: [[69785, 69818]], 69787: [, , { 69818: 69788 }], 69788: [[69787, 69818]], 69797: [, , { 69818: 69803 }], 69803: [[69797, 69818]], 69817: [, 9], 69818: [, 7] },
        4352: { 69888: [, 230], 69889: [, 230], 69890: [, 230], 69934: [[69937, 69927]], 69935: [[69938, 69927]], 69937: [, , { 69927: 69934 }], 69938: [, , { 69927: 69935 }], 69939: [, 9], 69940: [, 9], 70003: [, 7], 70080: [, 9] },
        4608: { 70197: [, 9], 70198: [, 7], 70377: [, 7], 70378: [, 9] },
        4864: { 4957: [, 230], 4958: [, 230], 4959: [, 230], 70460: [, 7], 70471: [, , { 70462: 70475, 70487: 70476 }], 70475: [[70471, 70462]], 70476: [[70471, 70487]], 70477: [, 9], 70502: [, 230], 70503: [, 230], 70504: [, 230], 70505: [, 230], 70506: [, 230], 70507: [, 230], 70508: [, 230], 70512: [, 230], 70513: [, 230], 70514: [, 230], 70515: [, 230], 70516: [, 230] },
        5120: { 70841: [, , { 70832: 70844, 70842: 70843, 70845: 70846 }], 70843: [[70841, 70842]], 70844: [[70841, 70832]], 70846: [[70841, 70845]], 70850: [, 9], 70851: [, 7] },
        5376: { 71096: [, , { 71087: 71098 }], 71097: [, , { 71087: 71099 }], 71098: [[71096, 71087]], 71099: [[71097, 71087]], 71103: [, 9], 71104: [, 7] },
        5632: { 71231: [, 9], 71350: [, 9], 71351: [, 7] },
        5888: { 5908: [, 9], 5940: [, 9], 6098: [, 9], 6109: [, 230] },
        6144: { 6313: [, 228] },
        6400: { 6457: [, 222], 6458: [, 230], 6459: [, 220] },
        6656: { 6679: [, 230], 6680: [, 220], 6752: [, 9], 6773: [, 230], 6774: [, 230], 6775: [, 230], 6776: [, 230], 6777: [, 230], 6778: [, 230], 6779: [, 230], 6780: [, 230], 6783: [, 220], 6832: [, 230], 6833: [, 230], 6834: [, 230], 6835: [, 230], 6836: [, 230], 6837: [, 220], 6838: [, 220], 6839: [, 220], 6840: [, 220], 6841: [, 220], 6842: [, 220], 6843: [, 230], 6844: [, 230], 6845: [, 220] },
        6912: { 6917: [, , { 6965: 6918 }], 6918: [[6917, 6965]], 6919: [, , { 6965: 6920 }], 6920: [[6919, 6965]], 6921: [, , { 6965: 6922 }], 6922: [[6921, 6965]], 6923: [, , { 6965: 6924 }], 6924: [[6923, 6965]], 6925: [, , { 6965: 6926 }], 6926: [[6925, 6965]], 6929: [, , { 6965: 6930 }], 6930: [[6929, 6965]], 6964: [, 7], 6970: [, , { 6965: 6971 }], 6971: [[6970, 6965]], 6972: [, , { 6965: 6973 }], 6973: [[6972, 6965]], 6974: [, , { 6965: 6976 }], 6975: [, , { 6965: 6977 }], 6976: [[6974, 6965]], 6977: [[6975, 6965]], 6978: [, , { 6965: 6979 }], 6979: [[6978, 6965]], 6980: [, 9], 7019: [, 230], 7020: [, 220], 7021: [, 230], 7022: [, 230], 7023: [, 230], 7024: [, 230], 7025: [, 230], 7026: [, 230], 7027: [, 230], 7082: [, 9], 7083: [, 9], 7142: [, 7], 7154: [, 9], 7155: [, 9] },
        7168: { 7223: [, 7], 7376: [, 230], 7377: [, 230], 7378: [, 230], 7380: [, 1], 7381: [, 220], 7382: [, 220], 7383: [, 220], 7384: [, 220], 7385: [, 220], 7386: [, 230], 7387: [, 230], 7388: [, 220], 7389: [, 220], 7390: [, 220], 7391: [, 220], 7392: [, 230], 7394: [, 1], 7395: [, 1], 7396: [, 1], 7397: [, 1], 7398: [, 1], 7399: [, 1], 7400: [, 1], 7405: [, 220], 7412: [, 230], 7416: [, 230], 7417: [, 230] },
        7424: { 7468: [[65], 256], 7469: [[198], 256], 7470: [[66], 256], 7472: [[68], 256], 7473: [[69], 256], 7474: [[398], 256], 7475: [[71], 256], 7476: [[72], 256], 7477: [[73], 256], 7478: [[74], 256], 7479: [[75], 256], 7480: [[76], 256], 7481: [[77], 256], 7482: [[78], 256], 7484: [[79], 256], 7485: [[546], 256], 7486: [[80], 256], 7487: [[82], 256], 7488: [[84], 256], 7489: [[85], 256], 7490: [[87], 256], 7491: [[97], 256], 7492: [[592], 256], 7493: [[593], 256], 7494: [[7426], 256], 7495: [[98], 256], 7496: [[100], 256], 7497: [[101], 256], 7498: [[601], 256], 7499: [[603], 256], 7500: [[604], 256], 7501: [[103], 256], 7503: [[107], 256], 7504: [[109], 256], 7505: [[331], 256], 7506: [[111], 256], 7507: [[596], 256], 7508: [[7446], 256], 7509: [[7447], 256], 7510: [[112], 256], 7511: [[116], 256], 7512: [[117], 256], 7513: [[7453], 256], 7514: [[623], 256], 7515: [[118], 256], 7516: [[7461], 256], 7517: [[946], 256], 7518: [[947], 256], 7519: [[948], 256], 7520: [[966], 256], 7521: [[967], 256], 7522: [[105], 256], 7523: [[114], 256], 7524: [[117], 256], 7525: [[118], 256], 7526: [[946], 256], 7527: [[947], 256], 7528: [[961], 256], 7529: [[966], 256], 7530: [[967], 256], 7544: [[1085], 256], 7579: [[594], 256], 7580: [[99], 256], 7581: [[597], 256], 7582: [[240], 256], 7583: [[604], 256], 7584: [[102], 256], 7585: [[607], 256], 7586: [[609], 256], 7587: [[613], 256], 7588: [[616], 256], 7589: [[617], 256], 7590: [[618], 256], 7591: [[7547], 256], 7592: [[669], 256], 7593: [[621], 256], 7594: [[7557], 256], 7595: [[671], 256], 7596: [[625], 256], 7597: [[624], 256], 7598: [[626], 256], 7599: [[627], 256], 7600: [[628], 256], 7601: [[629], 256], 7602: [[632], 256], 7603: [[642], 256], 7604: [[643], 256], 7605: [[427], 256], 7606: [[649], 256], 7607: [[650], 256], 7608: [[7452], 256], 7609: [[651], 256], 7610: [[652], 256], 7611: [[122], 256], 7612: [[656], 256], 7613: [[657], 256], 7614: [[658], 256], 7615: [[952], 256], 7616: [, 230], 7617: [, 230], 7618: [, 220], 7619: [, 230], 7620: [, 230], 7621: [, 230], 7622: [, 230], 7623: [, 230], 7624: [, 230], 7625: [, 230], 7626: [, 220], 7627: [, 230], 7628: [, 230], 7629: [, 234], 7630: [, 214], 7631: [, 220], 7632: [, 202], 7633: [, 230], 7634: [, 230], 7635: [, 230], 7636: [, 230], 7637: [, 230], 7638: [, 230], 7639: [, 230], 7640: [, 230], 7641: [, 230], 7642: [, 230], 7643: [, 230], 7644: [, 230], 7645: [, 230], 7646: [, 230], 7647: [, 230], 7648: [, 230], 7649: [, 230], 7650: [, 230], 7651: [, 230], 7652: [, 230], 7653: [, 230], 7654: [, 230], 7655: [, 230], 7656: [, 230], 7657: [, 230], 7658: [, 230], 7659: [, 230], 7660: [, 230], 7661: [, 230], 7662: [, 230], 7663: [, 230], 7664: [, 230], 7665: [, 230], 7666: [, 230], 7667: [, 230], 7668: [, 230], 7669: [, 230], 7676: [, 233], 7677: [, 220], 7678: [, 230], 7679: [, 220] },
        7680: { 7680: [[65, 805]], 7681: [[97, 805]], 7682: [[66, 775]], 7683: [[98, 775]], 7684: [[66, 803]], 7685: [[98, 803]], 7686: [[66, 817]], 7687: [[98, 817]], 7688: [[199, 769]], 7689: [[231, 769]], 7690: [[68, 775]], 7691: [[100, 775]], 7692: [[68, 803]], 7693: [[100, 803]], 7694: [[68, 817]], 7695: [[100, 817]], 7696: [[68, 807]], 7697: [[100, 807]], 7698: [[68, 813]], 7699: [[100, 813]], 7700: [[274, 768]], 7701: [[275, 768]], 7702: [[274, 769]], 7703: [[275, 769]], 7704: [[69, 813]], 7705: [[101, 813]], 7706: [[69, 816]], 7707: [[101, 816]], 7708: [[552, 774]], 7709: [[553, 774]], 7710: [[70, 775]], 7711: [[102, 775]], 7712: [[71, 772]], 7713: [[103, 772]], 7714: [[72, 775]], 7715: [[104, 775]], 7716: [[72, 803]], 7717: [[104, 803]], 7718: [[72, 776]], 7719: [[104, 776]], 7720: [[72, 807]], 7721: [[104, 807]], 7722: [[72, 814]], 7723: [[104, 814]], 7724: [[73, 816]], 7725: [[105, 816]], 7726: [[207, 769]], 7727: [[239, 769]], 7728: [[75, 769]], 7729: [[107, 769]], 7730: [[75, 803]], 7731: [[107, 803]], 7732: [[75, 817]], 7733: [[107, 817]], 7734: [[76, 803], , { 772: 7736 }], 7735: [[108, 803], , { 772: 7737 }], 7736: [[7734, 772]], 7737: [[7735, 772]], 7738: [[76, 817]], 7739: [[108, 817]], 7740: [[76, 813]], 7741: [[108, 813]], 7742: [[77, 769]], 7743: [[109, 769]], 7744: [[77, 775]], 7745: [[109, 775]], 7746: [[77, 803]], 7747: [[109, 803]], 7748: [[78, 775]], 7749: [[110, 775]], 7750: [[78, 803]], 7751: [[110, 803]], 7752: [[78, 817]], 7753: [[110, 817]], 7754: [[78, 813]], 7755: [[110, 813]], 7756: [[213, 769]], 7757: [[245, 769]], 7758: [[213, 776]], 7759: [[245, 776]], 7760: [[332, 768]], 7761: [[333, 768]], 7762: [[332, 769]], 7763: [[333, 769]], 7764: [[80, 769]], 7765: [[112, 769]], 7766: [[80, 775]], 7767: [[112, 775]], 7768: [[82, 775]], 7769: [[114, 775]], 7770: [[82, 803], , { 772: 7772 }], 7771: [[114, 803], , { 772: 7773 }], 7772: [[7770, 772]], 7773: [[7771, 772]], 7774: [[82, 817]], 7775: [[114, 817]], 7776: [[83, 775]], 7777: [[115, 775]], 7778: [[83, 803], , { 775: 7784 }], 7779: [[115, 803], , { 775: 7785 }], 7780: [[346, 775]], 7781: [[347, 775]], 7782: [[352, 775]], 7783: [[353, 775]], 7784: [[7778, 775]], 7785: [[7779, 775]], 7786: [[84, 775]], 7787: [[116, 775]], 7788: [[84, 803]], 7789: [[116, 803]], 7790: [[84, 817]], 7791: [[116, 817]], 7792: [[84, 813]], 7793: [[116, 813]], 7794: [[85, 804]], 7795: [[117, 804]], 7796: [[85, 816]], 7797: [[117, 816]], 7798: [[85, 813]], 7799: [[117, 813]], 7800: [[360, 769]], 7801: [[361, 769]], 7802: [[362, 776]], 7803: [[363, 776]], 7804: [[86, 771]], 7805: [[118, 771]], 7806: [[86, 803]], 7807: [[118, 803]], 7808: [[87, 768]], 7809: [[119, 768]], 7810: [[87, 769]], 7811: [[119, 769]], 7812: [[87, 776]], 7813: [[119, 776]], 7814: [[87, 775]], 7815: [[119, 775]], 7816: [[87, 803]], 7817: [[119, 803]], 7818: [[88, 775]], 7819: [[120, 775]], 7820: [[88, 776]], 7821: [[120, 776]], 7822: [[89, 775]], 7823: [[121, 775]], 7824: [[90, 770]], 7825: [[122, 770]], 7826: [[90, 803]], 7827: [[122, 803]], 7828: [[90, 817]], 7829: [[122, 817]], 7830: [[104, 817]], 7831: [[116, 776]], 7832: [[119, 778]], 7833: [[121, 778]], 7834: [[97, 702], 256], 7835: [[383, 775]], 7840: [[65, 803], , { 770: 7852, 774: 7862 }], 7841: [[97, 803], , { 770: 7853, 774: 7863 }], 7842: [[65, 777]], 7843: [[97, 777]], 7844: [[194, 769]], 7845: [[226, 769]], 7846: [[194, 768]], 7847: [[226, 768]], 7848: [[194, 777]], 7849: [[226, 777]], 7850: [[194, 771]], 7851: [[226, 771]], 7852: [[7840, 770]], 7853: [[7841, 770]], 7854: [[258, 769]], 7855: [[259, 769]], 7856: [[258, 768]], 7857: [[259, 768]], 7858: [[258, 777]], 7859: [[259, 777]], 7860: [[258, 771]], 7861: [[259, 771]], 7862: [[7840, 774]], 7863: [[7841, 774]], 7864: [[69, 803], , { 770: 7878 }], 7865: [[101, 803], , { 770: 7879 }], 7866: [[69, 777]], 7867: [[101, 777]], 7868: [[69, 771]], 7869: [[101, 771]], 7870: [[202, 769]], 7871: [[234, 769]], 7872: [[202, 768]], 7873: [[234, 768]], 7874: [[202, 777]], 7875: [[234, 777]], 7876: [[202, 771]], 7877: [[234, 771]], 7878: [[7864, 770]], 7879: [[7865, 770]], 7880: [[73, 777]], 7881: [[105, 777]], 7882: [[73, 803]], 7883: [[105, 803]], 7884: [[79, 803], , { 770: 7896 }], 7885: [[111, 803], , { 770: 7897 }], 7886: [[79, 777]], 7887: [[111, 777]], 7888: [[212, 769]], 7889: [[244, 769]], 7890: [[212, 768]], 7891: [[244, 768]], 7892: [[212, 777]], 7893: [[244, 777]], 7894: [[212, 771]], 7895: [[244, 771]], 7896: [[7884, 770]], 7897: [[7885, 770]], 7898: [[416, 769]], 7899: [[417, 769]], 7900: [[416, 768]], 7901: [[417, 768]], 7902: [[416, 777]], 7903: [[417, 777]], 7904: [[416, 771]], 7905: [[417, 771]], 7906: [[416, 803]], 7907: [[417, 803]], 7908: [[85, 803]], 7909: [[117, 803]], 7910: [[85, 777]], 7911: [[117, 777]], 7912: [[431, 769]], 7913: [[432, 769]], 7914: [[431, 768]], 7915: [[432, 768]], 7916: [[431, 777]], 7917: [[432, 777]], 7918: [[431, 771]], 7919: [[432, 771]], 7920: [[431, 803]], 7921: [[432, 803]], 7922: [[89, 768]], 7923: [[121, 768]], 7924: [[89, 803]], 7925: [[121, 803]], 7926: [[89, 777]], 7927: [[121, 777]], 7928: [[89, 771]], 7929: [[121, 771]] },
        7936: { 7936: [[945, 787], , { 768: 7938, 769: 7940, 834: 7942, 837: 8064 }], 7937: [[945, 788], , { 768: 7939, 769: 7941, 834: 7943, 837: 8065 }], 7938: [[7936, 768], , { 837: 8066 }], 7939: [[7937, 768], , { 837: 8067 }], 7940: [[7936, 769], , { 837: 8068 }], 7941: [[7937, 769], , { 837: 8069 }], 7942: [[7936, 834], , { 837: 8070 }], 7943: [[7937, 834], , { 837: 8071 }], 7944: [[913, 787], , { 768: 7946, 769: 7948, 834: 7950, 837: 8072 }], 7945: [[913, 788], , { 768: 7947, 769: 7949, 834: 7951, 837: 8073 }], 7946: [[7944, 768], , { 837: 8074 }], 7947: [[7945, 768], , { 837: 8075 }], 7948: [[7944, 769], , { 837: 8076 }], 7949: [[7945, 769], , { 837: 8077 }], 7950: [[7944, 834], , { 837: 8078 }], 7951: [[7945, 834], , { 837: 8079 }], 7952: [[949, 787], , { 768: 7954, 769: 7956 }], 7953: [[949, 788], , { 768: 7955, 769: 7957 }], 7954: [[7952, 768]], 7955: [[7953, 768]], 7956: [[7952, 769]], 7957: [[7953, 769]], 7960: [[917, 787], , { 768: 7962, 769: 7964 }], 7961: [[917, 788], , { 768: 7963, 769: 7965 }], 7962: [[7960, 768]], 7963: [[7961, 768]], 7964: [[7960, 769]], 7965: [[7961, 769]], 7968: [[951, 787], , { 768: 7970, 769: 7972, 834: 7974, 837: 8080 }], 7969: [[951, 788], , { 768: 7971, 769: 7973, 834: 7975, 837: 8081 }], 7970: [[7968, 768], , { 837: 8082 }], 7971: [[7969, 768], , { 837: 8083 }], 7972: [[7968, 769], , { 837: 8084 }], 7973: [[7969, 769], , { 837: 8085 }], 7974: [[7968, 834], , { 837: 8086 }], 7975: [[7969, 834], , { 837: 8087 }], 7976: [[919, 787], , { 768: 7978, 769: 7980, 834: 7982, 837: 8088 }], 7977: [[919, 788], , { 768: 7979, 769: 7981, 834: 7983, 837: 8089 }], 7978: [[7976, 768], , { 837: 8090 }], 7979: [[7977, 768], , { 837: 8091 }], 7980: [[7976, 769], , { 837: 8092 }], 7981: [[7977, 769], , { 837: 8093 }], 7982: [[7976, 834], , { 837: 8094 }], 7983: [[7977, 834], , { 837: 8095 }], 7984: [[953, 787], , { 768: 7986, 769: 7988, 834: 7990 }], 7985: [[953, 788], , { 768: 7987, 769: 7989, 834: 7991 }], 7986: [[7984, 768]], 7987: [[7985, 768]], 7988: [[7984, 769]], 7989: [[7985, 769]], 7990: [[7984, 834]], 7991: [[7985, 834]], 7992: [[921, 787], , { 768: 7994, 769: 7996, 834: 7998 }], 7993: [[921, 788], , { 768: 7995, 769: 7997, 834: 7999 }], 7994: [[7992, 768]], 7995: [[7993, 768]], 7996: [[7992, 769]], 7997: [[7993, 769]], 7998: [[7992, 834]], 7999: [[7993, 834]], 8e3: [[959, 787], , { 768: 8002, 769: 8004 }], 8001: [[959, 788], , { 768: 8003, 769: 8005 }], 8002: [[8e3, 768]], 8003: [[8001, 768]], 8004: [[8e3, 769]], 8005: [[8001, 769]], 8008: [[927, 787], , { 768: 8010, 769: 8012 }], 8009: [[927, 788], , { 768: 8011, 769: 8013 }], 8010: [[8008, 768]], 8011: [[8009, 768]], 8012: [[8008, 769]], 8013: [[8009, 769]], 8016: [[965, 787], , { 768: 8018, 769: 8020, 834: 8022 }], 8017: [[965, 788], , { 768: 8019, 769: 8021, 834: 8023 }], 8018: [[8016, 768]], 8019: [[8017, 768]], 8020: [[8016, 769]], 8021: [[8017, 769]], 8022: [[8016, 834]], 8023: [[8017, 834]], 8025: [[933, 788], , { 768: 8027, 769: 8029, 834: 8031 }], 8027: [[8025, 768]], 8029: [[8025, 769]], 8031: [[8025, 834]], 8032: [[969, 787], , { 768: 8034, 769: 8036, 834: 8038, 837: 8096 }], 8033: [[969, 788], , { 768: 8035, 769: 8037, 834: 8039, 837: 8097 }], 8034: [[8032, 768], , { 837: 8098 }], 8035: [[8033, 768], , { 837: 8099 }], 8036: [[8032, 769], , { 837: 8100 }], 8037: [[8033, 769], , { 837: 8101 }], 8038: [[8032, 834], , { 837: 8102 }], 8039: [[8033, 834], , { 837: 8103 }], 8040: [[937, 787], , { 768: 8042, 769: 8044, 834: 8046, 837: 8104 }], 8041: [[937, 788], , { 768: 8043, 769: 8045, 834: 8047, 837: 8105 }], 8042: [[8040, 768], , { 837: 8106 }], 8043: [[8041, 768], , { 837: 8107 }], 8044: [[8040, 769], , { 837: 8108 }], 8045: [[8041, 769], , { 837: 8109 }], 8046: [[8040, 834], , { 837: 8110 }], 8047: [[8041, 834], , { 837: 8111 }], 8048: [[945, 768], , { 837: 8114 }], 8049: [[940]], 8050: [[949, 768]], 8051: [[941]], 8052: [[951, 768], , { 837: 8130 }], 8053: [[942]], 8054: [[953, 768]], 8055: [[943]], 8056: [[959, 768]], 8057: [[972]], 8058: [[965, 768]], 8059: [[973]], 8060: [[969, 768], , { 837: 8178 }], 8061: [[974]], 8064: [[7936, 837]], 8065: [[7937, 837]], 8066: [[7938, 837]], 8067: [[7939, 837]], 8068: [[7940, 837]], 8069: [[7941, 837]], 8070: [[7942, 837]], 8071: [[7943, 837]], 8072: [[7944, 837]], 8073: [[7945, 837]], 8074: [[7946, 837]], 8075: [[7947, 837]], 8076: [[7948, 837]], 8077: [[7949, 837]], 8078: [[7950, 837]], 8079: [[7951, 837]], 8080: [[7968, 837]], 8081: [[7969, 837]], 8082: [[7970, 837]], 8083: [[7971, 837]], 8084: [[7972, 837]], 8085: [[7973, 837]], 8086: [[7974, 837]], 8087: [[7975, 837]], 8088: [[7976, 837]], 8089: [[7977, 837]], 8090: [[7978, 837]], 8091: [[7979, 837]], 8092: [[7980, 837]], 8093: [[7981, 837]], 8094: [[7982, 837]], 8095: [[7983, 837]], 8096: [[8032, 837]], 8097: [[8033, 837]], 8098: [[8034, 837]], 8099: [[8035, 837]], 8100: [[8036, 837]], 8101: [[8037, 837]], 8102: [[8038, 837]], 8103: [[8039, 837]], 8104: [[8040, 837]], 8105: [[8041, 837]], 8106: [[8042, 837]], 8107: [[8043, 837]], 8108: [[8044, 837]], 8109: [[8045, 837]], 8110: [[8046, 837]], 8111: [[8047, 837]], 8112: [[945, 774]], 8113: [[945, 772]], 8114: [[8048, 837]], 8115: [[945, 837]], 8116: [[940, 837]], 8118: [[945, 834], , { 837: 8119 }], 8119: [[8118, 837]], 8120: [[913, 774]], 8121: [[913, 772]], 8122: [[913, 768]], 8123: [[902]], 8124: [[913, 837]], 8125: [[32, 787], 256], 8126: [[953]], 8127: [[32, 787], 256, { 768: 8141, 769: 8142, 834: 8143 }], 8128: [[32, 834], 256], 8129: [[168, 834]], 8130: [[8052, 837]], 8131: [[951, 837]], 8132: [[942, 837]], 8134: [[951, 834], , { 837: 8135 }], 8135: [[8134, 837]], 8136: [[917, 768]], 8137: [[904]], 8138: [[919, 768]], 8139: [[905]], 8140: [[919, 837]], 8141: [[8127, 768]], 8142: [[8127, 769]], 8143: [[8127, 834]], 8144: [[953, 774]], 8145: [[953, 772]], 8146: [[970, 768]], 8147: [[912]], 8150: [[953, 834]], 8151: [[970, 834]], 8152: [[921, 774]], 8153: [[921, 772]], 8154: [[921, 768]], 8155: [[906]], 8157: [[8190, 768]], 8158: [[8190, 769]], 8159: [[8190, 834]], 8160: [[965, 774]], 8161: [[965, 772]], 8162: [[971, 768]], 8163: [[944]], 8164: [[961, 787]], 8165: [[961, 788]], 8166: [[965, 834]], 8167: [[971, 834]], 8168: [[933, 774]], 8169: [[933, 772]], 8170: [[933, 768]], 8171: [[910]], 8172: [[929, 788]], 8173: [[168, 768]], 8174: [[901]], 8175: [[96]], 8178: [[8060, 837]], 8179: [[969, 837]], 8180: [[974, 837]], 8182: [[969, 834], , { 837: 8183 }], 8183: [[8182, 837]], 8184: [[927, 768]], 8185: [[908]], 8186: [[937, 768]], 8187: [[911]], 8188: [[937, 837]], 8189: [[180]], 8190: [[32, 788], 256, { 768: 8157, 769: 8158, 834: 8159 }] },
        8192: { 8192: [[8194]], 8193: [[8195]], 8194: [[32], 256], 8195: [[32], 256], 8196: [[32], 256], 8197: [[32], 256], 8198: [[32], 256], 8199: [[32], 256], 8200: [[32], 256], 8201: [[32], 256], 8202: [[32], 256], 8209: [[8208], 256], 8215: [[32, 819], 256], 8228: [[46], 256], 8229: [[46, 46], 256], 8230: [[46, 46, 46], 256], 8239: [[32], 256], 8243: [[8242, 8242], 256], 8244: [[8242, 8242, 8242], 256], 8246: [[8245, 8245], 256], 8247: [[8245, 8245, 8245], 256], 8252: [[33, 33], 256], 8254: [[32, 773], 256], 8263: [[63, 63], 256], 8264: [[63, 33], 256], 8265: [[33, 63], 256], 8279: [[8242, 8242, 8242, 8242], 256], 8287: [[32], 256], 8304: [[48], 256], 8305: [[105], 256], 8308: [[52], 256], 8309: [[53], 256], 8310: [[54], 256], 8311: [[55], 256], 8312: [[56], 256], 8313: [[57], 256], 8314: [[43], 256], 8315: [[8722], 256], 8316: [[61], 256], 8317: [[40], 256], 8318: [[41], 256], 8319: [[110], 256], 8320: [[48], 256], 8321: [[49], 256], 8322: [[50], 256], 8323: [[51], 256], 8324: [[52], 256], 8325: [[53], 256], 8326: [[54], 256], 8327: [[55], 256], 8328: [[56], 256], 8329: [[57], 256], 8330: [[43], 256], 8331: [[8722], 256], 8332: [[61], 256], 8333: [[40], 256], 8334: [[41], 256], 8336: [[97], 256], 8337: [[101], 256], 8338: [[111], 256], 8339: [[120], 256], 8340: [[601], 256], 8341: [[104], 256], 8342: [[107], 256], 8343: [[108], 256], 8344: [[109], 256], 8345: [[110], 256], 8346: [[112], 256], 8347: [[115], 256], 8348: [[116], 256], 8360: [[82, 115], 256], 8400: [, 230], 8401: [, 230], 8402: [, 1], 8403: [, 1], 8404: [, 230], 8405: [, 230], 8406: [, 230], 8407: [, 230], 8408: [, 1], 8409: [, 1], 8410: [, 1], 8411: [, 230], 8412: [, 230], 8417: [, 230], 8421: [, 1], 8422: [, 1], 8423: [, 230], 8424: [, 220], 8425: [, 230], 8426: [, 1], 8427: [, 1], 8428: [, 220], 8429: [, 220], 8430: [, 220], 8431: [, 220], 8432: [, 230] },
        8448: { 8448: [[97, 47, 99], 256], 8449: [[97, 47, 115], 256], 8450: [[67], 256], 8451: [[176, 67], 256], 8453: [[99, 47, 111], 256], 8454: [[99, 47, 117], 256], 8455: [[400], 256], 8457: [[176, 70], 256], 8458: [[103], 256], 8459: [[72], 256], 8460: [[72], 256], 8461: [[72], 256], 8462: [[104], 256], 8463: [[295], 256], 8464: [[73], 256], 8465: [[73], 256], 8466: [[76], 256], 8467: [[108], 256], 8469: [[78], 256], 8470: [[78, 111], 256], 8473: [[80], 256], 8474: [[81], 256], 8475: [[82], 256], 8476: [[82], 256], 8477: [[82], 256], 8480: [[83, 77], 256], 8481: [[84, 69, 76], 256], 8482: [[84, 77], 256], 8484: [[90], 256], 8486: [[937]], 8488: [[90], 256], 8490: [[75]], 8491: [[197]], 8492: [[66], 256], 8493: [[67], 256], 8495: [[101], 256], 8496: [[69], 256], 8497: [[70], 256], 8499: [[77], 256], 8500: [[111], 256], 8501: [[1488], 256], 8502: [[1489], 256], 8503: [[1490], 256], 8504: [[1491], 256], 8505: [[105], 256], 8507: [[70, 65, 88], 256], 8508: [[960], 256], 8509: [[947], 256], 8510: [[915], 256], 8511: [[928], 256], 8512: [[8721], 256], 8517: [[68], 256], 8518: [[100], 256], 8519: [[101], 256], 8520: [[105], 256], 8521: [[106], 256], 8528: [[49, 8260, 55], 256], 8529: [[49, 8260, 57], 256], 8530: [[49, 8260, 49, 48], 256], 8531: [[49, 8260, 51], 256], 8532: [[50, 8260, 51], 256], 8533: [[49, 8260, 53], 256], 8534: [[50, 8260, 53], 256], 8535: [[51, 8260, 53], 256], 8536: [[52, 8260, 53], 256], 8537: [[49, 8260, 54], 256], 8538: [[53, 8260, 54], 256], 8539: [[49, 8260, 56], 256], 8540: [[51, 8260, 56], 256], 8541: [[53, 8260, 56], 256], 8542: [[55, 8260, 56], 256], 8543: [[49, 8260], 256], 8544: [[73], 256], 8545: [[73, 73], 256], 8546: [[73, 73, 73], 256], 8547: [[73, 86], 256], 8548: [[86], 256], 8549: [[86, 73], 256], 8550: [[86, 73, 73], 256], 8551: [[86, 73, 73, 73], 256], 8552: [[73, 88], 256], 8553: [[88], 256], 8554: [[88, 73], 256], 8555: [[88, 73, 73], 256], 8556: [[76], 256], 8557: [[67], 256], 8558: [[68], 256], 8559: [[77], 256], 8560: [[105], 256], 8561: [[105, 105], 256], 8562: [[105, 105, 105], 256], 8563: [[105, 118], 256], 8564: [[118], 256], 8565: [[118, 105], 256], 8566: [[118, 105, 105], 256], 8567: [[118, 105, 105, 105], 256], 8568: [[105, 120], 256], 8569: [[120], 256], 8570: [[120, 105], 256], 8571: [[120, 105, 105], 256], 8572: [[108], 256], 8573: [[99], 256], 8574: [[100], 256], 8575: [[109], 256], 8585: [[48, 8260, 51], 256], 8592: [, , { 824: 8602 }], 8594: [, , { 824: 8603 }], 8596: [, , { 824: 8622 }], 8602: [[8592, 824]], 8603: [[8594, 824]], 8622: [[8596, 824]], 8653: [[8656, 824]], 8654: [[8660, 824]], 8655: [[8658, 824]], 8656: [, , { 824: 8653 }], 8658: [, , { 824: 8655 }], 8660: [, , { 824: 8654 }] },
        8704: { 8707: [, , { 824: 8708 }], 8708: [[8707, 824]], 8712: [, , { 824: 8713 }], 8713: [[8712, 824]], 8715: [, , { 824: 8716 }], 8716: [[8715, 824]], 8739: [, , { 824: 8740 }], 8740: [[8739, 824]], 8741: [, , { 824: 8742 }], 8742: [[8741, 824]], 8748: [[8747, 8747], 256], 8749: [[8747, 8747, 8747], 256], 8751: [[8750, 8750], 256], 8752: [[8750, 8750, 8750], 256], 8764: [, , { 824: 8769 }], 8769: [[8764, 824]], 8771: [, , { 824: 8772 }], 8772: [[8771, 824]], 8773: [, , { 824: 8775 }], 8775: [[8773, 824]], 8776: [, , { 824: 8777 }], 8777: [[8776, 824]], 8781: [, , { 824: 8813 }], 8800: [[61, 824]], 8801: [, , { 824: 8802 }], 8802: [[8801, 824]], 8804: [, , { 824: 8816 }], 8805: [, , { 824: 8817 }], 8813: [[8781, 824]], 8814: [[60, 824]], 8815: [[62, 824]], 8816: [[8804, 824]], 8817: [[8805, 824]], 8818: [, , { 824: 8820 }], 8819: [, , { 824: 8821 }], 8820: [[8818, 824]], 8821: [[8819, 824]], 8822: [, , { 824: 8824 }], 8823: [, , { 824: 8825 }], 8824: [[8822, 824]], 8825: [[8823, 824]], 8826: [, , { 824: 8832 }], 8827: [, , { 824: 8833 }], 8828: [, , { 824: 8928 }], 8829: [, , { 824: 8929 }], 8832: [[8826, 824]], 8833: [[8827, 824]], 8834: [, , { 824: 8836 }], 8835: [, , { 824: 8837 }], 8836: [[8834, 824]], 8837: [[8835, 824]], 8838: [, , { 824: 8840 }], 8839: [, , { 824: 8841 }], 8840: [[8838, 824]], 8841: [[8839, 824]], 8849: [, , { 824: 8930 }], 8850: [, , { 824: 8931 }], 8866: [, , { 824: 8876 }], 8872: [, , { 824: 8877 }], 8873: [, , { 824: 8878 }], 8875: [, , { 824: 8879 }], 8876: [[8866, 824]], 8877: [[8872, 824]], 8878: [[8873, 824]], 8879: [[8875, 824]], 8882: [, , { 824: 8938 }], 8883: [, , { 824: 8939 }], 8884: [, , { 824: 8940 }], 8885: [, , { 824: 8941 }], 8928: [[8828, 824]], 8929: [[8829, 824]], 8930: [[8849, 824]], 8931: [[8850, 824]], 8938: [[8882, 824]], 8939: [[8883, 824]], 8940: [[8884, 824]], 8941: [[8885, 824]] },
        8960: { 9001: [[12296]], 9002: [[12297]] },
        9216: { 9312: [[49], 256], 9313: [[50], 256], 9314: [[51], 256], 9315: [[52], 256], 9316: [[53], 256], 9317: [[54], 256], 9318: [[55], 256], 9319: [[56], 256], 9320: [[57], 256], 9321: [[49, 48], 256], 9322: [[49, 49], 256], 9323: [[49, 50], 256], 9324: [[49, 51], 256], 9325: [[49, 52], 256], 9326: [[49, 53], 256], 9327: [[49, 54], 256], 9328: [[49, 55], 256], 9329: [[49, 56], 256], 9330: [[49, 57], 256], 9331: [[50, 48], 256], 9332: [[40, 49, 41], 256], 9333: [[40, 50, 41], 256], 9334: [[40, 51, 41], 256], 9335: [[40, 52, 41], 256], 9336: [[40, 53, 41], 256], 9337: [[40, 54, 41], 256], 9338: [[40, 55, 41], 256], 9339: [[40, 56, 41], 256], 9340: [[40, 57, 41], 256], 9341: [[40, 49, 48, 41], 256], 9342: [[40, 49, 49, 41], 256], 9343: [[40, 49, 50, 41], 256], 9344: [[40, 49, 51, 41], 256], 9345: [[40, 49, 52, 41], 256], 9346: [[40, 49, 53, 41], 256], 9347: [[40, 49, 54, 41], 256], 9348: [[40, 49, 55, 41], 256], 9349: [[40, 49, 56, 41], 256], 9350: [[40, 49, 57, 41], 256], 9351: [[40, 50, 48, 41], 256], 9352: [[49, 46], 256], 9353: [[50, 46], 256], 9354: [[51, 46], 256], 9355: [[52, 46], 256], 9356: [[53, 46], 256], 9357: [[54, 46], 256], 9358: [[55, 46], 256], 9359: [[56, 46], 256], 9360: [[57, 46], 256], 9361: [[49, 48, 46], 256], 9362: [[49, 49, 46], 256], 9363: [[49, 50, 46], 256], 9364: [[49, 51, 46], 256], 9365: [[49, 52, 46], 256], 9366: [[49, 53, 46], 256], 9367: [[49, 54, 46], 256], 9368: [[49, 55, 46], 256], 9369: [[49, 56, 46], 256], 9370: [[49, 57, 46], 256], 9371: [[50, 48, 46], 256], 9372: [[40, 97, 41], 256], 9373: [[40, 98, 41], 256], 9374: [[40, 99, 41], 256], 9375: [[40, 100, 41], 256], 9376: [[40, 101, 41], 256], 9377: [[40, 102, 41], 256], 9378: [[40, 103, 41], 256], 9379: [[40, 104, 41], 256], 9380: [[40, 105, 41], 256], 9381: [[40, 106, 41], 256], 9382: [[40, 107, 41], 256], 9383: [[40, 108, 41], 256], 9384: [[40, 109, 41], 256], 9385: [[40, 110, 41], 256], 9386: [[40, 111, 41], 256], 9387: [[40, 112, 41], 256], 9388: [[40, 113, 41], 256], 9389: [[40, 114, 41], 256], 9390: [[40, 115, 41], 256], 9391: [[40, 116, 41], 256], 9392: [[40, 117, 41], 256], 9393: [[40, 118, 41], 256], 9394: [[40, 119, 41], 256], 9395: [[40, 120, 41], 256], 9396: [[40, 121, 41], 256], 9397: [[40, 122, 41], 256], 9398: [[65], 256], 9399: [[66], 256], 9400: [[67], 256], 9401: [[68], 256], 9402: [[69], 256], 9403: [[70], 256], 9404: [[71], 256], 9405: [[72], 256], 9406: [[73], 256], 9407: [[74], 256], 9408: [[75], 256], 9409: [[76], 256], 9410: [[77], 256], 9411: [[78], 256], 9412: [[79], 256], 9413: [[80], 256], 9414: [[81], 256], 9415: [[82], 256], 9416: [[83], 256], 9417: [[84], 256], 9418: [[85], 256], 9419: [[86], 256], 9420: [[87], 256], 9421: [[88], 256], 9422: [[89], 256], 9423: [[90], 256], 9424: [[97], 256], 9425: [[98], 256], 9426: [[99], 256], 9427: [[100], 256], 9428: [[101], 256], 9429: [[102], 256], 9430: [[103], 256], 9431: [[104], 256], 9432: [[105], 256], 9433: [[106], 256], 9434: [[107], 256], 9435: [[108], 256], 9436: [[109], 256], 9437: [[110], 256], 9438: [[111], 256], 9439: [[112], 256], 9440: [[113], 256], 9441: [[114], 256], 9442: [[115], 256], 9443: [[116], 256], 9444: [[117], 256], 9445: [[118], 256], 9446: [[119], 256], 9447: [[120], 256], 9448: [[121], 256], 9449: [[122], 256], 9450: [[48], 256] },
        10752: { 10764: [[8747, 8747, 8747, 8747], 256], 10868: [[58, 58, 61], 256], 10869: [[61, 61], 256], 10870: [[61, 61, 61], 256], 10972: [[10973, 824], 512] },
        11264: { 11388: [[106], 256], 11389: [[86], 256], 11503: [, 230], 11504: [, 230], 11505: [, 230] },
        11520: { 11631: [[11617], 256], 11647: [, 9], 11744: [, 230], 11745: [, 230], 11746: [, 230], 11747: [, 230], 11748: [, 230], 11749: [, 230], 11750: [, 230], 11751: [, 230], 11752: [, 230], 11753: [, 230], 11754: [, 230], 11755: [, 230], 11756: [, 230], 11757: [, 230], 11758: [, 230], 11759: [, 230], 11760: [, 230], 11761: [, 230], 11762: [, 230], 11763: [, 230], 11764: [, 230], 11765: [, 230], 11766: [, 230], 11767: [, 230], 11768: [, 230], 11769: [, 230], 11770: [, 230], 11771: [, 230], 11772: [, 230], 11773: [, 230], 11774: [, 230], 11775: [, 230] },
        11776: { 11935: [[27597], 256], 12019: [[40863], 256] },
        12032: { 12032: [[19968], 256], 12033: [[20008], 256], 12034: [[20022], 256], 12035: [[20031], 256], 12036: [[20057], 256], 12037: [[20101], 256], 12038: [[20108], 256], 12039: [[20128], 256], 12040: [[20154], 256], 12041: [[20799], 256], 12042: [[20837], 256], 12043: [[20843], 256], 12044: [[20866], 256], 12045: [[20886], 256], 12046: [[20907], 256], 12047: [[20960], 256], 12048: [[20981], 256], 12049: [[20992], 256], 12050: [[21147], 256], 12051: [[21241], 256], 12052: [[21269], 256], 12053: [[21274], 256], 12054: [[21304], 256], 12055: [[21313], 256], 12056: [[21340], 256], 12057: [[21353], 256], 12058: [[21378], 256], 12059: [[21430], 256], 12060: [[21448], 256], 12061: [[21475], 256], 12062: [[22231], 256], 12063: [[22303], 256], 12064: [[22763], 256], 12065: [[22786], 256], 12066: [[22794], 256], 12067: [[22805], 256], 12068: [[22823], 256], 12069: [[22899], 256], 12070: [[23376], 256], 12071: [[23424], 256], 12072: [[23544], 256], 12073: [[23567], 256], 12074: [[23586], 256], 12075: [[23608], 256], 12076: [[23662], 256], 12077: [[23665], 256], 12078: [[24027], 256], 12079: [[24037], 256], 12080: [[24049], 256], 12081: [[24062], 256], 12082: [[24178], 256], 12083: [[24186], 256], 12084: [[24191], 256], 12085: [[24308], 256], 12086: [[24318], 256], 12087: [[24331], 256], 12088: [[24339], 256], 12089: [[24400], 256], 12090: [[24417], 256], 12091: [[24435], 256], 12092: [[24515], 256], 12093: [[25096], 256], 12094: [[25142], 256], 12095: [[25163], 256], 12096: [[25903], 256], 12097: [[25908], 256], 12098: [[25991], 256], 12099: [[26007], 256], 12100: [[26020], 256], 12101: [[26041], 256], 12102: [[26080], 256], 12103: [[26085], 256], 12104: [[26352], 256], 12105: [[26376], 256], 12106: [[26408], 256], 12107: [[27424], 256], 12108: [[27490], 256], 12109: [[27513], 256], 12110: [[27571], 256], 12111: [[27595], 256], 12112: [[27604], 256], 12113: [[27611], 256], 12114: [[27663], 256], 12115: [[27668], 256], 12116: [[27700], 256], 12117: [[28779], 256], 12118: [[29226], 256], 12119: [[29238], 256], 12120: [[29243], 256], 12121: [[29247], 256], 12122: [[29255], 256], 12123: [[29273], 256], 12124: [[29275], 256], 12125: [[29356], 256], 12126: [[29572], 256], 12127: [[29577], 256], 12128: [[29916], 256], 12129: [[29926], 256], 12130: [[29976], 256], 12131: [[29983], 256], 12132: [[29992], 256], 12133: [[3e4], 256], 12134: [[30091], 256], 12135: [[30098], 256], 12136: [[30326], 256], 12137: [[30333], 256], 12138: [[30382], 256], 12139: [[30399], 256], 12140: [[30446], 256], 12141: [[30683], 256], 12142: [[30690], 256], 12143: [[30707], 256], 12144: [[31034], 256], 12145: [[31160], 256], 12146: [[31166], 256], 12147: [[31348], 256], 12148: [[31435], 256], 12149: [[31481], 256], 12150: [[31859], 256], 12151: [[31992], 256], 12152: [[32566], 256], 12153: [[32593], 256], 12154: [[32650], 256], 12155: [[32701], 256], 12156: [[32769], 256], 12157: [[32780], 256], 12158: [[32786], 256], 12159: [[32819], 256], 12160: [[32895], 256], 12161: [[32905], 256], 12162: [[33251], 256], 12163: [[33258], 256], 12164: [[33267], 256], 12165: [[33276], 256], 12166: [[33292], 256], 12167: [[33307], 256], 12168: [[33311], 256], 12169: [[33390], 256], 12170: [[33394], 256], 12171: [[33400], 256], 12172: [[34381], 256], 12173: [[34411], 256], 12174: [[34880], 256], 12175: [[34892], 256], 12176: [[34915], 256], 12177: [[35198], 256], 12178: [[35211], 256], 12179: [[35282], 256], 12180: [[35328], 256], 12181: [[35895], 256], 12182: [[35910], 256], 12183: [[35925], 256], 12184: [[35960], 256], 12185: [[35997], 256], 12186: [[36196], 256], 12187: [[36208], 256], 12188: [[36275], 256], 12189: [[36523], 256], 12190: [[36554], 256], 12191: [[36763], 256], 12192: [[36784], 256], 12193: [[36789], 256], 12194: [[37009], 256], 12195: [[37193], 256], 12196: [[37318], 256], 12197: [[37324], 256], 12198: [[37329], 256], 12199: [[38263], 256], 12200: [[38272], 256], 12201: [[38428], 256], 12202: [[38582], 256], 12203: [[38585], 256], 12204: [[38632], 256], 12205: [[38737], 256], 12206: [[38750], 256], 12207: [[38754], 256], 12208: [[38761], 256], 12209: [[38859], 256], 12210: [[38893], 256], 12211: [[38899], 256], 12212: [[38913], 256], 12213: [[39080], 256], 12214: [[39131], 256], 12215: [[39135], 256], 12216: [[39318], 256], 12217: [[39321], 256], 12218: [[39340], 256], 12219: [[39592], 256], 12220: [[39640], 256], 12221: [[39647], 256], 12222: [[39717], 256], 12223: [[39727], 256], 12224: [[39730], 256], 12225: [[39740], 256], 12226: [[39770], 256], 12227: [[40165], 256], 12228: [[40565], 256], 12229: [[40575], 256], 12230: [[40613], 256], 12231: [[40635], 256], 12232: [[40643], 256], 12233: [[40653], 256], 12234: [[40657], 256], 12235: [[40697], 256], 12236: [[40701], 256], 12237: [[40718], 256], 12238: [[40723], 256], 12239: [[40736], 256], 12240: [[40763], 256], 12241: [[40778], 256], 12242: [[40786], 256], 12243: [[40845], 256], 12244: [[40860], 256], 12245: [[40864], 256] },
        12288: { 12288: [[32], 256], 12330: [, 218], 12331: [, 228], 12332: [, 232], 12333: [, 222], 12334: [, 224], 12335: [, 224], 12342: [[12306], 256], 12344: [[21313], 256], 12345: [[21316], 256], 12346: [[21317], 256], 12358: [, , { 12441: 12436 }], 12363: [, , { 12441: 12364 }], 12364: [[12363, 12441]], 12365: [, , { 12441: 12366 }], 12366: [[12365, 12441]], 12367: [, , { 12441: 12368 }], 12368: [[12367, 12441]], 12369: [, , { 12441: 12370 }], 12370: [[12369, 12441]], 12371: [, , { 12441: 12372 }], 12372: [[12371, 12441]], 12373: [, , { 12441: 12374 }], 12374: [[12373, 12441]], 12375: [, , { 12441: 12376 }], 12376: [[12375, 12441]], 12377: [, , { 12441: 12378 }], 12378: [[12377, 12441]], 12379: [, , { 12441: 12380 }], 12380: [[12379, 12441]], 12381: [, , { 12441: 12382 }], 12382: [[12381, 12441]], 12383: [, , { 12441: 12384 }], 12384: [[12383, 12441]], 12385: [, , { 12441: 12386 }], 12386: [[12385, 12441]], 12388: [, , { 12441: 12389 }], 12389: [[12388, 12441]], 12390: [, , { 12441: 12391 }], 12391: [[12390, 12441]], 12392: [, , { 12441: 12393 }], 12393: [[12392, 12441]], 12399: [, , { 12441: 12400, 12442: 12401 }], 12400: [[12399, 12441]], 12401: [[12399, 12442]], 12402: [, , { 12441: 12403, 12442: 12404 }], 12403: [[12402, 12441]], 12404: [[12402, 12442]], 12405: [, , { 12441: 12406, 12442: 12407 }], 12406: [[12405, 12441]], 12407: [[12405, 12442]], 12408: [, , { 12441: 12409, 12442: 12410 }], 12409: [[12408, 12441]], 12410: [[12408, 12442]], 12411: [, , { 12441: 12412, 12442: 12413 }], 12412: [[12411, 12441]], 12413: [[12411, 12442]], 12436: [[12358, 12441]], 12441: [, 8], 12442: [, 8], 12443: [[32, 12441], 256], 12444: [[32, 12442], 256], 12445: [, , { 12441: 12446 }], 12446: [[12445, 12441]], 12447: [[12424, 12426], 256], 12454: [, , { 12441: 12532 }], 12459: [, , { 12441: 12460 }], 12460: [[12459, 12441]], 12461: [, , { 12441: 12462 }], 12462: [[12461, 12441]], 12463: [, , { 12441: 12464 }], 12464: [[12463, 12441]], 12465: [, , { 12441: 12466 }], 12466: [[12465, 12441]], 12467: [, , { 12441: 12468 }], 12468: [[12467, 12441]], 12469: [, , { 12441: 12470 }], 12470: [[12469, 12441]], 12471: [, , { 12441: 12472 }], 12472: [[12471, 12441]], 12473: [, , { 12441: 12474 }], 12474: [[12473, 12441]], 12475: [, , { 12441: 12476 }], 12476: [[12475, 12441]], 12477: [, , { 12441: 12478 }], 12478: [[12477, 12441]], 12479: [, , { 12441: 12480 }], 12480: [[12479, 12441]], 12481: [, , { 12441: 12482 }], 12482: [[12481, 12441]], 12484: [, , { 12441: 12485 }], 12485: [[12484, 12441]], 12486: [, , { 12441: 12487 }], 12487: [[12486, 12441]], 12488: [, , { 12441: 12489 }], 12489: [[12488, 12441]], 12495: [, , { 12441: 12496, 12442: 12497 }], 12496: [[12495, 12441]], 12497: [[12495, 12442]], 12498: [, , { 12441: 12499, 12442: 12500 }], 12499: [[12498, 12441]], 12500: [[12498, 12442]], 12501: [, , { 12441: 12502, 12442: 12503 }], 12502: [[12501, 12441]], 12503: [[12501, 12442]], 12504: [, , { 12441: 12505, 12442: 12506 }], 12505: [[12504, 12441]], 12506: [[12504, 12442]], 12507: [, , { 12441: 12508, 12442: 12509 }], 12508: [[12507, 12441]], 12509: [[12507, 12442]], 12527: [, , { 12441: 12535 }], 12528: [, , { 12441: 12536 }], 12529: [, , { 12441: 12537 }], 12530: [, , { 12441: 12538 }], 12532: [[12454, 12441]], 12535: [[12527, 12441]], 12536: [[12528, 12441]], 12537: [[12529, 12441]], 12538: [[12530, 12441]], 12541: [, , { 12441: 12542 }], 12542: [[12541, 12441]], 12543: [[12467, 12488], 256] },
        12544: { 12593: [[4352], 256], 12594: [[4353], 256], 12595: [[4522], 256], 12596: [[4354], 256], 12597: [[4524], 256], 12598: [[4525], 256], 12599: [[4355], 256], 12600: [[4356], 256], 12601: [[4357], 256], 12602: [[4528], 256], 12603: [[4529], 256], 12604: [[4530], 256], 12605: [[4531], 256], 12606: [[4532], 256], 12607: [[4533], 256], 12608: [[4378], 256], 12609: [[4358], 256], 12610: [[4359], 256], 12611: [[4360], 256], 12612: [[4385], 256], 12613: [[4361], 256], 12614: [[4362], 256], 12615: [[4363], 256], 12616: [[4364], 256], 12617: [[4365], 256], 12618: [[4366], 256], 12619: [[4367], 256], 12620: [[4368], 256], 12621: [[4369], 256], 12622: [[4370], 256], 12623: [[4449], 256], 12624: [[4450], 256], 12625: [[4451], 256], 12626: [[4452], 256], 12627: [[4453], 256], 12628: [[4454], 256], 12629: [[4455], 256], 12630: [[4456], 256], 12631: [[4457], 256], 12632: [[4458], 256], 12633: [[4459], 256], 12634: [[4460], 256], 12635: [[4461], 256], 12636: [[4462], 256], 12637: [[4463], 256], 12638: [[4464], 256], 12639: [[4465], 256], 12640: [[4466], 256], 12641: [[4467], 256], 12642: [[4468], 256], 12643: [[4469], 256], 12644: [[4448], 256], 12645: [[4372], 256], 12646: [[4373], 256], 12647: [[4551], 256], 12648: [[4552], 256], 12649: [[4556], 256], 12650: [[4558], 256], 12651: [[4563], 256], 12652: [[4567], 256], 12653: [[4569], 256], 12654: [[4380], 256], 12655: [[4573], 256], 12656: [[4575], 256], 12657: [[4381], 256], 12658: [[4382], 256], 12659: [[4384], 256], 12660: [[4386], 256], 12661: [[4387], 256], 12662: [[4391], 256], 12663: [[4393], 256], 12664: [[4395], 256], 12665: [[4396], 256], 12666: [[4397], 256], 12667: [[4398], 256], 12668: [[4399], 256], 12669: [[4402], 256], 12670: [[4406], 256], 12671: [[4416], 256], 12672: [[4423], 256], 12673: [[4428], 256], 12674: [[4593], 256], 12675: [[4594], 256], 12676: [[4439], 256], 12677: [[4440], 256], 12678: [[4441], 256], 12679: [[4484], 256], 12680: [[4485], 256], 12681: [[4488], 256], 12682: [[4497], 256], 12683: [[4498], 256], 12684: [[4500], 256], 12685: [[4510], 256], 12686: [[4513], 256], 12690: [[19968], 256], 12691: [[20108], 256], 12692: [[19977], 256], 12693: [[22235], 256], 12694: [[19978], 256], 12695: [[20013], 256], 12696: [[19979], 256], 12697: [[30002], 256], 12698: [[20057], 256], 12699: [[19993], 256], 12700: [[19969], 256], 12701: [[22825], 256], 12702: [[22320], 256], 12703: [[20154], 256] },
        12800: { 12800: [[40, 4352, 41], 256], 12801: [[40, 4354, 41], 256], 12802: [[40, 4355, 41], 256], 12803: [[40, 4357, 41], 256], 12804: [[40, 4358, 41], 256], 12805: [[40, 4359, 41], 256], 12806: [[40, 4361, 41], 256], 12807: [[40, 4363, 41], 256], 12808: [[40, 4364, 41], 256], 12809: [[40, 4366, 41], 256], 12810: [[40, 4367, 41], 256], 12811: [[40, 4368, 41], 256], 12812: [[40, 4369, 41], 256], 12813: [[40, 4370, 41], 256], 12814: [[40, 4352, 4449, 41], 256], 12815: [[40, 4354, 4449, 41], 256], 12816: [[40, 4355, 4449, 41], 256], 12817: [[40, 4357, 4449, 41], 256], 12818: [[40, 4358, 4449, 41], 256], 12819: [[40, 4359, 4449, 41], 256], 12820: [[40, 4361, 4449, 41], 256], 12821: [[40, 4363, 4449, 41], 256], 12822: [[40, 4364, 4449, 41], 256], 12823: [[40, 4366, 4449, 41], 256], 12824: [[40, 4367, 4449, 41], 256], 12825: [[40, 4368, 4449, 41], 256], 12826: [[40, 4369, 4449, 41], 256], 12827: [[40, 4370, 4449, 41], 256], 12828: [[40, 4364, 4462, 41], 256], 12829: [[40, 4363, 4457, 4364, 4453, 4523, 41], 256], 12830: [[40, 4363, 4457, 4370, 4462, 41], 256], 12832: [[40, 19968, 41], 256], 12833: [[40, 20108, 41], 256], 12834: [[40, 19977, 41], 256], 12835: [[40, 22235, 41], 256], 12836: [[40, 20116, 41], 256], 12837: [[40, 20845, 41], 256], 12838: [[40, 19971, 41], 256], 12839: [[40, 20843, 41], 256], 12840: [[40, 20061, 41], 256], 12841: [[40, 21313, 41], 256], 12842: [[40, 26376, 41], 256], 12843: [[40, 28779, 41], 256], 12844: [[40, 27700, 41], 256], 12845: [[40, 26408, 41], 256], 12846: [[40, 37329, 41], 256], 12847: [[40, 22303, 41], 256], 12848: [[40, 26085, 41], 256], 12849: [[40, 26666, 41], 256], 12850: [[40, 26377, 41], 256], 12851: [[40, 31038, 41], 256], 12852: [[40, 21517, 41], 256], 12853: [[40, 29305, 41], 256], 12854: [[40, 36001, 41], 256], 12855: [[40, 31069, 41], 256], 12856: [[40, 21172, 41], 256], 12857: [[40, 20195, 41], 256], 12858: [[40, 21628, 41], 256], 12859: [[40, 23398, 41], 256], 12860: [[40, 30435, 41], 256], 12861: [[40, 20225, 41], 256], 12862: [[40, 36039, 41], 256], 12863: [[40, 21332, 41], 256], 12864: [[40, 31085, 41], 256], 12865: [[40, 20241, 41], 256], 12866: [[40, 33258, 41], 256], 12867: [[40, 33267, 41], 256], 12868: [[21839], 256], 12869: [[24188], 256], 12870: [[25991], 256], 12871: [[31631], 256], 12880: [[80, 84, 69], 256], 12881: [[50, 49], 256], 12882: [[50, 50], 256], 12883: [[50, 51], 256], 12884: [[50, 52], 256], 12885: [[50, 53], 256], 12886: [[50, 54], 256], 12887: [[50, 55], 256], 12888: [[50, 56], 256], 12889: [[50, 57], 256], 12890: [[51, 48], 256], 12891: [[51, 49], 256], 12892: [[51, 50], 256], 12893: [[51, 51], 256], 12894: [[51, 52], 256], 12895: [[51, 53], 256], 12896: [[4352], 256], 12897: [[4354], 256], 12898: [[4355], 256], 12899: [[4357], 256], 12900: [[4358], 256], 12901: [[4359], 256], 12902: [[4361], 256], 12903: [[4363], 256], 12904: [[4364], 256], 12905: [[4366], 256], 12906: [[4367], 256], 12907: [[4368], 256], 12908: [[4369], 256], 12909: [[4370], 256], 12910: [[4352, 4449], 256], 12911: [[4354, 4449], 256], 12912: [[4355, 4449], 256], 12913: [[4357, 4449], 256], 12914: [[4358, 4449], 256], 12915: [[4359, 4449], 256], 12916: [[4361, 4449], 256], 12917: [[4363, 4449], 256], 12918: [[4364, 4449], 256], 12919: [[4366, 4449], 256], 12920: [[4367, 4449], 256], 12921: [[4368, 4449], 256], 12922: [[4369, 4449], 256], 12923: [[4370, 4449], 256], 12924: [[4366, 4449, 4535, 4352, 4457], 256], 12925: [[4364, 4462, 4363, 4468], 256], 12926: [[4363, 4462], 256], 12928: [[19968], 256], 12929: [[20108], 256], 12930: [[19977], 256], 12931: [[22235], 256], 12932: [[20116], 256], 12933: [[20845], 256], 12934: [[19971], 256], 12935: [[20843], 256], 12936: [[20061], 256], 12937: [[21313], 256], 12938: [[26376], 256], 12939: [[28779], 256], 12940: [[27700], 256], 12941: [[26408], 256], 12942: [[37329], 256], 12943: [[22303], 256], 12944: [[26085], 256], 12945: [[26666], 256], 12946: [[26377], 256], 12947: [[31038], 256], 12948: [[21517], 256], 12949: [[29305], 256], 12950: [[36001], 256], 12951: [[31069], 256], 12952: [[21172], 256], 12953: [[31192], 256], 12954: [[30007], 256], 12955: [[22899], 256], 12956: [[36969], 256], 12957: [[20778], 256], 12958: [[21360], 256], 12959: [[27880], 256], 12960: [[38917], 256], 12961: [[20241], 256], 12962: [[20889], 256], 12963: [[27491], 256], 12964: [[19978], 256], 12965: [[20013], 256], 12966: [[19979], 256], 12967: [[24038], 256], 12968: [[21491], 256], 12969: [[21307], 256], 12970: [[23447], 256], 12971: [[23398], 256], 12972: [[30435], 256], 12973: [[20225], 256], 12974: [[36039], 256], 12975: [[21332], 256], 12976: [[22812], 256], 12977: [[51, 54], 256], 12978: [[51, 55], 256], 12979: [[51, 56], 256], 12980: [[51, 57], 256], 12981: [[52, 48], 256], 12982: [[52, 49], 256], 12983: [[52, 50], 256], 12984: [[52, 51], 256], 12985: [[52, 52], 256], 12986: [[52, 53], 256], 12987: [[52, 54], 256], 12988: [[52, 55], 256], 12989: [[52, 56], 256], 12990: [[52, 57], 256], 12991: [[53, 48], 256], 12992: [[49, 26376], 256], 12993: [[50, 26376], 256], 12994: [[51, 26376], 256], 12995: [[52, 26376], 256], 12996: [[53, 26376], 256], 12997: [[54, 26376], 256], 12998: [[55, 26376], 256], 12999: [[56, 26376], 256], 13e3: [[57, 26376], 256], 13001: [[49, 48, 26376], 256], 13002: [[49, 49, 26376], 256], 13003: [[49, 50, 26376], 256], 13004: [[72, 103], 256], 13005: [[101, 114, 103], 256], 13006: [[101, 86], 256], 13007: [[76, 84, 68], 256], 13008: [[12450], 256], 13009: [[12452], 256], 13010: [[12454], 256], 13011: [[12456], 256], 13012: [[12458], 256], 13013: [[12459], 256], 13014: [[12461], 256], 13015: [[12463], 256], 13016: [[12465], 256], 13017: [[12467], 256], 13018: [[12469], 256], 13019: [[12471], 256], 13020: [[12473], 256], 13021: [[12475], 256], 13022: [[12477], 256], 13023: [[12479], 256], 13024: [[12481], 256], 13025: [[12484], 256], 13026: [[12486], 256], 13027: [[12488], 256], 13028: [[12490], 256], 13029: [[12491], 256], 13030: [[12492], 256], 13031: [[12493], 256], 13032: [[12494], 256], 13033: [[12495], 256], 13034: [[12498], 256], 13035: [[12501], 256], 13036: [[12504], 256], 13037: [[12507], 256], 13038: [[12510], 256], 13039: [[12511], 256], 13040: [[12512], 256], 13041: [[12513], 256], 13042: [[12514], 256], 13043: [[12516], 256], 13044: [[12518], 256], 13045: [[12520], 256], 13046: [[12521], 256], 13047: [[12522], 256], 13048: [[12523], 256], 13049: [[12524], 256], 13050: [[12525], 256], 13051: [[12527], 256], 13052: [[12528], 256], 13053: [[12529], 256], 13054: [[12530], 256] },
        13056: { 13056: [[12450, 12497, 12540, 12488], 256], 13057: [[12450, 12523, 12501, 12449], 256], 13058: [[12450, 12531, 12506, 12450], 256], 13059: [[12450, 12540, 12523], 256], 13060: [[12452, 12491, 12531, 12464], 256], 13061: [[12452, 12531, 12481], 256], 13062: [[12454, 12457, 12531], 256], 13063: [[12456, 12473, 12463, 12540, 12489], 256], 13064: [[12456, 12540, 12459, 12540], 256], 13065: [[12458, 12531, 12473], 256], 13066: [[12458, 12540, 12512], 256], 13067: [[12459, 12452, 12522], 256], 13068: [[12459, 12521, 12483, 12488], 256], 13069: [[12459, 12525, 12522, 12540], 256], 13070: [[12460, 12525, 12531], 256], 13071: [[12460, 12531, 12510], 256], 13072: [[12462, 12460], 256], 13073: [[12462, 12491, 12540], 256], 13074: [[12461, 12517, 12522, 12540], 256], 13075: [[12462, 12523, 12480, 12540], 256], 13076: [[12461, 12525], 256], 13077: [[12461, 12525, 12464, 12521, 12512], 256], 13078: [[12461, 12525, 12513, 12540, 12488, 12523], 256], 13079: [[12461, 12525, 12527, 12483, 12488], 256], 13080: [[12464, 12521, 12512], 256], 13081: [[12464, 12521, 12512, 12488, 12531], 256], 13082: [[12463, 12523, 12476, 12452, 12525], 256], 13083: [[12463, 12525, 12540, 12493], 256], 13084: [[12465, 12540, 12473], 256], 13085: [[12467, 12523, 12490], 256], 13086: [[12467, 12540, 12509], 256], 13087: [[12469, 12452, 12463, 12523], 256], 13088: [[12469, 12531, 12481, 12540, 12512], 256], 13089: [[12471, 12522, 12531, 12464], 256], 13090: [[12475, 12531, 12481], 256], 13091: [[12475, 12531, 12488], 256], 13092: [[12480, 12540, 12473], 256], 13093: [[12487, 12471], 256], 13094: [[12489, 12523], 256], 13095: [[12488, 12531], 256], 13096: [[12490, 12494], 256], 13097: [[12494, 12483, 12488], 256], 13098: [[12495, 12452, 12484], 256], 13099: [[12497, 12540, 12475, 12531, 12488], 256], 13100: [[12497, 12540, 12484], 256], 13101: [[12496, 12540, 12524, 12523], 256], 13102: [[12500, 12450, 12473, 12488, 12523], 256], 13103: [[12500, 12463, 12523], 256], 13104: [[12500, 12467], 256], 13105: [[12499, 12523], 256], 13106: [[12501, 12449, 12521, 12483, 12489], 256], 13107: [[12501, 12451, 12540, 12488], 256], 13108: [[12502, 12483, 12471, 12455, 12523], 256], 13109: [[12501, 12521, 12531], 256], 13110: [[12504, 12463, 12479, 12540, 12523], 256], 13111: [[12506, 12477], 256], 13112: [[12506, 12491, 12498], 256], 13113: [[12504, 12523, 12484], 256], 13114: [[12506, 12531, 12473], 256], 13115: [[12506, 12540, 12472], 256], 13116: [[12505, 12540, 12479], 256], 13117: [[12509, 12452, 12531, 12488], 256], 13118: [[12508, 12523, 12488], 256], 13119: [[12507, 12531], 256], 13120: [[12509, 12531, 12489], 256], 13121: [[12507, 12540, 12523], 256], 13122: [[12507, 12540, 12531], 256], 13123: [[12510, 12452, 12463, 12525], 256], 13124: [[12510, 12452, 12523], 256], 13125: [[12510, 12483, 12495], 256], 13126: [[12510, 12523, 12463], 256], 13127: [[12510, 12531, 12471, 12519, 12531], 256], 13128: [[12511, 12463, 12525, 12531], 256], 13129: [[12511, 12522], 256], 13130: [[12511, 12522, 12496, 12540, 12523], 256], 13131: [[12513, 12460], 256], 13132: [[12513, 12460, 12488, 12531], 256], 13133: [[12513, 12540, 12488, 12523], 256], 13134: [[12516, 12540, 12489], 256], 13135: [[12516, 12540, 12523], 256], 13136: [[12518, 12450, 12531], 256], 13137: [[12522, 12483, 12488, 12523], 256], 13138: [[12522, 12521], 256], 13139: [[12523, 12500, 12540], 256], 13140: [[12523, 12540, 12502, 12523], 256], 13141: [[12524, 12512], 256], 13142: [[12524, 12531, 12488, 12466, 12531], 256], 13143: [[12527, 12483, 12488], 256], 13144: [[48, 28857], 256], 13145: [[49, 28857], 256], 13146: [[50, 28857], 256], 13147: [[51, 28857], 256], 13148: [[52, 28857], 256], 13149: [[53, 28857], 256], 13150: [[54, 28857], 256], 13151: [[55, 28857], 256], 13152: [[56, 28857], 256], 13153: [[57, 28857], 256], 13154: [[49, 48, 28857], 256], 13155: [[49, 49, 28857], 256], 13156: [[49, 50, 28857], 256], 13157: [[49, 51, 28857], 256], 13158: [[49, 52, 28857], 256], 13159: [[49, 53, 28857], 256], 13160: [[49, 54, 28857], 256], 13161: [[49, 55, 28857], 256], 13162: [[49, 56, 28857], 256], 13163: [[49, 57, 28857], 256], 13164: [[50, 48, 28857], 256], 13165: [[50, 49, 28857], 256], 13166: [[50, 50, 28857], 256], 13167: [[50, 51, 28857], 256], 13168: [[50, 52, 28857], 256], 13169: [[104, 80, 97], 256], 13170: [[100, 97], 256], 13171: [[65, 85], 256], 13172: [[98, 97, 114], 256], 13173: [[111, 86], 256], 13174: [[112, 99], 256], 13175: [[100, 109], 256], 13176: [[100, 109, 178], 256], 13177: [[100, 109, 179], 256], 13178: [[73, 85], 256], 13179: [[24179, 25104], 256], 13180: [[26157, 21644], 256], 13181: [[22823, 27491], 256], 13182: [[26126, 27835], 256], 13183: [[26666, 24335, 20250, 31038], 256], 13184: [[112, 65], 256], 13185: [[110, 65], 256], 13186: [[956, 65], 256], 13187: [[109, 65], 256], 13188: [[107, 65], 256], 13189: [[75, 66], 256], 13190: [[77, 66], 256], 13191: [[71, 66], 256], 13192: [[99, 97, 108], 256], 13193: [[107, 99, 97, 108], 256], 13194: [[112, 70], 256], 13195: [[110, 70], 256], 13196: [[956, 70], 256], 13197: [[956, 103], 256], 13198: [[109, 103], 256], 13199: [[107, 103], 256], 13200: [[72, 122], 256], 13201: [[107, 72, 122], 256], 13202: [[77, 72, 122], 256], 13203: [[71, 72, 122], 256], 13204: [[84, 72, 122], 256], 13205: [[956, 8467], 256], 13206: [[109, 8467], 256], 13207: [[100, 8467], 256], 13208: [[107, 8467], 256], 13209: [[102, 109], 256], 13210: [[110, 109], 256], 13211: [[956, 109], 256], 13212: [[109, 109], 256], 13213: [[99, 109], 256], 13214: [[107, 109], 256], 13215: [[109, 109, 178], 256], 13216: [[99, 109, 178], 256], 13217: [[109, 178], 256], 13218: [[107, 109, 178], 256], 13219: [[109, 109, 179], 256], 13220: [[99, 109, 179], 256], 13221: [[109, 179], 256], 13222: [[107, 109, 179], 256], 13223: [[109, 8725, 115], 256], 13224: [[109, 8725, 115, 178], 256], 13225: [[80, 97], 256], 13226: [[107, 80, 97], 256], 13227: [[77, 80, 97], 256], 13228: [[71, 80, 97], 256], 13229: [[114, 97, 100], 256], 13230: [[114, 97, 100, 8725, 115], 256], 13231: [[114, 97, 100, 8725, 115, 178], 256], 13232: [[112, 115], 256], 13233: [[110, 115], 256], 13234: [[956, 115], 256], 13235: [[109, 115], 256], 13236: [[112, 86], 256], 13237: [[110, 86], 256], 13238: [[956, 86], 256], 13239: [[109, 86], 256], 13240: [[107, 86], 256], 13241: [[77, 86], 256], 13242: [[112, 87], 256], 13243: [[110, 87], 256], 13244: [[956, 87], 256], 13245: [[109, 87], 256], 13246: [[107, 87], 256], 13247: [[77, 87], 256], 13248: [[107, 937], 256], 13249: [[77, 937], 256], 13250: [[97, 46, 109, 46], 256], 13251: [[66, 113], 256], 13252: [[99, 99], 256], 13253: [[99, 100], 256], 13254: [[67, 8725, 107, 103], 256], 13255: [[67, 111, 46], 256], 13256: [[100, 66], 256], 13257: [[71, 121], 256], 13258: [[104, 97], 256], 13259: [[72, 80], 256], 13260: [[105, 110], 256], 13261: [[75, 75], 256], 13262: [[75, 77], 256], 13263: [[107, 116], 256], 13264: [[108, 109], 256], 13265: [[108, 110], 256], 13266: [[108, 111, 103], 256], 13267: [[108, 120], 256], 13268: [[109, 98], 256], 13269: [[109, 105, 108], 256], 13270: [[109, 111, 108], 256], 13271: [[80, 72], 256], 13272: [[112, 46, 109, 46], 256], 13273: [[80, 80, 77], 256], 13274: [[80, 82], 256], 13275: [[115, 114], 256], 13276: [[83, 118], 256], 13277: [[87, 98], 256], 13278: [[86, 8725, 109], 256], 13279: [[65, 8725, 109], 256], 13280: [[49, 26085], 256], 13281: [[50, 26085], 256], 13282: [[51, 26085], 256], 13283: [[52, 26085], 256], 13284: [[53, 26085], 256], 13285: [[54, 26085], 256], 13286: [[55, 26085], 256], 13287: [[56, 26085], 256], 13288: [[57, 26085], 256], 13289: [[49, 48, 26085], 256], 13290: [[49, 49, 26085], 256], 13291: [[49, 50, 26085], 256], 13292: [[49, 51, 26085], 256], 13293: [[49, 52, 26085], 256], 13294: [[49, 53, 26085], 256], 13295: [[49, 54, 26085], 256], 13296: [[49, 55, 26085], 256], 13297: [[49, 56, 26085], 256], 13298: [[49, 57, 26085], 256], 13299: [[50, 48, 26085], 256], 13300: [[50, 49, 26085], 256], 13301: [[50, 50, 26085], 256], 13302: [[50, 51, 26085], 256], 13303: [[50, 52, 26085], 256], 13304: [[50, 53, 26085], 256], 13305: [[50, 54, 26085], 256], 13306: [[50, 55, 26085], 256], 13307: [[50, 56, 26085], 256], 13308: [[50, 57, 26085], 256], 13309: [[51, 48, 26085], 256], 13310: [[51, 49, 26085], 256], 13311: [[103, 97, 108], 256] },
        27136: { 92912: [, 1], 92913: [, 1], 92914: [, 1], 92915: [, 1], 92916: [, 1] },
        27392: { 92976: [, 230], 92977: [, 230], 92978: [, 230], 92979: [, 230], 92980: [, 230], 92981: [, 230], 92982: [, 230] },
        42496: { 42607: [, 230], 42612: [, 230], 42613: [, 230], 42614: [, 230], 42615: [, 230], 42616: [, 230], 42617: [, 230], 42618: [, 230], 42619: [, 230], 42620: [, 230], 42621: [, 230], 42652: [[1098], 256], 42653: [[1100], 256], 42655: [, 230], 42736: [, 230], 42737: [, 230] },
        42752: { 42864: [[42863], 256], 43e3: [[294], 256], 43001: [[339], 256] },
        43008: { 43014: [, 9], 43204: [, 9], 43232: [, 230], 43233: [, 230], 43234: [, 230], 43235: [, 230], 43236: [, 230], 43237: [, 230], 43238: [, 230], 43239: [, 230], 43240: [, 230], 43241: [, 230], 43242: [, 230], 43243: [, 230], 43244: [, 230], 43245: [, 230], 43246: [, 230], 43247: [, 230], 43248: [, 230], 43249: [, 230] },
        43264: { 43307: [, 220], 43308: [, 220], 43309: [, 220], 43347: [, 9], 43443: [, 7], 43456: [, 9] },
        43520: { 43696: [, 230], 43698: [, 230], 43699: [, 230], 43700: [, 220], 43703: [, 230], 43704: [, 230], 43710: [, 230], 43711: [, 230], 43713: [, 230], 43766: [, 9] },
        43776: { 43868: [[42791], 256], 43869: [[43831], 256], 43870: [[619], 256], 43871: [[43858], 256], 44013: [, 9] },
        48128: { 113822: [, 1] },
        53504: { 119134: [[119127, 119141], 512], 119135: [[119128, 119141], 512], 119136: [[119135, 119150], 512], 119137: [[119135, 119151], 512], 119138: [[119135, 119152], 512], 119139: [[119135, 119153], 512], 119140: [[119135, 119154], 512], 119141: [, 216], 119142: [, 216], 119143: [, 1], 119144: [, 1], 119145: [, 1], 119149: [, 226], 119150: [, 216], 119151: [, 216], 119152: [, 216], 119153: [, 216], 119154: [, 216], 119163: [, 220], 119164: [, 220], 119165: [, 220], 119166: [, 220], 119167: [, 220], 119168: [, 220], 119169: [, 220], 119170: [, 220], 119173: [, 230], 119174: [, 230], 119175: [, 230], 119176: [, 230], 119177: [, 230], 119178: [, 220], 119179: [, 220], 119210: [, 230], 119211: [, 230], 119212: [, 230], 119213: [, 230], 119227: [[119225, 119141], 512], 119228: [[119226, 119141], 512], 119229: [[119227, 119150], 512], 119230: [[119228, 119150], 512], 119231: [[119227, 119151], 512], 119232: [[119228, 119151], 512] },
        53760: { 119362: [, 230], 119363: [, 230], 119364: [, 230] },
        54272: { 119808: [[65], 256], 119809: [[66], 256], 119810: [[67], 256], 119811: [[68], 256], 119812: [[69], 256], 119813: [[70], 256], 119814: [[71], 256], 119815: [[72], 256], 119816: [[73], 256], 119817: [[74], 256], 119818: [[75], 256], 119819: [[76], 256], 119820: [[77], 256], 119821: [[78], 256], 119822: [[79], 256], 119823: [[80], 256], 119824: [[81], 256], 119825: [[82], 256], 119826: [[83], 256], 119827: [[84], 256], 119828: [[85], 256], 119829: [[86], 256], 119830: [[87], 256], 119831: [[88], 256], 119832: [[89], 256], 119833: [[90], 256], 119834: [[97], 256], 119835: [[98], 256], 119836: [[99], 256], 119837: [[100], 256], 119838: [[101], 256], 119839: [[102], 256], 119840: [[103], 256], 119841: [[104], 256], 119842: [[105], 256], 119843: [[106], 256], 119844: [[107], 256], 119845: [[108], 256], 119846: [[109], 256], 119847: [[110], 256], 119848: [[111], 256], 119849: [[112], 256], 119850: [[113], 256], 119851: [[114], 256], 119852: [[115], 256], 119853: [[116], 256], 119854: [[117], 256], 119855: [[118], 256], 119856: [[119], 256], 119857: [[120], 256], 119858: [[121], 256], 119859: [[122], 256], 119860: [[65], 256], 119861: [[66], 256], 119862: [[67], 256], 119863: [[68], 256], 119864: [[69], 256], 119865: [[70], 256], 119866: [[71], 256], 119867: [[72], 256], 119868: [[73], 256], 119869: [[74], 256], 119870: [[75], 256], 119871: [[76], 256], 119872: [[77], 256], 119873: [[78], 256], 119874: [[79], 256], 119875: [[80], 256], 119876: [[81], 256], 119877: [[82], 256], 119878: [[83], 256], 119879: [[84], 256], 119880: [[85], 256], 119881: [[86], 256], 119882: [[87], 256], 119883: [[88], 256], 119884: [[89], 256], 119885: [[90], 256], 119886: [[97], 256], 119887: [[98], 256], 119888: [[99], 256], 119889: [[100], 256], 119890: [[101], 256], 119891: [[102], 256], 119892: [[103], 256], 119894: [[105], 256], 119895: [[106], 256], 119896: [[107], 256], 119897: [[108], 256], 119898: [[109], 256], 119899: [[110], 256], 119900: [[111], 256], 119901: [[112], 256], 119902: [[113], 256], 119903: [[114], 256], 119904: [[115], 256], 119905: [[116], 256], 119906: [[117], 256], 119907: [[118], 256], 119908: [[119], 256], 119909: [[120], 256], 119910: [[121], 256], 119911: [[122], 256], 119912: [[65], 256], 119913: [[66], 256], 119914: [[67], 256], 119915: [[68], 256], 119916: [[69], 256], 119917: [[70], 256], 119918: [[71], 256], 119919: [[72], 256], 119920: [[73], 256], 119921: [[74], 256], 119922: [[75], 256], 119923: [[76], 256], 119924: [[77], 256], 119925: [[78], 256], 119926: [[79], 256], 119927: [[80], 256], 119928: [[81], 256], 119929: [[82], 256], 119930: [[83], 256], 119931: [[84], 256], 119932: [[85], 256], 119933: [[86], 256], 119934: [[87], 256], 119935: [[88], 256], 119936: [[89], 256], 119937: [[90], 256], 119938: [[97], 256], 119939: [[98], 256], 119940: [[99], 256], 119941: [[100], 256], 119942: [[101], 256], 119943: [[102], 256], 119944: [[103], 256], 119945: [[104], 256], 119946: [[105], 256], 119947: [[106], 256], 119948: [[107], 256], 119949: [[108], 256], 119950: [[109], 256], 119951: [[110], 256], 119952: [[111], 256], 119953: [[112], 256], 119954: [[113], 256], 119955: [[114], 256], 119956: [[115], 256], 119957: [[116], 256], 119958: [[117], 256], 119959: [[118], 256], 119960: [[119], 256], 119961: [[120], 256], 119962: [[121], 256], 119963: [[122], 256], 119964: [[65], 256], 119966: [[67], 256], 119967: [[68], 256], 119970: [[71], 256], 119973: [[74], 256], 119974: [[75], 256], 119977: [[78], 256], 119978: [[79], 256], 119979: [[80], 256], 119980: [[81], 256], 119982: [[83], 256], 119983: [[84], 256], 119984: [[85], 256], 119985: [[86], 256], 119986: [[87], 256], 119987: [[88], 256], 119988: [[89], 256], 119989: [[90], 256], 119990: [[97], 256], 119991: [[98], 256], 119992: [[99], 256], 119993: [[100], 256], 119995: [[102], 256], 119997: [[104], 256], 119998: [[105], 256], 119999: [[106], 256], 12e4: [[107], 256], 120001: [[108], 256], 120002: [[109], 256], 120003: [[110], 256], 120005: [[112], 256], 120006: [[113], 256], 120007: [[114], 256], 120008: [[115], 256], 120009: [[116], 256], 120010: [[117], 256], 120011: [[118], 256], 120012: [[119], 256], 120013: [[120], 256], 120014: [[121], 256], 120015: [[122], 256], 120016: [[65], 256], 120017: [[66], 256], 120018: [[67], 256], 120019: [[68], 256], 120020: [[69], 256], 120021: [[70], 256], 120022: [[71], 256], 120023: [[72], 256], 120024: [[73], 256], 120025: [[74], 256], 120026: [[75], 256], 120027: [[76], 256], 120028: [[77], 256], 120029: [[78], 256], 120030: [[79], 256], 120031: [[80], 256], 120032: [[81], 256], 120033: [[82], 256], 120034: [[83], 256], 120035: [[84], 256], 120036: [[85], 256], 120037: [[86], 256], 120038: [[87], 256], 120039: [[88], 256], 120040: [[89], 256], 120041: [[90], 256], 120042: [[97], 256], 120043: [[98], 256], 120044: [[99], 256], 120045: [[100], 256], 120046: [[101], 256], 120047: [[102], 256], 120048: [[103], 256], 120049: [[104], 256], 120050: [[105], 256], 120051: [[106], 256], 120052: [[107], 256], 120053: [[108], 256], 120054: [[109], 256], 120055: [[110], 256], 120056: [[111], 256], 120057: [[112], 256], 120058: [[113], 256], 120059: [[114], 256], 120060: [[115], 256], 120061: [[116], 256], 120062: [[117], 256], 120063: [[118], 256] },
        54528: { 120064: [[119], 256], 120065: [[120], 256], 120066: [[121], 256], 120067: [[122], 256], 120068: [[65], 256], 120069: [[66], 256], 120071: [[68], 256], 120072: [[69], 256], 120073: [[70], 256], 120074: [[71], 256], 120077: [[74], 256], 120078: [[75], 256], 120079: [[76], 256], 120080: [[77], 256], 120081: [[78], 256], 120082: [[79], 256], 120083: [[80], 256], 120084: [[81], 256], 120086: [[83], 256], 120087: [[84], 256], 120088: [[85], 256], 120089: [[86], 256], 120090: [[87], 256], 120091: [[88], 256], 120092: [[89], 256], 120094: [[97], 256], 120095: [[98], 256], 120096: [[99], 256], 120097: [[100], 256], 120098: [[101], 256], 120099: [[102], 256], 120100: [[103], 256], 120101: [[104], 256], 120102: [[105], 256], 120103: [[106], 256], 120104: [[107], 256], 120105: [[108], 256], 120106: [[109], 256], 120107: [[110], 256], 120108: [[111], 256], 120109: [[112], 256], 120110: [[113], 256], 120111: [[114], 256], 120112: [[115], 256], 120113: [[116], 256], 120114: [[117], 256], 120115: [[118], 256], 120116: [[119], 256], 120117: [[120], 256], 120118: [[121], 256], 120119: [[122], 256], 120120: [[65], 256], 120121: [[66], 256], 120123: [[68], 256], 120124: [[69], 256], 120125: [[70], 256], 120126: [[71], 256], 120128: [[73], 256], 120129: [[74], 256], 120130: [[75], 256], 120131: [[76], 256], 120132: [[77], 256], 120134: [[79], 256], 120138: [[83], 256], 120139: [[84], 256], 120140: [[85], 256], 120141: [[86], 256], 120142: [[87], 256], 120143: [[88], 256], 120144: [[89], 256], 120146: [[97], 256], 120147: [[98], 256], 120148: [[99], 256], 120149: [[100], 256], 120150: [[101], 256], 120151: [[102], 256], 120152: [[103], 256], 120153: [[104], 256], 120154: [[105], 256], 120155: [[106], 256], 120156: [[107], 256], 120157: [[108], 256], 120158: [[109], 256], 120159: [[110], 256], 120160: [[111], 256], 120161: [[112], 256], 120162: [[113], 256], 120163: [[114], 256], 120164: [[115], 256], 120165: [[116], 256], 120166: [[117], 256], 120167: [[118], 256], 120168: [[119], 256], 120169: [[120], 256], 120170: [[121], 256], 120171: [[122], 256], 120172: [[65], 256], 120173: [[66], 256], 120174: [[67], 256], 120175: [[68], 256], 120176: [[69], 256], 120177: [[70], 256], 120178: [[71], 256], 120179: [[72], 256], 120180: [[73], 256], 120181: [[74], 256], 120182: [[75], 256], 120183: [[76], 256], 120184: [[77], 256], 120185: [[78], 256], 120186: [[79], 256], 120187: [[80], 256], 120188: [[81], 256], 120189: [[82], 256], 120190: [[83], 256], 120191: [[84], 256], 120192: [[85], 256], 120193: [[86], 256], 120194: [[87], 256], 120195: [[88], 256], 120196: [[89], 256], 120197: [[90], 256], 120198: [[97], 256], 120199: [[98], 256], 120200: [[99], 256], 120201: [[100], 256], 120202: [[101], 256], 120203: [[102], 256], 120204: [[103], 256], 120205: [[104], 256], 120206: [[105], 256], 120207: [[106], 256], 120208: [[107], 256], 120209: [[108], 256], 120210: [[109], 256], 120211: [[110], 256], 120212: [[111], 256], 120213: [[112], 256], 120214: [[113], 256], 120215: [[114], 256], 120216: [[115], 256], 120217: [[116], 256], 120218: [[117], 256], 120219: [[118], 256], 120220: [[119], 256], 120221: [[120], 256], 120222: [[121], 256], 120223: [[122], 256], 120224: [[65], 256], 120225: [[66], 256], 120226: [[67], 256], 120227: [[68], 256], 120228: [[69], 256], 120229: [[70], 256], 120230: [[71], 256], 120231: [[72], 256], 120232: [[73], 256], 120233: [[74], 256], 120234: [[75], 256], 120235: [[76], 256], 120236: [[77], 256], 120237: [[78], 256], 120238: [[79], 256], 120239: [[80], 256], 120240: [[81], 256], 120241: [[82], 256], 120242: [[83], 256], 120243: [[84], 256], 120244: [[85], 256], 120245: [[86], 256], 120246: [[87], 256], 120247: [[88], 256], 120248: [[89], 256], 120249: [[90], 256], 120250: [[97], 256], 120251: [[98], 256], 120252: [[99], 256], 120253: [[100], 256], 120254: [[101], 256], 120255: [[102], 256], 120256: [[103], 256], 120257: [[104], 256], 120258: [[105], 256], 120259: [[106], 256], 120260: [[107], 256], 120261: [[108], 256], 120262: [[109], 256], 120263: [[110], 256], 120264: [[111], 256], 120265: [[112], 256], 120266: [[113], 256], 120267: [[114], 256], 120268: [[115], 256], 120269: [[116], 256], 120270: [[117], 256], 120271: [[118], 256], 120272: [[119], 256], 120273: [[120], 256], 120274: [[121], 256], 120275: [[122], 256], 120276: [[65], 256], 120277: [[66], 256], 120278: [[67], 256], 120279: [[68], 256], 120280: [[69], 256], 120281: [[70], 256], 120282: [[71], 256], 120283: [[72], 256], 120284: [[73], 256], 120285: [[74], 256], 120286: [[75], 256], 120287: [[76], 256], 120288: [[77], 256], 120289: [[78], 256], 120290: [[79], 256], 120291: [[80], 256], 120292: [[81], 256], 120293: [[82], 256], 120294: [[83], 256], 120295: [[84], 256], 120296: [[85], 256], 120297: [[86], 256], 120298: [[87], 256], 120299: [[88], 256], 120300: [[89], 256], 120301: [[90], 256], 120302: [[97], 256], 120303: [[98], 256], 120304: [[99], 256], 120305: [[100], 256], 120306: [[101], 256], 120307: [[102], 256], 120308: [[103], 256], 120309: [[104], 256], 120310: [[105], 256], 120311: [[106], 256], 120312: [[107], 256], 120313: [[108], 256], 120314: [[109], 256], 120315: [[110], 256], 120316: [[111], 256], 120317: [[112], 256], 120318: [[113], 256], 120319: [[114], 256] },
        54784: { 120320: [[115], 256], 120321: [[116], 256], 120322: [[117], 256], 120323: [[118], 256], 120324: [[119], 256], 120325: [[120], 256], 120326: [[121], 256], 120327: [[122], 256], 120328: [[65], 256], 120329: [[66], 256], 120330: [[67], 256], 120331: [[68], 256], 120332: [[69], 256], 120333: [[70], 256], 120334: [[71], 256], 120335: [[72], 256], 120336: [[73], 256], 120337: [[74], 256], 120338: [[75], 256], 120339: [[76], 256], 120340: [[77], 256], 120341: [[78], 256], 120342: [[79], 256], 120343: [[80], 256], 120344: [[81], 256], 120345: [[82], 256], 120346: [[83], 256], 120347: [[84], 256], 120348: [[85], 256], 120349: [[86], 256], 120350: [[87], 256], 120351: [[88], 256], 120352: [[89], 256], 120353: [[90], 256], 120354: [[97], 256], 120355: [[98], 256], 120356: [[99], 256], 120357: [[100], 256], 120358: [[101], 256], 120359: [[102], 256], 120360: [[103], 256], 120361: [[104], 256], 120362: [[105], 256], 120363: [[106], 256], 120364: [[107], 256], 120365: [[108], 256], 120366: [[109], 256], 120367: [[110], 256], 120368: [[111], 256], 120369: [[112], 256], 120370: [[113], 256], 120371: [[114], 256], 120372: [[115], 256], 120373: [[116], 256], 120374: [[117], 256], 120375: [[118], 256], 120376: [[119], 256], 120377: [[120], 256], 120378: [[121], 256], 120379: [[122], 256], 120380: [[65], 256], 120381: [[66], 256], 120382: [[67], 256], 120383: [[68], 256], 120384: [[69], 256], 120385: [[70], 256], 120386: [[71], 256], 120387: [[72], 256], 120388: [[73], 256], 120389: [[74], 256], 120390: [[75], 256], 120391: [[76], 256], 120392: [[77], 256], 120393: [[78], 256], 120394: [[79], 256], 120395: [[80], 256], 120396: [[81], 256], 120397: [[82], 256], 120398: [[83], 256], 120399: [[84], 256], 120400: [[85], 256], 120401: [[86], 256], 120402: [[87], 256], 120403: [[88], 256], 120404: [[89], 256], 120405: [[90], 256], 120406: [[97], 256], 120407: [[98], 256], 120408: [[99], 256], 120409: [[100], 256], 120410: [[101], 256], 120411: [[102], 256], 120412: [[103], 256], 120413: [[104], 256], 120414: [[105], 256], 120415: [[106], 256], 120416: [[107], 256], 120417: [[108], 256], 120418: [[109], 256], 120419: [[110], 256], 120420: [[111], 256], 120421: [[112], 256], 120422: [[113], 256], 120423: [[114], 256], 120424: [[115], 256], 120425: [[116], 256], 120426: [[117], 256], 120427: [[118], 256], 120428: [[119], 256], 120429: [[120], 256], 120430: [[121], 256], 120431: [[122], 256], 120432: [[65], 256], 120433: [[66], 256], 120434: [[67], 256], 120435: [[68], 256], 120436: [[69], 256], 120437: [[70], 256], 120438: [[71], 256], 120439: [[72], 256], 120440: [[73], 256], 120441: [[74], 256], 120442: [[75], 256], 120443: [[76], 256], 120444: [[77], 256], 120445: [[78], 256], 120446: [[79], 256], 120447: [[80], 256], 120448: [[81], 256], 120449: [[82], 256], 120450: [[83], 256], 120451: [[84], 256], 120452: [[85], 256], 120453: [[86], 256], 120454: [[87], 256], 120455: [[88], 256], 120456: [[89], 256], 120457: [[90], 256], 120458: [[97], 256], 120459: [[98], 256], 120460: [[99], 256], 120461: [[100], 256], 120462: [[101], 256], 120463: [[102], 256], 120464: [[103], 256], 120465: [[104], 256], 120466: [[105], 256], 120467: [[106], 256], 120468: [[107], 256], 120469: [[108], 256], 120470: [[109], 256], 120471: [[110], 256], 120472: [[111], 256], 120473: [[112], 256], 120474: [[113], 256], 120475: [[114], 256], 120476: [[115], 256], 120477: [[116], 256], 120478: [[117], 256], 120479: [[118], 256], 120480: [[119], 256], 120481: [[120], 256], 120482: [[121], 256], 120483: [[122], 256], 120484: [[305], 256], 120485: [[567], 256], 120488: [[913], 256], 120489: [[914], 256], 120490: [[915], 256], 120491: [[916], 256], 120492: [[917], 256], 120493: [[918], 256], 120494: [[919], 256], 120495: [[920], 256], 120496: [[921], 256], 120497: [[922], 256], 120498: [[923], 256], 120499: [[924], 256], 120500: [[925], 256], 120501: [[926], 256], 120502: [[927], 256], 120503: [[928], 256], 120504: [[929], 256], 120505: [[1012], 256], 120506: [[931], 256], 120507: [[932], 256], 120508: [[933], 256], 120509: [[934], 256], 120510: [[935], 256], 120511: [[936], 256], 120512: [[937], 256], 120513: [[8711], 256], 120514: [[945], 256], 120515: [[946], 256], 120516: [[947], 256], 120517: [[948], 256], 120518: [[949], 256], 120519: [[950], 256], 120520: [[951], 256], 120521: [[952], 256], 120522: [[953], 256], 120523: [[954], 256], 120524: [[955], 256], 120525: [[956], 256], 120526: [[957], 256], 120527: [[958], 256], 120528: [[959], 256], 120529: [[960], 256], 120530: [[961], 256], 120531: [[962], 256], 120532: [[963], 256], 120533: [[964], 256], 120534: [[965], 256], 120535: [[966], 256], 120536: [[967], 256], 120537: [[968], 256], 120538: [[969], 256], 120539: [[8706], 256], 120540: [[1013], 256], 120541: [[977], 256], 120542: [[1008], 256], 120543: [[981], 256], 120544: [[1009], 256], 120545: [[982], 256], 120546: [[913], 256], 120547: [[914], 256], 120548: [[915], 256], 120549: [[916], 256], 120550: [[917], 256], 120551: [[918], 256], 120552: [[919], 256], 120553: [[920], 256], 120554: [[921], 256], 120555: [[922], 256], 120556: [[923], 256], 120557: [[924], 256], 120558: [[925], 256], 120559: [[926], 256], 120560: [[927], 256], 120561: [[928], 256], 120562: [[929], 256], 120563: [[1012], 256], 120564: [[931], 256], 120565: [[932], 256], 120566: [[933], 256], 120567: [[934], 256], 120568: [[935], 256], 120569: [[936], 256], 120570: [[937], 256], 120571: [[8711], 256], 120572: [[945], 256], 120573: [[946], 256], 120574: [[947], 256], 120575: [[948], 256] },
        55040: { 120576: [[949], 256], 120577: [[950], 256], 120578: [[951], 256], 120579: [[952], 256], 120580: [[953], 256], 120581: [[954], 256], 120582: [[955], 256], 120583: [[956], 256], 120584: [[957], 256], 120585: [[958], 256], 120586: [[959], 256], 120587: [[960], 256], 120588: [[961], 256], 120589: [[962], 256], 120590: [[963], 256], 120591: [[964], 256], 120592: [[965], 256], 120593: [[966], 256], 120594: [[967], 256], 120595: [[968], 256], 120596: [[969], 256], 120597: [[8706], 256], 120598: [[1013], 256], 120599: [[977], 256], 120600: [[1008], 256], 120601: [[981], 256], 120602: [[1009], 256], 120603: [[982], 256], 120604: [[913], 256], 120605: [[914], 256], 120606: [[915], 256], 120607: [[916], 256], 120608: [[917], 256], 120609: [[918], 256], 120610: [[919], 256], 120611: [[920], 256], 120612: [[921], 256], 120613: [[922], 256], 120614: [[923], 256], 120615: [[924], 256], 120616: [[925], 256], 120617: [[926], 256], 120618: [[927], 256], 120619: [[928], 256], 120620: [[929], 256], 120621: [[1012], 256], 120622: [[931], 256], 120623: [[932], 256], 120624: [[933], 256], 120625: [[934], 256], 120626: [[935], 256], 120627: [[936], 256], 120628: [[937], 256], 120629: [[8711], 256], 120630: [[945], 256], 120631: [[946], 256], 120632: [[947], 256], 120633: [[948], 256], 120634: [[949], 256], 120635: [[950], 256], 120636: [[951], 256], 120637: [[952], 256], 120638: [[953], 256], 120639: [[954], 256], 120640: [[955], 256], 120641: [[956], 256], 120642: [[957], 256], 120643: [[958], 256], 120644: [[959], 256], 120645: [[960], 256], 120646: [[961], 256], 120647: [[962], 256], 120648: [[963], 256], 120649: [[964], 256], 120650: [[965], 256], 120651: [[966], 256], 120652: [[967], 256], 120653: [[968], 256], 120654: [[969], 256], 120655: [[8706], 256], 120656: [[1013], 256], 120657: [[977], 256], 120658: [[1008], 256], 120659: [[981], 256], 120660: [[1009], 256], 120661: [[982], 256], 120662: [[913], 256], 120663: [[914], 256], 120664: [[915], 256], 120665: [[916], 256], 120666: [[917], 256], 120667: [[918], 256], 120668: [[919], 256], 120669: [[920], 256], 120670: [[921], 256], 120671: [[922], 256], 120672: [[923], 256], 120673: [[924], 256], 120674: [[925], 256], 120675: [[926], 256], 120676: [[927], 256], 120677: [[928], 256], 120678: [[929], 256], 120679: [[1012], 256], 120680: [[931], 256], 120681: [[932], 256], 120682: [[933], 256], 120683: [[934], 256], 120684: [[935], 256], 120685: [[936], 256], 120686: [[937], 256], 120687: [[8711], 256], 120688: [[945], 256], 120689: [[946], 256], 120690: [[947], 256], 120691: [[948], 256], 120692: [[949], 256], 120693: [[950], 256], 120694: [[951], 256], 120695: [[952], 256], 120696: [[953], 256], 120697: [[954], 256], 120698: [[955], 256], 120699: [[956], 256], 120700: [[957], 256], 120701: [[958], 256], 120702: [[959], 256], 120703: [[960], 256], 120704: [[961], 256], 120705: [[962], 256], 120706: [[963], 256], 120707: [[964], 256], 120708: [[965], 256], 120709: [[966], 256], 120710: [[967], 256], 120711: [[968], 256], 120712: [[969], 256], 120713: [[8706], 256], 120714: [[1013], 256], 120715: [[977], 256], 120716: [[1008], 256], 120717: [[981], 256], 120718: [[1009], 256], 120719: [[982], 256], 120720: [[913], 256], 120721: [[914], 256], 120722: [[915], 256], 120723: [[916], 256], 120724: [[917], 256], 120725: [[918], 256], 120726: [[919], 256], 120727: [[920], 256], 120728: [[921], 256], 120729: [[922], 256], 120730: [[923], 256], 120731: [[924], 256], 120732: [[925], 256], 120733: [[926], 256], 120734: [[927], 256], 120735: [[928], 256], 120736: [[929], 256], 120737: [[1012], 256], 120738: [[931], 256], 120739: [[932], 256], 120740: [[933], 256], 120741: [[934], 256], 120742: [[935], 256], 120743: [[936], 256], 120744: [[937], 256], 120745: [[8711], 256], 120746: [[945], 256], 120747: [[946], 256], 120748: [[947], 256], 120749: [[948], 256], 120750: [[949], 256], 120751: [[950], 256], 120752: [[951], 256], 120753: [[952], 256], 120754: [[953], 256], 120755: [[954], 256], 120756: [[955], 256], 120757: [[956], 256], 120758: [[957], 256], 120759: [[958], 256], 120760: [[959], 256], 120761: [[960], 256], 120762: [[961], 256], 120763: [[962], 256], 120764: [[963], 256], 120765: [[964], 256], 120766: [[965], 256], 120767: [[966], 256], 120768: [[967], 256], 120769: [[968], 256], 120770: [[969], 256], 120771: [[8706], 256], 120772: [[1013], 256], 120773: [[977], 256], 120774: [[1008], 256], 120775: [[981], 256], 120776: [[1009], 256], 120777: [[982], 256], 120778: [[988], 256], 120779: [[989], 256], 120782: [[48], 256], 120783: [[49], 256], 120784: [[50], 256], 120785: [[51], 256], 120786: [[52], 256], 120787: [[53], 256], 120788: [[54], 256], 120789: [[55], 256], 120790: [[56], 256], 120791: [[57], 256], 120792: [[48], 256], 120793: [[49], 256], 120794: [[50], 256], 120795: [[51], 256], 120796: [[52], 256], 120797: [[53], 256], 120798: [[54], 256], 120799: [[55], 256], 120800: [[56], 256], 120801: [[57], 256], 120802: [[48], 256], 120803: [[49], 256], 120804: [[50], 256], 120805: [[51], 256], 120806: [[52], 256], 120807: [[53], 256], 120808: [[54], 256], 120809: [[55], 256], 120810: [[56], 256], 120811: [[57], 256], 120812: [[48], 256], 120813: [[49], 256], 120814: [[50], 256], 120815: [[51], 256], 120816: [[52], 256], 120817: [[53], 256], 120818: [[54], 256], 120819: [[55], 256], 120820: [[56], 256], 120821: [[57], 256], 120822: [[48], 256], 120823: [[49], 256], 120824: [[50], 256], 120825: [[51], 256], 120826: [[52], 256], 120827: [[53], 256], 120828: [[54], 256], 120829: [[55], 256], 120830: [[56], 256], 120831: [[57], 256] },
        59392: { 125136: [, 220], 125137: [, 220], 125138: [, 220], 125139: [, 220], 125140: [, 220], 125141: [, 220], 125142: [, 220] },
        60928: { 126464: [[1575], 256], 126465: [[1576], 256], 126466: [[1580], 256], 126467: [[1583], 256], 126469: [[1608], 256], 126470: [[1586], 256], 126471: [[1581], 256], 126472: [[1591], 256], 126473: [[1610], 256], 126474: [[1603], 256], 126475: [[1604], 256], 126476: [[1605], 256], 126477: [[1606], 256], 126478: [[1587], 256], 126479: [[1593], 256], 126480: [[1601], 256], 126481: [[1589], 256], 126482: [[1602], 256], 126483: [[1585], 256], 126484: [[1588], 256], 126485: [[1578], 256], 126486: [[1579], 256], 126487: [[1582], 256], 126488: [[1584], 256], 126489: [[1590], 256], 126490: [[1592], 256], 126491: [[1594], 256], 126492: [[1646], 256], 126493: [[1722], 256], 126494: [[1697], 256], 126495: [[1647], 256], 126497: [[1576], 256], 126498: [[1580], 256], 126500: [[1607], 256], 126503: [[1581], 256], 126505: [[1610], 256], 126506: [[1603], 256], 126507: [[1604], 256], 126508: [[1605], 256], 126509: [[1606], 256], 126510: [[1587], 256], 126511: [[1593], 256], 126512: [[1601], 256], 126513: [[1589], 256], 126514: [[1602], 256], 126516: [[1588], 256], 126517: [[1578], 256], 126518: [[1579], 256], 126519: [[1582], 256], 126521: [[1590], 256], 126523: [[1594], 256], 126530: [[1580], 256], 126535: [[1581], 256], 126537: [[1610], 256], 126539: [[1604], 256], 126541: [[1606], 256], 126542: [[1587], 256], 126543: [[1593], 256], 126545: [[1589], 256], 126546: [[1602], 256], 126548: [[1588], 256], 126551: [[1582], 256], 126553: [[1590], 256], 126555: [[1594], 256], 126557: [[1722], 256], 126559: [[1647], 256], 126561: [[1576], 256], 126562: [[1580], 256], 126564: [[1607], 256], 126567: [[1581], 256], 126568: [[1591], 256], 126569: [[1610], 256], 126570: [[1603], 256], 126572: [[1605], 256], 126573: [[1606], 256], 126574: [[1587], 256], 126575: [[1593], 256], 126576: [[1601], 256], 126577: [[1589], 256], 126578: [[1602], 256], 126580: [[1588], 256], 126581: [[1578], 256], 126582: [[1579], 256], 126583: [[1582], 256], 126585: [[1590], 256], 126586: [[1592], 256], 126587: [[1594], 256], 126588: [[1646], 256], 126590: [[1697], 256], 126592: [[1575], 256], 126593: [[1576], 256], 126594: [[1580], 256], 126595: [[1583], 256], 126596: [[1607], 256], 126597: [[1608], 256], 126598: [[1586], 256], 126599: [[1581], 256], 126600: [[1591], 256], 126601: [[1610], 256], 126603: [[1604], 256], 126604: [[1605], 256], 126605: [[1606], 256], 126606: [[1587], 256], 126607: [[1593], 256], 126608: [[1601], 256], 126609: [[1589], 256], 126610: [[1602], 256], 126611: [[1585], 256], 126612: [[1588], 256], 126613: [[1578], 256], 126614: [[1579], 256], 126615: [[1582], 256], 126616: [[1584], 256], 126617: [[1590], 256], 126618: [[1592], 256], 126619: [[1594], 256], 126625: [[1576], 256], 126626: [[1580], 256], 126627: [[1583], 256], 126629: [[1608], 256], 126630: [[1586], 256], 126631: [[1581], 256], 126632: [[1591], 256], 126633: [[1610], 256], 126635: [[1604], 256], 126636: [[1605], 256], 126637: [[1606], 256], 126638: [[1587], 256], 126639: [[1593], 256], 126640: [[1601], 256], 126641: [[1589], 256], 126642: [[1602], 256], 126643: [[1585], 256], 126644: [[1588], 256], 126645: [[1578], 256], 126646: [[1579], 256], 126647: [[1582], 256], 126648: [[1584], 256], 126649: [[1590], 256], 126650: [[1592], 256], 126651: [[1594], 256] },
        61696: { 127232: [[48, 46], 256], 127233: [[48, 44], 256], 127234: [[49, 44], 256], 127235: [[50, 44], 256], 127236: [[51, 44], 256], 127237: [[52, 44], 256], 127238: [[53, 44], 256], 127239: [[54, 44], 256], 127240: [[55, 44], 256], 127241: [[56, 44], 256], 127242: [[57, 44], 256], 127248: [[40, 65, 41], 256], 127249: [[40, 66, 41], 256], 127250: [[40, 67, 41], 256], 127251: [[40, 68, 41], 256], 127252: [[40, 69, 41], 256], 127253: [[40, 70, 41], 256], 127254: [[40, 71, 41], 256], 127255: [[40, 72, 41], 256], 127256: [[40, 73, 41], 256], 127257: [[40, 74, 41], 256], 127258: [[40, 75, 41], 256], 127259: [[40, 76, 41], 256], 127260: [[40, 77, 41], 256], 127261: [[40, 78, 41], 256], 127262: [[40, 79, 41], 256], 127263: [[40, 80, 41], 256], 127264: [[40, 81, 41], 256], 127265: [[40, 82, 41], 256], 127266: [[40, 83, 41], 256], 127267: [[40, 84, 41], 256], 127268: [[40, 85, 41], 256], 127269: [[40, 86, 41], 256], 127270: [[40, 87, 41], 256], 127271: [[40, 88, 41], 256], 127272: [[40, 89, 41], 256], 127273: [[40, 90, 41], 256], 127274: [[12308, 83, 12309], 256], 127275: [[67], 256], 127276: [[82], 256], 127277: [[67, 68], 256], 127278: [[87, 90], 256], 127280: [[65], 256], 127281: [[66], 256], 127282: [[67], 256], 127283: [[68], 256], 127284: [[69], 256], 127285: [[70], 256], 127286: [[71], 256], 127287: [[72], 256], 127288: [[73], 256], 127289: [[74], 256], 127290: [[75], 256], 127291: [[76], 256], 127292: [[77], 256], 127293: [[78], 256], 127294: [[79], 256], 127295: [[80], 256], 127296: [[81], 256], 127297: [[82], 256], 127298: [[83], 256], 127299: [[84], 256], 127300: [[85], 256], 127301: [[86], 256], 127302: [[87], 256], 127303: [[88], 256], 127304: [[89], 256], 127305: [[90], 256], 127306: [[72, 86], 256], 127307: [[77, 86], 256], 127308: [[83, 68], 256], 127309: [[83, 83], 256], 127310: [[80, 80, 86], 256], 127311: [[87, 67], 256], 127338: [[77, 67], 256], 127339: [[77, 68], 256], 127376: [[68, 74], 256] },
        61952: { 127488: [[12411, 12363], 256], 127489: [[12467, 12467], 256], 127490: [[12469], 256], 127504: [[25163], 256], 127505: [[23383], 256], 127506: [[21452], 256], 127507: [[12487], 256], 127508: [[20108], 256], 127509: [[22810], 256], 127510: [[35299], 256], 127511: [[22825], 256], 127512: [[20132], 256], 127513: [[26144], 256], 127514: [[28961], 256], 127515: [[26009], 256], 127516: [[21069], 256], 127517: [[24460], 256], 127518: [[20877], 256], 127519: [[26032], 256], 127520: [[21021], 256], 127521: [[32066], 256], 127522: [[29983], 256], 127523: [[36009], 256], 127524: [[22768], 256], 127525: [[21561], 256], 127526: [[28436], 256], 127527: [[25237], 256], 127528: [[25429], 256], 127529: [[19968], 256], 127530: [[19977], 256], 127531: [[36938], 256], 127532: [[24038], 256], 127533: [[20013], 256], 127534: [[21491], 256], 127535: [[25351], 256], 127536: [[36208], 256], 127537: [[25171], 256], 127538: [[31105], 256], 127539: [[31354], 256], 127540: [[21512], 256], 127541: [[28288], 256], 127542: [[26377], 256], 127543: [[26376], 256], 127544: [[30003], 256], 127545: [[21106], 256], 127546: [[21942], 256], 127552: [[12308, 26412, 12309], 256], 127553: [[12308, 19977, 12309], 256], 127554: [[12308, 20108, 12309], 256], 127555: [[12308, 23433, 12309], 256], 127556: [[12308, 28857, 12309], 256], 127557: [[12308, 25171, 12309], 256], 127558: [[12308, 30423, 12309], 256], 127559: [[12308, 21213, 12309], 256], 127560: [[12308, 25943, 12309], 256], 127568: [[24471], 256], 127569: [[21487], 256] },
        63488: { 194560: [[20029]], 194561: [[20024]], 194562: [[20033]], 194563: [[131362]], 194564: [[20320]], 194565: [[20398]], 194566: [[20411]], 194567: [[20482]], 194568: [[20602]], 194569: [[20633]], 194570: [[20711]], 194571: [[20687]], 194572: [[13470]], 194573: [[132666]], 194574: [[20813]], 194575: [[20820]], 194576: [[20836]], 194577: [[20855]], 194578: [[132380]], 194579: [[13497]], 194580: [[20839]], 194581: [[20877]], 194582: [[132427]], 194583: [[20887]], 194584: [[20900]], 194585: [[20172]], 194586: [[20908]], 194587: [[20917]], 194588: [[168415]], 194589: [[20981]], 194590: [[20995]], 194591: [[13535]], 194592: [[21051]], 194593: [[21062]], 194594: [[21106]], 194595: [[21111]], 194596: [[13589]], 194597: [[21191]], 194598: [[21193]], 194599: [[21220]], 194600: [[21242]], 194601: [[21253]], 194602: [[21254]], 194603: [[21271]], 194604: [[21321]], 194605: [[21329]], 194606: [[21338]], 194607: [[21363]], 194608: [[21373]], 194609: [[21375]], 194610: [[21375]], 194611: [[21375]], 194612: [[133676]], 194613: [[28784]], 194614: [[21450]], 194615: [[21471]], 194616: [[133987]], 194617: [[21483]], 194618: [[21489]], 194619: [[21510]], 194620: [[21662]], 194621: [[21560]], 194622: [[21576]], 194623: [[21608]], 194624: [[21666]], 194625: [[21750]], 194626: [[21776]], 194627: [[21843]], 194628: [[21859]], 194629: [[21892]], 194630: [[21892]], 194631: [[21913]], 194632: [[21931]], 194633: [[21939]], 194634: [[21954]], 194635: [[22294]], 194636: [[22022]], 194637: [[22295]], 194638: [[22097]], 194639: [[22132]], 194640: [[20999]], 194641: [[22766]], 194642: [[22478]], 194643: [[22516]], 194644: [[22541]], 194645: [[22411]], 194646: [[22578]], 194647: [[22577]], 194648: [[22700]], 194649: [[136420]], 194650: [[22770]], 194651: [[22775]], 194652: [[22790]], 194653: [[22810]], 194654: [[22818]], 194655: [[22882]], 194656: [[136872]], 194657: [[136938]], 194658: [[23020]], 194659: [[23067]], 194660: [[23079]], 194661: [[23e3]], 194662: [[23142]], 194663: [[14062]], 194664: [[14076]], 194665: [[23304]], 194666: [[23358]], 194667: [[23358]], 194668: [[137672]], 194669: [[23491]], 194670: [[23512]], 194671: [[23527]], 194672: [[23539]], 194673: [[138008]], 194674: [[23551]], 194675: [[23558]], 194676: [[24403]], 194677: [[23586]], 194678: [[14209]], 194679: [[23648]], 194680: [[23662]], 194681: [[23744]], 194682: [[23693]], 194683: [[138724]], 194684: [[23875]], 194685: [[138726]], 194686: [[23918]], 194687: [[23915]], 194688: [[23932]], 194689: [[24033]], 194690: [[24034]], 194691: [[14383]], 194692: [[24061]], 194693: [[24104]], 194694: [[24125]], 194695: [[24169]], 194696: [[14434]], 194697: [[139651]], 194698: [[14460]], 194699: [[24240]], 194700: [[24243]], 194701: [[24246]], 194702: [[24266]], 194703: [[172946]], 194704: [[24318]], 194705: [[140081]], 194706: [[140081]], 194707: [[33281]], 194708: [[24354]], 194709: [[24354]], 194710: [[14535]], 194711: [[144056]], 194712: [[156122]], 194713: [[24418]], 194714: [[24427]], 194715: [[14563]], 194716: [[24474]], 194717: [[24525]], 194718: [[24535]], 194719: [[24569]], 194720: [[24705]], 194721: [[14650]], 194722: [[14620]], 194723: [[24724]], 194724: [[141012]], 194725: [[24775]], 194726: [[24904]], 194727: [[24908]], 194728: [[24910]], 194729: [[24908]], 194730: [[24954]], 194731: [[24974]], 194732: [[25010]], 194733: [[24996]], 194734: [[25007]], 194735: [[25054]], 194736: [[25074]], 194737: [[25078]], 194738: [[25104]], 194739: [[25115]], 194740: [[25181]], 194741: [[25265]], 194742: [[25300]], 194743: [[25424]], 194744: [[142092]], 194745: [[25405]], 194746: [[25340]], 194747: [[25448]], 194748: [[25475]], 194749: [[25572]], 194750: [[142321]], 194751: [[25634]], 194752: [[25541]], 194753: [[25513]], 194754: [[14894]], 194755: [[25705]], 194756: [[25726]], 194757: [[25757]], 194758: [[25719]], 194759: [[14956]], 194760: [[25935]], 194761: [[25964]], 194762: [[143370]], 194763: [[26083]], 194764: [[26360]], 194765: [[26185]], 194766: [[15129]], 194767: [[26257]], 194768: [[15112]], 194769: [[15076]], 194770: [[20882]], 194771: [[20885]], 194772: [[26368]], 194773: [[26268]], 194774: [[32941]], 194775: [[17369]], 194776: [[26391]], 194777: [[26395]], 194778: [[26401]], 194779: [[26462]], 194780: [[26451]], 194781: [[144323]], 194782: [[15177]], 194783: [[26618]], 194784: [[26501]], 194785: [[26706]], 194786: [[26757]], 194787: [[144493]], 194788: [[26766]], 194789: [[26655]], 194790: [[26900]], 194791: [[15261]], 194792: [[26946]], 194793: [[27043]], 194794: [[27114]], 194795: [[27304]], 194796: [[145059]], 194797: [[27355]], 194798: [[15384]], 194799: [[27425]], 194800: [[145575]], 194801: [[27476]], 194802: [[15438]], 194803: [[27506]], 194804: [[27551]], 194805: [[27578]], 194806: [[27579]], 194807: [[146061]], 194808: [[138507]], 194809: [[146170]], 194810: [[27726]], 194811: [[146620]], 194812: [[27839]], 194813: [[27853]], 194814: [[27751]], 194815: [[27926]] },
        63744: { 63744: [[35912]], 63745: [[26356]], 63746: [[36554]], 63747: [[36040]], 63748: [[28369]], 63749: [[20018]], 63750: [[21477]], 63751: [[40860]], 63752: [[40860]], 63753: [[22865]], 63754: [[37329]], 63755: [[21895]], 63756: [[22856]], 63757: [[25078]], 63758: [[30313]], 63759: [[32645]], 63760: [[34367]], 63761: [[34746]], 63762: [[35064]], 63763: [[37007]], 63764: [[27138]], 63765: [[27931]], 63766: [[28889]], 63767: [[29662]], 63768: [[33853]], 63769: [[37226]], 63770: [[39409]], 63771: [[20098]], 63772: [[21365]], 63773: [[27396]], 63774: [[29211]], 63775: [[34349]], 63776: [[40478]], 63777: [[23888]], 63778: [[28651]], 63779: [[34253]], 63780: [[35172]], 63781: [[25289]], 63782: [[33240]], 63783: [[34847]], 63784: [[24266]], 63785: [[26391]], 63786: [[28010]], 63787: [[29436]], 63788: [[37070]], 63789: [[20358]], 63790: [[20919]], 63791: [[21214]], 63792: [[25796]], 63793: [[27347]], 63794: [[29200]], 63795: [[30439]], 63796: [[32769]], 63797: [[34310]], 63798: [[34396]], 63799: [[36335]], 63800: [[38706]], 63801: [[39791]], 63802: [[40442]], 63803: [[30860]], 63804: [[31103]], 63805: [[32160]], 63806: [[33737]], 63807: [[37636]], 63808: [[40575]], 63809: [[35542]], 63810: [[22751]], 63811: [[24324]], 63812: [[31840]], 63813: [[32894]], 63814: [[29282]], 63815: [[30922]], 63816: [[36034]], 63817: [[38647]], 63818: [[22744]], 63819: [[23650]], 63820: [[27155]], 63821: [[28122]], 63822: [[28431]], 63823: [[32047]], 63824: [[32311]], 63825: [[38475]], 63826: [[21202]], 63827: [[32907]], 63828: [[20956]], 63829: [[20940]], 63830: [[31260]], 63831: [[32190]], 63832: [[33777]], 63833: [[38517]], 63834: [[35712]], 63835: [[25295]], 63836: [[27138]], 63837: [[35582]], 63838: [[20025]], 63839: [[23527]], 63840: [[24594]], 63841: [[29575]], 63842: [[30064]], 63843: [[21271]], 63844: [[30971]], 63845: [[20415]], 63846: [[24489]], 63847: [[19981]], 63848: [[27852]], 63849: [[25976]], 63850: [[32034]], 63851: [[21443]], 63852: [[22622]], 63853: [[30465]], 63854: [[33865]], 63855: [[35498]], 63856: [[27578]], 63857: [[36784]], 63858: [[27784]], 63859: [[25342]], 63860: [[33509]], 63861: [[25504]], 63862: [[30053]], 63863: [[20142]], 63864: [[20841]], 63865: [[20937]], 63866: [[26753]], 63867: [[31975]], 63868: [[33391]], 63869: [[35538]], 63870: [[37327]], 63871: [[21237]], 63872: [[21570]], 63873: [[22899]], 63874: [[24300]], 63875: [[26053]], 63876: [[28670]], 63877: [[31018]], 63878: [[38317]], 63879: [[39530]], 63880: [[40599]], 63881: [[40654]], 63882: [[21147]], 63883: [[26310]], 63884: [[27511]], 63885: [[36706]], 63886: [[24180]], 63887: [[24976]], 63888: [[25088]], 63889: [[25754]], 63890: [[28451]], 63891: [[29001]], 63892: [[29833]], 63893: [[31178]], 63894: [[32244]], 63895: [[32879]], 63896: [[36646]], 63897: [[34030]], 63898: [[36899]], 63899: [[37706]], 63900: [[21015]], 63901: [[21155]], 63902: [[21693]], 63903: [[28872]], 63904: [[35010]], 63905: [[35498]], 63906: [[24265]], 63907: [[24565]], 63908: [[25467]], 63909: [[27566]], 63910: [[31806]], 63911: [[29557]], 63912: [[20196]], 63913: [[22265]], 63914: [[23527]], 63915: [[23994]], 63916: [[24604]], 63917: [[29618]], 63918: [[29801]], 63919: [[32666]], 63920: [[32838]], 63921: [[37428]], 63922: [[38646]], 63923: [[38728]], 63924: [[38936]], 63925: [[20363]], 63926: [[31150]], 63927: [[37300]], 63928: [[38584]], 63929: [[24801]], 63930: [[20102]], 63931: [[20698]], 63932: [[23534]], 63933: [[23615]], 63934: [[26009]], 63935: [[27138]], 63936: [[29134]], 63937: [[30274]], 63938: [[34044]], 63939: [[36988]], 63940: [[40845]], 63941: [[26248]], 63942: [[38446]], 63943: [[21129]], 63944: [[26491]], 63945: [[26611]], 63946: [[27969]], 63947: [[28316]], 63948: [[29705]], 63949: [[30041]], 63950: [[30827]], 63951: [[32016]], 63952: [[39006]], 63953: [[20845]], 63954: [[25134]], 63955: [[38520]], 63956: [[20523]], 63957: [[23833]], 63958: [[28138]], 63959: [[36650]], 63960: [[24459]], 63961: [[24900]], 63962: [[26647]], 63963: [[29575]], 63964: [[38534]], 63965: [[21033]], 63966: [[21519]], 63967: [[23653]], 63968: [[26131]], 63969: [[26446]], 63970: [[26792]], 63971: [[27877]], 63972: [[29702]], 63973: [[30178]], 63974: [[32633]], 63975: [[35023]], 63976: [[35041]], 63977: [[37324]], 63978: [[38626]], 63979: [[21311]], 63980: [[28346]], 63981: [[21533]], 63982: [[29136]], 63983: [[29848]], 63984: [[34298]], 63985: [[38563]], 63986: [[40023]], 63987: [[40607]], 63988: [[26519]], 63989: [[28107]], 63990: [[33256]], 63991: [[31435]], 63992: [[31520]], 63993: [[31890]], 63994: [[29376]], 63995: [[28825]], 63996: [[35672]], 63997: [[20160]], 63998: [[33590]], 63999: [[21050]], 194816: [[27966]], 194817: [[28023]], 194818: [[27969]], 194819: [[28009]], 194820: [[28024]], 194821: [[28037]], 194822: [[146718]], 194823: [[27956]], 194824: [[28207]], 194825: [[28270]], 194826: [[15667]], 194827: [[28363]], 194828: [[28359]], 194829: [[147153]], 194830: [[28153]], 194831: [[28526]], 194832: [[147294]], 194833: [[147342]], 194834: [[28614]], 194835: [[28729]], 194836: [[28702]], 194837: [[28699]], 194838: [[15766]], 194839: [[28746]], 194840: [[28797]], 194841: [[28791]], 194842: [[28845]], 194843: [[132389]], 194844: [[28997]], 194845: [[148067]], 194846: [[29084]], 194847: [[148395]], 194848: [[29224]], 194849: [[29237]], 194850: [[29264]], 194851: [[149e3]], 194852: [[29312]], 194853: [[29333]], 194854: [[149301]], 194855: [[149524]], 194856: [[29562]], 194857: [[29579]], 194858: [[16044]], 194859: [[29605]], 194860: [[16056]], 194861: [[16056]], 194862: [[29767]], 194863: [[29788]], 194864: [[29809]], 194865: [[29829]], 194866: [[29898]], 194867: [[16155]], 194868: [[29988]], 194869: [[150582]], 194870: [[30014]], 194871: [[150674]], 194872: [[30064]], 194873: [[139679]], 194874: [[30224]], 194875: [[151457]], 194876: [[151480]], 194877: [[151620]], 194878: [[16380]], 194879: [[16392]], 194880: [[30452]], 194881: [[151795]], 194882: [[151794]], 194883: [[151833]], 194884: [[151859]], 194885: [[30494]], 194886: [[30495]], 194887: [[30495]], 194888: [[30538]], 194889: [[16441]], 194890: [[30603]], 194891: [[16454]], 194892: [[16534]], 194893: [[152605]], 194894: [[30798]], 194895: [[30860]], 194896: [[30924]], 194897: [[16611]], 194898: [[153126]], 194899: [[31062]], 194900: [[153242]], 194901: [[153285]], 194902: [[31119]], 194903: [[31211]], 194904: [[16687]], 194905: [[31296]], 194906: [[31306]], 194907: [[31311]], 194908: [[153980]], 194909: [[154279]], 194910: [[154279]], 194911: [[31470]], 194912: [[16898]], 194913: [[154539]], 194914: [[31686]], 194915: [[31689]], 194916: [[16935]], 194917: [[154752]], 194918: [[31954]], 194919: [[17056]], 194920: [[31976]], 194921: [[31971]], 194922: [[32e3]], 194923: [[155526]], 194924: [[32099]], 194925: [[17153]], 194926: [[32199]], 194927: [[32258]], 194928: [[32325]], 194929: [[17204]], 194930: [[156200]], 194931: [[156231]], 194932: [[17241]], 194933: [[156377]], 194934: [[32634]], 194935: [[156478]], 194936: [[32661]], 194937: [[32762]], 194938: [[32773]], 194939: [[156890]], 194940: [[156963]], 194941: [[32864]], 194942: [[157096]], 194943: [[32880]], 194944: [[144223]], 194945: [[17365]], 194946: [[32946]], 194947: [[33027]], 194948: [[17419]], 194949: [[33086]], 194950: [[23221]], 194951: [[157607]], 194952: [[157621]], 194953: [[144275]], 194954: [[144284]], 194955: [[33281]], 194956: [[33284]], 194957: [[36766]], 194958: [[17515]], 194959: [[33425]], 194960: [[33419]], 194961: [[33437]], 194962: [[21171]], 194963: [[33457]], 194964: [[33459]], 194965: [[33469]], 194966: [[33510]], 194967: [[158524]], 194968: [[33509]], 194969: [[33565]], 194970: [[33635]], 194971: [[33709]], 194972: [[33571]], 194973: [[33725]], 194974: [[33767]], 194975: [[33879]], 194976: [[33619]], 194977: [[33738]], 194978: [[33740]], 194979: [[33756]], 194980: [[158774]], 194981: [[159083]], 194982: [[158933]], 194983: [[17707]], 194984: [[34033]], 194985: [[34035]], 194986: [[34070]], 194987: [[160714]], 194988: [[34148]], 194989: [[159532]], 194990: [[17757]], 194991: [[17761]], 194992: [[159665]], 194993: [[159954]], 194994: [[17771]], 194995: [[34384]], 194996: [[34396]], 194997: [[34407]], 194998: [[34409]], 194999: [[34473]], 195e3: [[34440]], 195001: [[34574]], 195002: [[34530]], 195003: [[34681]], 195004: [[34600]], 195005: [[34667]], 195006: [[34694]], 195007: [[17879]], 195008: [[34785]], 195009: [[34817]], 195010: [[17913]], 195011: [[34912]], 195012: [[34915]], 195013: [[161383]], 195014: [[35031]], 195015: [[35038]], 195016: [[17973]], 195017: [[35066]], 195018: [[13499]], 195019: [[161966]], 195020: [[162150]], 195021: [[18110]], 195022: [[18119]], 195023: [[35488]], 195024: [[35565]], 195025: [[35722]], 195026: [[35925]], 195027: [[162984]], 195028: [[36011]], 195029: [[36033]], 195030: [[36123]], 195031: [[36215]], 195032: [[163631]], 195033: [[133124]], 195034: [[36299]], 195035: [[36284]], 195036: [[36336]], 195037: [[133342]], 195038: [[36564]], 195039: [[36664]], 195040: [[165330]], 195041: [[165357]], 195042: [[37012]], 195043: [[37105]], 195044: [[37137]], 195045: [[165678]], 195046: [[37147]], 195047: [[37432]], 195048: [[37591]], 195049: [[37592]], 195050: [[37500]], 195051: [[37881]], 195052: [[37909]], 195053: [[166906]], 195054: [[38283]], 195055: [[18837]], 195056: [[38327]], 195057: [[167287]], 195058: [[18918]], 195059: [[38595]], 195060: [[23986]], 195061: [[38691]], 195062: [[168261]], 195063: [[168474]], 195064: [[19054]], 195065: [[19062]], 195066: [[38880]], 195067: [[168970]], 195068: [[19122]], 195069: [[169110]], 195070: [[38923]], 195071: [[38923]] },
        64e3: { 64e3: [[20999]], 64001: [[24230]], 64002: [[25299]], 64003: [[31958]], 64004: [[23429]], 64005: [[27934]], 64006: [[26292]], 64007: [[36667]], 64008: [[34892]], 64009: [[38477]], 64010: [[35211]], 64011: [[24275]], 64012: [[20800]], 64013: [[21952]], 64016: [[22618]], 64018: [[26228]], 64021: [[20958]], 64022: [[29482]], 64023: [[30410]], 64024: [[31036]], 64025: [[31070]], 64026: [[31077]], 64027: [[31119]], 64028: [[38742]], 64029: [[31934]], 64030: [[32701]], 64032: [[34322]], 64034: [[35576]], 64037: [[36920]], 64038: [[37117]], 64042: [[39151]], 64043: [[39164]], 64044: [[39208]], 64045: [[40372]], 64046: [[37086]], 64047: [[38583]], 64048: [[20398]], 64049: [[20711]], 64050: [[20813]], 64051: [[21193]], 64052: [[21220]], 64053: [[21329]], 64054: [[21917]], 64055: [[22022]], 64056: [[22120]], 64057: [[22592]], 64058: [[22696]], 64059: [[23652]], 64060: [[23662]], 64061: [[24724]], 64062: [[24936]], 64063: [[24974]], 64064: [[25074]], 64065: [[25935]], 64066: [[26082]], 64067: [[26257]], 64068: [[26757]], 64069: [[28023]], 64070: [[28186]], 64071: [[28450]], 64072: [[29038]], 64073: [[29227]], 64074: [[29730]], 64075: [[30865]], 64076: [[31038]], 64077: [[31049]], 64078: [[31048]], 64079: [[31056]], 64080: [[31062]], 64081: [[31069]], 64082: [[31117]], 64083: [[31118]], 64084: [[31296]], 64085: [[31361]], 64086: [[31680]], 64087: [[32244]], 64088: [[32265]], 64089: [[32321]], 64090: [[32626]], 64091: [[32773]], 64092: [[33261]], 64093: [[33401]], 64094: [[33401]], 64095: [[33879]], 64096: [[35088]], 64097: [[35222]], 64098: [[35585]], 64099: [[35641]], 64100: [[36051]], 64101: [[36104]], 64102: [[36790]], 64103: [[36920]], 64104: [[38627]], 64105: [[38911]], 64106: [[38971]], 64107: [[24693]], 64108: [[148206]], 64109: [[33304]], 64112: [[20006]], 64113: [[20917]], 64114: [[20840]], 64115: [[20352]], 64116: [[20805]], 64117: [[20864]], 64118: [[21191]], 64119: [[21242]], 64120: [[21917]], 64121: [[21845]], 64122: [[21913]], 64123: [[21986]], 64124: [[22618]], 64125: [[22707]], 64126: [[22852]], 64127: [[22868]], 64128: [[23138]], 64129: [[23336]], 64130: [[24274]], 64131: [[24281]], 64132: [[24425]], 64133: [[24493]], 64134: [[24792]], 64135: [[24910]], 64136: [[24840]], 64137: [[24974]], 64138: [[24928]], 64139: [[25074]], 64140: [[25140]], 64141: [[25540]], 64142: [[25628]], 64143: [[25682]], 64144: [[25942]], 64145: [[26228]], 64146: [[26391]], 64147: [[26395]], 64148: [[26454]], 64149: [[27513]], 64150: [[27578]], 64151: [[27969]], 64152: [[28379]], 64153: [[28363]], 64154: [[28450]], 64155: [[28702]], 64156: [[29038]], 64157: [[30631]], 64158: [[29237]], 64159: [[29359]], 64160: [[29482]], 64161: [[29809]], 64162: [[29958]], 64163: [[30011]], 64164: [[30237]], 64165: [[30239]], 64166: [[30410]], 64167: [[30427]], 64168: [[30452]], 64169: [[30538]], 64170: [[30528]], 64171: [[30924]], 64172: [[31409]], 64173: [[31680]], 64174: [[31867]], 64175: [[32091]], 64176: [[32244]], 64177: [[32574]], 64178: [[32773]], 64179: [[33618]], 64180: [[33775]], 64181: [[34681]], 64182: [[35137]], 64183: [[35206]], 64184: [[35222]], 64185: [[35519]], 64186: [[35576]], 64187: [[35531]], 64188: [[35585]], 64189: [[35582]], 64190: [[35565]], 64191: [[35641]], 64192: [[35722]], 64193: [[36104]], 64194: [[36664]], 64195: [[36978]], 64196: [[37273]], 64197: [[37494]], 64198: [[38524]], 64199: [[38627]], 64200: [[38742]], 64201: [[38875]], 64202: [[38911]], 64203: [[38923]], 64204: [[38971]], 64205: [[39698]], 64206: [[40860]], 64207: [[141386]], 64208: [[141380]], 64209: [[144341]], 64210: [[15261]], 64211: [[16408]], 64212: [[16441]], 64213: [[152137]], 64214: [[154832]], 64215: [[163539]], 64216: [[40771]], 64217: [[40846]], 195072: [[38953]], 195073: [[169398]], 195074: [[39138]], 195075: [[19251]], 195076: [[39209]], 195077: [[39335]], 195078: [[39362]], 195079: [[39422]], 195080: [[19406]], 195081: [[170800]], 195082: [[39698]], 195083: [[4e4]], 195084: [[40189]], 195085: [[19662]], 195086: [[19693]], 195087: [[40295]], 195088: [[172238]], 195089: [[19704]], 195090: [[172293]], 195091: [[172558]], 195092: [[172689]], 195093: [[40635]], 195094: [[19798]], 195095: [[40697]], 195096: [[40702]], 195097: [[40709]], 195098: [[40719]], 195099: [[40726]], 195100: [[40763]], 195101: [[173568]] },
        64256: { 64256: [[102, 102], 256], 64257: [[102, 105], 256], 64258: [[102, 108], 256], 64259: [[102, 102, 105], 256], 64260: [[102, 102, 108], 256], 64261: [[383, 116], 256], 64262: [[115, 116], 256], 64275: [[1396, 1398], 256], 64276: [[1396, 1381], 256], 64277: [[1396, 1387], 256], 64278: [[1406, 1398], 256], 64279: [[1396, 1389], 256], 64285: [[1497, 1460], 512], 64286: [, 26], 64287: [[1522, 1463], 512], 64288: [[1506], 256], 64289: [[1488], 256], 64290: [[1491], 256], 64291: [[1492], 256], 64292: [[1499], 256], 64293: [[1500], 256], 64294: [[1501], 256], 64295: [[1512], 256], 64296: [[1514], 256], 64297: [[43], 256], 64298: [[1513, 1473], 512], 64299: [[1513, 1474], 512], 64300: [[64329, 1473], 512], 64301: [[64329, 1474], 512], 64302: [[1488, 1463], 512], 64303: [[1488, 1464], 512], 64304: [[1488, 1468], 512], 64305: [[1489, 1468], 512], 64306: [[1490, 1468], 512], 64307: [[1491, 1468], 512], 64308: [[1492, 1468], 512], 64309: [[1493, 1468], 512], 64310: [[1494, 1468], 512], 64312: [[1496, 1468], 512], 64313: [[1497, 1468], 512], 64314: [[1498, 1468], 512], 64315: [[1499, 1468], 512], 64316: [[1500, 1468], 512], 64318: [[1502, 1468], 512], 64320: [[1504, 1468], 512], 64321: [[1505, 1468], 512], 64323: [[1507, 1468], 512], 64324: [[1508, 1468], 512], 64326: [[1510, 1468], 512], 64327: [[1511, 1468], 512], 64328: [[1512, 1468], 512], 64329: [[1513, 1468], 512], 64330: [[1514, 1468], 512], 64331: [[1493, 1465], 512], 64332: [[1489, 1471], 512], 64333: [[1499, 1471], 512], 64334: [[1508, 1471], 512], 64335: [[1488, 1500], 256], 64336: [[1649], 256], 64337: [[1649], 256], 64338: [[1659], 256], 64339: [[1659], 256], 64340: [[1659], 256], 64341: [[1659], 256], 64342: [[1662], 256], 64343: [[1662], 256], 64344: [[1662], 256], 64345: [[1662], 256], 64346: [[1664], 256], 64347: [[1664], 256], 64348: [[1664], 256], 64349: [[1664], 256], 64350: [[1658], 256], 64351: [[1658], 256], 64352: [[1658], 256], 64353: [[1658], 256], 64354: [[1663], 256], 64355: [[1663], 256], 64356: [[1663], 256], 64357: [[1663], 256], 64358: [[1657], 256], 64359: [[1657], 256], 64360: [[1657], 256], 64361: [[1657], 256], 64362: [[1700], 256], 64363: [[1700], 256], 64364: [[1700], 256], 64365: [[1700], 256], 64366: [[1702], 256], 64367: [[1702], 256], 64368: [[1702], 256], 64369: [[1702], 256], 64370: [[1668], 256], 64371: [[1668], 256], 64372: [[1668], 256], 64373: [[1668], 256], 64374: [[1667], 256], 64375: [[1667], 256], 64376: [[1667], 256], 64377: [[1667], 256], 64378: [[1670], 256], 64379: [[1670], 256], 64380: [[1670], 256], 64381: [[1670], 256], 64382: [[1671], 256], 64383: [[1671], 256], 64384: [[1671], 256], 64385: [[1671], 256], 64386: [[1677], 256], 64387: [[1677], 256], 64388: [[1676], 256], 64389: [[1676], 256], 64390: [[1678], 256], 64391: [[1678], 256], 64392: [[1672], 256], 64393: [[1672], 256], 64394: [[1688], 256], 64395: [[1688], 256], 64396: [[1681], 256], 64397: [[1681], 256], 64398: [[1705], 256], 64399: [[1705], 256], 64400: [[1705], 256], 64401: [[1705], 256], 64402: [[1711], 256], 64403: [[1711], 256], 64404: [[1711], 256], 64405: [[1711], 256], 64406: [[1715], 256], 64407: [[1715], 256], 64408: [[1715], 256], 64409: [[1715], 256], 64410: [[1713], 256], 64411: [[1713], 256], 64412: [[1713], 256], 64413: [[1713], 256], 64414: [[1722], 256], 64415: [[1722], 256], 64416: [[1723], 256], 64417: [[1723], 256], 64418: [[1723], 256], 64419: [[1723], 256], 64420: [[1728], 256], 64421: [[1728], 256], 64422: [[1729], 256], 64423: [[1729], 256], 64424: [[1729], 256], 64425: [[1729], 256], 64426: [[1726], 256], 64427: [[1726], 256], 64428: [[1726], 256], 64429: [[1726], 256], 64430: [[1746], 256], 64431: [[1746], 256], 64432: [[1747], 256], 64433: [[1747], 256], 64467: [[1709], 256], 64468: [[1709], 256], 64469: [[1709], 256], 64470: [[1709], 256], 64471: [[1735], 256], 64472: [[1735], 256], 64473: [[1734], 256], 64474: [[1734], 256], 64475: [[1736], 256], 64476: [[1736], 256], 64477: [[1655], 256], 64478: [[1739], 256], 64479: [[1739], 256], 64480: [[1733], 256], 64481: [[1733], 256], 64482: [[1737], 256], 64483: [[1737], 256], 64484: [[1744], 256], 64485: [[1744], 256], 64486: [[1744], 256], 64487: [[1744], 256], 64488: [[1609], 256], 64489: [[1609], 256], 64490: [[1574, 1575], 256], 64491: [[1574, 1575], 256], 64492: [[1574, 1749], 256], 64493: [[1574, 1749], 256], 64494: [[1574, 1608], 256], 64495: [[1574, 1608], 256], 64496: [[1574, 1735], 256], 64497: [[1574, 1735], 256], 64498: [[1574, 1734], 256], 64499: [[1574, 1734], 256], 64500: [[1574, 1736], 256], 64501: [[1574, 1736], 256], 64502: [[1574, 1744], 256], 64503: [[1574, 1744], 256], 64504: [[1574, 1744], 256], 64505: [[1574, 1609], 256], 64506: [[1574, 1609], 256], 64507: [[1574, 1609], 256], 64508: [[1740], 256], 64509: [[1740], 256], 64510: [[1740], 256], 64511: [[1740], 256] },
        64512: { 64512: [[1574, 1580], 256], 64513: [[1574, 1581], 256], 64514: [[1574, 1605], 256], 64515: [[1574, 1609], 256], 64516: [[1574, 1610], 256], 64517: [[1576, 1580], 256], 64518: [[1576, 1581], 256], 64519: [[1576, 1582], 256], 64520: [[1576, 1605], 256], 64521: [[1576, 1609], 256], 64522: [[1576, 1610], 256], 64523: [[1578, 1580], 256], 64524: [[1578, 1581], 256], 64525: [[1578, 1582], 256], 64526: [[1578, 1605], 256], 64527: [[1578, 1609], 256], 64528: [[1578, 1610], 256], 64529: [[1579, 1580], 256], 64530: [[1579, 1605], 256], 64531: [[1579, 1609], 256], 64532: [[1579, 1610], 256], 64533: [[1580, 1581], 256], 64534: [[1580, 1605], 256], 64535: [[1581, 1580], 256], 64536: [[1581, 1605], 256], 64537: [[1582, 1580], 256], 64538: [[1582, 1581], 256], 64539: [[1582, 1605], 256], 64540: [[1587, 1580], 256], 64541: [[1587, 1581], 256], 64542: [[1587, 1582], 256], 64543: [[1587, 1605], 256], 64544: [[1589, 1581], 256], 64545: [[1589, 1605], 256], 64546: [[1590, 1580], 256], 64547: [[1590, 1581], 256], 64548: [[1590, 1582], 256], 64549: [[1590, 1605], 256], 64550: [[1591, 1581], 256], 64551: [[1591, 1605], 256], 64552: [[1592, 1605], 256], 64553: [[1593, 1580], 256], 64554: [[1593, 1605], 256], 64555: [[1594, 1580], 256], 64556: [[1594, 1605], 256], 64557: [[1601, 1580], 256], 64558: [[1601, 1581], 256], 64559: [[1601, 1582], 256], 64560: [[1601, 1605], 256], 64561: [[1601, 1609], 256], 64562: [[1601, 1610], 256], 64563: [[1602, 1581], 256], 64564: [[1602, 1605], 256], 64565: [[1602, 1609], 256], 64566: [[1602, 1610], 256], 64567: [[1603, 1575], 256], 64568: [[1603, 1580], 256], 64569: [[1603, 1581], 256], 64570: [[1603, 1582], 256], 64571: [[1603, 1604], 256], 64572: [[1603, 1605], 256], 64573: [[1603, 1609], 256], 64574: [[1603, 1610], 256], 64575: [[1604, 1580], 256], 64576: [[1604, 1581], 256], 64577: [[1604, 1582], 256], 64578: [[1604, 1605], 256], 64579: [[1604, 1609], 256], 64580: [[1604, 1610], 256], 64581: [[1605, 1580], 256], 64582: [[1605, 1581], 256], 64583: [[1605, 1582], 256], 64584: [[1605, 1605], 256], 64585: [[1605, 1609], 256], 64586: [[1605, 1610], 256], 64587: [[1606, 1580], 256], 64588: [[1606, 1581], 256], 64589: [[1606, 1582], 256], 64590: [[1606, 1605], 256], 64591: [[1606, 1609], 256], 64592: [[1606, 1610], 256], 64593: [[1607, 1580], 256], 64594: [[1607, 1605], 256], 64595: [[1607, 1609], 256], 64596: [[1607, 1610], 256], 64597: [[1610, 1580], 256], 64598: [[1610, 1581], 256], 64599: [[1610, 1582], 256], 64600: [[1610, 1605], 256], 64601: [[1610, 1609], 256], 64602: [[1610, 1610], 256], 64603: [[1584, 1648], 256], 64604: [[1585, 1648], 256], 64605: [[1609, 1648], 256], 64606: [[32, 1612, 1617], 256], 64607: [[32, 1613, 1617], 256], 64608: [[32, 1614, 1617], 256], 64609: [[32, 1615, 1617], 256], 64610: [[32, 1616, 1617], 256], 64611: [[32, 1617, 1648], 256], 64612: [[1574, 1585], 256], 64613: [[1574, 1586], 256], 64614: [[1574, 1605], 256], 64615: [[1574, 1606], 256], 64616: [[1574, 1609], 256], 64617: [[1574, 1610], 256], 64618: [[1576, 1585], 256], 64619: [[1576, 1586], 256], 64620: [[1576, 1605], 256], 64621: [[1576, 1606], 256], 64622: [[1576, 1609], 256], 64623: [[1576, 1610], 256], 64624: [[1578, 1585], 256], 64625: [[1578, 1586], 256], 64626: [[1578, 1605], 256], 64627: [[1578, 1606], 256], 64628: [[1578, 1609], 256], 64629: [[1578, 1610], 256], 64630: [[1579, 1585], 256], 64631: [[1579, 1586], 256], 64632: [[1579, 1605], 256], 64633: [[1579, 1606], 256], 64634: [[1579, 1609], 256], 64635: [[1579, 1610], 256], 64636: [[1601, 1609], 256], 64637: [[1601, 1610], 256], 64638: [[1602, 1609], 256], 64639: [[1602, 1610], 256], 64640: [[1603, 1575], 256], 64641: [[1603, 1604], 256], 64642: [[1603, 1605], 256], 64643: [[1603, 1609], 256], 64644: [[1603, 1610], 256], 64645: [[1604, 1605], 256], 64646: [[1604, 1609], 256], 64647: [[1604, 1610], 256], 64648: [[1605, 1575], 256], 64649: [[1605, 1605], 256], 64650: [[1606, 1585], 256], 64651: [[1606, 1586], 256], 64652: [[1606, 1605], 256], 64653: [[1606, 1606], 256], 64654: [[1606, 1609], 256], 64655: [[1606, 1610], 256], 64656: [[1609, 1648], 256], 64657: [[1610, 1585], 256], 64658: [[1610, 1586], 256], 64659: [[1610, 1605], 256], 64660: [[1610, 1606], 256], 64661: [[1610, 1609], 256], 64662: [[1610, 1610], 256], 64663: [[1574, 1580], 256], 64664: [[1574, 1581], 256], 64665: [[1574, 1582], 256], 64666: [[1574, 1605], 256], 64667: [[1574, 1607], 256], 64668: [[1576, 1580], 256], 64669: [[1576, 1581], 256], 64670: [[1576, 1582], 256], 64671: [[1576, 1605], 256], 64672: [[1576, 1607], 256], 64673: [[1578, 1580], 256], 64674: [[1578, 1581], 256], 64675: [[1578, 1582], 256], 64676: [[1578, 1605], 256], 64677: [[1578, 1607], 256], 64678: [[1579, 1605], 256], 64679: [[1580, 1581], 256], 64680: [[1580, 1605], 256], 64681: [[1581, 1580], 256], 64682: [[1581, 1605], 256], 64683: [[1582, 1580], 256], 64684: [[1582, 1605], 256], 64685: [[1587, 1580], 256], 64686: [[1587, 1581], 256], 64687: [[1587, 1582], 256], 64688: [[1587, 1605], 256], 64689: [[1589, 1581], 256], 64690: [[1589, 1582], 256], 64691: [[1589, 1605], 256], 64692: [[1590, 1580], 256], 64693: [[1590, 1581], 256], 64694: [[1590, 1582], 256], 64695: [[1590, 1605], 256], 64696: [[1591, 1581], 256], 64697: [[1592, 1605], 256], 64698: [[1593, 1580], 256], 64699: [[1593, 1605], 256], 64700: [[1594, 1580], 256], 64701: [[1594, 1605], 256], 64702: [[1601, 1580], 256], 64703: [[1601, 1581], 256], 64704: [[1601, 1582], 256], 64705: [[1601, 1605], 256], 64706: [[1602, 1581], 256], 64707: [[1602, 1605], 256], 64708: [[1603, 1580], 256], 64709: [[1603, 1581], 256], 64710: [[1603, 1582], 256], 64711: [[1603, 1604], 256], 64712: [[1603, 1605], 256], 64713: [[1604, 1580], 256], 64714: [[1604, 1581], 256], 64715: [[1604, 1582], 256], 64716: [[1604, 1605], 256], 64717: [[1604, 1607], 256], 64718: [[1605, 1580], 256], 64719: [[1605, 1581], 256], 64720: [[1605, 1582], 256], 64721: [[1605, 1605], 256], 64722: [[1606, 1580], 256], 64723: [[1606, 1581], 256], 64724: [[1606, 1582], 256], 64725: [[1606, 1605], 256], 64726: [[1606, 1607], 256], 64727: [[1607, 1580], 256], 64728: [[1607, 1605], 256], 64729: [[1607, 1648], 256], 64730: [[1610, 1580], 256], 64731: [[1610, 1581], 256], 64732: [[1610, 1582], 256], 64733: [[1610, 1605], 256], 64734: [[1610, 1607], 256], 64735: [[1574, 1605], 256], 64736: [[1574, 1607], 256], 64737: [[1576, 1605], 256], 64738: [[1576, 1607], 256], 64739: [[1578, 1605], 256], 64740: [[1578, 1607], 256], 64741: [[1579, 1605], 256], 64742: [[1579, 1607], 256], 64743: [[1587, 1605], 256], 64744: [[1587, 1607], 256], 64745: [[1588, 1605], 256], 64746: [[1588, 1607], 256], 64747: [[1603, 1604], 256], 64748: [[1603, 1605], 256], 64749: [[1604, 1605], 256], 64750: [[1606, 1605], 256], 64751: [[1606, 1607], 256], 64752: [[1610, 1605], 256], 64753: [[1610, 1607], 256], 64754: [[1600, 1614, 1617], 256], 64755: [[1600, 1615, 1617], 256], 64756: [[1600, 1616, 1617], 256], 64757: [[1591, 1609], 256], 64758: [[1591, 1610], 256], 64759: [[1593, 1609], 256], 64760: [[1593, 1610], 256], 64761: [[1594, 1609], 256], 64762: [[1594, 1610], 256], 64763: [[1587, 1609], 256], 64764: [[1587, 1610], 256], 64765: [[1588, 1609], 256], 64766: [[1588, 1610], 256], 64767: [[1581, 1609], 256] },
        64768: { 64768: [[1581, 1610], 256], 64769: [[1580, 1609], 256], 64770: [[1580, 1610], 256], 64771: [[1582, 1609], 256], 64772: [[1582, 1610], 256], 64773: [[1589, 1609], 256], 64774: [[1589, 1610], 256], 64775: [[1590, 1609], 256], 64776: [[1590, 1610], 256], 64777: [[1588, 1580], 256], 64778: [[1588, 1581], 256], 64779: [[1588, 1582], 256], 64780: [[1588, 1605], 256], 64781: [[1588, 1585], 256], 64782: [[1587, 1585], 256], 64783: [[1589, 1585], 256], 64784: [[1590, 1585], 256], 64785: [[1591, 1609], 256], 64786: [[1591, 1610], 256], 64787: [[1593, 1609], 256], 64788: [[1593, 1610], 256], 64789: [[1594, 1609], 256], 64790: [[1594, 1610], 256], 64791: [[1587, 1609], 256], 64792: [[1587, 1610], 256], 64793: [[1588, 1609], 256], 64794: [[1588, 1610], 256], 64795: [[1581, 1609], 256], 64796: [[1581, 1610], 256], 64797: [[1580, 1609], 256], 64798: [[1580, 1610], 256], 64799: [[1582, 1609], 256], 64800: [[1582, 1610], 256], 64801: [[1589, 1609], 256], 64802: [[1589, 1610], 256], 64803: [[1590, 1609], 256], 64804: [[1590, 1610], 256], 64805: [[1588, 1580], 256], 64806: [[1588, 1581], 256], 64807: [[1588, 1582], 256], 64808: [[1588, 1605], 256], 64809: [[1588, 1585], 256], 64810: [[1587, 1585], 256], 64811: [[1589, 1585], 256], 64812: [[1590, 1585], 256], 64813: [[1588, 1580], 256], 64814: [[1588, 1581], 256], 64815: [[1588, 1582], 256], 64816: [[1588, 1605], 256], 64817: [[1587, 1607], 256], 64818: [[1588, 1607], 256], 64819: [[1591, 1605], 256], 64820: [[1587, 1580], 256], 64821: [[1587, 1581], 256], 64822: [[1587, 1582], 256], 64823: [[1588, 1580], 256], 64824: [[1588, 1581], 256], 64825: [[1588, 1582], 256], 64826: [[1591, 1605], 256], 64827: [[1592, 1605], 256], 64828: [[1575, 1611], 256], 64829: [[1575, 1611], 256], 64848: [[1578, 1580, 1605], 256], 64849: [[1578, 1581, 1580], 256], 64850: [[1578, 1581, 1580], 256], 64851: [[1578, 1581, 1605], 256], 64852: [[1578, 1582, 1605], 256], 64853: [[1578, 1605, 1580], 256], 64854: [[1578, 1605, 1581], 256], 64855: [[1578, 1605, 1582], 256], 64856: [[1580, 1605, 1581], 256], 64857: [[1580, 1605, 1581], 256], 64858: [[1581, 1605, 1610], 256], 64859: [[1581, 1605, 1609], 256], 64860: [[1587, 1581, 1580], 256], 64861: [[1587, 1580, 1581], 256], 64862: [[1587, 1580, 1609], 256], 64863: [[1587, 1605, 1581], 256], 64864: [[1587, 1605, 1581], 256], 64865: [[1587, 1605, 1580], 256], 64866: [[1587, 1605, 1605], 256], 64867: [[1587, 1605, 1605], 256], 64868: [[1589, 1581, 1581], 256], 64869: [[1589, 1581, 1581], 256], 64870: [[1589, 1605, 1605], 256], 64871: [[1588, 1581, 1605], 256], 64872: [[1588, 1581, 1605], 256], 64873: [[1588, 1580, 1610], 256], 64874: [[1588, 1605, 1582], 256], 64875: [[1588, 1605, 1582], 256], 64876: [[1588, 1605, 1605], 256], 64877: [[1588, 1605, 1605], 256], 64878: [[1590, 1581, 1609], 256], 64879: [[1590, 1582, 1605], 256], 64880: [[1590, 1582, 1605], 256], 64881: [[1591, 1605, 1581], 256], 64882: [[1591, 1605, 1581], 256], 64883: [[1591, 1605, 1605], 256], 64884: [[1591, 1605, 1610], 256], 64885: [[1593, 1580, 1605], 256], 64886: [[1593, 1605, 1605], 256], 64887: [[1593, 1605, 1605], 256], 64888: [[1593, 1605, 1609], 256], 64889: [[1594, 1605, 1605], 256], 64890: [[1594, 1605, 1610], 256], 64891: [[1594, 1605, 1609], 256], 64892: [[1601, 1582, 1605], 256], 64893: [[1601, 1582, 1605], 256], 64894: [[1602, 1605, 1581], 256], 64895: [[1602, 1605, 1605], 256], 64896: [[1604, 1581, 1605], 256], 64897: [[1604, 1581, 1610], 256], 64898: [[1604, 1581, 1609], 256], 64899: [[1604, 1580, 1580], 256], 64900: [[1604, 1580, 1580], 256], 64901: [[1604, 1582, 1605], 256], 64902: [[1604, 1582, 1605], 256], 64903: [[1604, 1605, 1581], 256], 64904: [[1604, 1605, 1581], 256], 64905: [[1605, 1581, 1580], 256], 64906: [[1605, 1581, 1605], 256], 64907: [[1605, 1581, 1610], 256], 64908: [[1605, 1580, 1581], 256], 64909: [[1605, 1580, 1605], 256], 64910: [[1605, 1582, 1580], 256], 64911: [[1605, 1582, 1605], 256], 64914: [[1605, 1580, 1582], 256], 64915: [[1607, 1605, 1580], 256], 64916: [[1607, 1605, 1605], 256], 64917: [[1606, 1581, 1605], 256], 64918: [[1606, 1581, 1609], 256], 64919: [[1606, 1580, 1605], 256], 64920: [[1606, 1580, 1605], 256], 64921: [[1606, 1580, 1609], 256], 64922: [[1606, 1605, 1610], 256], 64923: [[1606, 1605, 1609], 256], 64924: [[1610, 1605, 1605], 256], 64925: [[1610, 1605, 1605], 256], 64926: [[1576, 1582, 1610], 256], 64927: [[1578, 1580, 1610], 256], 64928: [[1578, 1580, 1609], 256], 64929: [[1578, 1582, 1610], 256], 64930: [[1578, 1582, 1609], 256], 64931: [[1578, 1605, 1610], 256], 64932: [[1578, 1605, 1609], 256], 64933: [[1580, 1605, 1610], 256], 64934: [[1580, 1581, 1609], 256], 64935: [[1580, 1605, 1609], 256], 64936: [[1587, 1582, 1609], 256], 64937: [[1589, 1581, 1610], 256], 64938: [[1588, 1581, 1610], 256], 64939: [[1590, 1581, 1610], 256], 64940: [[1604, 1580, 1610], 256], 64941: [[1604, 1605, 1610], 256], 64942: [[1610, 1581, 1610], 256], 64943: [[1610, 1580, 1610], 256], 64944: [[1610, 1605, 1610], 256], 64945: [[1605, 1605, 1610], 256], 64946: [[1602, 1605, 1610], 256], 64947: [[1606, 1581, 1610], 256], 64948: [[1602, 1605, 1581], 256], 64949: [[1604, 1581, 1605], 256], 64950: [[1593, 1605, 1610], 256], 64951: [[1603, 1605, 1610], 256], 64952: [[1606, 1580, 1581], 256], 64953: [[1605, 1582, 1610], 256], 64954: [[1604, 1580, 1605], 256], 64955: [[1603, 1605, 1605], 256], 64956: [[1604, 1580, 1605], 256], 64957: [[1606, 1580, 1581], 256], 64958: [[1580, 1581, 1610], 256], 64959: [[1581, 1580, 1610], 256], 64960: [[1605, 1580, 1610], 256], 64961: [[1601, 1605, 1610], 256], 64962: [[1576, 1581, 1610], 256], 64963: [[1603, 1605, 1605], 256], 64964: [[1593, 1580, 1605], 256], 64965: [[1589, 1605, 1605], 256], 64966: [[1587, 1582, 1610], 256], 64967: [[1606, 1580, 1610], 256], 65008: [[1589, 1604, 1746], 256], 65009: [[1602, 1604, 1746], 256], 65010: [[1575, 1604, 1604, 1607], 256], 65011: [[1575, 1603, 1576, 1585], 256], 65012: [[1605, 1581, 1605, 1583], 256], 65013: [[1589, 1604, 1593, 1605], 256], 65014: [[1585, 1587, 1608, 1604], 256], 65015: [[1593, 1604, 1610, 1607], 256], 65016: [[1608, 1587, 1604, 1605], 256], 65017: [[1589, 1604, 1609], 256], 65018: [[1589, 1604, 1609, 32, 1575, 1604, 1604, 1607, 32, 1593, 1604, 1610, 1607, 32, 1608, 1587, 1604, 1605], 256], 65019: [[1580, 1604, 32, 1580, 1604, 1575, 1604, 1607], 256], 65020: [[1585, 1740, 1575, 1604], 256] },
        65024: { 65040: [[44], 256], 65041: [[12289], 256], 65042: [[12290], 256], 65043: [[58], 256], 65044: [[59], 256], 65045: [[33], 256], 65046: [[63], 256], 65047: [[12310], 256], 65048: [[12311], 256], 65049: [[8230], 256], 65056: [, 230], 65057: [, 230], 65058: [, 230], 65059: [, 230], 65060: [, 230], 65061: [, 230], 65062: [, 230], 65063: [, 220], 65064: [, 220], 65065: [, 220], 65066: [, 220], 65067: [, 220], 65068: [, 220], 65069: [, 220], 65072: [[8229], 256], 65073: [[8212], 256], 65074: [[8211], 256], 65075: [[95], 256], 65076: [[95], 256], 65077: [[40], 256], 65078: [[41], 256], 65079: [[123], 256], 65080: [[125], 256], 65081: [[12308], 256], 65082: [[12309], 256], 65083: [[12304], 256], 65084: [[12305], 256], 65085: [[12298], 256], 65086: [[12299], 256], 65087: [[12296], 256], 65088: [[12297], 256], 65089: [[12300], 256], 65090: [[12301], 256], 65091: [[12302], 256], 65092: [[12303], 256], 65095: [[91], 256], 65096: [[93], 256], 65097: [[8254], 256], 65098: [[8254], 256], 65099: [[8254], 256], 65100: [[8254], 256], 65101: [[95], 256], 65102: [[95], 256], 65103: [[95], 256], 65104: [[44], 256], 65105: [[12289], 256], 65106: [[46], 256], 65108: [[59], 256], 65109: [[58], 256], 65110: [[63], 256], 65111: [[33], 256], 65112: [[8212], 256], 65113: [[40], 256], 65114: [[41], 256], 65115: [[123], 256], 65116: [[125], 256], 65117: [[12308], 256], 65118: [[12309], 256], 65119: [[35], 256], 65120: [[38], 256], 65121: [[42], 256], 65122: [[43], 256], 65123: [[45], 256], 65124: [[60], 256], 65125: [[62], 256], 65126: [[61], 256], 65128: [[92], 256], 65129: [[36], 256], 65130: [[37], 256], 65131: [[64], 256], 65136: [[32, 1611], 256], 65137: [[1600, 1611], 256], 65138: [[32, 1612], 256], 65140: [[32, 1613], 256], 65142: [[32, 1614], 256], 65143: [[1600, 1614], 256], 65144: [[32, 1615], 256], 65145: [[1600, 1615], 256], 65146: [[32, 1616], 256], 65147: [[1600, 1616], 256], 65148: [[32, 1617], 256], 65149: [[1600, 1617], 256], 65150: [[32, 1618], 256], 65151: [[1600, 1618], 256], 65152: [[1569], 256], 65153: [[1570], 256], 65154: [[1570], 256], 65155: [[1571], 256], 65156: [[1571], 256], 65157: [[1572], 256], 65158: [[1572], 256], 65159: [[1573], 256], 65160: [[1573], 256], 65161: [[1574], 256], 65162: [[1574], 256], 65163: [[1574], 256], 65164: [[1574], 256], 65165: [[1575], 256], 65166: [[1575], 256], 65167: [[1576], 256], 65168: [[1576], 256], 65169: [[1576], 256], 65170: [[1576], 256], 65171: [[1577], 256], 65172: [[1577], 256], 65173: [[1578], 256], 65174: [[1578], 256], 65175: [[1578], 256], 65176: [[1578], 256], 65177: [[1579], 256], 65178: [[1579], 256], 65179: [[1579], 256], 65180: [[1579], 256], 65181: [[1580], 256], 65182: [[1580], 256], 65183: [[1580], 256], 65184: [[1580], 256], 65185: [[1581], 256], 65186: [[1581], 256], 65187: [[1581], 256], 65188: [[1581], 256], 65189: [[1582], 256], 65190: [[1582], 256], 65191: [[1582], 256], 65192: [[1582], 256], 65193: [[1583], 256], 65194: [[1583], 256], 65195: [[1584], 256], 65196: [[1584], 256], 65197: [[1585], 256], 65198: [[1585], 256], 65199: [[1586], 256], 65200: [[1586], 256], 65201: [[1587], 256], 65202: [[1587], 256], 65203: [[1587], 256], 65204: [[1587], 256], 65205: [[1588], 256], 65206: [[1588], 256], 65207: [[1588], 256], 65208: [[1588], 256], 65209: [[1589], 256], 65210: [[1589], 256], 65211: [[1589], 256], 65212: [[1589], 256], 65213: [[1590], 256], 65214: [[1590], 256], 65215: [[1590], 256], 65216: [[1590], 256], 65217: [[1591], 256], 65218: [[1591], 256], 65219: [[1591], 256], 65220: [[1591], 256], 65221: [[1592], 256], 65222: [[1592], 256], 65223: [[1592], 256], 65224: [[1592], 256], 65225: [[1593], 256], 65226: [[1593], 256], 65227: [[1593], 256], 65228: [[1593], 256], 65229: [[1594], 256], 65230: [[1594], 256], 65231: [[1594], 256], 65232: [[1594], 256], 65233: [[1601], 256], 65234: [[1601], 256], 65235: [[1601], 256], 65236: [[1601], 256], 65237: [[1602], 256], 65238: [[1602], 256], 65239: [[1602], 256], 65240: [[1602], 256], 65241: [[1603], 256], 65242: [[1603], 256], 65243: [[1603], 256], 65244: [[1603], 256], 65245: [[1604], 256], 65246: [[1604], 256], 65247: [[1604], 256], 65248: [[1604], 256], 65249: [[1605], 256], 65250: [[1605], 256], 65251: [[1605], 256], 65252: [[1605], 256], 65253: [[1606], 256], 65254: [[1606], 256], 65255: [[1606], 256], 65256: [[1606], 256], 65257: [[1607], 256], 65258: [[1607], 256], 65259: [[1607], 256], 65260: [[1607], 256], 65261: [[1608], 256], 65262: [[1608], 256], 65263: [[1609], 256], 65264: [[1609], 256], 65265: [[1610], 256], 65266: [[1610], 256], 65267: [[1610], 256], 65268: [[1610], 256], 65269: [[1604, 1570], 256], 65270: [[1604, 1570], 256], 65271: [[1604, 1571], 256], 65272: [[1604, 1571], 256], 65273: [[1604, 1573], 256], 65274: [[1604, 1573], 256], 65275: [[1604, 1575], 256], 65276: [[1604, 1575], 256] },
        65280: { 65281: [[33], 256], 65282: [[34], 256], 65283: [[35], 256], 65284: [[36], 256], 65285: [[37], 256], 65286: [[38], 256], 65287: [[39], 256], 65288: [[40], 256], 65289: [[41], 256], 65290: [[42], 256], 65291: [[43], 256], 65292: [[44], 256], 65293: [[45], 256], 65294: [[46], 256], 65295: [[47], 256], 65296: [[48], 256], 65297: [[49], 256], 65298: [[50], 256], 65299: [[51], 256], 65300: [[52], 256], 65301: [[53], 256], 65302: [[54], 256], 65303: [[55], 256], 65304: [[56], 256], 65305: [[57], 256], 65306: [[58], 256], 65307: [[59], 256], 65308: [[60], 256], 65309: [[61], 256], 65310: [[62], 256], 65311: [[63], 256], 65312: [[64], 256], 65313: [[65], 256], 65314: [[66], 256], 65315: [[67], 256], 65316: [[68], 256], 65317: [[69], 256], 65318: [[70], 256], 65319: [[71], 256], 65320: [[72], 256], 65321: [[73], 256], 65322: [[74], 256], 65323: [[75], 256], 65324: [[76], 256], 65325: [[77], 256], 65326: [[78], 256], 65327: [[79], 256], 65328: [[80], 256], 65329: [[81], 256], 65330: [[82], 256], 65331: [[83], 256], 65332: [[84], 256], 65333: [[85], 256], 65334: [[86], 256], 65335: [[87], 256], 65336: [[88], 256], 65337: [[89], 256], 65338: [[90], 256], 65339: [[91], 256], 65340: [[92], 256], 65341: [[93], 256], 65342: [[94], 256], 65343: [[95], 256], 65344: [[96], 256], 65345: [[97], 256], 65346: [[98], 256], 65347: [[99], 256], 65348: [[100], 256], 65349: [[101], 256], 65350: [[102], 256], 65351: [[103], 256], 65352: [[104], 256], 65353: [[105], 256], 65354: [[106], 256], 65355: [[107], 256], 65356: [[108], 256], 65357: [[109], 256], 65358: [[110], 256], 65359: [[111], 256], 65360: [[112], 256], 65361: [[113], 256], 65362: [[114], 256], 65363: [[115], 256], 65364: [[116], 256], 65365: [[117], 256], 65366: [[118], 256], 65367: [[119], 256], 65368: [[120], 256], 65369: [[121], 256], 65370: [[122], 256], 65371: [[123], 256], 65372: [[124], 256], 65373: [[125], 256], 65374: [[126], 256], 65375: [[10629], 256], 65376: [[10630], 256], 65377: [[12290], 256], 65378: [[12300], 256], 65379: [[12301], 256], 65380: [[12289], 256], 65381: [[12539], 256], 65382: [[12530], 256], 65383: [[12449], 256], 65384: [[12451], 256], 65385: [[12453], 256], 65386: [[12455], 256], 65387: [[12457], 256], 65388: [[12515], 256], 65389: [[12517], 256], 65390: [[12519], 256], 65391: [[12483], 256], 65392: [[12540], 256], 65393: [[12450], 256], 65394: [[12452], 256], 65395: [[12454], 256], 65396: [[12456], 256], 65397: [[12458], 256], 65398: [[12459], 256], 65399: [[12461], 256], 65400: [[12463], 256], 65401: [[12465], 256], 65402: [[12467], 256], 65403: [[12469], 256], 65404: [[12471], 256], 65405: [[12473], 256], 65406: [[12475], 256], 65407: [[12477], 256], 65408: [[12479], 256], 65409: [[12481], 256], 65410: [[12484], 256], 65411: [[12486], 256], 65412: [[12488], 256], 65413: [[12490], 256], 65414: [[12491], 256], 65415: [[12492], 256], 65416: [[12493], 256], 65417: [[12494], 256], 65418: [[12495], 256], 65419: [[12498], 256], 65420: [[12501], 256], 65421: [[12504], 256], 65422: [[12507], 256], 65423: [[12510], 256], 65424: [[12511], 256], 65425: [[12512], 256], 65426: [[12513], 256], 65427: [[12514], 256], 65428: [[12516], 256], 65429: [[12518], 256], 65430: [[12520], 256], 65431: [[12521], 256], 65432: [[12522], 256], 65433: [[12523], 256], 65434: [[12524], 256], 65435: [[12525], 256], 65436: [[12527], 256], 65437: [[12531], 256], 65438: [[12441], 256], 65439: [[12442], 256], 65440: [[12644], 256], 65441: [[12593], 256], 65442: [[12594], 256], 65443: [[12595], 256], 65444: [[12596], 256], 65445: [[12597], 256], 65446: [[12598], 256], 65447: [[12599], 256], 65448: [[12600], 256], 65449: [[12601], 256], 65450: [[12602], 256], 65451: [[12603], 256], 65452: [[12604], 256], 65453: [[12605], 256], 65454: [[12606], 256], 65455: [[12607], 256], 65456: [[12608], 256], 65457: [[12609], 256], 65458: [[12610], 256], 65459: [[12611], 256], 65460: [[12612], 256], 65461: [[12613], 256], 65462: [[12614], 256], 65463: [[12615], 256], 65464: [[12616], 256], 65465: [[12617], 256], 65466: [[12618], 256], 65467: [[12619], 256], 65468: [[12620], 256], 65469: [[12621], 256], 65470: [[12622], 256], 65474: [[12623], 256], 65475: [[12624], 256], 65476: [[12625], 256], 65477: [[12626], 256], 65478: [[12627], 256], 65479: [[12628], 256], 65482: [[12629], 256], 65483: [[12630], 256], 65484: [[12631], 256], 65485: [[12632], 256], 65486: [[12633], 256], 65487: [[12634], 256], 65490: [[12635], 256], 65491: [[12636], 256], 65492: [[12637], 256], 65493: [[12638], 256], 65494: [[12639], 256], 65495: [[12640], 256], 65498: [[12641], 256], 65499: [[12642], 256], 65500: [[12643], 256], 65504: [[162], 256], 65505: [[163], 256], 65506: [[172], 256], 65507: [[175], 256], 65508: [[166], 256], 65509: [[165], 256], 65510: [[8361], 256], 65512: [[9474], 256], 65513: [[8592], 256], 65514: [[8593], 256], 65515: [[8594], 256], 65516: [[8595], 256], 65517: [[9632], 256], 65518: [[9675], 256] }
      };
      var O = {
        nfc: I,
        nfd: W,
        nfkc: N,
        nfkd: D
      };
      e.exports = O, O.shimApplied = !1, String.prototype.normalize || (Object.defineProperty(String.prototype, "normalize", {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: function() {
          var P = "" + this, U = arguments[0] === void 0 ? "NFC" : arguments[0];
          if (this === null || this === void 0)
            throw new TypeError("Cannot call method on " + Object.prototype.toString.call(this));
          if (U === "NFC")
            return O.nfc(P);
          if (U === "NFD")
            return O.nfd(P);
          if (U === "NFKC")
            return O.nfkc(P);
          if (U === "NFKD")
            return O.nfkd(P);
          throw new RangeError("Invalid normalization form: " + U);
        }
      }), O.shimApplied = !0);
    })();
  }(Q0)), Q0.exports;
}
const { PNG: kE } = br, E6 = gE, G1 = {
  EPSON: "epson",
  TANCA: "tanca",
  STAR: "star",
  DARUMA: "daruma",
  BROTHER: "brother",
  CUSTOM: "custom"
}, wn = {
  NONE: "NONE",
  CHARACTER: "CHARACTER",
  WORD: "WORD"
}, g6 = {
  PC437_USA: "PC437_USA",
  PC850_MULTILINGUAL: "PC850_MULTILINGUAL",
  PC860_PORTUGUESE: "PC860_PORTUGUESE",
  PC863_CANADIAN_FRENCH: "PC863_CANADIAN_FRENCH",
  PC865_NORDIC: "PC865_NORDIC",
  PC851_GREEK: "PC851_GREEK",
  PC857_TURKISH: "PC857_TURKISH",
  PC737_GREEK: "PC737_GREEK",
  ISO8859_7_GREEK: "ISO8859_7_GREEK",
  WPC1252: "WPC1252",
  PC866_CYRILLIC2: "PC866_CYRILLIC2",
  PC852_LATIN2: "PC852_LATIN2",
  SLOVENIA: "SLOVENIA",
  PC858_EURO: "PC858_EURO",
  WPC775_BALTIC_RIM: "WPC775_BALTIC_RIM",
  PC855_CYRILLIC: "PC855_CYRILLIC",
  PC861_ICELANDIC: "PC861_ICELANDIC",
  PC862_HEBREW: "PC862_HEBREW",
  PC864_ARABIC: "PC864_ARABIC",
  PC869_GREEK: "PC869_GREEK",
  ISO8859_2_LATIN2: "ISO8859_2_LATIN2",
  ISO8859_15_LATIN9: "ISO8859_15_LATIN9",
  PC1125_UKRANIAN: "PC1125_UKRANIAN",
  WPC1250_LATIN2: "WPC1250_LATIN2",
  WPC1251_CYRILLIC: "WPC1251_CYRILLIC",
  WPC1253_GREEK: "WPC1253_GREEK",
  WPC1254_TURKISH: "WPC1254_TURKISH",
  WPC1255_HEBREW: "WPC1255_HEBREW",
  WPC1256_ARABIC: "WPC1256_ARABIC",
  WPC1257_BALTIC_RIM: "WPC1257_BALTIC_RIM",
  WPC1258_VIETNAMESE: "WPC1258_VIETNAMESE",
  KZ1048_KAZAKHSTAN: "KZ1048_KAZAKHSTAN",
  JAPAN: "JAPAN",
  KOREA: "KOREA",
  CHINA: "CHINA",
  HK_TW: "HK_TW",
  TCVN_VIETNAMESE: "TCVN_VIETNAMESE"
};
class C6 {
  constructor(t) {
    if (t.interface) {
      const r = AE();
      this.Interface = r(
        t.interface,
        t.options,
        t.driver
      );
    }
    if (!this.Interface) throw new Error("No interface! Please set 'interface' in the config.");
    switch (this.buffer = null, this.config = null, this.printer = null, this.types = G1, t.type) {
      case this.types.EPSON:
        const r = PE();
        this.printer = new r();
        break;
      case this.types.STAR:
        const n = OE();
        this.printer = new n();
        break;
      case this.types.TANCA:
        const i = RE();
        this.printer = new i();
        break;
      case this.types.DARUMA:
        const o = DE();
        this.printer = new o();
        break;
      case this.types.BROTHER:
        const s = LE();
        this.printer = new s();
        break;
      case this.types.CUSTOM:
        const a = $E();
        this.printer = new a();
        break;
    }
    if (!this.printer)
      throw new Error(`Printer type '${t.type}' not recognized!`);
    this.config = {
      type: t.type,
      width: parseInt(t.width) || 48,
      characterSet: t.characterSet,
      removeSpecialCharacters: t.removeSpecialCharacters || !1,
      lineCharacter: t.lineCharacter || "-",
      breakLine: t.breakLine || wn.WORD,
      options: t.options
    }, this.config.characterSet && this.setCharacterSet(this.config.characterSet);
  }
  setPrinterDriver(t) {
    if (!this.Interface) throw new Error("No interface!");
    this.Interface.driver = t;
  }
  async execute(t = {}) {
    if (!this.Interface) throw new Error("No interface!");
    try {
      return await this.Interface.execute(this.buffer, t);
    } catch (r) {
      throw r;
    }
  }
  cut({ verticalTabAmount: t = 2 } = {}) {
    for (let r = 0; r < t; r++)
      this.append(this.printer.config.CTL_VT);
    this.append(this.printer.config.PAPER_FULL_CUT), this.initHardware();
  }
  partialCut({ verticalTabAmount: t = 2 } = {}) {
    for (let r = 0; r < t; r++)
      this.append(this.printer.config.CTL_VT);
    this.append(this.printer.config.PAPER_PART_CUT), this.initHardware();
  }
  initHardware() {
    this.append(this.printer.config.HW_INIT);
  }
  getWidth() {
    return parseInt(this.config.width);
  }
  getText() {
    return this.buffer.toString();
  }
  getBuffer() {
    return this.buffer;
  }
  setBuffer(t) {
    this.buffer = Buffer.from(t);
  }
  clear() {
    this.buffer = null, this.config.characterSet && this.setCharacterSet(this.config.characterSet);
  }
  add(t) {
    this.append(t);
  }
  print(t) {
    t = t || "", this.config.breakLine != wn.NONE && (t = this._fold(t, this.config.width, this.config.breakLine == wn.CHARACTER).join(`
`)), this.append(t.toString());
  }
  println(t) {
    this.print(t), this.append(`
`);
  }
  printVerticalTab() {
    this.append(this.printer.config.CTL_VT);
  }
  bold(t) {
    t ? this.append(this.printer.config.TXT_BOLD_ON) : this.append(this.printer.config.TXT_BOLD_OFF);
  }
  underline(t) {
    t ? this.append(this.printer.config.TXT_UNDERL_ON) : this.append(this.printer.config.TXT_UNDERL_OFF);
  }
  underlineThick(t) {
    t ? this.append(this.printer.config.TXT_UNDERL2_ON) : this.append(this.printer.config.TXT_UNDERL_OFF);
  }
  upsideDown(t) {
    t ? this.append(this.printer.config.UPSIDE_DOWN_ON) : this.append(this.printer.config.UPSIDE_DOWN_OFF);
  }
  invert(t) {
    t ? this.append(this.printer.config.TXT_INVERT_ON) : this.append(this.printer.config.TXT_INVERT_OFF);
  }
  openCashDrawer() {
    this.config.type === this.types.STAR ? this.append(this.printer.config.CD_KICK) : (this.append(this.printer.config.CD_KICK_2), this.append(this.printer.config.CD_KICK_5));
  }
  alignCenter() {
    this.append(this.printer.config.TXT_ALIGN_CT);
  }
  alignLeft() {
    this.append(this.printer.config.TXT_ALIGN_LT);
  }
  alignRight() {
    this.append(this.printer.config.TXT_ALIGN_RT);
  }
  setTypeFontA() {
    this.append(this.printer.config.TXT_FONT_A);
  }
  setTypeFontB() {
    this.append(this.printer.config.TXT_FONT_B);
  }
  setTextNormal() {
    this.append(this.printer.config.TXT_NORMAL);
  }
  setTextDoubleHeight() {
    this.append(this.printer.config.TXT_2HEIGHT);
  }
  setTextDoubleWidth() {
    this.append(this.printer.config.TXT_2WIDTH);
  }
  setTextQuadArea() {
    this.append(this.printer.config.TXT_4SQUARE);
  }
  setTextSize(t, r) {
    this.append(this.printer.setTextSize(t, r));
  }
  // ----------------------------------------------------- NEW LINE -----------------------------------------------------
  newLine() {
    this.append(this.printer.config.CTL_LF);
  }
  // ----------------------------------------------------- DRAW LINE -----------------------------------------------------
  drawLine(t = this.config.lineCharacter) {
    for (let r = 0; r < this.config.width; r++)
      this.append(Buffer.from(t));
    this.newLine();
  }
  // ----------------------------------------------------- LEFT RIGHT -----------------------------------------------------
  leftRight(t, r) {
    this.append(t.toString());
    const n = this.config.width - t.toString().length - r.toString().length;
    for (let i = 0; i < n; i++)
      this.append(Buffer.from(" "));
    this.append(r.toString()), this.newLine();
  }
  // ----------------------------------------------------- TABLE -----------------------------------------------------
  table(t) {
    const r = this.config.width / t.length;
    for (let n = 0; n < t.length; n++) {
      this.append(t[n].toString());
      const i = r - t[n].toString().length;
      for (let o = 0; o < i; o++)
        this.append(Buffer.from(" "));
    }
    this.newLine();
  }
  // ----------------------------------------------------- TABLE CUSTOM -----------------------------------------------------
  // Options: text, align, width, bold
  tableCustom(t) {
    let r = this.config.width / t.length;
    const n = [];
    let i = !1;
    for (let o = 0; o < t.length; o++) {
      let s = !1;
      const a = t[o];
      if (a.text = a.text.toString(), a.width ? r = this.config.width * a.width : a.cols && (r = a.cols), a.bold && this.bold(!0), r < a.text.length && (s = !0, a.originalText = a.text, a.text = a.text.substring(0, r - 1)), a.align == "CENTER") {
        const f = (r - a.text.toString().length) / 2;
        for (let c = 0; c < f; c++)
          this.append(Buffer.from(" "));
        a.text != "" && this.append(a.text);
        for (let c = 0; c < f - 1; c++)
          this.append(Buffer.from(" "));
      } else if (a.align == "RIGHT") {
        const f = r - a.text.toString().length;
        for (let c = 0; c < f; c++)
          this.append(Buffer.from(" "));
        a.text != "" && this.append(a.text);
      } else {
        a.text != "" && this.append(a.text);
        const f = r - a.text.toString().length;
        for (let c = 0; c < f; c++)
          this.append(Buffer.from(" "));
      }
      a.bold && this.bold(!1), s ? (i = !0, a.text = a.originalText.substring(r - 1), n.push(a)) : (a.text = "", n.push(a));
    }
    this.newLine(), i && this.tableCustom(n);
  }
  // ----------------------------------------------------- IS PRINTER CONNECTED -----------------------------------------------------
  async isPrinterConnected(t) {
    return this.Interface.isPrinterConnected(t);
  }
  // ----------------------------------------------------- GET PRINTER STATUS -----------------------------------------------------
  async getStatus() {
    this.append(this.printer.getStatus());
  }
  // ----------------------------------------------------- BEEP -----------------------------------------------------
  beep(t, r) {
    this.append(this.printer.beep(t, r));
  }
  // ----------------------------------------------------- PRINT QR -----------------------------------------------------
  printQR(t, r) {
    this.append(this.printer.printQR(t, r));
  }
  // ----------------------------------------------------- PRINT BARCODE -----------------------------------------------------
  printBarcode(t, r, n) {
    this.append(this.printer.printBarcode(t, r, n));
  }
  // ----------------------------------------------------- PRINT MAXICODE -----------------------------------------------------
  maxiCode(t, r) {
    this.append(this.printer.maxiCode(t, r));
  }
  // ----------------------------------------------------- PRINT CODE128 -----------------------------------------------------
  code128(t, r) {
    this.append(this.printer.code128(t, r));
  }
  // ----------------------------------------------------- PRINT PDF417 -----------------------------------------------------
  pdf417(t, r) {
    this.append(this.printer.pdf417(t, r));
  }
  // ----------------------------------------------------- PRINT IMAGE -----------------------------------------------------
  async printImage(t) {
    try {
      if (require("fs").accessSync(t), t.slice(-4) === ".png")
        try {
          const n = await this.printer.printImage(t);
          return this.append(n), n;
        } catch (n) {
          throw n;
        }
      else
        throw new Error("Image printing supports only PNG files.");
    } catch (r) {
      throw r;
    }
  }
  // ----------------------------------------------------- PRINT IMAGE BUFFER -----------------------------------------------------
  async printImageBuffer(t) {
    try {
      const r = kE.sync.read(t), n = this.printer.printImageBuffer(r.width, r.height, r.data);
      return this.append(n), n;
    } catch (r) {
      throw r;
    }
  }
  // ------------------------------ RAW ------------------------------
  async raw(t) {
    try {
      return await this.Interface.execute(t);
    } catch (r) {
      throw r;
    }
  }
  // ------------------------------ Merge objects ------------------------------
  mergeObjects(t, r) {
    const n = {};
    for (const i in t)
      n[i] = t[i];
    for (const i in r)
      n[i] = r[i];
    return n;
  }
  // ------------------------------ Set character set ------------------------------
  setCharacterSet(t) {
    const r = this.printer.config[`CODE_PAGE_${t}`];
    if (r)
      this.append(r), this.config.codePage = t;
    else
      throw new Error(`Code page not recognized: '${t}'`);
  }
  // ------------------------------ Append ------------------------------
  append(t) {
    if (typeof t == "string") {
      if (this.config.removeSpecialCharacters) {
        const n = UE(), i = /[\u0300-\u036F]/g;
        t = n.nfkd(t).replace(i, "");
      }
      let r = null;
      for (const n of t) {
        let i = n;
        if (!/^[\x00-\x7F]$/.test(n)) {
          try {
            i = E6.encode(n, this.printer.config.CODE_PAGES[this.config.codePage]);
          } catch (o) {
            console.error(o), i = "?";
          }
          if (i.toString() === "?")
            for (const o of Object.keys(this.printer.config.CODE_PAGES)) {
              const s = this.printer.config.CODE_PAGES[o];
              try {
                i = E6.encode(n, s);
              } catch (a) {
                console.error(a);
              }
              if (i.toString() !== "?") {
                this.config.codePage = o, i = Buffer.concat([this.printer.config[`CODE_PAGE_${o}`], i]);
                break;
              }
            }
        }
        r = r ? Buffer.concat([r, Buffer.from(i)]) : Buffer.from(i);
      }
      t = r;
    }
    t && (this.buffer ? this.buffer = Buffer.concat([this.buffer, t]) : this.buffer = t);
  }
  // ------------------------------ Fold ------------------------------
  /**
   * This function splits text input into multiple lines. Returns array of lines
   * @param {string} text - text to split into lines
   * @param {number} lineSize - maximum allowed character count in one line
   * @param {boolean} breakWord - Break word or character
   * @param {array} lineArray - Array of lines passed for recursion
   * @returns {array} Array of lines
  */
  _fold(t, r, n, i = []) {
    t = String(t);
    const o = t.split(`
`);
    for (let s = 0; s < o.length; s++) {
      let a = o[s];
      for (; a.length > r; ) {
        let f = a.substring(0, r);
        if (!n)
          i.push(f), a = a.substring(r);
        else {
          const c = /\s(?!.*\s)/, l = f.search(c);
          let u = r;
          l > 0 && (f = f.substring(0, l), u = l), i.push(f), a = a.substring(u);
        }
      }
      a.length > 0 && i.push(a);
    }
    return i;
  }
}
var ME = {
  printer: C6,
  types: G1,
  printerTypes: G1,
  breakLine: wn,
  characterSet: g6,
  ThermalPrinter: C6,
  PrinterTypes: G1,
  BreakLine: wn,
  CharacterSet: g6
}, It = ME;
class GE {
  // RP-330-L PARTNER síťová tiskárna
  constructor() {
    this.printer = null, this.currentInterface = "tcp://192.168.1.100:9100", this.initializePrinter(), this.setupIpcHandlers();
  }
  initializePrinter() {
    try {
      this.printer = new It.ThermalPrinter({
        type: It.PrinterTypes.EPSON,
        interface: this.currentInterface,
        characterSet: It.CharacterSet.PC852_LATIN2,
        removeSpecialCharacters: !1,
        lineCharacter: "-",
        breakLine: It.BreakLine.WORD,
        options: {},
        width: 42
        // Sníženo pro RP-330-L (standardně 32-40 znaků)
      });
    } catch (t) {
      console.error("Failed to initialize network printer:", t), this.tryAlternativeConfig();
    }
  }
  tryAlternativeConfig() {
    try {
      this.printer = new It.ThermalPrinter({
        type: It.PrinterTypes.STAR,
        interface: "tcp://192.168.1.100:9100",
        characterSet: It.CharacterSet.PC852_LATIN2,
        removeSpecialCharacters: !1,
        lineCharacter: "-",
        breakLine: It.BreakLine.WORD,
        options: {
          timeout: 15e3
        },
        width: 32
        // Konzistentní šířka pro oba typy
      });
    } catch (t) {
      console.error("Failed to initialize printer with fallback config:", t);
    }
  }
  setupIpcHandlers() {
    ht.handle("print-receipt", async (t, r) => await this.printReceipt(r)), ht.handle("get-printers", async () => await this.getAvailablePrinters()), ht.handle("test-printer-connection", async () => await this.testPrinterConnection()), ht.handle("set-printer-interface", async (t, r) => (this.currentInterface = `printer:${r}`, this.initializePrinter(), { success: !0, message: `Tiskárna nastavena na ${r}` }));
  }
  async getAvailablePrinters() {
    return new Promise((t) => {
      e5("wmic printer get name", (r, n) => {
        if (r)
          return console.error("Error getting printers:", r), t([]);
        const i = n.split(`
`).map((o) => o.trim()).filter((o) => o && o !== "Name");
        t(i);
      });
    });
  }
  async printReceipt(t) {
    try {
      if (!this.printer)
        throw new Error("Printer not initialized");
      return this.printer.clear(), this.printer.alignCenter(), this.printer.setTextSize(1, 1), this.printer.bold(!0), this.printer.println("Hradišťský Vrch"), this.printer.bold(!1), this.printer.setTextNormal(), this.printer.println("Konstantinovy Lázně"), this.printer.println("Provozovatel: HÁJEK - Velin s.r.o."), this.printer.println("IČ: 611 73 517"), this.printer.drawLine(), this.printer.alignLeft(), t.dateFrom && t.dateTo ? this.printer.println(`Přehled za období: ${t.dateFrom} - ${t.dateTo}`) : t.date && this.printer.println(`Datum: ${t.date}`), this.printer.drawLine(), t.items.forEach((r) => {
        if (!this.printer) return;
        this.printer.bold(!0), this.printer.println(r.name), this.printer.bold(!1);
        const n = `${r.quantity}x`, i = `${this.formatCurrency(r.price)}`, o = `${this.formatCurrency(r.total)}`;
        this.printer.tableCustom([
          { text: n, align: "LEFT", width: 0.2 },
          { text: i, align: "RIGHT", width: 0.3 },
          { text: o, align: "RIGHT", width: 0.4, bold: !0 }
        ]), this.printer.println("");
      }), this.printer.drawLine(), this.printer.alignCenter(), this.printer.bold(!0), this.printer.setTextSize(1, 1), this.printer.println(`CELKEM: ${this.formatCurrency(t.totalAmount)}`), this.printer.bold(!1), this.printer.setTextNormal(), this.printer.println(""), this.printer.println(""), this.printer.cut(), await this.printer.execute(), { success: !0 };
    } catch (r) {
      return console.error("Print error:", r), {
        success: !1,
        error: r instanceof Error ? r.message : "Unknown error"
      };
    }
  }
  formatCurrency(t) {
    return new Intl.NumberFormat("cs-CZ", {
      style: "currency",
      currency: "CZK"
    }).format(t);
  }
  async testPrinterConnection() {
    try {
      return this.printer ? (this.printer.clear(), this.printer.alignCenter(), this.printer.println("Test připojení RP-330-L"), this.printer.println("IP: 192.168.1.100"), this.printer.println("Tiskárna funguje správně"), this.printer.cut(), await this.printer.execute(), { success: !0, message: "Připojení k RP-330-L úspěšné (192.168.1.100)" }) : { success: !1, message: "Tiskárna není inicializována" };
    } catch (t) {
      return console.error("Printer connection test failed:", t), {
        success: !1,
        message: `Test připojení selhal: ${t instanceof Error ? t.message : "Neznámá chyba"}`
      };
    }
  }
}
new GE();
var ni = { exports: {} };
const jl = ["nodebuffer", "arraybuffer", "fragments"], Vl = typeof Blob < "u";
Vl && jl.push("blob");
var Qt = {
  BINARY_TYPES: jl,
  EMPTY_BUFFER: Buffer.alloc(0),
  GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
  hasBlob: Vl,
  kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
  kListener: Symbol("kListener"),
  kStatusCode: Symbol("status-code"),
  kWebSocket: Symbol("websocket"),
  NOOP: () => {
  }
}, S1 = { exports: {} };
function Kl(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var O1 = { exports: {} }, Z0, b6;
function HE() {
  if (b6) return Z0;
  b6 = 1;
  var e = Ie, t = ne, r = Hn, n = typeof __webpack_require__ == "function" ? __non_webpack_require__ : Kl, i = process.config && process.config.variables || {}, o = !!process.env.PREBUILDS_ONLY, s = process.versions.modules, a = C() ? "electron" : Q() ? "node-webkit" : "node", f = process.env.npm_config_arch || r.arch(), c = process.env.npm_config_platform || r.platform(), l = process.env.LIBC || (q(c) ? "musl" : "glibc"), u = process.env.ARM_VERSION || (f === "arm64" ? "8" : i.arm_version) || "", h = (process.versions.uv || "").split(".")[0];
  Z0 = d;
  function d(F) {
    return n(d.resolve(F));
  }
  d.resolve = d.path = function(F) {
    F = t.resolve(F || ".");
    try {
      var $ = n(t.join(F, "package.json")).name.toUpperCase().replace(/-/g, "_");
      process.env[$ + "_PREBUILD"] && (F = process.env[$ + "_PREBUILD"]);
    } catch {
    }
    if (!o) {
      var W = p(t.join(F, "build/Release"), x);
      if (W) return W;
      var D = p(t.join(F, "build/Debug"), x);
      if (D) return D;
    }
    var I = S(F);
    if (I) return I;
    var N = S(t.dirname(process.execPath));
    if (N) return N;
    var O = [
      "platform=" + c,
      "arch=" + f,
      "runtime=" + a,
      "abi=" + s,
      "uv=" + h,
      u ? "armv=" + u : "",
      "libc=" + l,
      "node=" + process.versions.node,
      process.versions.electron ? "electron=" + process.versions.electron : "",
      typeof __webpack_require__ == "function" ? "webpack=true" : ""
      // eslint-disable-line
    ].filter(Boolean).join(" ");
    throw new Error("No native build was found for " + O + `
    loaded from: ` + F + `
`);
    function S(P) {
      var U = _(t.join(P, "prebuilds")).map(y), k = U.filter(b(c, f)).sort(w)[0];
      if (k) {
        var j = t.join(P, "prebuilds", k.name), z = _(j).map(T), ee = z.filter(L(a, s)), V = ee.sort(H(a))[0];
        if (V) return t.join(j, V.file);
      }
    }
  };
  function _(F) {
    try {
      return e.readdirSync(F);
    } catch {
      return [];
    }
  }
  function p(F, $) {
    var W = _(F).filter($);
    return W[0] && t.join(F, W[0]);
  }
  function x(F) {
    return /\.node$/.test(F);
  }
  function y(F) {
    var $ = F.split("-");
    if ($.length === 2) {
      var W = $[0], D = $[1].split("+");
      if (W && D.length && D.every(Boolean))
        return { name: F, platform: W, architectures: D };
    }
  }
  function b(F, $) {
    return function(W) {
      return W == null || W.platform !== F ? !1 : W.architectures.includes($);
    };
  }
  function w(F, $) {
    return F.architectures.length - $.architectures.length;
  }
  function T(F) {
    var $ = F.split("."), W = $.pop(), D = { file: F, specificity: 0 };
    if (W === "node") {
      for (var I = 0; I < $.length; I++) {
        var N = $[I];
        if (N === "node" || N === "electron" || N === "node-webkit")
          D.runtime = N;
        else if (N === "napi")
          D.napi = !0;
        else if (N.slice(0, 3) === "abi")
          D.abi = N.slice(3);
        else if (N.slice(0, 2) === "uv")
          D.uv = N.slice(2);
        else if (N.slice(0, 4) === "armv")
          D.armv = N.slice(4);
        else if (N === "glibc" || N === "musl")
          D.libc = N;
        else
          continue;
        D.specificity++;
      }
      return D;
    }
  }
  function L(F, $) {
    return function(W) {
      return !(W == null || W.runtime && W.runtime !== F && !G(W) || W.abi && W.abi !== $ && !W.napi || W.uv && W.uv !== h || W.armv && W.armv !== u || W.libc && W.libc !== l);
    };
  }
  function G(F) {
    return F.runtime === "node" && F.napi;
  }
  function H(F) {
    return function($, W) {
      return $.runtime !== W.runtime ? $.runtime === F ? -1 : 1 : $.abi !== W.abi ? $.abi ? -1 : 1 : $.specificity !== W.specificity ? $.specificity > W.specificity ? -1 : 1 : 0;
    };
  }
  function Q() {
    return !!(process.versions && process.versions.nw);
  }
  function C() {
    return process.versions && process.versions.electron || process.env.ELECTRON_RUN_AS_NODE ? !0 : typeof window < "u" && window.process && window.process.type === "renderer";
  }
  function q(F) {
    return F === "linux" && e.existsSync("/etc/alpine-release");
  }
  return d.parseTags = T, d.matchTags = L, d.compareTags = H, d.parseTuple = y, d.matchTuple = b, d.compareTuples = w, Z0;
}
var y6;
function Xl() {
  if (y6) return O1.exports;
  y6 = 1;
  const e = typeof __webpack_require__ == "function" ? __non_webpack_require__ : Kl;
  return typeof e.addon == "function" ? O1.exports = e.addon.bind(e) : O1.exports = HE(), O1.exports;
}
var J0, T6;
function WE() {
  return T6 || (T6 = 1, J0 = { mask: (r, n, i, o, s) => {
    for (var a = 0; a < s; a++)
      i[o + a] = r[a] ^ n[a & 3];
  }, unmask: (r, n) => {
    const i = r.length;
    for (var o = 0; o < i; o++)
      r[o] ^= n[o & 3];
  } }), J0;
}
var v6;
function qE() {
  if (v6) return S1.exports;
  v6 = 1;
  try {
    S1.exports = Xl()(__dirname);
  } catch {
    S1.exports = WE();
  }
  return S1.exports;
}
var jE, VE;
const { EMPTY_BUFFER: KE } = Qt, P2 = Buffer[Symbol.species];
function XE(e, t) {
  if (e.length === 0) return KE;
  if (e.length === 1) return e[0];
  const r = Buffer.allocUnsafe(t);
  let n = 0;
  for (let i = 0; i < e.length; i++) {
    const o = e[i];
    r.set(o, n), n += o.length;
  }
  return n < t ? new P2(r.buffer, r.byteOffset, n) : r;
}
function Yl(e, t, r, n, i) {
  for (let o = 0; o < i; o++)
    r[n + o] = e[o] ^ t[o & 3];
}
function zl(e, t) {
  for (let r = 0; r < e.length; r++)
    e[r] ^= t[r & 3];
}
function YE(e) {
  return e.length === e.buffer.byteLength ? e.buffer : e.buffer.slice(e.byteOffset, e.byteOffset + e.length);
}
function S2(e) {
  if (S2.readOnly = !0, Buffer.isBuffer(e)) return e;
  let t;
  return e instanceof ArrayBuffer ? t = new P2(e) : ArrayBuffer.isView(e) ? t = new P2(e.buffer, e.byteOffset, e.byteLength) : (t = Buffer.from(e), S2.readOnly = !1), t;
}
ni.exports = {
  concat: XE,
  mask: Yl,
  toArrayBuffer: YE,
  toBuffer: S2,
  unmask: zl
};
if (!process.env.WS_NO_BUFFER_UTIL)
  try {
    const e = qE();
    VE = ni.exports.mask = function(t, r, n, i, o) {
      o < 48 ? Yl(t, r, n, i, o) : e.mask(t, r, n, i, o);
    }, jE = ni.exports.unmask = function(t, r) {
      t.length < 32 ? zl(t, r) : e.unmask(t, r);
    };
  } catch {
  }
var Bi = ni.exports;
const A6 = Symbol("kDone"), e2 = Symbol("kRun");
let zE = class {
  /**
   * Creates a new `Limiter`.
   *
   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
   *     to run concurrently
   */
  constructor(t) {
    this[A6] = () => {
      this.pending--, this[e2]();
    }, this.concurrency = t || 1 / 0, this.jobs = [], this.pending = 0;
  }
  /**
   * Adds a job to the queue.
   *
   * @param {Function} job The job to run
   * @public
   */
  add(t) {
    this.jobs.push(t), this[e2]();
  }
  /**
   * Removes a job from the queue and runs it if possible.
   *
   * @private
   */
  [e2]() {
    if (this.pending !== this.concurrency && this.jobs.length) {
      const t = this.jobs.shift();
      this.pending++, t(this[A6]);
    }
  }
};
var QE = zE;
const pn = Vt, w6 = Bi, ZE = QE, { kStatusCode: Ql } = Qt, JE = Buffer[Symbol.species], eg = Buffer.from([0, 0, 255, 255]), ii = Symbol("permessage-deflate"), Ct = Symbol("total-length"), Ur = Symbol("callback"), Dt = Symbol("buffers"), qr = Symbol("error");
let I1, tg = class {
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} [options] Configuration options
   * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
   *     for, or request, a custom client window size
   * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
   *     acknowledge disabling of client context takeover
   * @param {Number} [options.concurrencyLimit=10] The number of concurrent
   *     calls to zlib
   * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
   *     use of a custom server window size
   * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
   *     disabling of server context takeover
   * @param {Number} [options.threshold=1024] Size (in bytes) below which
   *     messages should not be compressed if context takeover is disabled
   * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
   *     deflate
   * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
   *     inflate
   * @param {Boolean} [isServer=false] Create the instance in either server or
   *     client mode
   * @param {Number} [maxPayload=0] The maximum allowed message length
   */
  constructor(t, r, n) {
    if (this._maxPayload = n | 0, this._options = t || {}, this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024, this._isServer = !!r, this._deflate = null, this._inflate = null, this.params = null, !I1) {
      const i = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
      I1 = new ZE(i);
    }
  }
  /**
   * @type {String}
   */
  static get extensionName() {
    return "permessage-deflate";
  }
  /**
   * Create an extension negotiation offer.
   *
   * @return {Object} Extension parameters
   * @public
   */
  offer() {
    const t = {};
    return this._options.serverNoContextTakeover && (t.server_no_context_takeover = !0), this._options.clientNoContextTakeover && (t.client_no_context_takeover = !0), this._options.serverMaxWindowBits && (t.server_max_window_bits = this._options.serverMaxWindowBits), this._options.clientMaxWindowBits ? t.client_max_window_bits = this._options.clientMaxWindowBits : this._options.clientMaxWindowBits == null && (t.client_max_window_bits = !0), t;
  }
  /**
   * Accept an extension negotiation offer/response.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Object} Accepted configuration
   * @public
   */
  accept(t) {
    return t = this.normalizeParams(t), this.params = this._isServer ? this.acceptAsServer(t) : this.acceptAsClient(t), this.params;
  }
  /**
   * Releases all resources used by the extension.
   *
   * @public
   */
  cleanup() {
    if (this._inflate && (this._inflate.close(), this._inflate = null), this._deflate) {
      const t = this._deflate[Ur];
      this._deflate.close(), this._deflate = null, t && t(
        new Error(
          "The deflate stream was closed while data was being processed"
        )
      );
    }
  }
  /**
   *  Accept an extension negotiation offer.
   *
   * @param {Array} offers The extension negotiation offers
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsServer(t) {
    const r = this._options, n = t.find((i) => !(r.serverNoContextTakeover === !1 && i.server_no_context_takeover || i.server_max_window_bits && (r.serverMaxWindowBits === !1 || typeof r.serverMaxWindowBits == "number" && r.serverMaxWindowBits > i.server_max_window_bits) || typeof r.clientMaxWindowBits == "number" && !i.client_max_window_bits));
    if (!n)
      throw new Error("None of the extension offers can be accepted");
    return r.serverNoContextTakeover && (n.server_no_context_takeover = !0), r.clientNoContextTakeover && (n.client_no_context_takeover = !0), typeof r.serverMaxWindowBits == "number" && (n.server_max_window_bits = r.serverMaxWindowBits), typeof r.clientMaxWindowBits == "number" ? n.client_max_window_bits = r.clientMaxWindowBits : (n.client_max_window_bits === !0 || r.clientMaxWindowBits === !1) && delete n.client_max_window_bits, n;
  }
  /**
   * Accept the extension negotiation response.
   *
   * @param {Array} response The extension negotiation response
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsClient(t) {
    const r = t[0];
    if (this._options.clientNoContextTakeover === !1 && r.client_no_context_takeover)
      throw new Error('Unexpected parameter "client_no_context_takeover"');
    if (!r.client_max_window_bits)
      typeof this._options.clientMaxWindowBits == "number" && (r.client_max_window_bits = this._options.clientMaxWindowBits);
    else if (this._options.clientMaxWindowBits === !1 || typeof this._options.clientMaxWindowBits == "number" && r.client_max_window_bits > this._options.clientMaxWindowBits)
      throw new Error(
        'Unexpected or invalid parameter "client_max_window_bits"'
      );
    return r;
  }
  /**
   * Normalize parameters.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Array} The offers/response with normalized parameters
   * @private
   */
  normalizeParams(t) {
    return t.forEach((r) => {
      Object.keys(r).forEach((n) => {
        let i = r[n];
        if (i.length > 1)
          throw new Error(`Parameter "${n}" must have only a single value`);
        if (i = i[0], n === "client_max_window_bits") {
          if (i !== !0) {
            const o = +i;
            if (!Number.isInteger(o) || o < 8 || o > 15)
              throw new TypeError(
                `Invalid value for parameter "${n}": ${i}`
              );
            i = o;
          } else if (!this._isServer)
            throw new TypeError(
              `Invalid value for parameter "${n}": ${i}`
            );
        } else if (n === "server_max_window_bits") {
          const o = +i;
          if (!Number.isInteger(o) || o < 8 || o > 15)
            throw new TypeError(
              `Invalid value for parameter "${n}": ${i}`
            );
          i = o;
        } else if (n === "client_no_context_takeover" || n === "server_no_context_takeover") {
          if (i !== !0)
            throw new TypeError(
              `Invalid value for parameter "${n}": ${i}`
            );
        } else
          throw new Error(`Unknown parameter "${n}"`);
        r[n] = i;
      });
    }), t;
  }
  /**
   * Decompress data. Concurrency limited.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  decompress(t, r, n) {
    I1.add((i) => {
      this._decompress(t, r, (o, s) => {
        i(), n(o, s);
      });
    });
  }
  /**
   * Compress data. Concurrency limited.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  compress(t, r, n) {
    I1.add((i) => {
      this._compress(t, r, (o, s) => {
        i(), n(o, s);
      });
    });
  }
  /**
   * Decompress data.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _decompress(t, r, n) {
    const i = this._isServer ? "client" : "server";
    if (!this._inflate) {
      const o = `${i}_max_window_bits`, s = typeof this.params[o] != "number" ? pn.Z_DEFAULT_WINDOWBITS : this.params[o];
      this._inflate = pn.createInflateRaw({
        ...this._options.zlibInflateOptions,
        windowBits: s
      }), this._inflate[ii] = this, this._inflate[Ct] = 0, this._inflate[Dt] = [], this._inflate.on("error", ng), this._inflate.on("data", Zl);
    }
    this._inflate[Ur] = n, this._inflate.write(t), r && this._inflate.write(eg), this._inflate.flush(() => {
      const o = this._inflate[qr];
      if (o) {
        this._inflate.close(), this._inflate = null, n(o);
        return;
      }
      const s = w6.concat(
        this._inflate[Dt],
        this._inflate[Ct]
      );
      this._inflate._readableState.endEmitted ? (this._inflate.close(), this._inflate = null) : (this._inflate[Ct] = 0, this._inflate[Dt] = [], r && this.params[`${i}_no_context_takeover`] && this._inflate.reset()), n(null, s);
    });
  }
  /**
   * Compress data.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _compress(t, r, n) {
    const i = this._isServer ? "server" : "client";
    if (!this._deflate) {
      const o = `${i}_max_window_bits`, s = typeof this.params[o] != "number" ? pn.Z_DEFAULT_WINDOWBITS : this.params[o];
      this._deflate = pn.createDeflateRaw({
        ...this._options.zlibDeflateOptions,
        windowBits: s
      }), this._deflate[Ct] = 0, this._deflate[Dt] = [], this._deflate.on("data", rg);
    }
    this._deflate[Ur] = n, this._deflate.write(t), this._deflate.flush(pn.Z_SYNC_FLUSH, () => {
      if (!this._deflate)
        return;
      let o = w6.concat(
        this._deflate[Dt],
        this._deflate[Ct]
      );
      r && (o = new JE(o.buffer, o.byteOffset, o.length - 4)), this._deflate[Ur] = null, this._deflate[Ct] = 0, this._deflate[Dt] = [], r && this.params[`${i}_no_context_takeover`] && this._deflate.reset(), n(null, o);
    });
  }
};
var Di = tg;
function rg(e) {
  this[Dt].push(e), this[Ct] += e.length;
}
function Zl(e) {
  if (this[Ct] += e.length, this[ii]._maxPayload < 1 || this[Ct] <= this[ii]._maxPayload) {
    this[Dt].push(e);
    return;
  }
  this[qr] = new RangeError("Max payload size exceeded"), this[qr].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH", this[qr][Ql] = 1009, this.removeListener("data", Zl), this.reset();
}
function ng(e) {
  if (this[ii]._inflate = null, this[qr]) {
    this[Ur](this[qr]);
    return;
  }
  e[Ql] = 1007, this[Ur](e);
}
var oi = { exports: {} }, R1 = { exports: {} }, t2, P6;
function ig() {
  if (P6) return t2;
  P6 = 1;
  function e(t) {
    const r = t.length;
    let n = 0;
    for (; n < r; )
      if (!(t[n] & 128))
        n++;
      else if ((t[n] & 224) === 192) {
        if (n + 1 === r || (t[n + 1] & 192) !== 128 || (t[n] & 254) === 192)
          return !1;
        n += 2;
      } else if ((t[n] & 240) === 224) {
        if (n + 2 >= r || (t[n + 1] & 192) !== 128 || (t[n + 2] & 192) !== 128 || t[n] === 224 && (t[n + 1] & 224) === 128 || // overlong
        t[n] === 237 && (t[n + 1] & 224) === 160)
          return !1;
        n += 3;
      } else if ((t[n] & 248) === 240) {
        if (n + 3 >= r || (t[n + 1] & 192) !== 128 || (t[n + 2] & 192) !== 128 || (t[n + 3] & 192) !== 128 || t[n] === 240 && (t[n + 1] & 240) === 128 || // overlong
        t[n] === 244 && t[n + 1] > 143 || t[n] > 244)
          return !1;
        n += 4;
      } else
        return !1;
    return !0;
  }
  return t2 = e, t2;
}
var S6;
function og() {
  if (S6) return R1.exports;
  S6 = 1;
  try {
    R1.exports = Xl()(__dirname);
  } catch {
    R1.exports = ig();
  }
  return R1.exports;
}
var O6;
const { isUtf8: I6 } = N2, { hasBlob: sg } = Qt, ag = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 0 - 15
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 16 - 31
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  // 32 - 47
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  // 48 - 63
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 64 - 79
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  1,
  1,
  // 80 - 95
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 96 - 111
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  0,
  1,
  0
  // 112 - 127
];
function fg(e) {
  return e >= 1e3 && e <= 1014 && e !== 1004 && e !== 1005 && e !== 1006 || e >= 3e3 && e <= 4999;
}
function O2(e) {
  const t = e.length;
  let r = 0;
  for (; r < t; )
    if (!(e[r] & 128))
      r++;
    else if ((e[r] & 224) === 192) {
      if (r + 1 === t || (e[r + 1] & 192) !== 128 || (e[r] & 254) === 192)
        return !1;
      r += 2;
    } else if ((e[r] & 240) === 224) {
      if (r + 2 >= t || (e[r + 1] & 192) !== 128 || (e[r + 2] & 192) !== 128 || e[r] === 224 && (e[r + 1] & 224) === 128 || // Overlong
      e[r] === 237 && (e[r + 1] & 224) === 160)
        return !1;
      r += 3;
    } else if ((e[r] & 248) === 240) {
      if (r + 3 >= t || (e[r + 1] & 192) !== 128 || (e[r + 2] & 192) !== 128 || (e[r + 3] & 192) !== 128 || e[r] === 240 && (e[r + 1] & 240) === 128 || // Overlong
      e[r] === 244 && e[r + 1] > 143 || e[r] > 244)
        return !1;
      r += 4;
    } else
      return !1;
  return !0;
}
function lg(e) {
  return sg && typeof e == "object" && typeof e.arrayBuffer == "function" && typeof e.type == "string" && typeof e.stream == "function" && (e[Symbol.toStringTag] === "Blob" || e[Symbol.toStringTag] === "File");
}
oi.exports = {
  isBlob: lg,
  isValidStatusCode: fg,
  isValidUTF8: O2,
  tokenChars: ag
};
if (I6)
  O6 = oi.exports.isValidUTF8 = function(e) {
    return e.length < 24 ? O2(e) : I6(e);
  };
else if (!process.env.WS_NO_UTF_8_VALIDATE)
  try {
    const e = og();
    O6 = oi.exports.isValidUTF8 = function(t) {
      return t.length < 32 ? O2(t) : e(t);
    };
  } catch {
  }
var e1 = oi.exports;
const { Writable: cg } = Ve, R6 = Di, {
  BINARY_TYPES: ug,
  EMPTY_BUFFER: B6,
  kStatusCode: hg,
  kWebSocket: dg
} = Qt, { concat: r2, toArrayBuffer: pg, unmask: mg } = Bi, { isValidStatusCode: _g, isValidUTF8: D6 } = e1, B1 = Buffer[Symbol.species], ze = 0, N6 = 1, L6 = 2, F6 = 3, n2 = 4, i2 = 5, D1 = 6;
let xg = class extends cg {
  /**
   * Creates a Receiver instance.
   *
   * @param {Object} [options] Options object
   * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
   *     multiple times in the same tick
   * @param {String} [options.binaryType=nodebuffer] The type for binary data
   * @param {Object} [options.extensions] An object containing the negotiated
   *     extensions
   * @param {Boolean} [options.isServer=false] Specifies whether to operate in
   *     client or server mode
   * @param {Number} [options.maxPayload=0] The maximum allowed message length
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   */
  constructor(t = {}) {
    super(), this._allowSynchronousEvents = t.allowSynchronousEvents !== void 0 ? t.allowSynchronousEvents : !0, this._binaryType = t.binaryType || ug[0], this._extensions = t.extensions || {}, this._isServer = !!t.isServer, this._maxPayload = t.maxPayload | 0, this._skipUTF8Validation = !!t.skipUTF8Validation, this[dg] = void 0, this._bufferedBytes = 0, this._buffers = [], this._compressed = !1, this._payloadLength = 0, this._mask = void 0, this._fragmented = 0, this._masked = !1, this._fin = !1, this._opcode = 0, this._totalPayloadLength = 0, this._messageLength = 0, this._fragments = [], this._errored = !1, this._loop = !1, this._state = ze;
  }
  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   * @private
   */
  _write(t, r, n) {
    if (this._opcode === 8 && this._state == ze) return n();
    this._bufferedBytes += t.length, this._buffers.push(t), this.startLoop(n);
  }
  /**
   * Consumes `n` bytes from the buffered data.
   *
   * @param {Number} n The number of bytes to consume
   * @return {Buffer} The consumed bytes
   * @private
   */
  consume(t) {
    if (this._bufferedBytes -= t, t === this._buffers[0].length) return this._buffers.shift();
    if (t < this._buffers[0].length) {
      const n = this._buffers[0];
      return this._buffers[0] = new B1(
        n.buffer,
        n.byteOffset + t,
        n.length - t
      ), new B1(n.buffer, n.byteOffset, t);
    }
    const r = Buffer.allocUnsafe(t);
    do {
      const n = this._buffers[0], i = r.length - t;
      t >= n.length ? r.set(this._buffers.shift(), i) : (r.set(new Uint8Array(n.buffer, n.byteOffset, t), i), this._buffers[0] = new B1(
        n.buffer,
        n.byteOffset + t,
        n.length - t
      )), t -= n.length;
    } while (t > 0);
    return r;
  }
  /**
   * Starts the parsing loop.
   *
   * @param {Function} cb Callback
   * @private
   */
  startLoop(t) {
    this._loop = !0;
    do
      switch (this._state) {
        case ze:
          this.getInfo(t);
          break;
        case N6:
          this.getPayloadLength16(t);
          break;
        case L6:
          this.getPayloadLength64(t);
          break;
        case F6:
          this.getMask();
          break;
        case n2:
          this.getData(t);
          break;
        case i2:
        case D1:
          this._loop = !1;
          return;
      }
    while (this._loop);
    this._errored || t();
  }
  /**
   * Reads the first two bytes of a frame.
   *
   * @param {Function} cb Callback
   * @private
   */
  getInfo(t) {
    if (this._bufferedBytes < 2) {
      this._loop = !1;
      return;
    }
    const r = this.consume(2);
    if (r[0] & 48) {
      const i = this.createError(
        RangeError,
        "RSV2 and RSV3 must be clear",
        !0,
        1002,
        "WS_ERR_UNEXPECTED_RSV_2_3"
      );
      t(i);
      return;
    }
    const n = (r[0] & 64) === 64;
    if (n && !this._extensions[R6.extensionName]) {
      const i = this.createError(
        RangeError,
        "RSV1 must be clear",
        !0,
        1002,
        "WS_ERR_UNEXPECTED_RSV_1"
      );
      t(i);
      return;
    }
    if (this._fin = (r[0] & 128) === 128, this._opcode = r[0] & 15, this._payloadLength = r[1] & 127, this._opcode === 0) {
      if (n) {
        const i = this.createError(
          RangeError,
          "RSV1 must be clear",
          !0,
          1002,
          "WS_ERR_UNEXPECTED_RSV_1"
        );
        t(i);
        return;
      }
      if (!this._fragmented) {
        const i = this.createError(
          RangeError,
          "invalid opcode 0",
          !0,
          1002,
          "WS_ERR_INVALID_OPCODE"
        );
        t(i);
        return;
      }
      this._opcode = this._fragmented;
    } else if (this._opcode === 1 || this._opcode === 2) {
      if (this._fragmented) {
        const i = this.createError(
          RangeError,
          `invalid opcode ${this._opcode}`,
          !0,
          1002,
          "WS_ERR_INVALID_OPCODE"
        );
        t(i);
        return;
      }
      this._compressed = n;
    } else if (this._opcode > 7 && this._opcode < 11) {
      if (!this._fin) {
        const i = this.createError(
          RangeError,
          "FIN must be set",
          !0,
          1002,
          "WS_ERR_EXPECTED_FIN"
        );
        t(i);
        return;
      }
      if (n) {
        const i = this.createError(
          RangeError,
          "RSV1 must be clear",
          !0,
          1002,
          "WS_ERR_UNEXPECTED_RSV_1"
        );
        t(i);
        return;
      }
      if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
        const i = this.createError(
          RangeError,
          `invalid payload length ${this._payloadLength}`,
          !0,
          1002,
          "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
        );
        t(i);
        return;
      }
    } else {
      const i = this.createError(
        RangeError,
        `invalid opcode ${this._opcode}`,
        !0,
        1002,
        "WS_ERR_INVALID_OPCODE"
      );
      t(i);
      return;
    }
    if (!this._fin && !this._fragmented && (this._fragmented = this._opcode), this._masked = (r[1] & 128) === 128, this._isServer) {
      if (!this._masked) {
        const i = this.createError(
          RangeError,
          "MASK must be set",
          !0,
          1002,
          "WS_ERR_EXPECTED_MASK"
        );
        t(i);
        return;
      }
    } else if (this._masked) {
      const i = this.createError(
        RangeError,
        "MASK must be clear",
        !0,
        1002,
        "WS_ERR_UNEXPECTED_MASK"
      );
      t(i);
      return;
    }
    this._payloadLength === 126 ? this._state = N6 : this._payloadLength === 127 ? this._state = L6 : this.haveLength(t);
  }
  /**
   * Gets extended payload length (7+16).
   *
   * @param {Function} cb Callback
   * @private
   */
  getPayloadLength16(t) {
    if (this._bufferedBytes < 2) {
      this._loop = !1;
      return;
    }
    this._payloadLength = this.consume(2).readUInt16BE(0), this.haveLength(t);
  }
  /**
   * Gets extended payload length (7+64).
   *
   * @param {Function} cb Callback
   * @private
   */
  getPayloadLength64(t) {
    if (this._bufferedBytes < 8) {
      this._loop = !1;
      return;
    }
    const r = this.consume(8), n = r.readUInt32BE(0);
    if (n > Math.pow(2, 21) - 1) {
      const i = this.createError(
        RangeError,
        "Unsupported WebSocket frame: payload length > 2^53 - 1",
        !1,
        1009,
        "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
      );
      t(i);
      return;
    }
    this._payloadLength = n * Math.pow(2, 32) + r.readUInt32BE(4), this.haveLength(t);
  }
  /**
   * Payload length has been read.
   *
   * @param {Function} cb Callback
   * @private
   */
  haveLength(t) {
    if (this._payloadLength && this._opcode < 8 && (this._totalPayloadLength += this._payloadLength, this._totalPayloadLength > this._maxPayload && this._maxPayload > 0)) {
      const r = this.createError(
        RangeError,
        "Max payload size exceeded",
        !1,
        1009,
        "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
      );
      t(r);
      return;
    }
    this._masked ? this._state = F6 : this._state = n2;
  }
  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = !1;
      return;
    }
    this._mask = this.consume(4), this._state = n2;
  }
  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @private
   */
  getData(t) {
    let r = B6;
    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = !1;
        return;
      }
      r = this.consume(this._payloadLength), this._masked && this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3] && mg(r, this._mask);
    }
    if (this._opcode > 7) {
      this.controlMessage(r, t);
      return;
    }
    if (this._compressed) {
      this._state = i2, this.decompress(r, t);
      return;
    }
    r.length && (this._messageLength = this._totalPayloadLength, this._fragments.push(r)), this.dataMessage(t);
  }
  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @param {Function} cb Callback
   * @private
   */
  decompress(t, r) {
    this._extensions[R6.extensionName].decompress(t, this._fin, (i, o) => {
      if (i) return r(i);
      if (o.length) {
        if (this._messageLength += o.length, this._messageLength > this._maxPayload && this._maxPayload > 0) {
          const s = this.createError(
            RangeError,
            "Max payload size exceeded",
            !1,
            1009,
            "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
          );
          r(s);
          return;
        }
        this._fragments.push(o);
      }
      this.dataMessage(r), this._state === ze && this.startLoop(r);
    });
  }
  /**
   * Handles a data message.
   *
   * @param {Function} cb Callback
   * @private
   */
  dataMessage(t) {
    if (!this._fin) {
      this._state = ze;
      return;
    }
    const r = this._messageLength, n = this._fragments;
    if (this._totalPayloadLength = 0, this._messageLength = 0, this._fragmented = 0, this._fragments = [], this._opcode === 2) {
      let i;
      this._binaryType === "nodebuffer" ? i = r2(n, r) : this._binaryType === "arraybuffer" ? i = pg(r2(n, r)) : this._binaryType === "blob" ? i = new Blob(n) : i = n, this._allowSynchronousEvents ? (this.emit("message", i, !0), this._state = ze) : (this._state = D1, setImmediate(() => {
        this.emit("message", i, !0), this._state = ze, this.startLoop(t);
      }));
    } else {
      const i = r2(n, r);
      if (!this._skipUTF8Validation && !D6(i)) {
        const o = this.createError(
          Error,
          "invalid UTF-8 sequence",
          !0,
          1007,
          "WS_ERR_INVALID_UTF8"
        );
        t(o);
        return;
      }
      this._state === i2 || this._allowSynchronousEvents ? (this.emit("message", i, !1), this._state = ze) : (this._state = D1, setImmediate(() => {
        this.emit("message", i, !1), this._state = ze, this.startLoop(t);
      }));
    }
  }
  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  controlMessage(t, r) {
    if (this._opcode === 8) {
      if (t.length === 0)
        this._loop = !1, this.emit("conclude", 1005, B6), this.end();
      else {
        const n = t.readUInt16BE(0);
        if (!_g(n)) {
          const o = this.createError(
            RangeError,
            `invalid status code ${n}`,
            !0,
            1002,
            "WS_ERR_INVALID_CLOSE_CODE"
          );
          r(o);
          return;
        }
        const i = new B1(
          t.buffer,
          t.byteOffset + 2,
          t.length - 2
        );
        if (!this._skipUTF8Validation && !D6(i)) {
          const o = this.createError(
            Error,
            "invalid UTF-8 sequence",
            !0,
            1007,
            "WS_ERR_INVALID_UTF8"
          );
          r(o);
          return;
        }
        this._loop = !1, this.emit("conclude", n, i), this.end();
      }
      this._state = ze;
      return;
    }
    this._allowSynchronousEvents ? (this.emit(this._opcode === 9 ? "ping" : "pong", t), this._state = ze) : (this._state = D1, setImmediate(() => {
      this.emit(this._opcode === 9 ? "ping" : "pong", t), this._state = ze, this.startLoop(r);
    }));
  }
  /**
   * Builds an error object.
   *
   * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
   * @param {String} message The error message
   * @param {Boolean} prefix Specifies whether or not to add a default prefix to
   *     `message`
   * @param {Number} statusCode The status code
   * @param {String} errorCode The exposed error code
   * @return {(Error|RangeError)} The error
   * @private
   */
  createError(t, r, n, i, o) {
    this._loop = !1, this._errored = !0;
    const s = new t(
      n ? `Invalid WebSocket frame: ${r}` : r
    );
    return Error.captureStackTrace(s, this.createError), s.code = o, s[hg] = i, s;
  }
};
var Eg = xg;
const { Duplex: zC } = Ve, { randomFillSync: gg } = jt, $6 = Di, { EMPTY_BUFFER: Cg, kWebSocket: bg, NOOP: yg } = Qt, { isBlob: Ir, isValidStatusCode: Tg } = e1, { mask: U6, toBuffer: ir } = Bi, Qe = Symbol("kByteLength"), vg = Buffer.alloc(4), H1 = 8 * 1024;
let or, Rr = H1;
const nt = 0, Ag = 1, wg = 2;
let Pg = class lr {
  /**
   * Creates a Sender instance.
   *
   * @param {Duplex} socket The connection socket
   * @param {Object} [extensions] An object containing the negotiated extensions
   * @param {Function} [generateMask] The function used to generate the masking
   *     key
   */
  constructor(t, r, n) {
    this._extensions = r || {}, n && (this._generateMask = n, this._maskBuffer = Buffer.alloc(4)), this._socket = t, this._firstFragment = !0, this._compress = !1, this._bufferedBytes = 0, this._queue = [], this._state = nt, this.onerror = yg, this[bg] = void 0;
  }
  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {(Buffer|String)} data The data to frame
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @return {(Buffer|String)[]} The framed data
   * @public
   */
  static frame(t, r) {
    let n, i = !1, o = 2, s = !1;
    r.mask && (n = r.maskBuffer || vg, r.generateMask ? r.generateMask(n) : (Rr === H1 && (or === void 0 && (or = Buffer.alloc(H1)), gg(or, 0, H1), Rr = 0), n[0] = or[Rr++], n[1] = or[Rr++], n[2] = or[Rr++], n[3] = or[Rr++]), s = (n[0] | n[1] | n[2] | n[3]) === 0, o = 6);
    let a;
    typeof t == "string" ? (!r.mask || s) && r[Qe] !== void 0 ? a = r[Qe] : (t = Buffer.from(t), a = t.length) : (a = t.length, i = r.mask && r.readOnly && !s);
    let f = a;
    a >= 65536 ? (o += 8, f = 127) : a > 125 && (o += 2, f = 126);
    const c = Buffer.allocUnsafe(i ? a + o : o);
    return c[0] = r.fin ? r.opcode | 128 : r.opcode, r.rsv1 && (c[0] |= 64), c[1] = f, f === 126 ? c.writeUInt16BE(a, 2) : f === 127 && (c[2] = c[3] = 0, c.writeUIntBE(a, 4, 6)), r.mask ? (c[1] |= 128, c[o - 4] = n[0], c[o - 3] = n[1], c[o - 2] = n[2], c[o - 1] = n[3], s ? [c, t] : i ? (U6(t, n, c, o, a), [c]) : (U6(t, n, t, 0, a), [c, t])) : [c, t];
  }
  /**
   * Sends a close message to the other peer.
   *
   * @param {Number} [code] The status code component of the body
   * @param {(String|Buffer)} [data] The message component of the body
   * @param {Boolean} [mask=false] Specifies whether or not to mask the message
   * @param {Function} [cb] Callback
   * @public
   */
  close(t, r, n, i) {
    let o;
    if (t === void 0)
      o = Cg;
    else {
      if (typeof t != "number" || !Tg(t))
        throw new TypeError("First argument must be a valid error code number");
      if (r === void 0 || !r.length)
        o = Buffer.allocUnsafe(2), o.writeUInt16BE(t, 0);
      else {
        const a = Buffer.byteLength(r);
        if (a > 123)
          throw new RangeError("The message must not be greater than 123 bytes");
        o = Buffer.allocUnsafe(2 + a), o.writeUInt16BE(t, 0), typeof r == "string" ? o.write(r, 2) : o.set(r, 2);
      }
    }
    const s = {
      [Qe]: o.length,
      fin: !0,
      generateMask: this._generateMask,
      mask: n,
      maskBuffer: this._maskBuffer,
      opcode: 8,
      readOnly: !1,
      rsv1: !1
    };
    this._state !== nt ? this.enqueue([this.dispatch, o, !1, s, i]) : this.sendFrame(lr.frame(o, s), i);
  }
  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  ping(t, r, n) {
    let i, o;
    if (typeof t == "string" ? (i = Buffer.byteLength(t), o = !1) : Ir(t) ? (i = t.size, o = !1) : (t = ir(t), i = t.length, o = ir.readOnly), i > 125)
      throw new RangeError("The data size must not be greater than 125 bytes");
    const s = {
      [Qe]: i,
      fin: !0,
      generateMask: this._generateMask,
      mask: r,
      maskBuffer: this._maskBuffer,
      opcode: 9,
      readOnly: o,
      rsv1: !1
    };
    Ir(t) ? this._state !== nt ? this.enqueue([this.getBlobData, t, !1, s, n]) : this.getBlobData(t, !1, s, n) : this._state !== nt ? this.enqueue([this.dispatch, t, !1, s, n]) : this.sendFrame(lr.frame(t, s), n);
  }
  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  pong(t, r, n) {
    let i, o;
    if (typeof t == "string" ? (i = Buffer.byteLength(t), o = !1) : Ir(t) ? (i = t.size, o = !1) : (t = ir(t), i = t.length, o = ir.readOnly), i > 125)
      throw new RangeError("The data size must not be greater than 125 bytes");
    const s = {
      [Qe]: i,
      fin: !0,
      generateMask: this._generateMask,
      mask: r,
      maskBuffer: this._maskBuffer,
      opcode: 10,
      readOnly: o,
      rsv1: !1
    };
    Ir(t) ? this._state !== nt ? this.enqueue([this.getBlobData, t, !1, s, n]) : this.getBlobData(t, !1, s, n) : this._state !== nt ? this.enqueue([this.dispatch, t, !1, s, n]) : this.sendFrame(lr.frame(t, s), n);
  }
  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
   *     or text
   * @param {Boolean} [options.compress=false] Specifies whether or not to
   *     compress `data`
   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Function} [cb] Callback
   * @public
   */
  send(t, r, n) {
    const i = this._extensions[$6.extensionName];
    let o = r.binary ? 2 : 1, s = r.compress, a, f;
    typeof t == "string" ? (a = Buffer.byteLength(t), f = !1) : Ir(t) ? (a = t.size, f = !1) : (t = ir(t), a = t.length, f = ir.readOnly), this._firstFragment ? (this._firstFragment = !1, s && i && i.params[i._isServer ? "server_no_context_takeover" : "client_no_context_takeover"] && (s = a >= i._threshold), this._compress = s) : (s = !1, o = 0), r.fin && (this._firstFragment = !0);
    const c = {
      [Qe]: a,
      fin: r.fin,
      generateMask: this._generateMask,
      mask: r.mask,
      maskBuffer: this._maskBuffer,
      opcode: o,
      readOnly: f,
      rsv1: s
    };
    Ir(t) ? this._state !== nt ? this.enqueue([this.getBlobData, t, this._compress, c, n]) : this.getBlobData(t, this._compress, c, n) : this._state !== nt ? this.enqueue([this.dispatch, t, this._compress, c, n]) : this.dispatch(t, this._compress, c, n);
  }
  /**
   * Gets the contents of a blob as binary data.
   *
   * @param {Blob} blob The blob
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     the data
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  getBlobData(t, r, n, i) {
    this._bufferedBytes += n[Qe], this._state = wg, t.arrayBuffer().then((o) => {
      if (this._socket.destroyed) {
        const a = new Error(
          "The socket was closed while the blob was being read"
        );
        process.nextTick(I2, this, a, i);
        return;
      }
      this._bufferedBytes -= n[Qe];
      const s = ir(o);
      r ? this.dispatch(s, r, n, i) : (this._state = nt, this.sendFrame(lr.frame(s, n), i), this.dequeue());
    }).catch((o) => {
      process.nextTick(Og, this, o, i);
    });
  }
  /**
   * Dispatches a message.
   *
   * @param {(Buffer|String)} data The message to send
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     `data`
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  dispatch(t, r, n, i) {
    if (!r) {
      this.sendFrame(lr.frame(t, n), i);
      return;
    }
    const o = this._extensions[$6.extensionName];
    this._bufferedBytes += n[Qe], this._state = Ag, o.compress(t, n.fin, (s, a) => {
      if (this._socket.destroyed) {
        const f = new Error(
          "The socket was closed while data was being compressed"
        );
        I2(this, f, i);
        return;
      }
      this._bufferedBytes -= n[Qe], this._state = nt, n.readOnly = !1, this.sendFrame(lr.frame(a, n), i), this.dequeue();
    });
  }
  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    for (; this._state === nt && this._queue.length; ) {
      const t = this._queue.shift();
      this._bufferedBytes -= t[3][Qe], Reflect.apply(t[0], this, t.slice(1));
    }
  }
  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(t) {
    this._bufferedBytes += t[3][Qe], this._queue.push(t);
  }
  /**
   * Sends a frame.
   *
   * @param {(Buffer | String)[]} list The frame to send
   * @param {Function} [cb] Callback
   * @private
   */
  sendFrame(t, r) {
    t.length === 2 ? (this._socket.cork(), this._socket.write(t[0]), this._socket.write(t[1], r), this._socket.uncork()) : this._socket.write(t[0], r);
  }
};
var Sg = Pg;
function I2(e, t, r) {
  typeof r == "function" && r(t);
  for (let n = 0; n < e._queue.length; n++) {
    const i = e._queue[n], o = i[i.length - 1];
    typeof o == "function" && o(t);
  }
}
function Og(e, t, r) {
  I2(e, t, r), e.onerror(t);
}
const { kForOnEventAttribute: mn, kListener: o2 } = Qt, k6 = Symbol("kCode"), M6 = Symbol("kData"), G6 = Symbol("kError"), H6 = Symbol("kMessage"), W6 = Symbol("kReason"), kr = Symbol("kTarget"), q6 = Symbol("kType"), j6 = Symbol("kWasClean");
class tn {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @throws {TypeError} If the `type` argument is not specified
   */
  constructor(t) {
    this[kr] = null, this[q6] = t;
  }
  /**
   * @type {*}
   */
  get target() {
    return this[kr];
  }
  /**
   * @type {String}
   */
  get type() {
    return this[q6];
  }
}
Object.defineProperty(tn.prototype, "target", { enumerable: !0 });
Object.defineProperty(tn.prototype, "type", { enumerable: !0 });
class Ni extends tn {
  /**
   * Create a new `CloseEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {Number} [options.code=0] The status code explaining why the
   *     connection was closed
   * @param {String} [options.reason=''] A human-readable string explaining why
   *     the connection was closed
   * @param {Boolean} [options.wasClean=false] Indicates whether or not the
   *     connection was cleanly closed
   */
  constructor(t, r = {}) {
    super(t), this[k6] = r.code === void 0 ? 0 : r.code, this[W6] = r.reason === void 0 ? "" : r.reason, this[j6] = r.wasClean === void 0 ? !1 : r.wasClean;
  }
  /**
   * @type {Number}
   */
  get code() {
    return this[k6];
  }
  /**
   * @type {String}
   */
  get reason() {
    return this[W6];
  }
  /**
   * @type {Boolean}
   */
  get wasClean() {
    return this[j6];
  }
}
Object.defineProperty(Ni.prototype, "code", { enumerable: !0 });
Object.defineProperty(Ni.prototype, "reason", { enumerable: !0 });
Object.defineProperty(Ni.prototype, "wasClean", { enumerable: !0 });
class bo extends tn {
  /**
   * Create a new `ErrorEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.error=null] The error that generated this event
   * @param {String} [options.message=''] The error message
   */
  constructor(t, r = {}) {
    super(t), this[G6] = r.error === void 0 ? null : r.error, this[H6] = r.message === void 0 ? "" : r.message;
  }
  /**
   * @type {*}
   */
  get error() {
    return this[G6];
  }
  /**
   * @type {String}
   */
  get message() {
    return this[H6];
  }
}
Object.defineProperty(bo.prototype, "error", { enumerable: !0 });
Object.defineProperty(bo.prototype, "message", { enumerable: !0 });
class Jl extends tn {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.data=null] The message content
   */
  constructor(t, r = {}) {
    super(t), this[M6] = r.data === void 0 ? null : r.data;
  }
  /**
   * @type {*}
   */
  get data() {
    return this[M6];
  }
}
Object.defineProperty(Jl.prototype, "data", { enumerable: !0 });
const Ig = {
  /**
   * Register an event listener.
   *
   * @param {String} type A string representing the event type to listen for
   * @param {(Function|Object)} handler The listener to add
   * @param {Object} [options] An options object specifies characteristics about
   *     the event listener
   * @param {Boolean} [options.once=false] A `Boolean` indicating that the
   *     listener should be invoked at most once after being added. If `true`,
   *     the listener would be automatically removed when invoked.
   * @public
   */
  addEventListener(e, t, r = {}) {
    for (const i of this.listeners(e))
      if (!r[mn] && i[o2] === t && !i[mn])
        return;
    let n;
    if (e === "message")
      n = function(o, s) {
        const a = new Jl("message", {
          data: s ? o : o.toString()
        });
        a[kr] = this, N1(t, this, a);
      };
    else if (e === "close")
      n = function(o, s) {
        const a = new Ni("close", {
          code: o,
          reason: s.toString(),
          wasClean: this._closeFrameReceived && this._closeFrameSent
        });
        a[kr] = this, N1(t, this, a);
      };
    else if (e === "error")
      n = function(o) {
        const s = new bo("error", {
          error: o,
          message: o.message
        });
        s[kr] = this, N1(t, this, s);
      };
    else if (e === "open")
      n = function() {
        const o = new tn("open");
        o[kr] = this, N1(t, this, o);
      };
    else
      return;
    n[mn] = !!r[mn], n[o2] = t, r.once ? this.once(e, n) : this.on(e, n);
  },
  /**
   * Remove an event listener.
   *
   * @param {String} type A string representing the event type to remove
   * @param {(Function|Object)} handler The listener to remove
   * @public
   */
  removeEventListener(e, t) {
    for (const r of this.listeners(e))
      if (r[o2] === t && !r[mn]) {
        this.removeListener(e, r);
        break;
      }
  }
};
var Rg = {
  EventTarget: Ig
};
function N1(e, t, r) {
  typeof e == "object" && e.handleEvent ? e.handleEvent.call(e, r) : e.call(t, r);
}
const { tokenChars: _n } = e1;
function ct(e, t, r) {
  e[t] === void 0 ? e[t] = [r] : e[t].push(r);
}
function Bg(e) {
  const t = /* @__PURE__ */ Object.create(null);
  let r = /* @__PURE__ */ Object.create(null), n = !1, i = !1, o = !1, s, a, f = -1, c = -1, l = -1, u = 0;
  for (; u < e.length; u++)
    if (c = e.charCodeAt(u), s === void 0)
      if (l === -1 && _n[c] === 1)
        f === -1 && (f = u);
      else if (u !== 0 && (c === 32 || c === 9))
        l === -1 && f !== -1 && (l = u);
      else if (c === 59 || c === 44) {
        if (f === -1)
          throw new SyntaxError(`Unexpected character at index ${u}`);
        l === -1 && (l = u);
        const d = e.slice(f, l);
        c === 44 ? (ct(t, d, r), r = /* @__PURE__ */ Object.create(null)) : s = d, f = l = -1;
      } else
        throw new SyntaxError(`Unexpected character at index ${u}`);
    else if (a === void 0)
      if (l === -1 && _n[c] === 1)
        f === -1 && (f = u);
      else if (c === 32 || c === 9)
        l === -1 && f !== -1 && (l = u);
      else if (c === 59 || c === 44) {
        if (f === -1)
          throw new SyntaxError(`Unexpected character at index ${u}`);
        l === -1 && (l = u), ct(r, e.slice(f, l), !0), c === 44 && (ct(t, s, r), r = /* @__PURE__ */ Object.create(null), s = void 0), f = l = -1;
      } else if (c === 61 && f !== -1 && l === -1)
        a = e.slice(f, u), f = l = -1;
      else
        throw new SyntaxError(`Unexpected character at index ${u}`);
    else if (i) {
      if (_n[c] !== 1)
        throw new SyntaxError(`Unexpected character at index ${u}`);
      f === -1 ? f = u : n || (n = !0), i = !1;
    } else if (o)
      if (_n[c] === 1)
        f === -1 && (f = u);
      else if (c === 34 && f !== -1)
        o = !1, l = u;
      else if (c === 92)
        i = !0;
      else
        throw new SyntaxError(`Unexpected character at index ${u}`);
    else if (c === 34 && e.charCodeAt(u - 1) === 61)
      o = !0;
    else if (l === -1 && _n[c] === 1)
      f === -1 && (f = u);
    else if (f !== -1 && (c === 32 || c === 9))
      l === -1 && (l = u);
    else if (c === 59 || c === 44) {
      if (f === -1)
        throw new SyntaxError(`Unexpected character at index ${u}`);
      l === -1 && (l = u);
      let d = e.slice(f, l);
      n && (d = d.replace(/\\/g, ""), n = !1), ct(r, a, d), c === 44 && (ct(t, s, r), r = /* @__PURE__ */ Object.create(null), s = void 0), a = void 0, f = l = -1;
    } else
      throw new SyntaxError(`Unexpected character at index ${u}`);
  if (f === -1 || o || c === 32 || c === 9)
    throw new SyntaxError("Unexpected end of input");
  l === -1 && (l = u);
  const h = e.slice(f, l);
  return s === void 0 ? ct(t, h, r) : (a === void 0 ? ct(r, h, !0) : n ? ct(r, a, h.replace(/\\/g, "")) : ct(r, a, h), ct(t, s, r)), t;
}
function Dg(e) {
  return Object.keys(e).map((t) => {
    let r = e[t];
    return Array.isArray(r) || (r = [r]), r.map((n) => [t].concat(
      Object.keys(n).map((i) => {
        let o = n[i];
        return Array.isArray(o) || (o = [o]), o.map((s) => s === !0 ? i : `${i}=${s}`).join("; ");
      })
    ).join("; ")).join(", ");
  }).join(", ");
}
var ec = { format: Dg, parse: Bg };
const Ng = fi, Lg = bu, Fg = D2, tc = i5, $g = yu, { randomBytes: Ug, createHash: kg } = jt, { Duplex: QC, Readable: ZC } = Ve, { URL: s2 } = xr, Lt = Di, Mg = Eg, Gg = Sg, { isBlob: Hg } = e1, {
  BINARY_TYPES: V6,
  EMPTY_BUFFER: L1,
  GUID: Wg,
  kForOnEventAttribute: a2,
  kListener: qg,
  kStatusCode: jg,
  kWebSocket: xe,
  NOOP: rc
} = Qt, {
  EventTarget: { addEventListener: Vg, removeEventListener: Kg }
} = Rg, { format: Xg, parse: Yg } = ec, { toBuffer: zg } = Bi, Qg = 30 * 1e3, nc = Symbol("kAborted"), f2 = [8, 13], vt = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"], Zg = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
let ce = class le extends Ng {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(t, r, n) {
    super(), this._binaryType = V6[0], this._closeCode = 1006, this._closeFrameReceived = !1, this._closeFrameSent = !1, this._closeMessage = L1, this._closeTimer = null, this._errorEmitted = !1, this._extensions = {}, this._paused = !1, this._protocol = "", this._readyState = le.CONNECTING, this._receiver = null, this._sender = null, this._socket = null, t !== null ? (this._bufferedAmount = 0, this._isServer = !1, this._redirects = 0, r === void 0 ? r = [] : Array.isArray(r) || (typeof r == "object" && r !== null ? (n = r, r = []) : r = [r]), ic(this, t, r, n)) : (this._autoPong = n.autoPong, this._isServer = !0);
  }
  /**
   * For historical reasons, the custom "nodebuffer" type is used by the default
   * instead of "blob".
   *
   * @type {String}
   */
  get binaryType() {
    return this._binaryType;
  }
  set binaryType(t) {
    V6.includes(t) && (this._binaryType = t, this._receiver && (this._receiver._binaryType = t));
  }
  /**
   * @type {Number}
   */
  get bufferedAmount() {
    return this._socket ? this._socket._writableState.length + this._sender._bufferedBytes : this._bufferedAmount;
  }
  /**
   * @type {String}
   */
  get extensions() {
    return Object.keys(this._extensions).join();
  }
  /**
   * @type {Boolean}
   */
  get isPaused() {
    return this._paused;
  }
  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onclose() {
    return null;
  }
  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onerror() {
    return null;
  }
  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onopen() {
    return null;
  }
  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onmessage() {
    return null;
  }
  /**
   * @type {String}
   */
  get protocol() {
    return this._protocol;
  }
  /**
   * @type {Number}
   */
  get readyState() {
    return this._readyState;
  }
  /**
   * @type {String}
   */
  get url() {
    return this._url;
  }
  /**
   * Set up the socket and the internal resources.
   *
   * @param {Duplex} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Object} options Options object
   * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
   *     multiple times in the same tick
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Number} [options.maxPayload=0] The maximum allowed message size
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @private
   */
  setSocket(t, r, n) {
    const i = new Mg({
      allowSynchronousEvents: n.allowSynchronousEvents,
      binaryType: this.binaryType,
      extensions: this._extensions,
      isServer: this._isServer,
      maxPayload: n.maxPayload,
      skipUTF8Validation: n.skipUTF8Validation
    }), o = new Gg(t, this._extensions, n.generateMask);
    this._receiver = i, this._sender = o, this._socket = t, i[xe] = this, o[xe] = this, t[xe] = this, i.on("conclude", rC), i.on("drain", nC), i.on("error", iC), i.on("message", oC), i.on("ping", sC), i.on("pong", aC), o.onerror = fC, t.setTimeout && t.setTimeout(0), t.setNoDelay && t.setNoDelay(), r.length > 0 && t.unshift(r), t.on("close", ac), t.on("data", Li), t.on("end", fc), t.on("error", lc), this._readyState = le.OPEN, this.emit("open");
  }
  /**
   * Emit the `'close'` event.
   *
   * @private
   */
  emitClose() {
    if (!this._socket) {
      this._readyState = le.CLOSED, this.emit("close", this._closeCode, this._closeMessage);
      return;
    }
    this._extensions[Lt.extensionName] && this._extensions[Lt.extensionName].cleanup(), this._receiver.removeAllListeners(), this._readyState = le.CLOSED, this.emit("close", this._closeCode, this._closeMessage);
  }
  /**
   * Start a closing handshake.
   *
   *          +----------+   +-----------+   +----------+
   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
   *    |     +----------+   +-----------+   +----------+     |
   *          +----------+   +-----------+         |
   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
   *          +----------+   +-----------+   |
   *    |           |                        |   +---+        |
   *                +------------------------+-->|fin| - - - -
   *    |         +---+                      |   +---+
   *     - - - - -|fin|<---------------------+
   *              +---+
   *
   * @param {Number} [code] Status code explaining why the connection is closing
   * @param {(String|Buffer)} [data] The reason why the connection is
   *     closing
   * @public
   */
  close(t, r) {
    if (this.readyState !== le.CLOSED) {
      if (this.readyState === le.CONNECTING) {
        je(this, this._req, "WebSocket was closed before the connection was established");
        return;
      }
      if (this.readyState === le.CLOSING) {
        this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end();
        return;
      }
      this._readyState = le.CLOSING, this._sender.close(t, r, !this._isServer, (n) => {
        n || (this._closeFrameSent = !0, (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end());
      }), sc(this);
    }
  }
  /**
   * Pause the socket.
   *
   * @public
   */
  pause() {
    this.readyState === le.CONNECTING || this.readyState === le.CLOSED || (this._paused = !0, this._socket.pause());
  }
  /**
   * Send a ping.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the ping is sent
   * @public
   */
  ping(t, r, n) {
    if (this.readyState === le.CONNECTING)
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    if (typeof t == "function" ? (n = t, t = r = void 0) : typeof r == "function" && (n = r, r = void 0), typeof t == "number" && (t = t.toString()), this.readyState !== le.OPEN) {
      l2(this, t, n);
      return;
    }
    r === void 0 && (r = !this._isServer), this._sender.ping(t || L1, r, n);
  }
  /**
   * Send a pong.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the pong is sent
   * @public
   */
  pong(t, r, n) {
    if (this.readyState === le.CONNECTING)
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    if (typeof t == "function" ? (n = t, t = r = void 0) : typeof r == "function" && (n = r, r = void 0), typeof t == "number" && (t = t.toString()), this.readyState !== le.OPEN) {
      l2(this, t, n);
      return;
    }
    r === void 0 && (r = !this._isServer), this._sender.pong(t || L1, r, n);
  }
  /**
   * Resume the socket.
   *
   * @public
   */
  resume() {
    this.readyState === le.CONNECTING || this.readyState === le.CLOSED || (this._paused = !1, this._receiver._writableState.needDrain || this._socket.resume());
  }
  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} [options] Options object
   * @param {Boolean} [options.binary] Specifies whether `data` is binary or
   *     text
   * @param {Boolean} [options.compress] Specifies whether or not to compress
   *     `data`
   * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when data is written out
   * @public
   */
  send(t, r, n) {
    if (this.readyState === le.CONNECTING)
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    if (typeof r == "function" && (n = r, r = {}), typeof t == "number" && (t = t.toString()), this.readyState !== le.OPEN) {
      l2(this, t, n);
      return;
    }
    const i = {
      binary: typeof t != "string",
      mask: !this._isServer,
      compress: !0,
      fin: !0,
      ...r
    };
    this._extensions[Lt.extensionName] || (i.compress = !1), this._sender.send(t || L1, i, n);
  }
  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState !== le.CLOSED) {
      if (this.readyState === le.CONNECTING) {
        je(this, this._req, "WebSocket was closed before the connection was established");
        return;
      }
      this._socket && (this._readyState = le.CLOSING, this._socket.destroy());
    }
  }
};
Object.defineProperty(ce, "CONNECTING", {
  enumerable: !0,
  value: vt.indexOf("CONNECTING")
});
Object.defineProperty(ce.prototype, "CONNECTING", {
  enumerable: !0,
  value: vt.indexOf("CONNECTING")
});
Object.defineProperty(ce, "OPEN", {
  enumerable: !0,
  value: vt.indexOf("OPEN")
});
Object.defineProperty(ce.prototype, "OPEN", {
  enumerable: !0,
  value: vt.indexOf("OPEN")
});
Object.defineProperty(ce, "CLOSING", {
  enumerable: !0,
  value: vt.indexOf("CLOSING")
});
Object.defineProperty(ce.prototype, "CLOSING", {
  enumerable: !0,
  value: vt.indexOf("CLOSING")
});
Object.defineProperty(ce, "CLOSED", {
  enumerable: !0,
  value: vt.indexOf("CLOSED")
});
Object.defineProperty(ce.prototype, "CLOSED", {
  enumerable: !0,
  value: vt.indexOf("CLOSED")
});
[
  "binaryType",
  "bufferedAmount",
  "extensions",
  "isPaused",
  "protocol",
  "readyState",
  "url"
].forEach((e) => {
  Object.defineProperty(ce.prototype, e, { enumerable: !0 });
});
["open", "error", "close", "message"].forEach((e) => {
  Object.defineProperty(ce.prototype, `on${e}`, {
    enumerable: !0,
    get() {
      for (const t of this.listeners(e))
        if (t[a2]) return t[qg];
      return null;
    },
    set(t) {
      for (const r of this.listeners(e))
        if (r[a2]) {
          this.removeListener(e, r);
          break;
        }
      typeof t == "function" && this.addEventListener(e, t, {
        [a2]: !0
      });
    }
  });
});
ce.prototype.addEventListener = Vg;
ce.prototype.removeEventListener = Kg;
var Jg = ce;
function ic(e, t, r, n) {
  const i = {
    allowSynchronousEvents: !0,
    autoPong: !0,
    protocolVersion: f2[1],
    maxPayload: 104857600,
    skipUTF8Validation: !1,
    perMessageDeflate: !0,
    followRedirects: !1,
    maxRedirects: 10,
    ...n,
    socketPath: void 0,
    hostname: void 0,
    protocol: void 0,
    timeout: void 0,
    method: "GET",
    host: void 0,
    path: void 0,
    port: void 0
  };
  if (e._autoPong = i.autoPong, !f2.includes(i.protocolVersion))
    throw new RangeError(
      `Unsupported protocol version: ${i.protocolVersion} (supported versions: ${f2.join(", ")})`
    );
  let o;
  if (t instanceof s2)
    o = t;
  else
    try {
      o = new s2(t);
    } catch {
      throw new SyntaxError(`Invalid URL: ${t}`);
    }
  o.protocol === "http:" ? o.protocol = "ws:" : o.protocol === "https:" && (o.protocol = "wss:"), e._url = o.href;
  const s = o.protocol === "wss:", a = o.protocol === "ws+unix:";
  let f;
  if (o.protocol !== "ws:" && !s && !a ? f = `The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"` : a && !o.pathname ? f = "The URL's pathname is empty" : o.hash && (f = "The URL contains a fragment identifier"), f) {
    const p = new SyntaxError(f);
    if (e._redirects === 0)
      throw p;
    W1(e, p);
    return;
  }
  const c = s ? 443 : 80, l = Ug(16).toString("base64"), u = s ? Lg.request : Fg.request, h = /* @__PURE__ */ new Set();
  let d;
  if (i.createConnection = i.createConnection || (s ? tC : eC), i.defaultPort = i.defaultPort || c, i.port = o.port || c, i.host = o.hostname.startsWith("[") ? o.hostname.slice(1, -1) : o.hostname, i.headers = {
    ...i.headers,
    "Sec-WebSocket-Version": i.protocolVersion,
    "Sec-WebSocket-Key": l,
    Connection: "Upgrade",
    Upgrade: "websocket"
  }, i.path = o.pathname + o.search, i.timeout = i.handshakeTimeout, i.perMessageDeflate && (d = new Lt(
    i.perMessageDeflate !== !0 ? i.perMessageDeflate : {},
    !1,
    i.maxPayload
  ), i.headers["Sec-WebSocket-Extensions"] = Xg({
    [Lt.extensionName]: d.offer()
  })), r.length) {
    for (const p of r) {
      if (typeof p != "string" || !Zg.test(p) || h.has(p))
        throw new SyntaxError(
          "An invalid or duplicated subprotocol was specified"
        );
      h.add(p);
    }
    i.headers["Sec-WebSocket-Protocol"] = r.join(",");
  }
  if (i.origin && (i.protocolVersion < 13 ? i.headers["Sec-WebSocket-Origin"] = i.origin : i.headers.Origin = i.origin), (o.username || o.password) && (i.auth = `${o.username}:${o.password}`), a) {
    const p = i.path.split(":");
    i.socketPath = p[0], i.path = p[1];
  }
  let _;
  if (i.followRedirects) {
    if (e._redirects === 0) {
      e._originalIpc = a, e._originalSecure = s, e._originalHostOrSocketPath = a ? i.socketPath : o.host;
      const p = n && n.headers;
      if (n = { ...n, headers: {} }, p)
        for (const [x, y] of Object.entries(p))
          n.headers[x.toLowerCase()] = y;
    } else if (e.listenerCount("redirect") === 0) {
      const p = a ? e._originalIpc ? i.socketPath === e._originalHostOrSocketPath : !1 : e._originalIpc ? !1 : o.host === e._originalHostOrSocketPath;
      (!p || e._originalSecure && !s) && (delete i.headers.authorization, delete i.headers.cookie, p || delete i.headers.host, i.auth = void 0);
    }
    i.auth && !n.headers.authorization && (n.headers.authorization = "Basic " + Buffer.from(i.auth).toString("base64")), _ = e._req = u(i), e._redirects && e.emit("redirect", e.url, _);
  } else
    _ = e._req = u(i);
  i.timeout && _.on("timeout", () => {
    je(e, _, "Opening handshake has timed out");
  }), _.on("error", (p) => {
    _ === null || _[nc] || (_ = e._req = null, W1(e, p));
  }), _.on("response", (p) => {
    const x = p.headers.location, y = p.statusCode;
    if (x && i.followRedirects && y >= 300 && y < 400) {
      if (++e._redirects > i.maxRedirects) {
        je(e, _, "Maximum redirects exceeded");
        return;
      }
      _.abort();
      let b;
      try {
        b = new s2(x, t);
      } catch {
        const T = new SyntaxError(`Invalid URL: ${x}`);
        W1(e, T);
        return;
      }
      ic(e, b, r, n);
    } else e.emit("unexpected-response", _, p) || je(
      e,
      _,
      `Unexpected server response: ${p.statusCode}`
    );
  }), _.on("upgrade", (p, x, y) => {
    if (e.emit("upgrade", p), e.readyState !== ce.CONNECTING) return;
    _ = e._req = null;
    const b = p.headers.upgrade;
    if (b === void 0 || b.toLowerCase() !== "websocket") {
      je(e, x, "Invalid Upgrade header");
      return;
    }
    const w = kg("sha1").update(l + Wg).digest("base64");
    if (p.headers["sec-websocket-accept"] !== w) {
      je(e, x, "Invalid Sec-WebSocket-Accept header");
      return;
    }
    const T = p.headers["sec-websocket-protocol"];
    let L;
    if (T !== void 0 ? h.size ? h.has(T) || (L = "Server sent an invalid subprotocol") : L = "Server sent a subprotocol but none was requested" : h.size && (L = "Server sent no subprotocol"), L) {
      je(e, x, L);
      return;
    }
    T && (e._protocol = T);
    const G = p.headers["sec-websocket-extensions"];
    if (G !== void 0) {
      if (!d) {
        je(e, x, "Server sent a Sec-WebSocket-Extensions header but no extension was requested");
        return;
      }
      let H;
      try {
        H = Yg(G);
      } catch {
        je(e, x, "Invalid Sec-WebSocket-Extensions header");
        return;
      }
      const Q = Object.keys(H);
      if (Q.length !== 1 || Q[0] !== Lt.extensionName) {
        je(e, x, "Server indicated an extension that was not requested");
        return;
      }
      try {
        d.accept(H[Lt.extensionName]);
      } catch {
        je(e, x, "Invalid Sec-WebSocket-Extensions header");
        return;
      }
      e._extensions[Lt.extensionName] = d;
    }
    e.setSocket(x, y, {
      allowSynchronousEvents: i.allowSynchronousEvents,
      generateMask: i.generateMask,
      maxPayload: i.maxPayload,
      skipUTF8Validation: i.skipUTF8Validation
    });
  }), i.finishRequest ? i.finishRequest(_, e) : _.end();
}
function W1(e, t) {
  e._readyState = ce.CLOSING, e._errorEmitted = !0, e.emit("error", t), e.emitClose();
}
function eC(e) {
  return e.path = e.socketPath, tc.connect(e);
}
function tC(e) {
  return e.path = void 0, !e.servername && e.servername !== "" && (e.servername = tc.isIP(e.host) ? "" : e.host), $g.connect(e);
}
function je(e, t, r) {
  e._readyState = ce.CLOSING;
  const n = new Error(r);
  Error.captureStackTrace(n, je), t.setHeader ? (t[nc] = !0, t.abort(), t.socket && !t.socket.destroyed && t.socket.destroy(), process.nextTick(W1, e, n)) : (t.destroy(n), t.once("error", e.emit.bind(e, "error")), t.once("close", e.emitClose.bind(e)));
}
function l2(e, t, r) {
  if (t) {
    const n = Hg(t) ? t.size : zg(t).length;
    e._socket ? e._sender._bufferedBytes += n : e._bufferedAmount += n;
  }
  if (r) {
    const n = new Error(
      `WebSocket is not open: readyState ${e.readyState} (${vt[e.readyState]})`
    );
    process.nextTick(r, n);
  }
}
function rC(e, t) {
  const r = this[xe];
  r._closeFrameReceived = !0, r._closeMessage = t, r._closeCode = e, r._socket[xe] !== void 0 && (r._socket.removeListener("data", Li), process.nextTick(oc, r._socket), e === 1005 ? r.close() : r.close(e, t));
}
function nC() {
  const e = this[xe];
  e.isPaused || e._socket.resume();
}
function iC(e) {
  const t = this[xe];
  t._socket[xe] !== void 0 && (t._socket.removeListener("data", Li), process.nextTick(oc, t._socket), t.close(e[jg])), t._errorEmitted || (t._errorEmitted = !0, t.emit("error", e));
}
function K6() {
  this[xe].emitClose();
}
function oC(e, t) {
  this[xe].emit("message", e, t);
}
function sC(e) {
  const t = this[xe];
  t._autoPong && t.pong(e, !this._isServer, rc), t.emit("ping", e);
}
function aC(e) {
  this[xe].emit("pong", e);
}
function oc(e) {
  e.resume();
}
function fC(e) {
  const t = this[xe];
  t.readyState !== ce.CLOSED && (t.readyState === ce.OPEN && (t._readyState = ce.CLOSING, sc(t)), this._socket.end(), t._errorEmitted || (t._errorEmitted = !0, t.emit("error", e)));
}
function sc(e) {
  e._closeTimer = setTimeout(
    e._socket.destroy.bind(e._socket),
    Qg
  );
}
function ac() {
  const e = this[xe];
  this.removeListener("close", ac), this.removeListener("data", Li), this.removeListener("end", fc), e._readyState = ce.CLOSING;
  let t;
  !this._readableState.endEmitted && !e._closeFrameReceived && !e._receiver._writableState.errorEmitted && (t = e._socket.read()) !== null && e._receiver.write(t), e._receiver.end(), this[xe] = void 0, clearTimeout(e._closeTimer), e._receiver._writableState.finished || e._receiver._writableState.errorEmitted ? e.emitClose() : (e._receiver.on("error", K6), e._receiver.on("finish", K6));
}
function Li(e) {
  this[xe]._receiver.write(e) || this.pause();
}
function fc() {
  const e = this[xe];
  e._readyState = ce.CLOSING, e._receiver.end(), this.end();
}
function lc() {
  const e = this[xe];
  this.removeListener("error", lc), this.on("error", rc), e && (e._readyState = ce.CLOSING, this.destroy());
}
const { Duplex: JC } = Ve, { tokenChars: lC } = e1;
function cC(e) {
  const t = /* @__PURE__ */ new Set();
  let r = -1, n = -1, i = 0;
  for (i; i < e.length; i++) {
    const s = e.charCodeAt(i);
    if (n === -1 && lC[s] === 1)
      r === -1 && (r = i);
    else if (i !== 0 && (s === 32 || s === 9))
      n === -1 && r !== -1 && (n = i);
    else if (s === 44) {
      if (r === -1)
        throw new SyntaxError(`Unexpected character at index ${i}`);
      n === -1 && (n = i);
      const a = e.slice(r, n);
      if (t.has(a))
        throw new SyntaxError(`The "${a}" subprotocol is duplicated`);
      t.add(a), r = n = -1;
    } else
      throw new SyntaxError(`Unexpected character at index ${i}`);
  }
  if (r === -1 || n !== -1)
    throw new SyntaxError("Unexpected end of input");
  const o = e.slice(r, i);
  if (t.has(o))
    throw new SyntaxError(`The "${o}" subprotocol is duplicated`);
  return t.add(o), t;
}
var uC = { parse: cC };
const hC = fi, si = D2, { Duplex: eb } = Ve, { createHash: dC } = jt, X6 = ec, sr = Di, pC = uC, mC = Jg, { GUID: _C, kWebSocket: xC } = Qt, EC = /^[+/0-9A-Za-z]{22}==$/, Y6 = 0, z6 = 1, cc = 2;
class gC extends hC {
  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
   *     multiple times in the same tick
   * @param {Boolean} [options.autoPong=true] Specifies whether or not to
   *     automatically send a pong in response to a ping
   * @param {Number} [options.backlog=511] The maximum length of the queue of
   *     pending connections
   * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
   *     track clients
   * @param {Function} [options.handleProtocols] A hook to handle protocols
   * @param {String} [options.host] The hostname where to bind the server
   * @param {Number} [options.maxPayload=104857600] The maximum allowed message
   *     size
   * @param {Boolean} [options.noServer=false] Enable no server mode
   * @param {String} [options.path] Accept only connections matching this path
   * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
   *     permessage-deflate
   * @param {Number} [options.port] The port where to bind the server
   * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
   *     server to use
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @param {Function} [options.verifyClient] A hook to reject connections
   * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
   *     class to use. It must be the `WebSocket` class or class that extends it
   * @param {Function} [callback] A listener for the `listening` event
   */
  constructor(t, r) {
    if (super(), t = {
      allowSynchronousEvents: !0,
      autoPong: !0,
      maxPayload: 100 * 1024 * 1024,
      skipUTF8Validation: !1,
      perMessageDeflate: !1,
      handleProtocols: null,
      clientTracking: !0,
      verifyClient: null,
      noServer: !1,
      backlog: null,
      // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null,
      WebSocket: mC,
      ...t
    }, t.port == null && !t.server && !t.noServer || t.port != null && (t.server || t.noServer) || t.server && t.noServer)
      throw new TypeError(
        'One and only one of the "port", "server", or "noServer" options must be specified'
      );
    if (t.port != null ? (this._server = si.createServer((n, i) => {
      const o = si.STATUS_CODES[426];
      i.writeHead(426, {
        "Content-Length": o.length,
        "Content-Type": "text/plain"
      }), i.end(o);
    }), this._server.listen(
      t.port,
      t.host,
      t.backlog,
      r
    )) : t.server && (this._server = t.server), this._server) {
      const n = this.emit.bind(this, "connection");
      this._removeListeners = bC(this._server, {
        listening: this.emit.bind(this, "listening"),
        error: this.emit.bind(this, "error"),
        upgrade: (i, o, s) => {
          this.handleUpgrade(i, o, s, n);
        }
      });
    }
    t.perMessageDeflate === !0 && (t.perMessageDeflate = {}), t.clientTracking && (this.clients = /* @__PURE__ */ new Set(), this._shouldEmitClose = !1), this.options = t, this._state = Y6;
  }
  /**
   * Returns the bound address, the address family name, and port of the server
   * as reported by the operating system if listening on an IP socket.
   * If the server is listening on a pipe or UNIX domain socket, the name is
   * returned as a string.
   *
   * @return {(Object|String|null)} The address of the server
   * @public
   */
  address() {
    if (this.options.noServer)
      throw new Error('The server is operating in "noServer" mode');
    return this._server ? this._server.address() : null;
  }
  /**
   * Stop the server from accepting new connections and emit the `'close'` event
   * when all existing connections are closed.
   *
   * @param {Function} [cb] A one-time listener for the `'close'` event
   * @public
   */
  close(t) {
    if (this._state === cc) {
      t && this.once("close", () => {
        t(new Error("The server is not running"));
      }), process.nextTick(xn, this);
      return;
    }
    if (t && this.once("close", t), this._state !== z6)
      if (this._state = z6, this.options.noServer || this.options.server)
        this._server && (this._removeListeners(), this._removeListeners = this._server = null), this.clients ? this.clients.size ? this._shouldEmitClose = !0 : process.nextTick(xn, this) : process.nextTick(xn, this);
      else {
        const r = this._server;
        this._removeListeners(), this._removeListeners = this._server = null, r.close(() => {
          xn(this);
        });
      }
  }
  /**
   * See if a given request should be handled by this server instance.
   *
   * @param {http.IncomingMessage} req Request object to inspect
   * @return {Boolean} `true` if the request is valid, else `false`
   * @public
   */
  shouldHandle(t) {
    if (this.options.path) {
      const r = t.url.indexOf("?");
      if ((r !== -1 ? t.url.slice(0, r) : t.url) !== this.options.path) return !1;
    }
    return !0;
  }
  /**
   * Handle a HTTP Upgrade request.
   *
   * @param {http.IncomingMessage} req The request object
   * @param {Duplex} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */
  handleUpgrade(t, r, n, i) {
    r.on("error", Q6);
    const o = t.headers["sec-websocket-key"], s = t.headers.upgrade, a = +t.headers["sec-websocket-version"];
    if (t.method !== "GET") {
      cr(this, t, r, 405, "Invalid HTTP method");
      return;
    }
    if (s === void 0 || s.toLowerCase() !== "websocket") {
      cr(this, t, r, 400, "Invalid Upgrade header");
      return;
    }
    if (o === void 0 || !EC.test(o)) {
      cr(this, t, r, 400, "Missing or invalid Sec-WebSocket-Key header");
      return;
    }
    if (a !== 13 && a !== 8) {
      cr(this, t, r, 400, "Missing or invalid Sec-WebSocket-Version header", {
        "Sec-WebSocket-Version": "13, 8"
      });
      return;
    }
    if (!this.shouldHandle(t)) {
      Cn(r, 400);
      return;
    }
    const f = t.headers["sec-websocket-protocol"];
    let c = /* @__PURE__ */ new Set();
    if (f !== void 0)
      try {
        c = pC.parse(f);
      } catch {
        cr(this, t, r, 400, "Invalid Sec-WebSocket-Protocol header");
        return;
      }
    const l = t.headers["sec-websocket-extensions"], u = {};
    if (this.options.perMessageDeflate && l !== void 0) {
      const h = new sr(
        this.options.perMessageDeflate,
        !0,
        this.options.maxPayload
      );
      try {
        const d = X6.parse(l);
        d[sr.extensionName] && (h.accept(d[sr.extensionName]), u[sr.extensionName] = h);
      } catch {
        cr(this, t, r, 400, "Invalid or unacceptable Sec-WebSocket-Extensions header");
        return;
      }
    }
    if (this.options.verifyClient) {
      const h = {
        origin: t.headers[`${a === 8 ? "sec-websocket-origin" : "origin"}`],
        secure: !!(t.socket.authorized || t.socket.encrypted),
        req: t
      };
      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(h, (d, _, p, x) => {
          if (!d)
            return Cn(r, _ || 401, p, x);
          this.completeUpgrade(
            u,
            o,
            c,
            t,
            r,
            n,
            i
          );
        });
        return;
      }
      if (!this.options.verifyClient(h)) return Cn(r, 401);
    }
    this.completeUpgrade(u, o, c, t, r, n, i);
  }
  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {Object} extensions The accepted extensions
   * @param {String} key The value of the `Sec-WebSocket-Key` header
   * @param {Set} protocols The subprotocols
   * @param {http.IncomingMessage} req The request object
   * @param {Duplex} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @throws {Error} If called more than once with the same socket
   * @private
   */
  completeUpgrade(t, r, n, i, o, s, a) {
    if (!o.readable || !o.writable) return o.destroy();
    if (o[xC])
      throw new Error(
        "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
      );
    if (this._state > Y6) return Cn(o, 503);
    const c = [
      "HTTP/1.1 101 Switching Protocols",
      "Upgrade: websocket",
      "Connection: Upgrade",
      `Sec-WebSocket-Accept: ${dC("sha1").update(r + _C).digest("base64")}`
    ], l = new this.options.WebSocket(null, void 0, this.options);
    if (n.size) {
      const u = this.options.handleProtocols ? this.options.handleProtocols(n, i) : n.values().next().value;
      u && (c.push(`Sec-WebSocket-Protocol: ${u}`), l._protocol = u);
    }
    if (t[sr.extensionName]) {
      const u = t[sr.extensionName].params, h = X6.format({
        [sr.extensionName]: [u]
      });
      c.push(`Sec-WebSocket-Extensions: ${h}`), l._extensions = t;
    }
    this.emit("headers", c, i), o.write(c.concat(`\r
`).join(`\r
`)), o.removeListener("error", Q6), l.setSocket(o, s, {
      allowSynchronousEvents: this.options.allowSynchronousEvents,
      maxPayload: this.options.maxPayload,
      skipUTF8Validation: this.options.skipUTF8Validation
    }), this.clients && (this.clients.add(l), l.on("close", () => {
      this.clients.delete(l), this._shouldEmitClose && !this.clients.size && process.nextTick(xn, this);
    })), a(l, i);
  }
}
var CC = gC;
function bC(e, t) {
  for (const r of Object.keys(t)) e.on(r, t[r]);
  return function() {
    for (const n of Object.keys(t))
      e.removeListener(n, t[n]);
  };
}
function xn(e) {
  e._state = cc, e.emit("close");
}
function Q6() {
  this.destroy();
}
function Cn(e, t, r, n) {
  r = r || si.STATUS_CODES[t], n = {
    Connection: "close",
    "Content-Type": "text/html",
    "Content-Length": Buffer.byteLength(r),
    ...n
  }, e.once("finish", e.destroy), e.end(
    `HTTP/1.1 ${t} ${si.STATUS_CODES[t]}\r
` + Object.keys(n).map((i) => `${i}: ${n[i]}`).join(`\r
`) + `\r
\r
` + r
  );
}
function cr(e, t, r, n, i, o) {
  if (e.listenerCount("wsClientError")) {
    const s = new Error(i);
    Error.captureStackTrace(s, cr), e.emit("wsClientError", s, r, t);
  } else
    Cn(r, n, i, o);
}
const yC = /* @__PURE__ */ Tu(CC), Z6 = Eu(e5);
function R2() {
  try {
    return qi("ffmpeg -version", { stdio: "ignore", timeout: 5e3 }), console.log("FFmpeg found in PATH"), "ffmpeg";
  } catch {
    console.log("FFmpeg not found in PATH");
  }
  const e = [
    "C:\\ffmpeg\\bin\\ffmpeg.exe",
    "C:\\ffmpeg\\ffmpeg-2025-07-10-git-82aeee3c19-essentials_build\\bin\\ffmpeg.exe",
    "C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe",
    "C:\\Program Files (x86)\\ffmpeg\\bin\\ffmpeg.exe"
  ];
  for (const r of e)
    try {
      return console.log("Testing FFmpeg path:", r), qi(`"${r}" -version`, { stdio: "ignore", timeout: 5e3 }), console.log("FFmpeg found at:", r), r;
    } catch {
      console.log("FFmpeg not found at:", r);
      continue;
    }
  const t = [
    "C:\\Users\\%USERNAME%\\Downloads\\ffmpeg\\bin\\ffmpeg.exe",
    "C:\\Tools\\ffmpeg\\bin\\ffmpeg.exe",
    "C:\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe"
  ];
  for (const r of t)
    try {
      const n = r.replace("%USERNAME%", process.env.USERNAME || "");
      return console.log("Testing download path:", n), qi(`"${n}" -version`, { stdio: "ignore", timeout: 5e3 }), console.log("FFmpeg found at:", n), n;
    } catch {
      continue;
    }
  throw new Error("FFmpeg not found. Please install FFmpeg:\\n1. Download from https://ffmpeg.org/download.html\\n2. Extract to C:\\\\ffmpeg\\\\ or add to PATH\\n3. Or try: winget install Gyan.FFmpeg");
}
async function TC(e, t = 1e4) {
  return new Promise((r) => {
    const n = R2(), i = t5(n, [
      "-rtsp_transport",
      "tcp",
      "-i",
      e,
      "-t",
      "1",
      // Test for 1 second
      "-f",
      "null",
      "-"
    ]);
    let o = !1;
    const s = setTimeout(() => {
      o || (o = !0, i.kill(), r({
        success: !1,
        error: "Connection timeout",
        details: `RTSP stream did not respond within ${t}ms`
      }));
    }, t);
    let a = "";
    i.stderr.on("data", (f) => {
      a += f.toString();
    }), i.on("exit", (f) => {
      o || (o = !0, clearTimeout(s), f === 0 || a.includes("frame=") ? r({ success: !0 }) : r({
        success: !1,
        error: `FFmpeg exit code: ${f}`,
        details: a.substring(0, 500)
        // Limit error output
      }));
    }), i.on("error", (f) => {
      o || (o = !0, clearTimeout(s), r({
        success: !1,
        error: f.message,
        details: "Failed to start FFmpeg process"
      }));
    });
  });
}
class vC {
  constructor() {
    this.streams = /* @__PURE__ */ new Map(), this.basePort = 9999, this.currentPort = this.basePort;
  }
  // Run system diagnostics
  async runDiagnostics() {
    const t = {
      ffmpegAvailable: !1,
      ffmpegVersion: null,
      networkInfo: {},
      systemInfo: {}
    };
    try {
      const r = R2(), { stdout: n } = await Z6(`"${r}" -version`);
      t.ffmpegAvailable = !0, t.ffmpegVersion = n.split(`
`)[0], console.log("✅ FFmpeg available:", t.ffmpegVersion);
    } catch (r) {
      console.log("❌ FFmpeg not available:", r);
    }
    try {
      const { stdout: r } = await Z6("ipconfig");
      t.networkInfo = { ipconfig: r.substring(0, 500) };
    } catch (r) {
      console.log("Network info check failed:", r);
    }
    try {
      t.systemInfo = {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        env: {
          PATH: process.env.PATH ? "SET" : "NOT_SET",
          USERNAME: process.env.USERNAME || "UNKNOWN"
        }
      };
    } catch (r) {
      console.log("System info check failed:", r);
    }
    return t;
  }
  async startStream(t, r) {
    if (this.streams.has(r))
      return console.log(`Stream ${r} already exists, returning existing port`), this.streams.get(r).port;
    console.log(`🔄 Starting diagnostics for stream ${r}`);
    const n = await this.runDiagnostics();
    if (console.log("System diagnostics:", JSON.stringify(n, null, 2)), !n.ffmpegAvailable)
      throw new Error(`FFmpeg is not available on this system. Please install FFmpeg:
1. Download from https://ffmpeg.org/download.html
2. Extract to C:\\ffmpeg\\ or add to PATH
3. Or try: winget install Gyan.FFmpeg`);
    console.log(`🔄 Testing RTSP connection for ${r}: ${t}`);
    const i = await TC(t, 15e3);
    if (!i.success) {
      const h = `Failed to connect to RTSP stream ${r}:
URL: ${t}
Error: ${i.error}
Details: ${i.details}

Possible causes:
1. Camera is not reachable from this network
2. RTSP URL is incorrect
3. Camera requires authentication
4. Network firewall blocking connection`;
      throw console.error("❌ RTSP Connection Test Failed:", h), new Error(h);
    }
    console.log(`✅ RTSP connection test successful for ${r}`);
    const o = this.currentPort++, s = gu(), a = new yC({ server: s });
    console.log(`Testing RTSP connection for ${r}: ${t}`);
    const f = [
      // RTSP optimalizace
      "-rtsp_transport",
      "tcp",
      "-i",
      t,
      // Výstupní formát
      "-f",
      "mpegts",
      // Video kodeky - zkusíme hardware akceleraci
      "-c:v",
      "h264_nvenc",
      // NVIDIA GPU akcelerace
      "-preset",
      "fast",
      // Rychlé kódování
      "-tune",
      "zerolatency",
      // Minimální latence
      // Pokud selže hardware, fallback na optimalizovaný software
      "-c:v",
      "libx264",
      "-preset",
      "ultrafast",
      // Nejrychlejší preset
      "-tune",
      "zerolatency",
      // Rozlišení a kvalita - výrazně sníženo
      "-s",
      "320x240",
      // Menší rozlišení = méně práce
      "-r",
      "10",
      // Snížený framerate z 25 na 10 FPS
      "-b:v",
      "300k",
      // Snížený bitrate z 1000k na 300k
      "-maxrate",
      "400k",
      // Maximální bitrate
      "-bufsize",
      "600k",
      // Buffer size
      // GOP optimalizace
      "-g",
      "30",
      // GOP size snížen z 50
      "-keyint_min",
      "10",
      // Minimální keyframe interval
      "-sc_threshold",
      "0",
      // Zakázat scene change detection
      // Audio optimalizace - zcela zakázáno pro úsporu výkonu
      "-an",
      // No audio = významná úspora CPU
      // Obecné optimalizace
      "-threads",
      "2",
      // Omezit počet vláken
      "-flags",
      "+global_header",
      "-fflags",
      "+genpts+flush_packets",
      "-avoid_negative_ts",
      "make_zero",
      // Výstup
      "-"
    ];
    console.log(`Starting FFmpeg for stream ${r} with URL: ${t}`), console.log("FFmpeg args:", f);
    const c = R2();
    console.log(`Using FFmpeg path: ${c}`);
    const l = t5(c, f);
    let u = !1;
    return l.stdout.on("data", (h) => {
      u || (console.log(`First data chunk received for ${r}, size: ${h.length}`), u = !0), a.clients.forEach((d) => {
        d.readyState === d.OPEN && d.send(h);
      });
    }), l.stderr.on("data", (h) => {
      const d = h.toString();
      !d.includes("Non-monotonic DTS") && !d.includes("changing to") && !d.includes("incorrect timestamps") && console.error(`FFmpeg stderr for ${r}:`, d);
    }), l.on("error", (h) => {
      console.error(`FFmpeg error for ${r}:`, h);
    }), l.on("close", (h) => {
      console.log(`FFmpeg process for ${r} exited with code ${h}`);
    }), a.on("connection", (h) => {
      console.log(`New WebSocket connection for stream ${r}`), h.on("close", () => {
        console.log(`WebSocket connection closed for stream ${r}`);
      }), h.on("error", (d) => {
        console.error(`WebSocket error for stream ${r}:`, d);
      });
    }), s.listen(o, () => {
      console.log(`RTSP stream server running on port ${o} for stream ${r}`);
    }), this.streams.set(r, { ffmpegProcess: l, server: s, wsServer: a, port: o }), o;
  }
  stopStream(t) {
    const r = this.streams.get(t);
    r && (r.ffmpegProcess.kill("SIGKILL"), r.wsServer.close(), r.server.close(), this.streams.delete(t), console.log(`Stopped stream ${t}`));
  }
  stopAllStreams() {
    for (const [t] of this.streams)
      this.stopStream(t);
  }
  getStreamPort(t) {
    const r = this.streams.get(t);
    return r ? r.port : null;
  }
}
const bn = new vC(), uc = Ut.dirname(Cu(import.meta.url));
process.env.APP_ROOT = Ut.join(uc, "..");
const q1 = process.env.VITE_DEV_SERVER_URL, tb = Ut.join(process.env.APP_ROOT, "dist-electron"), hc = Ut.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = q1 ? Ut.join(process.env.APP_ROOT, "public") : hc;
let X;
Ne.autoUpdater.autoDownload = !1;
Ne.autoUpdater.autoInstallOnAppQuit = !1;
console.log("Configuring auto-updater...");
console.log("App version:", ye.getVersion());
console.log("Is packaged:", ye.isPackaged);
Ne.autoUpdater.on("checking-for-update", () => {
  console.log("Checking for update..."), X == null || X.webContents.send("checking-for-update");
});
Ne.autoUpdater.on("update-available", (e) => {
  console.log("Update available:", e), X == null || X.webContents.send("update-available", e), Ne.autoUpdater.downloadUpdate();
});
Ne.autoUpdater.on("update-not-available", (e) => {
  console.log("Update not available:", e), X == null || X.webContents.send("update-not-available", e);
});
Ne.autoUpdater.on("error", (e) => {
  console.log("Error in auto-updater:", e), e.message && e.message.includes("not signed") ? (console.log("Signature verification error - this is expected in development"), console.log("To fix this for production, you need to code sign your application"), X == null || X.webContents.send("update-error", "Aplikace není digitálně podepsána. Pro produkční nasazení je třeba konfigurovat code signing.")) : X == null || X.webContents.send("update-error", e.message);
});
Ne.autoUpdater.on("download-progress", (e) => {
  let t = "Download speed: " + e.bytesPerSecond;
  t = t + " - Downloaded " + e.percent + "%", t = t + " (" + e.transferred + "/" + e.total + ")", console.log(t), console.log("Progress object:", JSON.stringify(e)), X == null || X.webContents.send("download-progress", e);
});
Ne.autoUpdater.on("update-downloaded", (e) => {
  console.log("Update downloaded:", e), console.log("Sending update-downloaded event to renderer..."), X == null || X.webContents.send("update-downloaded", e), console.log("Showing restart dialog..."), setTimeout(() => {
    console.log("Auto-restarting in 3 seconds...");
    try {
      console.log("Calling autoUpdater.quitAndInstall()..."), Ne.autoUpdater.quitAndInstall(!0, !0);
    } catch (t) {
      console.error("Error in quitAndInstall:", t), console.log("Falling back to app.quit()..."), ye.relaunch(), ye.quit();
    }
  }, 3e3), _u.showMessageBox(X, {
    type: "info",
    title: "Aktualizace připravena",
    message: 'Aktualizace byla stažena. Aplikace se automaticky restartuje za 3 sekundy, nebo klikněte "Restartovat nyní".',
    buttons: ["Restartovat nyní", "Později"]
  }).then((t) => {
    if (console.log("Dialog result:", t), t.response === 0) {
      console.log("User chose to restart immediately - calling quitAndInstall...");
      try {
        Ne.autoUpdater.quitAndInstall(!0, !0);
      } catch (r) {
        console.error("Error in quitAndInstall from dialog:", r), ye.relaunch(), ye.quit();
      }
    } else
      console.log("User chose to restart later");
  }).catch((t) => {
    console.error("Error showing dialog:", t), console.log("Dialog failed, forcing restart...");
    try {
      Ne.autoUpdater.quitAndInstall(!0, !0);
    } catch (r) {
      console.error("Error in fallback quitAndInstall:", r), ye.relaunch(), ye.quit();
    }
  });
});
function dc() {
  X = new J6({
    width: 1200,
    height: 900,
    show: !1,
    titleBarStyle: "default",
    icon: Ut.join(process.env.VITE_PUBLIC, "logo.png"),
    webPreferences: {
      preload: Ut.join(uc, "preload.js"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), X.once("ready-to-show", () => {
    X == null || X.show(), X == null || X.focus();
  }), X.webContents.on("did-finish-load", () => {
    X == null || X.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), q1 ? (console.log("Loading dev server URL:", q1), X.loadURL(q1)) : (console.log("Loading production build"), X.loadFile(Ut.join(hc, "index.html")));
}
ye.on("window-all-closed", () => {
  process.platform !== "darwin" && (ye.quit(), X = null);
});
ye.on("activate", () => {
  J6.getAllWindows().length === 0 && dc();
});
ye.whenReady().then(() => {
  dc(), ht.handle("start-rtsp-stream", async (e, t, r) => {
    try {
      return { success: !0, port: await bn.startStream(t, r) };
    } catch (n) {
      return console.error("Error starting RTSP stream:", n), { success: !1, error: n instanceof Error ? n.message : "Unknown error" };
    }
  }), ht.handle("stop-rtsp-stream", (e, t) => {
    try {
      return bn.stopStream(t), { success: !0 };
    } catch (r) {
      return console.error("Error stopping RTSP stream:", r), { success: !1, error: r instanceof Error ? r.message : "Unknown error" };
    }
  }), ht.handle("get-stream-port", (e, t) => ({ success: !0, port: bn.getStreamPort(t) })), ht.handle("rtsp-diagnostics", async () => {
    try {
      return { success: !0, diagnostics: await bn.runDiagnostics() };
    } catch (e) {
      return { success: !1, error: e instanceof Error ? e.message : "Unknown error" };
    }
  }), ht.handle("check-for-updates", async () => {
    try {
      console.log("IPC: check-for-updates called"), X == null || X.webContents.send("checking-for-update");
      const e = await Ne.autoUpdater.checkForUpdates();
      return console.log("IPC: checkForUpdates result:", e), { success: !0, result: e };
    } catch (e) {
      return console.error("IPC: Error checking for updates:", e), X == null || X.webContents.send("update-error", e instanceof Error ? e.message : "Unknown error"), { success: !1, error: e instanceof Error ? e.message : "Unknown error" };
    }
  }), ht.handle("restart-app", () => {
    console.log("IPC: restart-app called");
    try {
      return console.log("Attempting quitAndInstall..."), Ne.autoUpdater.quitAndInstall(!0, !0), setTimeout(() => {
        console.log("quitAndInstall timeout - forcing app quit..."), ye.relaunch(), ye.quit();
      }, 2e3), { success: !0 };
    } catch (e) {
      console.error("Error in restart-app:", e);
      try {
        ye.relaunch(), ye.quit();
      } catch (t) {
        console.error("Final error in restart:", t), process.exit(0);
      }
      return { success: !1, error: e instanceof Error ? e.message : "Unknown error" };
    }
  });
});
ye.on("before-quit", () => {
  bn.stopAllStreams();
});
export {
  tb as MAIN_DIST,
  hc as RENDERER_DIST,
  q1 as VITE_DEV_SERVER_URL
};
