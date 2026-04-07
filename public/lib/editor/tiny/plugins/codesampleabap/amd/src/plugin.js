// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Tiny codesampleabap plugin.
 *
 * Exposes the codehighlighter filter's PrismJS (which includes the ABAP grammar)
 * as window.Prism so the TinyMCE codesample plugin can use it via the
 * codesample_global_prismjs option.
 *
 * @module      tiny_codesampleabap/plugin
 * @copyright   2026 Natuvion
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getTinyMCE} from 'editor_tiny/loader';
import {getPluginMetadata} from 'editor_tiny/utils';
import Prism from 'filter_codehighlighter/prism';

import {component, pluginName} from './common';
import * as Configuration from './configuration';

// Expose the codehighlighter PrismJS (with ABAP grammar) as window.Prism
// so the codesample plugin picks it up when codesample_global_prismjs is true.
window.Prism = Prism;

// eslint-disable-next-line no-async-promise-executor
export default new Promise(async(resolve) => {
    const [
        tinyMCE,
        pluginMetadata,
    ] = await Promise.all([
        getTinyMCE(),
        getPluginMetadata(component, pluginName),
    ]);

    tinyMCE.PluginManager.add(`${component}/plugin`, () => {
        return pluginMetadata;
    });

    // Resolve the plugin and include configuration.
    resolve([`${component}/plugin`, Configuration]);
});
