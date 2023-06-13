"use strict";

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// - Icon
import '@fortawesome/fontawesome-free/css/all.css'
import { aliases, fa } from 'vuetify/iconsets/fa'

// - MyTheme

const myCustomTheme = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#A1887F',
        primary: '#F44336',
        text: '#666666',
        secondary: '#03DAC6',
        textSpan: '#1a1a1a',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    }
}

export const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
            fa,
        },
    },
    theme: {
        defaultTheme: 'myCustomTheme',
        themes: {
            myCustomTheme,
        }
    }

})