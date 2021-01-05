# 第29回BSS（svelteでtodo mvcをつくる。)

日時　：2020年 12月18日(水)  
参加者：有川(発表者) ・古川 ・森 

---
## 今回の趣旨
- svelteを使ってtodo mvcを作ってみる。

## 目次
1. [svelteとは](#1)  
2. [todo mvc作成](#2)  

## 1. svelteとは<a id="1"></a>

以下がわかりやすかったので参照。  
https://qiita.com/yassun-youtube/items/3faee13f87aa63e33ef5


## 2. todo mvc作成<a id="2"></a>

### Tweet監視用ノードとyunbot実行用ノードをつなげる

### HTML部分作成
```html
<!-- HTML部 -->
  
<!-- Compiled and minified CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

            
<div class="container">	

  <div class="container-row">
	<input type="text" id="todoItem" placeholder="please enter the task"  on:keydown={(event) => pressEnter(event)} bind:value={title} bind:this={initFocus}>
	<button class="waves-effect waves-light btn " on:click={() => add()}><span><i class="small material-icons left">edit</i></span></button>
  </div>
  <div>
	<h4>Task List </h4>
	<div class="container-row">

		<label><input type="radio" name="condition" class="with-gap" on:click={() => { condition = null }} checked><span>ALL</span></label>
		<label><input type="radio" name="condition" class="with-gap" on:click={() => { condition = false }}><span>未完了</span></label>
		<label><input type="radio" name="condition" class="with-gap" on:click={() => { condition = true }}><span>完了</span></label>
	</div>
	<ul class="collection with-header">
	  {#each filteredTodoList(todoList, condition)  as todo (todo.id)}
		<li class="collection-item">
			<label>
			<input class="filled-in" type="checkbox"  bind:checked={todo.done}/> <span class={todo.done?"done-item":""}>{todo.title}</span>
			</label>
		</li>
	  {/each}
	</ul>
  </div>
</div>
```
### script部分作成
```html
<script>
	import { onMount } from 'svelte'

	let title = ''
	let initFocus = null
	let condition = null
	let todoList = []

	onMount(() => {
		init()
	})

	function init() {
		title = ''
		initFocus.focus()
	}

	function add() {
		if(title.trimEnd() === "") return;
		todoList = [...todoList,
								{
								id: todoList.length,
								done: false,
								title
								}];
		init();
	}

	function pressEnter(event){
		if(event.key === "Enter"){
			add();
		}
	}

	$: filteredTodoList = (todoList, condition) => {
		return condition === null ? todoList : todoList.filter(t => t.done === condition)
	}
</script>

<style>
	.container{
		display: flex;
		flex-direction: column;
	}
	.container-row{
		display: flex;
		flex-direction: row;
	}
	.done-item{
		text-decoration: line-through;
	}
</style>
```

### 実行結果
![2021-01-05 14 57のイメージ](https://user-images.githubusercontent.com/66286964/103611852-8285d700-4f66-11eb-818e-7a670a9852bd.jpg)
