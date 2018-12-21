'use babel'

import { CompositeDisposable } from 'atom'
import path from 'path'

export default {

  name: 'Uhh',
  subscriptions: null,
  mainloopId: null,
  audio: null,
  audioPlaying: false,
  messages: [],

  activate (state) {
    this.toggle()
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(global.atom.commands.add('atom-workspace', {
      'atom-uhh:toggle': () => this.toggle()
    }))
  },

  toggle () {
    if (!this.mainloopId) {
      this.mainloopId = setInterval(this.mainloop.bind(this), 100)
    } else {
      clearInterval(this.mainloopId)
    }
  },

  mainloop () {
    if (this.messages.length > 0 && !this.audioPlaying && Math.random() > 0.8) {
      this.playSound()
    }
  },

  playSound () {
    const uhh = (Math.round(Math.random() * 17) + 1 + '').padStart(2, '0')
    this.audio = new global.Audio(path.join(__dirname, '..', 'assets', `uhh${uhh}.mp3`))
    this.audioPlaying = true
    this.audio.play()
    this.audio.onended = () => {
      this.audioPlaying = false
      if (Math.random() > 0.5 && this.messages.length > 0) {
        this.playSound()
      }
    }
  },

  render ({ added, removed, messages }) {
    this.messages = messages
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  provideUI () { return this },
  serialize () {},
  didBeginLinting (linter, filePath) {},
  didFinishLinting (linter, filePath) {},
  dispose () {}
}
