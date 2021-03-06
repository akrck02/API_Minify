export class Action {
    constructor(name,parent) {
      this._parent = parent;
      this._name = name;
      this._styles = {};
      this._variables = {};
    }
  
    _variable    (variable)   {this.variables[variable.name] = variable;}
    _style       (style)      {this.styles[style.name] = style;}
  
    set variables(p)  {this._variables = p;}
    set styles(p)     {this._styles = p;}
    set parent(p)     {this._parent = p;}
  
    get name()       {return this._name;}
    get parent()     {return this._parent;}
    get variables()  {return this._variables;}
    get styles()     {return this._styles;}
  
    variable      (name)    {return this.variables['--' + name];}
    variable_pro  (name)    {return this.variables[name];}
    style         (name)    {return this.styles[name];}

    compile(){ 
      let lss = {};

      lss.name = this.name;
  
      lss.variables = {};
      lss.styles = {};
      
      for (const key in this.variables) {
       lss.variables[key] = this.variables[key].compile();
      }

      for (const key in this.styles) {
       lss.styles[key] = this.styles[key].compile();
      }
  
      return lss;
    }

    compileCSS(){
      let out = `.${this.parent}:${this.name}{`;
      for (const key in this.variables)  out += this.variable_pro(key).line() + ";";
      for (const key in this.styles)   out += this.style(key).line();  
      out += '}'
      return out;
    }
  
    inherit(parent){
  
    }
   
  }
  