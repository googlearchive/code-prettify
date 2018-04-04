/**
 * @license
 * Copyright (C) 2017 Tej Chajed
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * Registers a language handler for Coq.
 *
 * @author tchajed@gmail.com
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
         // Whitespace is made up of spaces, tabs and newline characters.
         [PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
         // A double or single quoted, possibly multi-line, string.
         [PR['PR_STRING'],      /^(?:\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)|\'(?:[^\'\\]|\\[\s\S])(?:\'|$))/, null, '"\'']
        ],
        [
         // Block comments are delimited by (* and *) and may be
         // nested.
         // TODO: (*...*) comments can be nested.  This does not handle that.
         [PR['PR_COMMENT'],     /^(?:\(\*[\s\S]*?\*\))/],
         [PR['PR_KEYWORD'],     /^(?:_|as|at|cofix|else|end|exists|exists2|fix|for|forall|fun|if|IF|in|let|match|mod|Prop|return|Set|then|Type|using|where|with|Abort|About|Add|Admit|Admitted|All|Arguments|Assumptions|Axiom|Back|BackTo|Backtrack|Bind|Blacklist|Canonical|Cd|Check|Class|Classes|Close|Coercion|Coercions|CoFixpoint|CoInductive|Collection|Combined|Compute|Conjecture|Conjectures|Constant|constr|Constraint|Constructors|Context|Corollary|CreateHintDb|Cut|Declare|Defined|Definition|Delimit|Dependencies|DependentDerive|Drop|eauto|End|Equality|Eval|Example|Existential|Existentials|Existing|Export|exporting|Extern|Extract|Extraction|Fact|Field|Fields|File|Fixpoint|Focus|for|From|Function|Functional|Generalizable|Global|Goal|Grab|Grammar|Graph|Guarded|Heap|Hint|HintDb|Hints|Hypotheses|Hypothesis|ident|Identity|If|Immediate|Implicit|Import|Include|Inductive|Infix|Info|Initial|Inline|Inspect|Instance|Instances|Intro|Intros|Inversion|Inversion_clear|Language|Left|Lemma|Let|Libraries|Library|Load|LoadPath|Local|Locate|Ltac|ML|Mode|Module|Modules|Monomorphic|Morphism|Next|NoInline|Notation|Obligation|Obligations|Opaque|Open|Optimize|Options|Parameter|Parameters|Parametric|Path|Paths|pattern|Polymorphic|Preterm|Print|Printing|Program|Projections|Proof|Proposition|Pwd|Qed|Quit|Rec|Record|Recursive|Redirect|Relation|Remark|Remove|Require|Reserved|Reset|Resolve|Restart|Rewrite|Right|Ring|Rings|Save|Scheme|Scope|Scopes|Script|Search|SearchAbout|SearchHead|SearchPattern|SearchRewrite|Section|Separate|Set|Setoid|Show|Solve|Sorted|Step|Strategies|Strategy|Structure|SubClass|Table|Tables|Tactic|Term|Test|Theorem|Time|Timeout|Transparent|Type|Typeclasses|Types|Undelimit|Undo|Unfocus|Unfocused|Unfold|Universe|Universes|Unset|Unshelve|using|Variable|Variables|Variant|Verbose|Visibility|where|with)\b/],
         [PR['PR_TYPE'],      /^(?:abstract|absurd|admit|after|apply|as|assert|assumption|at|auto|autorewrite|autounfold|before|bottom|btauto|by|case|case_eq|cbn|cbv|change|classical_left|classical_right|clear|clearbody|cofix|compare|compute|congruence|constr_eq|constructor|contradict|contradiction|cut|cutrewrite|cycle|decide|decompose|dependent|destruct|destruction|dintuition|discriminate|discrR|do|double|dtauto|eapply|eassumption|eauto|ecase|econstructor|edestruct|ediscriminate|eelim|eexact|eexists|einduction|einjection|eleft|elim|elimtype|enough|equality|erewrite|eright|esimplify_eq|esplit|evar|exact|exactly_once|exfalso|exists|f_equal|fail|field|field_simplify|field_simplify_eq|first|firstorder|fix|fold|fourier|functional|generalize|generalizing|gfail|give_up|has_evar|hnf|idtac|in|induction|injection|instantiate|intro|intro_pattern|intros|intuition|inversion|inversion_clear|is_evar|is_var|lapply|lazy|left|lia|lra|move|native_compute|nia|nsatz|omega|once|pattern|pose|progress|proof|psatz|quote|record|red|refine|reflexivity|remember|rename|repeat|replace|revert|revgoals|rewrite|rewrite_strat|right|ring|ring_simplify|rtauto|set|setoid_reflexivity|setoid_replace|setoid_rewrite|setoid_symmetry|setoid_transitivity|shelve|shelve_unifiable|simpl|simple|simplify_eq|solve|specialize|split|split_Rabs|split_Rmult|stepl|stepr|subst|sum|swap|symmetry|tactic|tauto|time|timeout|top|transitivity|trivial|try|tryif|unfold|unify|until|using|vm_compute|with)\b/],
         // A number is an integer literal.
         [PR['PR_LITERAL'], /^(?:\d+)/],
         [PR['PR_PLAIN'],       /^(?:[a-z_][\w']*[!?#]?|``[^\r\n\t`]*(?:``|$))/i],
         // A printable non-space non-special character
         [PR['PR_PUNCTUATION'], /^[^\t\n\r \xA0\"\'\w]+/]
        ]),
    ['coq']);
