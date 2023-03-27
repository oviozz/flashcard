
const question_input = document.querySelector('.question-input')
const answer_input = document.querySelector('.answer-input')

let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

console.log(JSON.parse(localStorage.getItem('items')))

document.querySelector('.add-card').addEventListener('click', ()=>{
        open_input()});

document.querySelector('.fa-square-xmark').addEventListener(
    'click', () => {
        document.querySelector('.add-items').style.display = 'none'});


document.querySelector('.item-create').addEventListener('click', ()=>{flashcard_info()})

document.querySelector('.delete-card').addEventListener('click', ()=>{
        localStorage.clear();
        document.querySelector('.card-items').innerHTML = "";
        contentArray = [];
})

contentArray.forEach(create_item)

function flashcard_info(){
        var cardinfo = {
                'question_value' : question_input.value,
                'answer_value' : answer_input.value
        }

        contentArray.push(cardinfo)
        localStorage.setItem('items', JSON.stringify(contentArray));
        create_item(contentArray[contentArray.length - 1]);
        question_input.value = '';
        answer_input.value = '';
}

function create_item(data_value){
        const items = document.createElement('div')
        items.classList.add('items')

        const content_items = document.createElement('div')
        items.classList.add('content-items')

        content_items.appendChild(question(data_value.question_value))
        content_items.appendChild(create_answer(data_value.answer_value))
        content_items.appendChild(card_btn())

        items.appendChild(content_items)

        document.querySelector('.card-items').prepend(items)
}

function question(content_ques){
        const question = document.createElement('div')
        question.classList.add('question')

        const question_value = document.createElement('h4')
        question_value.textContent = content_ques

        question.appendChild(question_value)

        return question
}

function create_answer(content_ans){
        const answer = document.createElement('div')
        answer.classList.add('answer')

        const answer_value = document.createElement('h4')
        answer_value.classList.add('ans')
        answer_value.textContent = content_ans

        const hover = document.createElement('h4')
        hover.classList.add('hvr')
        hover.textContent = 'Hover to reveal answer.'

        answer.appendChild(answer_value)
        answer.appendChild(hover)

        return answer
}

function card_btn(){
        const button_main = document.createElement('div')
        button_main.classList.add('btn')

        const btn2 = document.createElement('button')
        btn2.classList.add('card-btn', 'delete')
        btn2.innerHTML = '<i class="fa-solid fa-trash"></i> Delete'

        btn2.addEventListener('click', (e)=>{
                const item = e.target.parentElement.parentElement.parentElement // div: items
                const index = Array.prototype.indexOf.call(item.parentElement.children, item) // item.parentElement.children -> card-items, items
                contentArray.splice(index, 1)
                localStorage.setItem('items', JSON.stringify(contentArray));
                item.remove()
        })

        button_main.appendChild(btn2)

        return button_main
}

function open_input(){
        document.querySelector('.add-items').style.display = 'block';
}
