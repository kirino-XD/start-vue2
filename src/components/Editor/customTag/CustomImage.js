import Quill from 'quill'
const BlockEmbed = Quill.imports['blots/embed']

// 自定义img标签
class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute('src', value.src);
    node.setAttribute('fileid', value.fileid);

    return node;
  }

  static value(node) {
    return {
      src: node.getAttribute('src'),
      fileid: node.getAttribute('fileid')
    }
  }
}

ImageBlot.blotName = 'image'
ImageBlot.tagName = 'img'

export default ImageBlot

