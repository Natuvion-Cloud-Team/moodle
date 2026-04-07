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
 * Tiny codesampleabap configuration.
 *
 * @module      tiny_codesampleabap/configuration
 * @copyright   2026 Natuvion
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

export const configure = () => {
    return {
        // Use the global PrismJS (from codehighlighter filter) instead of the
        // codesample plugin's bundled copy. This allows us to add language
        // grammars (like ABAP) without modifying TinyMCE vendor files.
        // eslint-disable-next-line camelcase
        codesample_global_prismjs: true,
        // eslint-disable-next-line camelcase
        codesample_languages: [
            {text: 'HTML/XML', value: 'markup'},
            {text: 'JavaScript', value: 'javascript'},
            {text: 'CSS', value: 'css'},
            {text: 'PHP', value: 'php'},
            {text: 'Ruby', value: 'ruby'},
            {text: 'Python', value: 'python'},
            {text: 'Java', value: 'java'},
            {text: 'C', value: 'c'},
            {text: 'C#', value: 'csharp'},
            {text: 'C++', value: 'cpp'},
            {text: 'ABAP', value: 'abap'},
        ],
    };
};
