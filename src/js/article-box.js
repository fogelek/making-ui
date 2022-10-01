class ArticleBox extends HTMLElement {
  constructor() {
    super();
    const article = document.createElement("article");
    while (this.children.length > 0) {
      article.appendChild(this.children[0]);
    }

    this.append(article);
    const box = document.createElement("div");
    box.classList.add("box");
    if (this.hasAttribute("animate")) {
      box.classList.add("animate");
    }
    this.append(box);
  }
}

customElements.define("article-box", ArticleBox);
