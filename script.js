let score = 0;
const item = document.getElementById('item');
const bins = document.querySelectorAll('.bin');
const scoreDisplay = document.getElementById('score');

// ข้อมูลรายการขยะและประเภทที่ถูกต้อง
const trashList = [
    { name: 'ขวดพลาสติก', type: 'recycle' },
    { name: 'เศษอาหาร', type: 'organic' },
    { name: 'ถุงพลาสติกเปื้อน', type: 'general' },
    { name: 'ถ่านไฟฉาย', type: 'hazard' }
];

let currentTrash = trashList[0];

// เมื่อเริ่มลากขยะ
item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', currentTrash.type);
});

// ตั้งค่าถังขยะให้รับการวางได้
bins.forEach(bin => {
    bin.addEventListener('dragover', (e) => e.preventDefault());
    
    bin.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedType = e.dataTransfer.getData('text/plain');
        const binType = bin.getAttribute('data-type');

        if (draggedType === binType) {
            score += 10;
            alert('ถูกต้อง! +10 คะแนน');
        } else {
            alert('ผิดถัง! ลองใหม่อีกครั้ง');
        }
        
        scoreDisplay.textContent = score;
        nextTrash();
    });
});

// สุ่มขยะชิ้นต่อไป
function nextTrash() {
    const randomIndex = Math.floor(Math.random() * trashList.length);
    currentTrash = trashList[randomIndex];
    item.textContent = currentTrash.name;
}