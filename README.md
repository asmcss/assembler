<hr>
<div align=center><h1>Assembler CSS</h1></div>
<div align=center><a href="https://asmcss.com/"><img width=600 src="https://d33wubrfki0l68.cloudfront.net/ad1ed8ef193a228e69394c846992f7a612cc0210/abc1a/assets/img/hero.png" alt="Call to action image"/></a></div>
<div align=center><i><a href="https://asmcss.com/docs/1.x/">Docs</a> — <a href="https://twitter.com/asmcss">Twitter</a> — <a href="https://asmcss.com/docs/1.x/#usage">Installation</a></i></div>
<div align=center><i><h4>Just-in-time CSS, unlimited possibilities</h4></i></div>
<hr>

Assembler CSS is a highly performant utility-first framework that allows you to quickly prototype and build modern 
websites and UI components without the need to install and maintain complex software.

## Usage

Incorporating Assembler CSS within your project is a trivial task. 
Just add a `script` tag before the `head` closing tag, and you are good to go!

```html
<script src="https://unpkg.com/@asmcss/assembler"></script>
```

Now you are ready to try out Assembler CSS and write your first UI component.

```html
<div x-style="max-w:80; mx:auto; radius:md; e:2; e.hover:4; transition:all 0.25s; cursor:pointer">
    <img x-style="block; max-w:100%; w:100%; h:auto; radius-top:md" src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80">
    <div x-style="p:4">
        <div x-style="text:lg; color:black; font-weight:700">Fresh veggies</div>
        <div x-style="text:sm; color:silver; font-weight:400">600g</div>
        <p x-style="pt:4">
            Any veggie can belong on your menu, so choose what you love and use the rest
            for future meals and snacks you can enjoy in flavorful ways.
        </p>
    </div>
</div>
```

## Documentation

The full documentation for Assembler CSS can be found [here][documentation].

## Installation

You could also install Assembler CSS as an npm package by issuing the following command:

```shell
npm install @asmcss/assembler
```

Or, if you are a Yarn user

```shell
yarn add @asmcss/assembler
```

## License

Assembler CSS is licensed under the permissive [Apache License, Version 2.0][apache_license].

## Browser support

Assembler CSS is designed to run on the latest stable versions of all the major browsers: 
Chrome, Edge, Firefox, and Safari. We do not support any version of IE.

We have conducted intensive manual testing on the following operating systems and browsers:

- Ubuntu Linux 20.04: Chrome and Firefox
- Windows 10: Edge, Chrome, and Firefox
- MacOS Big Sur: Safari, Chrome, Edge, and Firefox
- Android (tablet and mobile): Chrome
- iOS 14 (tablet and mobile): Safari and Chrome

## Road to v1.0.0

- [x] Basic functionalities
- [x] Add support for states
- [x] Add support for scopes
- [x] Add support for mixins
- [x] Add support for custom selector attribute
- [x] Add support for custom elements
- [ ] Add automated tests, so we can make sure we don’t mess up things in future releases
- [ ] Cleanup & prepare stable releases


[apache_license]: https://www.apache.org/licenses/LICENSE-2.0 "Apache License"
[documentation]: https://asmcss.com/docs/1.x/ "Assembler CSS documentation"

