'use strict';

exports.__esModule = true;
exports.shade = shade;
/* eslint-disable */
function shade(color, percent) {
	var f = parseInt(color.slice(1), 16);
	var t = percent < 0 ? 0 : 255;
	var p = percent < 0 ? percent * -1 : percent;
	var R = f >> 16;
	var G = f >> 8 & 0x00ff;
	var B = f & 0x0000ff;

	return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}