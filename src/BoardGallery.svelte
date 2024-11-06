<script>
    /**
     * TODO: Fill in board member information
     * Required fields: name, title, prefix, tags(max 3), about, profile_photo
     */
    const council = [
        { id: 'person1', name: 'Jennifer Hung', title: 'Co-President', prefix: 'Undergraduate', tags: ['Friendly', 'Planner', 'Love Dogs'], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
        { id: 'person2', name: 'Dheeraj', title: 'Co-President', prefix: 'Graduate', tags: [''], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
        { id: 'person3', name: 'Jenna Canicosa', title: 'Director', prefix: 'External Committee', tags: [''], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
        { id: 'person4', name: 'Amy Zhao', title: 'Member', prefix: 'External Committee', tags: [''], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
        { id: 'person5', name: 'Angelina Zhang', title: 'Member', prefix: 'External Committee', tags: [''], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
        { id: 'person6', name: 'Rohan Raval', title: 'Member', prefix: 'External Committee', tags: [''], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
        { id: 'person7', name: 'Person1', title: 'Member', prefix: 'External Committee', tags: [''], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
        { id: 'person8', name: 'Person2', title: 'Director', prefix: 'External Committee', tags: [''], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
        { id: 'person9', name: 'Karina Zambani', title: 'Director', prefix: 'Internal Committee', tags: [''], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
        { id: 'person10', name: 'David Sun', title: 'Member', prefix: 'Internal Committee', tags: [''], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
        { id: 'person11', name: 'Maryam Almahasnah', title: 'Member', prefix: 'Internal Committee', tags: [''], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
        { id: 'person12', name: 'Reva Agrawal', title: 'Member', prefix: 'Internal Committee', tags: [''], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
        { id: 'person13', name: 'Deepal Deleena', title: 'Director', prefix: 'Funding Committee', tags: [''], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
        { id: 'person14', name: 'Deepika Senthil', title: 'Member', prefix: 'Funding Committee', tags: [''], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
        { id: 'person15', name: 'Person3', title: 'Member', prefix: 'Funding Committee', tags: [''], about: 'Fun Fact', profile_photo: '/profiles/placeholder.jpg'},
    ];

</script>

<div class="group">
    {#each council as person (person.id)}
        <div class="person">
            <div class="profile-pic-container">
                <img class="profile-pic" src={person.profile_photo} alt="Board Member"/>
            </div>
            <div class="profile-container">
                <h2 class="profile-name">{person.name}</h2>
                <span 
                    class="profile-position"
                    class:copresident={person.title.includes("Co-President")}
                    class:external={person.prefix.includes("External")}
                    class:internal={person.prefix.includes("Internal")}
                    class:funding={person.prefix.includes("Funding")}
                >{person.prefix} {person.title}</span>
                <div class="tag-container">
                    {#each person.tags as tag}
                        <span class="profile-tag">{tag}</span>
                    {/each}
                </div>
                <p class="profile-about">{person.about}</p>
            </div>
        </div>
    {/each}
</div>

<style>
    .group {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .person {
        width: calc(50% - 10px);
        display: flex;
        align-items: flex-start;
        background: #f8f9fe;
        border-radius: 12px;
        max-width: 800px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .profile-pic-container {
        flex-shrink: 0;
        border-radius: 12px;
        overflow: hidden;
        width: 40%;
        text-align: center;
    }
    img.profile-pic {
        width: 90%;
        aspect-ratio: 3/4;
        margin: 10px auto;
        object-fit: cover;
        border-radius: 12px;
    }
    .profile-container {
        text-align: left;
        padding: 10px 20px;
    }
    .profile-name {
        font-family: 'Brix Sans Medium', Arial, sans-serif;
        font-size: 32px;
        white-space: normal;
        margin: 10px 0;
    }
    .profile-position {
        color: white;
        background-color: grey;
        padding: 3px 8px;
        border-radius: 6px;
    }
    .copresident {
        background-color: #0079d3;
    }
    .external {
        background-color: #FC8900;
    }
    .internal {
        background-color: #00C6D7;
    }
    .funding {
        background-color: #6E963B;
    }
    .tag-container {
        margin: 10px 0;
        display: flex;
        gap: 5px;
        font-size: 12px;
        font-family: 'Brix Sans Medium';
    }
    .profile-tag {
        display: block;
        color: brown;
        padding: 3px;
        background: rgba(165, 42, 42, 0.348);
        border-radius: 3px;
        border: 1px solid brown;
    }
    .profile-about {
        height: auto;
    }
</style>