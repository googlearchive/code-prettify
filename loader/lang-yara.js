PR.registerLangHandler(
  PR.sourceDecorator({
    keywords:"all,and,any,ascii,at,condition,contains,entrypoint,false,filesize,fullword,for,global,import,in,include,int8,int16,int32,matches,meta,nocase,not,or,of,private,rule,strings,them,true,uint8,uint16,uint32,wide",
    types:/^(bool|(double|s?fixed|[su]?int)(32|64)|float|string)\b/,cStyleComments:!0}),["yara"]);
