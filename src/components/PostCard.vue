<template>
  <EditDialog
    @close="closeDialogs"
    :editComponent="editComponent"
    :item="post"
    @response="response"/>
  <QuestionDialog 
    @close="closeDialogs"
    :open="questionDialog"
    msg="Czy chcesz usunąć ten post?"
    @confirm="confirmDelete"/>
  <InformationDialog 
    @close="closeDialogs"
    :open="informationDialog"
    :icon="icon"
    :iconClass="iconClass"
    :msg="infMsg"/>
    
    <div
        class="post-container"
      >
        <div class="card">
          <h2>{{ post.title }}</h2>
          <p>ID Użytkownika: {{ post.userId }}</p>
          <p>{{ post.body }}</p>
          <div class="row-space">
            <div class="row-start">
              <font-awesome-icon
                class="manage-icon"
                icon="fa-solid fa-trash"
                @click="deletePost"
              />
              <font-awesome-icon
                class="manage-icon"
                icon="fa-regular fa-pen-to-square"
                @click="editPost"
              />
            </div>
            <button @click="toggleComments">
              Komentarze
              <font-awesome-icon
                :icon="`fa-solid fa-arrow-${
                  showComments ? 'down' : 'up'
                }-long`"
              />
            </button>
          </div>
        </div>
        <PostComments
          v-if="showComments"
          :comments="comments"
          :commentsId="post.id"
        />
      </div>

</template>

<script>
import PostComments from './PostComments.vue'
import EditDialog from '../components/dialogs/EditDialog.vue'
import QuestionDialog from '../components/dialogs/QuestionDialog.vue'
import InformationDialog from '../components/dialogs/InformationDialog.vue'
import { getComments, deletePost } from '../scripts/postsApi.js'
export default {
    components: {
        PostComments,
        EditDialog,
        QuestionDialog,
        InformationDialog
    },
    props: {
        post:{
            type: Object,
            required: true,
        }
    },
    data(){
        return{
            showComments: false,
            comments: [],
            editComponent: "",
            questionDialog: false,
            informationDialog: false,
            infMsg: "",
            icon: "",
            iconClass: "",
        }
    },
    methods:{
        editPost(){
            this.editComponent = "EditPost"
        },
        deletePost(){
            this.questionDialog = true;
            console.log('otwieramy')
        },
        confirmDelete(){
          deletePost(this.post.id).then((res)=>{
            if(res){
              this.success("Post został usunięty");
            }
            else{
              this.error("Post nie został usunięty")
            }
            this.closeDialogs();
            this.informationDialog = true;
          })
        },
        closeDialogs(){
          this.editComponent = "";
          this.questionDialog = false;
          this.informationDialog = false;
        },
        async toggleComments() {
            if (!this.showComments) {
                this.comments = await getComments(this.post.id);
                this.showComments = true;
            } else {
                this.showComments = false;
            }
        },
        response(res){
          if(res){
            this.success("Poprawnie edytowano post");
          }else{
            this.error("Nie udało się edytować posta!");
          }
          this.closeDialogs();
          this.informationDialog = true;
        },
        success(msg){
          this.infMsg = msg;
          this.icon = "fa-solid fa-check"
          this.iconClass = "success-icon"
        },
        error(msg){
          this.infMsg = msg;
          this.icon = "fa-solid fa-exclamation"
          this.iconClass = "error-icon"
        }
    }
}
</script>

<style scoped>
.row-start {
  margin-top: 8px;
  gap: 10px;
}

.manage-icon:hover {
  font-size: 20px;
}

.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 2rem;
  border: none;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 0 8px black;
  text-align: center;
  color: black;
}

.card h2 {
  margin: 0;
}

.card p {
  margin-bottom: 10px;
}
</style>