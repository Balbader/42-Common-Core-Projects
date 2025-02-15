// const createElement = (tag, attributes, ...children) => {
//   const prop = document.createElement(tag);

//   Object.keys(attributes || {}).forEach((key) => {
//     if (key === "style") {
//       Object.keys(attributes[key]).forEach((value) => {
//         prop.style[value] = prop[key][value];
//       });
//     } else if (key === "class") {
//       Object.keys(attributes[key]).forEach((value) => {
//         prop.class[value] = prop[key][value];
//       });
//     } else {
//       prop[key] = attributes[key];
//     }
//   });

//   const addChild = (child) => {
//     if (Array.isArray(child)) {
//       child.forEach((c) => addChild(c));
//     } else if (typeof child === "object") {
//       prop.appendChild(child);
//     } else {
//       prop.appendChild(document.createTextNode(child));
//     }
//   };

//   prop.on = (eventType, eventHandler, options) => {
//     prop.addEventListener(eventType, eventHandler, options);
//     return prop;
//   };

//   prop.setStyle = (styles) => {
//     Object.assign(element.style, styles);
//     return prop;
//   };

//   (children || []).forEach((c) => addChild(c));

//   return prop;
// }

const createElement = (tagName, attributes, ...children) => {
	const prop = document.createElement(tagName);

	for (const [key, value] of Object.entries(attributes || {})) {
		prop.setAttribute(key, value);
	}

	prop.append(...children);

	prop.setStyle = styles => {
		Object.assign(prop.style, styles);
		return prop;
	};

	prop.appendText = text => {
		prop.append(text);
		return prop;
	};

	prop.on = (eventType, eventHandler, options) => {
		prop.addEventListener(eventType, eventHandler, options);
		return prop;
	};

	return prop;
};

export default createElement;
