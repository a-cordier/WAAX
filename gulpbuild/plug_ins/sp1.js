!function(t){"use strict";function e(e){this.parent=e,this.params=e.params,this.voiceKey=null,this.minDur=null,this._src=t.Source(),this._srcGain=t.Gain(),this._src.to(this._srcGain).to(this.parent._filter),this._src.buffer=this.parent.clip.buffer}function i(e){t.PlugIn.defineType(this,"Generator"),this.ready=!1,this.clip=null,this.numVoice=0,this.voices=[];for(var i=0;128>i;i++)this.voices[i]=[];this._filter=t.Filter(),this._filter.to(this._output),t.defineParams(this,{tune:{type:"Generic",name:"Tune","default":48,min:0,max:127,unit:"Semitone"},pitchMod:{type:"Boolean",name:"PitchMod","default":!0},velocityMod:{type:"Boolean",name:"VeloMod","default":!0},ampAttack:{type:"Generic",name:"Att","default":.02,min:0,max:5,unit:"Seconds"},ampDecay:{type:"Generic",name:"Dec","default":.04,min:0,max:5,unit:"Seconds"},ampSustain:{type:"Generic",name:"Sus","default":.25,min:0,max:1,unit:"LinearGain"},ampRelease:{type:"Generic",name:"Rel","default":.2,min:0,max:10,unit:"Seconds"},filterType:{type:"Itemized",name:"FiltType","default":"lowpass",model:t.FILTER_TYPES},filterFrequency:{type:"Generic",name:"FiltFreq","default":2500,min:20,max:2e4,unit:"Hertz"},filterQ:{type:"Generic",name:"FiltQ","default":0,min:0,max:40},filterGain:{type:"Generic",name:"FiltGain","default":0,min:-40,max:40,unit:"LinearGain"}}),t.PlugIn.initPreset(this,e)}e.prototype={noteOn:function(e,i,n){var a=this.params,s=a.tune.get(),o=a.ampAttack.get(),r=a.ampDecay.get(),c=a.ampSustain.get(),l=a.velocityMod.get()?t.veltoamp(i):1;a.pitchMod.get()&&(this._src.playbackRate.value=Math.pow(2,(e-s)/12)),this._src.start(n),this._srcGain.gain.set(0,n,0),this._srcGain.gain.set(l,n+o,1),this._srcGain.gain.set(c*l,[n+o,r],3),this.minDur=n+o+r},noteOff:function(e,i,n){if(this.minDur){n=n<t.now?t.now:n;var a=this.params,s=a.ampRelease.get();this.voiceKey=e,this._src.stop(this.minDur+s+1),n<this.minDur?(this._srcGain.gain.cancel(this.minDur),this._srcGain.gain.set(0,[this.minDur,s],3)):this._srcGain.gain.set(0,[n,s],3)}}},i.prototype={info:{name:"SP1",version:"0.0.1",api_version:"1.0.0-alpha",author:"Hongchan Choi",type:"Generator",description:"Versatile Single-Zone Sampler"},defaultPreset:{tune:60,pitchMod:!0,velocityMod:!0,ampAttack:.01,ampDecay:.44,ampSustain:.06,ampRelease:.06,filterType:"LP",filterFrequency:5e3,filterQ:0,filterGain:0,output:1},$filterType:function(t){this._filter.type=t},$filterFrequency:function(t,e,i){this._filter.frequency.set(t,e,i)},$filterQ:function(t,e,i){this._filter.Q.set(t,e,i)},$filterGain:function(t,e,i){this._filter.gain.set(t,e,i)},noteOn:function(i,n,a){a=a||t.now;var s=new e(this);this.voices[i].push(s),this.numVoice++,s.noteOn(i,n,a)},noteOff:function(e,i,n){n=n||t.now;for(var a=this.voices[e],s=0;s<a.length;s++)a[s].noteOff(e,i,n),this.numVoice--;this.voices[e]=[]},onData:function(t,e){switch(t){case"noteon":this.noteOn(e.pitch,e.velocity);break;case"noteoff":this.noteOff(e.pitch,e.velocity)}},_onprogress:function(){},_onloaded:function(e){this.setClip(e),t.Log.info("Clip loaded:",e.name)},isReady:function(){return this.ready},setClip:function(t){this.clip=t,this.ready=!0},loadClip:function(e){t.loadClip(e,this._onloaded.bind(this),this._onprogress.bind(this))}},t.PlugIn.extendPrototype(i,"Generator"),t.PlugIn.register(i)}(WX);