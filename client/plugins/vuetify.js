import Vue from 'vue'
import Vuetify from 'vuetify'

import Logout from '../components/App/Logout.vue'

import DepartmentCreate from '../components/Department/Create.vue'
import DepartmentUpdate from '../components/Department/Update.vue'
import DepartmentRemove from '../components/Department/Remove.vue'
import DepartmentItem from '../components/Department/Item.vue'
import DepartmentList from '../components/Department/List.vue'

import UserCreate from '../components/User/Create.vue'
import UserUpdate from '../components/User/Update.vue'
import UserUpdatePassword from '../components/User/UpdatePassword.vue'
import UserRemove from '../components/User/Remove.vue'
import UserList from '../components/User/List.vue'
import UserItem from '../components/User/Item.vue'

import TestCreate from '../components/Test/Create.vue'
import TestUpdate from '../components/Test/Update.vue'
import TestRemove from '../components/Test/Remove.vue'
import TestList from '../components/Test/List.vue'
import TestItem from '../components/Test/Item.vue'

import TestingList from '../components/Testing/List.vue'
import TestingItem from '../components/Testing/Item.vue'
import TestingQuestion from '../components/Testing/Question.vue'

import QuestionCreate from '../components/Question/Create.vue'
import QuestionUpdate from '../components/Question/Update.vue'
import QuestionRemove from '../components/Question/Remove.vue'
import QuestionList from '../components/Question/List.vue'
import QuestionItem from '../components/Question/Item.vue'

import ResultItem from '../components/Result/Item.vue'
import ResultList from '../components/Result/List.vue'
import ResultRemove from '../components/Result/Remove.vue'

import AnswerItem from '../components/Answer/Item.vue'
import AnswerList from '../components/Answer/List.vue'

import OptionCreate from '../components/Option/Create.vue'
import OptionUpdate from '../components/Option/Update.vue'
import OptionRemove from '../components/Option/Remove.vue'
import OptionList from '../components/Option/List.vue'
import OptionItem from '../components/Option/Item.vue'

Vue.use(Vuetify)

Vue.component('Logout', Logout)

Vue.component('DepartmentCreate', DepartmentCreate)
Vue.component('DepartmentUpdate', DepartmentUpdate)
Vue.component('DepartmentRemove', DepartmentRemove)
Vue.component('DepartmentItem', DepartmentItem)
Vue.component('DepartmentList', DepartmentList)

Vue.component('UserCreate', UserCreate)
Vue.component('UserUpdate', UserUpdate)
Vue.component('UserUpdatePassword', UserUpdatePassword)
Vue.component('UserRemove', UserRemove)
Vue.component('UserList', UserList)
Vue.component('UserItem', UserItem)

Vue.component('TestCreate', TestCreate)
Vue.component('TestUpdate', TestUpdate)
Vue.component('TestRemove', TestRemove)
Vue.component('TestList', TestList)
Vue.component('TestItem', TestItem)

Vue.component('TestingList', TestingList)
Vue.component('TestingItem', TestingItem)
Vue.component('TestingQuestion', TestingQuestion)

Vue.component('QuestionCreate', QuestionCreate)
Vue.component('QuestionUpdate', QuestionUpdate)
Vue.component('QuestionRemove', QuestionRemove)
Vue.component('QuestionList', QuestionList)
Vue.component('QuestionItem', QuestionItem)

Vue.component('ResultItem', ResultItem)
Vue.component('ResultList', ResultList)
Vue.component('ResultRemove', ResultRemove)

Vue.component('AnswerItem', AnswerItem)
Vue.component('AnswerList', AnswerList)

Vue.component('OptionCreate', OptionCreate)
Vue.component('OptionUpdate', OptionUpdate)
Vue.component('OptionRemove', OptionRemove)
Vue.component('OptionList', OptionList)
Vue.component('OptionItem', OptionItem)
