const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (this._root === null) {
      this._root = newNode;
    } else {
      this._addNode(this._root, newNode);
    }
  }

  _addNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._addNode(node.left, newNode);
      }
    } else if (newNode.data > node.data) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._addNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    return this._findNode(this._root, data);
  }

  _findNode(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      return this._findNode(node.left, data);
    } else if (data > node.data) {
      return this._findNode(node.right, data);
    } else {
      return node;
    }
  }

  remove(data) {
    this._root = this._removeNode(this._root, data);
  }

  _removeNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {
      // Узел с одним дочерним элементом или без дочерних элементов
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Узел с двумя дочерними элементами
      const minNode = this._findMinNode(node.right);
      node.data = minNode.data;
      node.right = this._removeNode(node.right, minNode.data);
      return node;
    }
  }

  min() {
    if (this._root === null) {
      return null;
    }

    const minNode = this._findMinNode(this._root);
    return minNode ? minNode.data : null;
  }

  _findMinNode(node) {
    while (node && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  max() {
    if (this._root === null) {
      return null;
    }

    const maxNode = this._findMaxNode(this._root);
    return maxNode ? maxNode.data : null;
  }

  _findMaxNode(node) {
    while (node && node.right !== null) {
      node = node.right;
    }
    return node;
  }
  
};//xxxx
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
