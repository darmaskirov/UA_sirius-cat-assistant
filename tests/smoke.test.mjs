import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { Script } from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');

test('HTML IDs are unique', () => {
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML id');
});
test('Referenced local styles, scripts, and audio files exist', () => {
    const paths = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)]
        .map(match => match[1]).filter(path => !/^(?:https?:|data:|#)/.test(path));
    for (const path of paths) assert.ok(existsSync(resolve(root, path)), 'Missing asset: ' + path);
});
test('All loaded scripts parse', () => {
    const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(match => match[1]);
    for (const path of scripts) {
        const source = readFileSync(resolve(root, path), 'utf8');
        assert.doesNotThrow(() => new Script(source, { filename: path }));
    }
});
test('Basic accessibility labels are provided', () => {
    assert.match(html, /lang="uk"/);
    assert.match(html, /id="cat-container"[^>]*tabindex="0"/);
    assert.match(html, /id="voice-status" aria-live="polite"/);
});
