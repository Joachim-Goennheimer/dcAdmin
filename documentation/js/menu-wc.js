'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">dc-admin documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-cba1d2372c6251b512bb4355e86d2c21"' : 'data-target="#xs-components-links-module-AppModule-cba1d2372c6251b512bb4355e86d2c21"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-cba1d2372c6251b512bb4355e86d2c21"' :
                                            'id="xs-components-links-module-AppModule-cba1d2372c6251b512bb4355e86d2c21"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataSummaryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataSummaryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DocListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocumentFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DocumentFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocumentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DocumentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImportControlComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImportControlComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OverviewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OverviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PdfFrameComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PdfFrameComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PdfFrameScanComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PdfFrameScanComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScanComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScanComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SigninComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SigninComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToDoListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToDoListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-cba1d2372c6251b512bb4355e86d2c21"' : 'data-target="#xs-injectables-links-module-AppModule-cba1d2372c6251b512bb4355e86d2c21"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-cba1d2372c6251b512bb4355e86d2c21"' :
                                        'id="xs-injectables-links-module-AppModule-cba1d2372c6251b512bb4355e86d2c21"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DataModelService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DataModelService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DocumentsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DocumentsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserProfileService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserProfileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataSummaryModel.html" data-type="entity-link">DataSummaryModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/DocumentBP.html" data-type="entity-link">DocumentBP</a>
                            </li>
                            <li class="link">
                                <a href="classes/Institution.html" data-type="entity-link">Institution</a>
                            </li>
                            <li class="link">
                                <a href="classes/InstitutionsResponse.html" data-type="entity-link">InstitutionsResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/TodoItem.html" data-type="entity-link">TodoItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/TodoListStub.html" data-type="entity-link">TodoListStub</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserProfile.html" data-type="entity-link">UserProfile</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DataSummaryService.html" data-type="entity-link">DataSummaryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TodoListService.html" data-type="entity-link">TodoListService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});