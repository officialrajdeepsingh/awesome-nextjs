#!/usr/bin/env node
import arg from 'arg';
export declare const cliFlags: arg.Result<{
    '--help': BooleanConstructor;
    '--version': BooleanConstructor;
    '--basedir': StringConstructor;
    '--watch': BooleanConstructor;
    '--watch-options': StringConstructor;
    '--stylesheet': [StringConstructor];
    '--css': StringConstructor;
    '--document-title': StringConstructor;
    '--body-class': [StringConstructor];
    '--page-media-type': StringConstructor;
    '--highlight-style': StringConstructor;
    '--marked-options': StringConstructor;
    '--html-pdf-options': StringConstructor;
    '--pdf-options': StringConstructor;
    '--launch-options': StringConstructor;
    '--gray-matter-options': StringConstructor;
    '--port': NumberConstructor;
    '--md-file-encoding': StringConstructor;
    '--stylesheet-encoding': StringConstructor;
    '--as-html': BooleanConstructor;
    '--config-file': StringConstructor;
    '--devtools': BooleanConstructor;
    '-h': string;
    '-v': string;
    '-w': string;
}>;
