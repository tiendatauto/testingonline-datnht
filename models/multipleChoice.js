class MultipleChoice extends Question {
  constructor(type, id, content, answers) {
    super(type, id, content, answers);
  }
  render(index) {
    let answersHTML = '';
    for (let item of this.answers) {
      // Đặt name cho mỗi câu hỏi chung 1 mã, 4 câu hỏi là 4 mã name khác nhau để có thể selected được trường câu hỏi của nó
      // Đặt class cho mỗi câu hỏi chung 1 mã, để DOM vào các trường input, lấy id của input đó đi so sánh để check câu tl đúng ko
      // Thêm value cho input, để lấy được thằng nào đang checked
      answersHTML += `
    <div>
      <input value="${item.id}" class="answer-${this.id}" type="radio" name="answer-${this.id}"  />
      <label class="lead">${item.content}</label>
    </div>
      `;
    }
    return `
    <div>
    <p class="lead font-italic" style="font-size: 30px;">
      Câu ${index}: ${this.content}
    </p>
    ${answersHTML}
  </div>
    `;
  }

  checkExact() {
    const inputList = document.getElementsByClassName(`answer-${this.id}`);
    console.log(inputList);
    let answersId;
    for (let input of inputList) {
      if (input.checked) {
        answersId = input.value;
      }
    }
    console.log(answersId);
    if (!answersId) {
      return false;
    } // Nếu answerId là undifined

    for (let answer of this.answers) {
      if (answersId === answer.id) {
        return answer.exact;
      }
    }
    return false;
  }
}

const newQuestion = new MultipleChoice(1, 1, 'Hôm nay là thứ mấy?', [
  { content: 'Thứ 2' },
  { content: 'Thứ 5' },
  { content: 'Thứ 7' },
  { content: 'Thứ CN' },
]);
console.log(newQuestion.render());
