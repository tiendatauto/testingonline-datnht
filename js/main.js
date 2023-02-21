let questionsList = [];
const fetchQuestion = async () => {
  try {
    const res = await axios({
      url: 'https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/questions',
      method: 'GET',
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// Trick : làm việc với mảng data mà muốn tách thành 2 data để render 2 kiểu khác nhau
const renderQuestion = () => {
  let htmlContent = '';
  // Vấn đề không đơn giản khi chúng ta có 2 loại question, mỗi question render ra 1 giao diện khác nhau
  // không dùng if else, loại 1 thì render ra,loại 2 thì render ra vì làm vậy mình xây dựng lớp đối tượng cũng như không
  for (let i in questionsList) {
    htmlContent += questionsList[i].render(+i + 1); // lưu ý dùng +i để chuyển chữ thành số vì for i nó trả về string
  }

  document.getElementById('questionsContainer').innerHTML = htmlContent;
};

// cách chuyển data của backend thành questionList của mình
// Dùng map để chuyển data của backend thành mảng questionList của mình

const mapData = (data = []) => {
  questionsList = data.map((item) => {
    const { questionType, id, content, answers } = item;

    if (questionType === 1) {
      return new MultipleChoice(questionType, id, content, answers);
    } else {
      return new fillInBank(questionType, id, content, answers);
    }
  });
  console.log(questionsList);
};

const submit = () => {
  // lấy từng đối tượng câu hỏi ra, gọi hàm checkExact của từng đối tượng chạy, câu nào checkExact trả về true, tăng biến đếm lên 1
  let result = 0;
  for (let item of questionsList) {
    if (item.checkExact()) {
      result++;
    }
  }

  alert('Kết quả:' + result + '/' + questionsList.length);
};

fetchQuestion().then((data) => {
  // code khi question list đã có
  mapData(data);
  renderQuestion();
});
