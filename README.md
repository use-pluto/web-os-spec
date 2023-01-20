# web-os-spec
Spec for interacting with web OSes via the protocol handler `web+os`

# Software Requirements Specification
## For web desktops
Version 1.0 approved  
Prepared by its-pablo  
system41  
19 January 2023

Table of Contents
=================
  * [Revision History](#revision-history)
  * [Introduction](#1-introduction)
    * 1.1 [Purpose](#11-purpose)
    * 1.2 [Document Conventions](#12-document-conventions)
    * 1.3 [Intended Audience and Reading Suggestions](#13-intended-audience-and-reading-suggestions)
    * 1.4 [Product Scope](#14-product-scope)
    * 1.5 [References](#15-references)
  * [Overall Description](#overall-description)
    * 2.1 [Product Perspective](#21-product-perspective)
    * 2.2 [Product Functions](#22-product-functions)
  * [External Interface Requirements](#external-interface-requirements)
    * 3.1 [User Interfaces](#31-user-interfaces)
    * 3.2 [Software Interfaces](#33-software-interfaces)
  * [System Features](#system-features)
    * 4.1 [File Method](#41-file-method)
    * 4.2 [App Method](#42-app-method)
  * [Other Nonfunctional Requirements](#other-nonfunctional-requirements)
    * 5.1 [Performance Requirements](#51-performance-requirements)
    * 5.2 [Security Requirements](#52-security-requirements)




## Revision History
| Name           | Date            | Reason For Changes | Version |
|----------------|-----------------|--------------------|---------|
| Initial/v1.0.0 | 19 January 2023 | Initial release    | v1.0.0  |

## 1. Introduction
### 1.1 Purpose 
The purpose of this document is to present a detailed description of the protocol handler `web+os` version 1.0.0. It will explain the purpose, usage, and methods of implementing the protocol handler.
### 1.2 Document Conventions
When the document refers to 'the protocol handler', it is referring to the `web+os` protocol handler and its interface.  
The protocol handler, `web+os` is in a monospace font to distinguish it from Web OSes in general.  
Web OS refers to the general concept of a Web OS, a desktop environment that is simulated in the browser, written with web programming languages. The terminology Web Desktop can also be used to refer to this. WebOS is a TV operating system made by LG, and has nothing to do with Web OSes.  
Often, the document will direct you to MDN. The link to MDN is in [1.5 References](#15-references)  
This document will refer to 'malware' a couple times; This malware affects the Web OS and not the underlying operating system it is running on.
### 1.3 Intended Audience and Reading Suggestions
The document's intended audience is one of Web developers. If you do not have sufficient web development knowledge, we recommend you learn at MDN.  
This document is written by members of the GitHub organization System41, which currently only contains one member. If you are looking for support with the protocol handler, please direct yourself towards the GitHub repository's Issues tab.
### 1.4 Product Scope
The software aims at enabling compatibility between websites and web OSes. One possible benefit of this is that a user can register their web OS of choice and a website can redirect them to install an application on their Web OS given that it is able to be installed.
### 1.5 References
* [MDN](https://developer.mozilla.org/) - clear JavaScript documentation

## Overall Description
### 2.1 Product Perspective
The protocol handler `web+os` is a new self-contained project. It is available on Chrome, Edge, Firefox, Opera, and Firefox for Android.
### 2.2 Product Functions
TODO: finish, release parser on npm
## External Interface Requirements
### 3.1 User Interfaces
It is up to the Web OS developer to add a user interface when an action is performed with the protocol handler. It is recommended to not add any interface, and just continue by executing the action. It is also recommended to filter the action for XSS or malware that can negatively harm the Web OS. If undesireable results ensue, it is recommended to cancel the action and display a graphical interface explaining that the action could not be completed. This is explained in further detail in [5.2 Security Recommendations](#53-security-recommendations).
### 3.2 Software Interfaces
The protocol handler is registered on the Web OS by running the JavaScript function 
```js
window.navigator.registerProtocolHandler('web+os', WEB_OS_URL + '?protocol=%s', WEB_OS_NAME)
```
where `WEB_OS_URL` is the base URL of the Web OS and `WEB_OS_NAME` is the name of the Web OS. The name won't actually display in the prompt due to spoofing concerns (historically it displayed "Allow this site to handle [name] links?" while now it displays "Allow this site to handle web+os links?") but it is still required by most browsers. If the protocol handler is registered on a user interaction, the browser will display a window asking if the user would like to register it, as seen below.
![Browser trying to register protocol handler on user interaction](.github/registerProtocolHandler.png)
If not, the browser will most likely provide a small icon next to the favorites button. When clicked on, the browser will display a window asking if the user would like to register it. Because of the button's size, it is recommended to try to register the protocol handler only on user interaction
## System Features
### 4.1 File method
```web+os:file```  
The only element in this approach is `file`. This should be a path to a file, drive, or directory. This *can* include frons slashes and backslashes. If it is a directory or drive, the default file explorer/manager should open and show the directory or drive. If the file element is a file, the file's default opener should open it.
### 4.2 Application method
```web+os:app/options```  
The app element should execute an application. The `app` and `options` elements in the protocol may not contain a forward slash (/) or a backslash (\\). *These are the only limitations of this approach.* Although we do recommend that you do not include spaces or capital letters, you may do so if you wish. The parser will not misinterpret the protocol if you do these things.
## Other Nonfunctional Recommendations
### 5.1 Performance Recommendations
If the prompt is too large, the Web OS should 
### 5.3 Security Recommendations
Your application should filter the content in the `?protocol` query param, especially if it is generating HTML (or worse, `eval`ing the prompt as JavaScript code)