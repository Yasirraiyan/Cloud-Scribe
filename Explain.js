নিচের Random Weather & Notes App প্রোজেক্টটিতে React-এর একাধিক গুরুত্বপূর্ণ টপিক একসাথে ব্যবহার করা হয়েছে। এখানে আমরা টপিক-ওয়াইজ বাংলায় ব্যাখ্যা করব কোন টপিক কোথায়, কিভাবে এবং কেন ব্যবহার হয়েছে।

🟢 ১. Functional Component

👉 কোথায়:

App.js, WeatherCard.js, NoteCard.js, NoteForm.js
👉 কিভাবে:
প্রতিটা UI অংশকে আলাদা ফাংশন আকারে বানানো হয়েছে। যেমন WeatherCard() শুধু Weather দেখায়, NoteCard() শুধু একটা নোটের তথ্য দেখায়।
👉 কেন:
ফাংশনাল কম্পোনেন্ট ছোট, সহজ এবং useState, useEffect এর মতো React Hook সরাসরি ব্যবহার করা যায়।

🟢 ২. React Hooks
২.১ useState

👉 কোথায়:

App.js: const [notes, setNotes] = useState([])

WeatherCard.js: const [weather, setWeather] = useState(null)

NoteForm.js: const [title, setTitle] = useState("")
👉 কিভাবে:
ডেটা রাখার জন্য state ব্যবহার হয়েছে—যেমন নোটের লিস্ট, আবহাওয়ার তথ্য, ফর্মের ইনপুট।
👉 কেন:
React-এ ডাইনামিক ডেটা দেখাতে state দরকার হয়। যখন state পরিবর্তন হয়, UI নিজে থেকেই আপডেট হয়।

২.২ useEffect

👉 কোথায়:

App.js: ডাটা ফেচ করার জন্য।

WeatherCard.js: Random Weather সেট করতে।

NoteForm.js: Edit মোডে আগের ডেটা বসানোর জন্য।
👉 কিভাবে:
useEffect(()=>{...}, []) ব্যবহার করে কম্পোনেন্ট লোড হওয়ার সময় একবার ডেটা ফেচ করা হয়েছে।
👉 কেন:
সাইড ইফেক্ট (API কল, ডাটাবেস কাজ, DOM আপডেট) করার জন্য useEffect ব্যবহার করা হয়।

🟢 ৩. Props (Properties)

👉 কোথায়:

NoteCard পায়: { note, onDelete, onEdit }

NoteForm পায়: { onSubmit, noteToEdit }
👉 কিভাবে:
Parent (App.js) থেকে Child কম্পোনেন্টে ডেটা পাঠানো হয়েছে।
👉 কেন:
এক কম্পোনেন্ট থেকে অন্য কম্পোনেন্টে ডেটা/ফাংশন পাঠাতে Props দরকার।

🟢 ৪. Event Handling

👉 কোথায়:

বাটনের onClick → Delete, Edit, Status Test বাটন।

ফর্মের onSubmit → নতুন নোট যোগ/আপডেট।
👉 কিভাবে:
<button onClick={handleDeleteNote}> বা <form onSubmit={handleSubmit}> এর মাধ্যমে ইভেন্ট ধরা হয়েছে।
👉 কেন:
React-এ UI ইন্টারঅ্যাকশনের জন্য ইভেন্ট হ্যান্ডলিং দরকার হয়।

🟢 ৫. Conditional Rendering

👉 কোথায়:

WeatherCard: যদি weather লোড না হয়, তখন "Loading Weather..." দেখানো।

NoteForm: যদি noteToEdit থাকে তাহলে বাটনে "Update Note" নাহলে "Add Note"।
👉 কেন:
ডেটা আসার আগে লোডিং মেসেজ দেখাতে এবং Edit/Update এর ভিন্ন UI দিতে।

🟢 ৬. Fetch API (CRUD Operation)

👉 কোথায়:

noteService.js (fetchNotes, createNote, updateNote, deleteNote)

App.js (ডাইরেক্ট fetch for Status Code Test)
👉 কিভাবে:
fetch() ব্যবহার করে GET, POST, PUT, DELETE রিকোয়েস্ট করা হয়েছে।
👉 কেন:
API থেকে ডেটা আনা, নতুন ডেটা পাঠানো, আপডেট ও ডিলিট করার জন্য।

🟢 ৭. Error Handling

👉 কোথায়:

noteService.js এ if (!res.ok) throw new Error(...)

App.js এ try/catch দিয়ে alert এ দেখানো।
👉 কেন:
API থেকে 403, 404, 500 ইত্যাদি Error Status এলে ইউজারকে বার্তা দেখানোর জন্য।

🟢 ৮. Dynamic UI Update

👉 কোথায়:

নতুন নোট এড করলে বা ডিলিট করলে setNotes() দিয়ে সাথে সাথে UI তে লিস্ট আপডেট।
👉 কেন:
State আপডেট হলে React নতুন ডেটা দিয়ে রেন্ডার করে।

🟢 ৯. Component Reusability

👉 কোথায়:

NoteCard বারবার ব্যবহার হয়েছে প্রতিটি নোটের জন্য।
👉 কেন:
একই স্ট্রাকচারকে একাধিক ডেটা দিয়ে রেন্ডার করতে কম্পোনেন্ট পুনঃব্যবহার করা সহজ।

🟢 ১০. API URL Switching & Status Testing

👉 কোথায়:

App.js এর GOOD_URL, BAD_403, BAD_404, BAD_500
👉 কিভাবে:
বাটনে ক্লিক করলে setApiURL এর মাধ্যমে API URL পরিবর্তন করা হয়।
👉 কেন:
ডেভেলপমেন্টে বিভিন্ন স্ট্যাটাস (200, 201, 403, 404, 500) টেস্ট করার জন্য।

🔑 সারসংক্ষেপ

এই প্রোজেক্টে React এর প্র্যাকটিক্যাল অনেক টপিক একসাথে শেখা যাবে:

টপিক	উদ্দেশ্য
Functional Component	ছোট ছোট UI অংশ তৈরি
useState	Dynamic ডেটা ম্যানেজ
useEffect	সাইড ইফেক্ট / API কল
Props	Parent → Child ডেটা/ফাংশন পাঠানো
Event Handling	Button/Form একশন নেওয়া
Conditional Rendering	লোডিং/এডিট মোড UI
Fetch API	Backend CRUD
Error Handling	User-friendly মেসেজ
Reusable Components	DRY কোড
API Status Test	HTTP Status বোঝা
