const hideshow=document.querySelectorAll(".hideshow");
const backdrop=document.getElementById("backdrop");
const movieModel=document.getElementById("movieModel");
const movieForm=document.getElementById("movieForm");
const movTitleControl=document.getElementById("movTitle");
const movurlControl=document.getElementById("movurl");
const overviewControl=document.getElementById("overview");
const ratingControl=document.getElementById("rating");
const movContainer=document.getElementById("movContainer");
const addBtn=document.getElementById("addBtn");
const updateBtn=document.getElementById("updateBtn");
const AddMovie=document.getElementById("AddMovie");



const movieRating=(rating)=>{
    if(rating >= 4){
        return "bg-success";
    }else if(rating >=2 && rating <4){
        return "bg-warning";
    }else{
        return "bg-danger";
    }
}

const snackbar=(movtitle, icon)=>{
    swal.fire({
        title:movtitle,
        icon:icon,
        timer:3000,
        confirmButtonColor:"#00ff00",
    })
}


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}



let movieArr=[
    {
        title:"premalu",
        movurl:"https://english.mathrubhumi.com/image/contentid/policy:1.9402969:1713542973/Premalu.jpg?$p=4398656&f=16x10&w=852&q=0.8",
        overview:"Premalu is a 2024 Indian Malayalam-language romantic comedy film directed by Girish ",
        rating:5,
        movieId:"120"                               
    }
];

let editId;
const onEdit=(ele)=>{
    onHideShow();
    editId=ele.closest(".card").id;
    
    let editObj=movieArr.find(mov=> mov.movieId===editId);

    movTitleControl.value=editObj.title;
    movurlControl.value=editObj.movurl;
    overviewControl.value=editObj.overview;
    ratingControl.value=editObj.rating;
    
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");

}

const onRemove=(ele)=>{
    let removeId=ele.closest(".card").id;

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00ff00",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            let getIndex=movieArr.findIndex(mov=>mov.movieId===removeId);
            movieArr.splice(getIndex,1);
            ele.closest(".col-sm-6").remove();

            snackbar(`this movie removie is successful` ,`success`);
        }
      });

    // let getIndex=movieArr.findIndex(mov=>mov.movieId===removeId);
    // movieArr.splice(getIndex,1);
    // ele.closest(".col-sm-6").remove();
}

const tempMovie=(arr)=>{
    let result="";

    arr.forEach(mov=>{
        result+=`
        
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card mb-4" id="${mov.movieId}">
                        <div class="card-header">
                            <h2 class="mb-0">${mov.title}</h2>
                        </div>
                        <div class="card-body p-0">
                            <figure class="mb-0 movieCard">
                                <img class="w-100" src="${mov.movurl}" 
                                alt="${mov.title}" title="${mov.title}">
                                <figcaption>
                                    <p class="mb-0">
                                        ${mov.overview}
                                    </p>
                                </figcaption>
                            </figure>
                        </div>
                        <div class="card-footer d-flex justify-content-between mr-0">
                            <span class="${movieRating(mov.rating)} pr-2 pl-2 pt-1 pb-1">${mov.rating}</span>
                            <span>
                                <button class="btn btn-sm btn-success mr-2" onclick="onEdit(this)">Edit</button>
                                <button class="btn btn-sm netflix-btn mr-0" onclick="onRemove(this)">Remove</button>
                            </span>
                        </div>
                    </div>
                </div>
        `
 
    })

    movContainer.innerHTML=result;

}


if(movieArr.length >0){
    tempMovie(movieArr);
}

const onMovieForm=(ele)=>{
    ele.preventDefault();

    let movieObj={
        title:movTitleControl.value,
        movurl:movurlControl.value,
        overview:overviewControl.value,
        rating:ratingControl.value,
        movieId:uuid(),
    }

    movieArr.push(movieObj);

    let card=document.createElement("div");

    card.className="col-lg-3 col-md-4 col-sm-6";

    card.innerHTML=`
                    <div class="card mb-4" id="${movieObj.movieId}">
                        <div class="card-header">
                            <h2 class="mb-0">${movieObj.title}</h2>
                        </div>
                        <div class="card-body p-0">
                            <figure class="mb-0 movieCard">
                                <img class="w-100" src="${movieObj.movurl}" 
                                alt="${movieObj.title}" title="${movieObj.title}">
                                <figcaption>
                                    <p class="mb-0">
                                        ${movieObj.overview}
                                    </p>
                                </figcaption>
                            </figure>
                        </div>
                        <div class="card-footer d-flex justify-content-between mr-0">
                            <span class="${movieRating(movieObj.rating)} pr-2 pl-2 pt-1 pb-1">${movieObj.rating}</span>
                            <span>
                                <button class="btn btn-sm btn-success mr-2" onclick="onEdit(this)">Edit</button>
                                <button class="btn btn-sm netflix-btn mr-0" onclick="onRemove(this)">Remove</button>
                            </span>
                        </div>
                    </div>
    `

    movContainer.prepend(card);
    
    ele.target.reset();

    onHideShow();
    
}


const onUpdateBtn=()=>{
    let updateObj={
        title:movTitleControl.value,
        movurl:movurlControl.value,
        rating:ratingControl.value,
        overview:overviewControl.value,
        movieId:editId,
    }

   let getIndex=movieArr.findIndex(mov=> mov.movieId===editId);

   movieArr.splice(getIndex,1,updateObj);

   console.log(movieArr);

   let card=[...document.getElementById(editId).children];

    card[0].innerHTML=`<h2 class="mb-0">${updateObj.title}</h2>`;
    card[1].innerHTML=`<figure class="mb-0 movieCard">
                                <img class="w-100" src="${updateObj.movurl}" 
                                alt="${updateObj.title}" title="${updateObj.title}">
                                <figcaption>
                                    <p class="mb-0">
                                        ${updateObj.overview}
                                    </p>
                                </figcaption>
                            </figure>`
    card[2].innerHTML=`
                            <span class="${movieRating(updateObj.rating)} pr-2 pl-2 pt-1 pb-1">${updateObj.rating}</span>
                            <span>
                                <button class="btn btn-sm btn-success mr-2" onclick="onEdit(this)">Edit</button>
                                <button class="btn btn-sm netflix-btn mr-0" onclick="onRemove(this)">Remove</button>
                            </span>
    `

    snackbar(`this ${updateObj.title} movie update is successFully!` , `success`);
    onHideShow();
    movieForm.reset();
    
    console.log(updateObj);
}


const onAddMovie=()=>{
    updateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
}



movieForm.addEventListener("submit", onMovieForm);
updateBtn.addEventListener("click" , onUpdateBtn);
AddMovie.addEventListener("click", onAddMovie);


const onHideShow=()=>{
    backdrop.classList.toggle("active");
    movieModel.classList.toggle("active");
}

hideshow.forEach(item=>{
    item.addEventListener("click", onHideShow);
})




