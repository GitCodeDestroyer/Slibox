<h3>Table of Content</h3>
<a href="#start">Get Started</a><br>
<a href="#features">Features</a><br>
<a href="#content">Content</a><br>
<a href="#animation">Animation</a><br>
<a href="#controllers">Controllers</a><br>
<a href="#arrows">Arrow controllers</a><br>
<a href="#sizes">Sizes</a><br>
<a href="#active-slide">Active slide</a><br>
<a href="#errors">Error Messages</a><br>
<a href="#loader">Loader</a><br>
<a href="#image">Image size and position</a><br>
<a href="#carousel">Carousel (looped sliding)</a><br>
<a href="#options-values">All Options</a><br>
<a href="#changelog">Changelog</a><br>

<h1 class="wow fadeIn">Documentation</h1>
<p>Slibox - it's a very fast, powerful, tiny slider. Mobile-friendly, easy to use.</p>
<p>I hope it will be helpful for your development and, if you find mistakes, write me: <a href="mailto:oybek.odil@gmail.com">oybek.odili@gmail.com</a></p>
<h2><a href="#start"><span class="red">#</span> Get Started</a></h2>
<p>First, download and extract script and style files into your project.</p>
<p>Then, insert links: <br>In the down of the <code>head</code> element: <br><code class="code"><span class="red">&lt;link</span> <span class="bool">href</span>=<span class="string">"<em>&lt;path to css-file&gt;</em>/slibox.min.css"</span><span class="red">&gt;</span></code></p>
<p>In the down of the <code>body</code> element: <br><code class="code"><span class="red">&lt;script</span> <span class="bool">src</span>=<span class="string">"http://code.jquery.com/jquery-1.10.0.min.js"</span><span class="red">&gt;&lt;/script&gt;</span><br><span class="red">&lt;script</span> <span class="bool">src</span>=<span class="string">"<em>&lt;path to js-file&gt;</em>/slibox.min.js"</span><span class="red">&gt;&lt;/script&gt;</span></code></p>
<p>Then:</p>
<pre class="code"><span class="red">&lt;div</span> <span class="bool">id</span>=<span class="string">"slider"</span><span class="red">&gt;&lt;/div&gt;</span></pre>
<p>After all, add this code:</p>
<pre class="code"><span class="red">&lt;script&gt;</span>
    <span class="bool">$</span>(<span class="string">'#slider'</span>).<span class="func">slibox</span>({
        <span class="red">imagesLinks</span>: [<em class="string">&lt;images links&gt;</em>]
        <span class="comment">// There are another options</span>
    })
<span class="red">&lt;/script&gt;</span></pre>
<p style="text-align: center;">Then, enjoy!</p>
<h2><a href="#features"><span class="red">#</span> Features</a></h2>
<h3 id="content">Content</h3>
<p>If you want to add some content to slider, you should add an element for wrapping your content with class <code>.sb-slide</code> into an element with <code>.sb-slides</code> class. Everything should be wrapped with you choosed element.</p>
<h3 id="animation">Animation</h3>
<p>For setting a custom Animation you can add to <code>.sb-slide</code> animation with <code>animation</code> css-property like that:</p>
<pre class="code"><span class="bool">.sb-slide</span> {
    <span class="string">animation</span>: <span class="red">fadingIn</span> <span class="num">.4</span><span class="red">s</span> <span class="num">ease-in-out</span> <span class="num">1</span>;
}

<span class="bool">@keyframes</span> <span class="red">fadingIn</span> {
<span class="bool">    0%</span> {
<span class="string">        opacity</span>: <span class="num">0</span>;
<span>    }</span>
<span class="bool">    100%</span> {
<span class="string">        opacity</span>: <span class="num">1</span>;
<span>    }</span>
}</pre>
<p>If you want to use <a href="http://animatecss.com">animate.css</a>... You can do this, only you should add link to your animate.css file and add this property:</p>
<pre class="code"><span class="red">animateCSS</span>: [<span class="string">"fadeIn"</span>, <span class="string">"slideInUp"</span>]</pre>
<p>Every array's element value equals to animation of slide with this element's index. If array's length is lower than images count, last element will be used for all next slides.</p>

<h3 id="controllers">Controllers</h3>
<p>You can use controllers for better sliders controlling. For that, add a new property <code>renderControllers</code>. Class: <code>.sb-controller</code>; data: <code>sb-slider</code> (For setting a slider for this controller), <code>sb-controller</code> (Slide's index); Default: <code class="bool">true</code>.</p>
<h4>Remote controllers</h4>
<p>If want to control slider remotely you can add a new element like that:</p>
<pre class="code"><span class="red">&lt;div</span> <span class="bool">class</span>=<span class="string">"sb-controller"</span> <span class="bool">data-sb-slider</span>=<span class="string">"#demo-slider"</span> <span class="bool">data-sb-controller</span>=<span class="string">"2"</span><span class="red">&gt;</span>
    Click Here!
<span class="red">&lt;/div&gt;</span></pre>
<p class="sb-controller btn" data-sb-slider="#demo-slider" data-sb-controller="2">Click Here!</p>
<p>Then, go up to <a href="#demo-slider">demo slider</a>. Here you can see, demo slider is slided to second slide.</p>
<h3 id="arrows">Arrow controllers</h3>
<p>For enabling arrow controllers you should to add a property <code>renderArrows</code>. Class: <code>.sb-arrow</code>; data: <code>sb-slider</code> (For setting a slider for this controller), <code>sb-arrow-direction</code> (Direction of this arrow); Default: <code class="bool">true</code>.</p>
<h4>Remote arrows</h4>
<p>If want to use remote arrows, add a new element like that:</p>
<pre class="code"><span class="red">&lt;div</span> <span class="bool">class</span>=<span class="string">"sb-arrow"</span> <span class="bool">data-sb-slider</span>=<span class="string">"#demo-slider"</span> <span class="bool">data-sb-arrow-direction</span>=<span class="string">"right"</span><span class="red">&gt;</span>-2
    Click Here!
<span class="red">&lt;/div&gt;</span></pre>
<p class="sb-arrow btn" data-sb-slider="#demo-slider" data-sb-arrow-direction="right">Click Here!</p>
<h3 id="sizes">Sizes</h3>
<p><code>height</code> - for setting a height of slider. When it is <code class="bool">false</code>, height will be an adaptive (width/height = 16/9). If you set some value, slider's height will be equal to this value. Default: <code class="bool">false</code></p>
<p><code>width</code> - for setting a width of slider. When it is <code class="bool">false</code>, width will be equal to parent's width (100%). If you set some value, slider's width will be equal to this value. Default: <code class="bool">false</code>.</p>
<h3 id="active-slide">Active slide</h3>
<p>If you want to set active another slide, not first, you can use <code>activeSlide</code> option. For that, you should set a number of this slide. Default: <code class="num">1</code>.</p>
<h3 id="errors">Error messages</h3>
<p>You can modify error messages, if you want. For that, set <code>loadErrorMessage</code> or <code>noImagesMessage</code>'s values to some string.</p>
<h3 id="loader">Loader</h3>
<p>You can set a link for loader with <code>loaderLink</code> option. Only, you should set this option to image link for loader you choosed. This image is a background image. Default: <code class="bool">false</code>.</p>
<h3 id="image">Image size and position.</h3>
<p><code>imageSize</code> - for setting a size of image. This option works like a <code>background-size</code> css-property. Default is <code class="string">"contain"</code>.</p>
<p><code>imagePosition</code> - for setting a position of image. This option works like a <code>background-position</code> css-property. Default is <code class="string">"center"</code>.</p>
<p>You can set value with type <code class="string">string</code>, it will be used for all of slides. But you can use an array. Every array's element value equals to animation of slide with this element's index. If array's length is lower than images count, last element will be used for all next slides.</p>
<h3 id="carousel">Carousel</h3>
<p>You can add a <code>carousel</code> option for looped sliding. Default: <code class="bool">false</code>.</p>
<h3 id="timer">Timer</h3>
<p>Set to true <code>timer</code> option, for timed sliding function (Default: <code class="bool"></code>false). If you want to set time (in milliseconds) for timer, modify <code>timerTime</code> (Default: <code class="bool">5000</code>). If you don't want looped and timed sliding, set <code>timerCarousel</code> to <code class="bool">false</code> (Default: <code class="bool">true</code>).</p>
<p>To pause the timer, set <code>paused</code> key of slider's element to true:</p>
<pre class="code"><code class="red">$</code>(<code class="string">'#demo-slider'</code>)[<code class="num">0</code>].<code class="red">paused</code> = <code class="bool">true</code></pre>
</div>
<h2><a href="#methods"><span class="red">#</span> Methods</a></h2>
<h3 id="slide">slideTo()</h3>
<p>Template:
    <pre class="code"><code class="red">slideTo</code>(<code class="string">&lt;your element id (with #)&gt;</code>, <code class="num">&lt;slide's index that you want to show&gt;</code>)</pre>
</p>
<p>Example:
    <pre class="code"><code class="red">slideTo</code>(<code class="string">#demo-slider</code>, <code class="num">3</code>)</pre>
</p>
<h3 id="slide-next">slideToNext()</h3>
<p>Only you should call it to slider, and it will be slided to next slide, if active slide is the first and if <code>carousel</code> option is <code class="bool">true</code> it will ne slided to last slide, here is an example of code:</p>
<pre class="code"><code class="red">$</code>(<code class="string">'demo-slider'</code>).<code class="red">slideToNext</code>()</pre>
<h3 id="slide-prev">slideToPrev()</h3>
<p>Call this method to slider, and it will be slided to previous slide, if active slide is the last and if <code>carousel</code> option is <code class="bool">true</code> it will ne slided to first slide, here is an example of code:</p>
<pre class="code"><code class="red">$</code>(<code class="string">'demo-slider'</code>).<code class="red">slideToNext</code>()</pre>
<h2><a href="#options-values"><span class="red">#</span> Options values types</a></h2>
<p>There are list of available values of parameters.</p>
<table id="options-values-table" style="width: 100%">
    <thead>
        <th>Option Name</th>
        <th>Values</th>
    </thead>
    <tr>
        <td>activeSlide</td>
        <td><code class="num">Number</code></td>
    </tr>
    <tr>
        <td>renderArrows</td>
        <td><code class="bool">Boolean</code></td>
    </tr>
    <tr>
        <td>renderControllers</td>
        <td><code class="bool">Boolean</code></td>
    </tr>
    <tr>
        <td>imagesLinks</td>
        <td><code class="text">Array : [ <span class="string">String</span> ]</code></td>
    </tr>
    <tr>
        <td>loaderLink</td>
        <td><code class="string">String</code></td>
    </tr>
    <tr>
        <td>imageSize</td>
        <td><code class="string">String</code></td>
    </tr>
    <tr>
        <td>imagePosition</td>
        <td><code class="string">String</code></td>
    </tr>
    <tr>
        <td>height</td>
        <td><code class="num">Number</code></td>
    </tr>
    <tr>
        <td>width</td>
        <td><code class="num">Number</code></td>
    </tr>
    <tr>
        <td>errorMessage</td>
        <td><code class="string">String</code></td>
    </tr>
    <tr>
        <td>carousel</td>
        <td><code class="bool">Boolean</code></td>
    </tr>
    <tr>
        <td>timer</td>
        <td><code class="bool">Boolean</code></td>
    </tr>
    <tr>
        <td>timerTime</td>
        <td><code class="num">Number</code></td>
    </tr>
    <tr>
        <td>timerCarousel</td>
        <td><code class="bool">Boolean</code></td>
    </tr>
</table>
<h2><a href="#changelog"><span class="red">#</span> Changelog</a></h2>
<h3>version 1.0.0 (latest):</h3>
<p>- Images sizes can be changed.</p>
<p>- Images positions can be changed.</p>
<p>- Carousel option.</p>
<p>- Images loader.</p>
<p>- Arrows and controllers.</p>
<p>- Remote arrows and controllers.</p>
<p>- Dragging feature for mobile users.</p>
<p>- Can be used custom animations.</p>
<p>- Animate.css integration.</p>
<p>- Sliding with timer.</p>